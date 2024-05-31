import React from 'react';
import Markdown from 'markdown-to-jsx';

interface Props {
    children: React.ReactNode;
}

// You could define your components here, for example
const MyH1 = ({ children, ...props }: Props) => <h1 {...props} style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem' }}>{children}</h1>;
const MyH2 = ({ children, ...props }: Props) => <h2 {...props} style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem' }}>{children}</h2>;
const MyH3 = ({ children, ...props }: Props) => <h3 {...props} style={{ fontSize: '1.125rem', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem' }}>{children}</h3>;
const MyParagraph = ({ children, ...props }: Props) => <p {...props} style={{ marginBottom: '0.5rem' }}>{children}</p>;

// Then your markdownStyles object would look like this
const markdownStyles = {
  h1: MyH1,
  h2: MyH2,
  h3: MyH3,
  p: MyParagraph,
};

interface GuideContentProps {
    content: string;
}


const GuideContent = ({ content }: GuideContentProps) => (
  <Markdown
    options={{
      overrides: markdownStyles,
    }}
  >
    {content}
  </Markdown>
);

export default GuideContent;