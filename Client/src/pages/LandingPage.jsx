import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroimage from "../assets/Screenshot 2026-02-03 180713.png"

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans text-gray-800">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-8 py-4 shadow-md bg-white sticky top-0 z-50">
        <div
          className="text-2xl font-bold text-green-600 cursor-pointer"
          onClick={() => window.scrollTo(0, 0)}
        >
          Routino
        </div>

        {/* Desktop buttons */}
        <div className="hidden md:flex space-x-4">
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 rounded-md hover:bg-gray-100 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </div>

        {/* Mobile button */}
        <div className="md:hidden">
          <button
            onClick={() => navigate('/register')}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-20 bg-gray-50">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Build Better Habits, Every Day</h1>
          <p className="text-gray-600 mb-6">
            Track your habits, manage your todos, and visualize your progress. Stay consistent
            and reach your goals with Routino.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <button
              onClick={() => navigate('/register')}
              className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
            >
              Get Started
            </button>
            {/* Desktop secondary button */}
            <button
              onClick={() => navigate('/login')}
              className="hidden md:inline-block px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition"
            >
              Login
            </button>
          </div>
        </div>
        {/* Hero image: hidden on mobile */}
        <div className="md:w-1/2 mb-10 md:mb-0 hidden md:block">
          <img
            src={heroimage}
            alt="App Screenshot"
            className="w-full rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* About / Features Section */}
      <section className="px-6 md:px-20 py-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">What Routino Does</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="font-semibold mb-2 text-green-600">Habits</h3>
            <p className="text-gray-600">Track daily habits, mark them done, and see your streaks grow over time.</p>
          </div>
          <div className="p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="font-semibold mb-2 text-green-600">Todos</h3>
            <p className="text-gray-600">Manage your tasks efficiently and get notified if deadlines are near.</p>
          </div>
          <div className="p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="font-semibold mb-2 text-green-600">Analytics</h3>
            <p className="text-gray-600">Visualize your progress, see trends, and stay motivated daily.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 md:px-20 py-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <p className="italic mb-4">"Routino completely changed how I stay consistent with my daily habits. Highly recommend!"</p>
            <span className="font-semibold text-green-600">— Alex</span>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <p className="italic mb-4">"Managing my todos and seeing my streaks motivates me every day. Love it!"</p>
            <span className="font-semibold text-green-600">— Maya</span>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <p className="italic mb-4">"The analytics help me track my progress and stay on top of my goals."</p>
            <span className="font-semibold text-green-600">— Liam</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-6 text-center text-gray-600 shadow-inner">
        &copy; {new Date().getFullYear()} Routino. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
