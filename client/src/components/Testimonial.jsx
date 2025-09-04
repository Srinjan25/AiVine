import React from 'react';
import { Quote, Star, Sparkles } from 'lucide-react';

export default function Testimonial() {
    const testimonialsData = [
        {
            quote: "AiVine has revolutionized our content strategy. It made undercutting all of our competitors an absolute breeze, significantly boosting our market presence!",
            name: "John Doe",
            title: "Content Marketing Manager",
            company: "TechFlow Inc.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=600&auto=format&fit=crop"
        },
        {
            quote: "Our productivity has soared since implementing AiVine's tools. The image generation is top-notch, saving us countless hours and delivering stunning visuals.",
            name: "Jane Smith",
            title: "Creative Director",
            company: "Design Studios",
            rating: 5,
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=600&auto=format&fit=crop"
        },
        {
            quote: "From blog titles to full articles, AiVine handles it all with incredible accuracy and speed. It's an indispensable asset for our entire team.",
            name: "Michael Chen",
            title: "Head of Digital Strategy",
            company: "Growth Labs",
            rating: 5,
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&h=600&auto=format&fit=crop"
        },
    ];

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            />
        ));
    };

    return (
        <div className="relative py-32 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-pink-50/50"></div>
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-300 to-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-r from-pink-300 to-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

            <div className="relative z-10">
                {/* Header Section */}
                <div className='text-center mb-20'>
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-full px-6 py-3 mb-8">
                        <Sparkles className="w-5 h-5 text-purple-600" />
                        <span className="text-purple-700 font-medium">Customer Stories</span>
                    </div>

                    <h2 className='text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight mb-6'>
                        What Our <span className='bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600'>Users Say</span>
                    </h2>
                    <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
                        Hear from the businesses and individuals who are transforming their content creation with AiVine's powerful AI tools.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {testimonialsData.map((testimonial, index) => (
                        <div
                            key={index}
                            className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl border border-gray-200/50 hover:border-transparent hover:-translate-y-2 transition-all duration-500 ease-out overflow-hidden"
                        >
                            {/* Gradient border effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                            <div className="absolute inset-[1px] bg-white rounded-3xl -z-5"></div>

                            {/* Profile Image Section */}
                            <div className="relative h-64 w-full rounded-t-3xl overflow-hidden">
                                <img
                                    src={testimonial.image}
                                    alt={`Profile of ${testimonial.name}`}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                
                                {/* Profile info overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        {renderStars(testimonial.rating)}
                                    </div>
                                    <h3 className="text-xl font-bold mb-1">{testimonial.name}</h3>
                                    <p className="text-sm font-medium text-gray-200 mb-1">{testimonial.title}</p>
                                    <p className="text-xs text-gray-300">{testimonial.company}</p>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-8 relative">
                                {/* Decorative quote */}
                                <div className="absolute -top-4 left-8 w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                    <Quote className="w-4 h-4 text-white" />
                                </div>
                                
                                <blockquote className="text-gray-700 text-base leading-relaxed font-medium italic pt-4">
                                    "{testimonial.quote}"
                                </blockquote>

                                {/* Bottom decoration */}
                                <div className="mt-6 flex justify-between items-center">
                                    <div className="flex items-center gap-1">
                                        {renderStars(testimonial.rating)}
                                    </div>
                                    <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                                </div>
                            </div>

                            {/* Hover effect overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <Sparkles className="w-5 h-5" />
                       
                    </div>
                    <p className="text-gray-500 text-sm mt-4">Start your AI-powered content journey today</p>
                </div>
            </div>
        </div>
    );
};
