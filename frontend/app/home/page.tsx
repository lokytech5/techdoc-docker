"use client"
import React from 'react'
import { AiOutlineBook, AiOutlineCode } from "react-icons/ai";
import { BiRocket } from "react-icons/bi";
import LayoutContainer from '../components/LayoutContainer';
import Footer from '../components/Footer';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter()
  return (
    <LayoutContainer>
    {/* Hero Section */}
    <div className="text-white bg-gradient-to-r from-purple-700 via-blue-700 to-purple-700 flex flex-col justify-center items-center p-8 w-full">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Empower Your Documentation</h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-10">
          Unlock the full potential of your projects with TechDocAI. Our platform offers advanced AI tools for creating, analyzing, and managing technical documentation.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full text-lg md:text-xl">Learn More</button>
      </div>
    </div>
    
    {/* Features Section */}
    <div className="bg-gray-900 text-white py-20 px-4">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Our Features</h2>
        <p className="text-lg md:text-xl mt-4">
          Discover the powerful features of TechDocAI that simplify your documentation process.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 w-full max-w-6xl mx-auto">
        {/* Feature Card for Guide Creation */}
        <div className="bg-gray-800 rounded-lg shadow-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
          <AiOutlineBook className="text-3xl md:text-4xl lg:text-5xl text-purple-400 mb-4" />
          <h2 className="text-xl md:text-2xl text-white mb-3">Create Guides</h2>
          <p className="text-gray-300 mb-6">Generate comprehensive guides automatically with our state-of-the-art AI tools.</p>
          <button className="bg-purple-600 hover:bg-purple-800 text-white py-2 px-4 rounded-full"
          onClick={() => {router.push("/guides")}}>Get Started</button>
        </div>
        
        {/* Feature Card for Code Analysis */}
        <div className="bg-gray-800 rounded-lg shadow-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
          <AiOutlineCode className="text-3xl md:text-4xl lg:text-5xl text-blue-400 mb-4" />
          <h2 className="text-xl md:text-2xl text-white mb-3">Analyze Code</h2>
          <p className="text-gray-300 mb-6">Dive deep into your codebase to uncover patterns and optimize practices.</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full"
          onClick={() => { router.push("/codeAnalysis") }}>Learn More</button>
        </div>
        
        {/* Feature Card for Quick Start */}
        <div className="bg-gray-800 rounded-lg shadow-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
          <BiRocket className="text-3xl md:text-4xl lg:text-5xl text-red-400 mb-4" />
          <h2 className="text-xl md:text-2xl text-white mb-3">Quick Start</h2>
          <p className="text-gray-300 mb-6">Get your projects up and running instantly with our quick setup features.</p>
          <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-full"
           onClick={() => { router.push("/project") }}>Quick Start</button>
        </div>
      </div>
    </div>

    {/* Why Choose TechDocAI Section */}
    <div className="bg-gray-900 text-white py-20 px-4">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Why Choose TechDocAI?</h2>
        <p className="text-lg md:text-xl mt-4">
          TechDocAI simplifies the creation of technical documentation by using AI to assist developers, technical writers, and product teams.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-primary rounded-lg shadow-2xl p-6 text-center text-black">
          <h3 className="text-2xl font-bold mb-4">Comprehensive API Docs</h3>
          <p className="text-black">Create thorough API documentation with ease.</p>
        </div>
        <div className="bg-gray-700 rounded-lg shadow-2xl p-6 text-center">
          <h3 className="text-2xl font-bold mb-4">Automatic Documentation</h3>
          <p className="text-gray-300">Generate detailed documentation automatically from your code comments.</p>
        </div>
        <div className="bg-secondary rounded-lg shadow-2xl p-6 text-center">
          <h3 className="text-2xl font-bold mb-4">User-Friendly Guides</h3>
          <p className="text-gray-300">Translate technical concepts into guides that anyone can understand.</p>
        </div>
      </div>
    </div>

    {/* Example Custom Requests Section */}
    <div className="bg-gray-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Example Custom Requests</h2>
          <p className="text-lg md:text-xl mt-4">
            Here are some examples of how TechDocAI can help with your documentation needs.
          </p>
        </div>
        <div className="text-left max-w-4xl mx-auto">
          <div className="mockup-code mb-8">
            <pre data-prefix="$"><code>Generate a UX design documentation for my project</code></pre> 
            <pre data-prefix=">" className="text-warning"><code>Generating detailed UX design documentation...</code></pre> 
            <pre data-prefix=">" className="text-success"><code>Done!</code></pre>
          </div>
          <div className="mockup-code">
            <pre data-prefix="$"><code>Create user documentation for my project</code></pre> 
            <pre data-prefix=">" className="text-warning"><code>Generating detailed user documentation...</code></pre> 
            <pre data-prefix=">" className="text-success"><code>Done!</code></pre>
          </div>
        </div>
      </div>
    </LayoutContainer>
  )
}

export default HomePage
