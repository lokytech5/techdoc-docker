"use client"
import React, { useEffect, useState } from 'react'
import { GuideResponse, ProjectData } from '../components/types'
import LayoutContainer from '../components/LayoutContainer'
import useFetchGenerateGuide from '../hooks/useFetchGenerateGuide'
import GuideContent from '../components/GuideContent'

interface Props {
    project: ProjectData
}

interface Message {
    text: string;
    isUser: boolean;
    isMarkdown?: boolean;
}

const ChatBot = ({project}: Props) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [sections, setSections] = useState<string[]>([]);
    const [customRequest, setCustomRequest] = useState<string>('');
    const [isGenerating, setIsGenerating] = useState(false);

    const mutation = useFetchGenerateGuide();

    useEffect(() => {
        setMessages([{ text: `Hello! Let's discuss your project "${project.name}". How can I assist you with generating the documentation?`, isUser: false }]);
    }, [project.name]);

    const handleSendMessage = () => {
        if (input.trim()) {
            const userMessage = input.trim();
            setMessages(prevMessages => [...prevMessages, { text: userMessage, isUser: true }]);
            setInput('');

            const lowerCaseMessage = userMessage.toLowerCase();
            if (lowerCaseMessage.includes("generate") || lowerCaseMessage.includes("outline")) {
                setMessages(prevMessages => [...prevMessages, { text: 'Generating guide...', isUser: false }]);
                generateGuide(userMessage);
            } else if (["introduction", "setup", "troubleshooting"].some(section => lowerCaseMessage.includes(section))) {
                setSections(prevSections => [...prevSections, lowerCaseMessage]);
                setMessages(prevMessages => [...prevMessages, { text: `Section "${userMessage}" noted.`, isUser: false }]);
            } else if (["hello", "hi", "hey"].some(greeting => lowerCaseMessage.includes(greeting))) {
                setMessages(prevMessages => [...prevMessages, { text: `Hello! How can I assist you with your project "${project.name}" today?`, isUser: false }]);
            } else {
                setCustomRequest(userMessage);
                setMessages(prevMessages => [...prevMessages, { text: `Custom request noted.`, isUser: false }]);
            }
        }
    };

    const generateGuide = (customRequest: string) => {
        setIsGenerating(true);

        mutation.mutate(
            {
                projectId: project.id,
                sections,
                customRequest
            },
            {
                onSuccess: (data) => {
                    setIsGenerating(false);
                    setMessages(prevMessages => [
                        ...prevMessages.slice(0, -1),
                        { text: 'Guide generated successfully!', isUser: false },
                        { text: data as unknown as string, isUser: false, isMarkdown: true } // Mark the message as markdown content
                    ]);
                },
                onError: (error) => {
                    setIsGenerating(false);
                    console.error('Failed to generate guide:', error);
                    setMessages(prevMessages => [
                        ...prevMessages.slice(0, -1), // Remove the loading message
                        { text: 'Failed to generate guide. Please try again.', isUser: false }
                    ]);
                }
            }
        );
    };

    return (
        <LayoutContainer>
            <div className="flex flex-col h-screen">
                <div className="bg-purple-700 p-4 text-white text-center">
                    Chat with {project.name}
                </div>
                <div className="flex-1 p-4 overflow-y-auto bg-gray-900">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`p-2 my-2 rounded shadow ${message.isUser ? 'bg-gray-700 text-white' : 'bg-gray-600 text-white'}`}
                        >
                            {message.isMarkdown ? (
                                <GuideContent content={message.text as string} />
                            ) : (
                                message.text
                            )}
                        </div>
                    ))}
                    {isGenerating && (
                        <div className="flex justify-center items-center my-4">
                            <span className="loading loading-bars loading-sm"></span>
                        </div>
                    )}
                </div>
                <div className="p-4 bg-gray-800 sticky bottom-0 w-full">
                    <div className="flex">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="input input-bordered flex-1 mr-2"
                            placeholder="Type a message..."
                            disabled={isGenerating}
                        />
                        <button onClick={handleSendMessage} className="btn btn-purple-700" disabled={isGenerating}>
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </LayoutContainer>
  )
}

export default ChatBot