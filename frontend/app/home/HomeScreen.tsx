import React from 'react'
import { AiOutlineBook, AiOutlineCode } from "react-icons/ai";
import { BiRocket } from "react-icons/bi";

const HomeScreen = () => {
  return (
    <div className="home-container bg-gradient-to-br from-purple-800 via-pink-600 to-blue-700 min-h-screen flex flex-col justify-center items-center text-white p-4">
    <h1 className="text-4xl md:text-6xl font-bold text-center mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>Welcome to TechDOC AI!</h1>
    <p className="text-lg md:text-xl text-center mb-12">
      Dive into the future of technical documentation. Explore tools designed to enhance your project understanding and presentation.
    </p>
    <div className="flex flex-wrap justify-center gap-10">
      {/* Feature Card for Guide Creation */}
      <div className="card bg-black rounded-lg shadow-xl p-6 w-full md:w-80">
        <div className="flex flex-col items-center text-center">
          <AiOutlineBook className="text-4xl mb-4 text-pink-400" />
          <h2 className="card-title mb-2">Create Guides</h2>
          <p>Easily generate detailed guides from your codebase, enhancing accessibility and comprehension.</p>
          <button className="btn btn-primary mt-4">Get Started</button>
        </div>
      </div>
      
      {/* Feature Card for Code Analysis */}
      <div className="card bg-black rounded-lg shadow-xl p-6 w-full md:w-80">
        <div className="flex flex-col items-center text-center">
          <AiOutlineCode className="text-4xl mb-4 text-blue-400" />
          <h2 className="card-title mb-2">Analyze Code</h2>
          <p>Uncover insights within your code with advanced pattern recognition and best practices analysis.</p>
          <button className="btn btn-primary mt-4">Learn More</button>
        </div>
      </div>
      
      {/* Feature Card for Quick Start */}
      <div className="card bg-black rounded-lg shadow-xl p-6 w-full md:w-80">
        <div className="flex flex-col items-center text-center">
          <BiRocket className="text-4xl mb-4 text-purple-400" />
          <h2 className="card-title mb-2">Quick Start</h2>
          <p>Initiate your documentation journey swiftly with our one-click setup process.</p>
          <button className="btn btn-primary mt-4">Quick Start</button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default HomeScreen