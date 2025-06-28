import React, { useState } from 'react';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { Users, Briefcase, Globe, Lightbulb, Sparkles, Trophy, Zap, Clock } from 'lucide-react';
import aiImage from '@/assets/AI2.jpg'; // Ensure the image is in the assets folder

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    // Feature Data (Keeping Only 2 Sections)
    const featureSections = [
        {
            title: "Why Choose Us?",
            features: [
                { icon: <Users className="text-orange-500 w-10 h-10" />, title: "AI-Powered Hiring", description: "Our advanced AI helps employers find the best candidates faster." },
                { icon: <Briefcase className="text-teal-500 w-10 h-10" />, title: "Industry Connections", description: "Get access to top recruiters from global companies." },
                { icon: <Globe className="text-purple-500 w-10 h-10" />, title: "Global Job Market", description: "Find opportunities in multiple countries with our global database." },
                { icon: <Lightbulb className="text-yellow-500 w-10 h-10" />, title: "Smart Career Suggestions", description: "We analyze your skills to suggest the perfect career path for you." }
            ]
        },
        {
            title: "Job Search Made Easy",
            features: [
                { icon: <Sparkles className="text-red-500 w-10 h-10" />, title: "Instant Notifications", description: "Get real-time alerts for job openings that match your profile." },
                { icon: <Trophy className="text-blue-400 w-10 h-10" />, title: "Success Stories", description: "Join thousands of job seekers who landed their dream jobs with us." },
                { icon: <Zap className="text-green-600 w-10 h-10" />, title: "Faster Hiring Process", description: "Our AI ensures a smooth and quick hiring experience." },
                { icon: <Clock className="text-indigo-600 w-10 h-10" />, title: "Save Your Time", description: "Let AI do the work while you focus on preparing for interviews." }
            ]
        }
    ];

    return (
        <div className="text-center bg-black text-white pb-10">
            {/* Highlighted Badge */}
            <span className="px-5 py-2 rounded-full bg-gray-800 text-[#F83002] font-semibold text-lg inline-block mt-6">
                Revolutionize Your Recruitment
            </span>

            {/* Main Heading */}
            <h1 className="text-5xl font-extrabold mt-4">
                Find A Career to Make Your Life Better
            </h1>

            {/* Subtext */}
            <p className="text-lg text-gray-300 mt-2 max-w-2xl mx-auto">
                Experience seamless hiring with our AI-powered job portal’s intuitive 
                speed and simplicity for job recommendations!
            </p>

            {/* Full-Width Image */}
            <div className="w-[90%] mx-auto mt-6">
                <img
                    src={aiImage}
                    alt="AI Concept"
                    className="w-full h-[550px] object-cover rounded-lg"
                />
            </div>

            {/* Feature Sections (Keeping Only 2) */}
            {featureSections.map((section, index) => (
                <div key={index} className="mt-12">
                    <h2 className="text-4xl font-bold">{section.title}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8 px-4 md:px-12">
                        {section.features.map((feature, idx) => (
                            <div key={idx} className="bg-white text-black p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all">
                                <div className="mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold">{feature.title}</h3>
                                <p className="text-gray-600 mt-2">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Search Box */}
            <div className="relative w-[90%] md:w-[80%] lg:w-[60%] mx-auto mt-12">
                <div className="bg-[#0A1931] bg-opacity-90 backdrop-blur-lg p-8 rounded-2xl shadow-xl hover:shadow-blue-500/50 transition-all duration-300">
                    <h2 className="text-3xl font-extrabold text-white">🚀 Ready to land your dream job?</h2>
                    <p className="text-lg text-gray-300 mt-2">Discover the best career opportunities tailored for you.</p>

                    <Button onClick={searchJobHandler} className="mt-5 px-6 py-3 bg-[#2554F0] text-white text-lg font-bold rounded-full hover:bg-[#1d4ed8] transition-all">
                        Find Jobs ↗
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
