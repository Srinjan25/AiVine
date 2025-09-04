import { assets } from "../assets/assets";
import { Facebook, Twitter, Instagram, Linkedin, Send, Sparkles } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-100 overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div className="absolute top-0 right-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
                <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
            </div>
            
            <div className="relative z-10 py-20 px-6 md:px-16 lg:px-24 xl:px-32">
                <div className="flex flex-col md:flex-row justify-between w-full gap-16 border-b border-gray-700/50 pb-16 mb-12">
                    <div className="md:max-w-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <img className="h-8 filter brightness-0 invert" src={assets.logo} alt="AiVine logo" />
                        </div>
                        <p className="text-gray-300 text-base leading-relaxed mb-8">
                            Experience the power of AI with AiVine. Transform your content creation with our suite of premium AI tools. Write content, generate images, and enhance your workflow with unparalleled efficiency.
                        </p>
                        <div className="flex space-x-4">
                            {[
                                { Icon: Facebook, color: "hover:text-blue-400" },
                                { Icon: Twitter, color: "hover:text-sky-400" },
                                { Icon: Instagram, color: "hover:text-pink-400" },
                                { Icon: Linkedin, color: "hover:text-blue-500" }
                            ].map(({ Icon, color }, index) => (
                                <a 
                                    key={index}
                                    href="#" 
                                    className={`group p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl text-gray-400 ${color} transition-all duration-300 hover:scale-110`}
                                >
                                    <Icon className="w-5 h-5 group-hover:animate-pulse" />
                                </a>
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col md:flex-row items-start md:justify-end gap-16 lg:gap-24">
                        <div>
                            <h2 className="font-bold text-white text-xl mb-8 relative">
                                Company
                                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                            </h2>
                            <ul className="text-base space-y-4">
                                {['Home', 'About us', 'Contact us', 'Privacy policy'].map((item, index) => (
                                    <li key={index}>
                                        <a href="#" className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="max-w-md">
                            <h2 className="font-bold text-white text-xl mb-8 relative">
                                Subscribe to our newsletter
                                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                            </h2>
                            <div className="space-y-6">
                                <p className="text-gray-300 leading-relaxed">
                                    The latest news, articles, and resources, sent to your inbox weekly. Stay updated with our cutting-edge AI advancements!
                                </p>
                                <div className="relative">
                                    <input
                                        className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500/50 focus:border-transparent outline-none h-14 rounded-xl px-5 pr-16 transition-all duration-300"
                                        type="email"
                                        placeholder="Enter your email"
                                    />
                                    <button className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium px-6 rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-2">
                                        <Send className="w-4 h-4" />
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="text-center">
                    <p className="text-gray-400 text-sm md:text-base">
                        Copyright {new Date().getFullYear()} © AiVine. All Rights Reserved. Made with 💜 for creators
                    </p>
                </div>
            </div>
        </footer>
    );
};
