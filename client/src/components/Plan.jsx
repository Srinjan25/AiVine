import React from 'react'
import { PricingTable } from '@clerk/clerk-react'

const Plan = () => {
  return (
    <div className='max-w-6xl mx-auto z-20 my-32 px-4 sm:px-6 lg:px-8'> {/* Increased max-width, added horizontal padding */}
        <div className='text-center mb-16'> {/* Increased bottom margin for more space */}
            <h2 className='text-5xl font-extrabold text-gray-800 leading-tight'> {/* Larger, bolder heading */}
                Choose Your <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-700'>Perfect Plan</span>
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto mt-4'> {/* Improved paragraph styling */}
                Start for free and scale up as you grow. Find the perfect plan for your content creation needs, designed to empower your journey.
            </p>
        </div>
        <div className='mt-16 max-sm:mx-0'> {/* Adjusted top margin and removed max-sm:mx-8 */}
            <PricingTable appearance={{
                elements: {
                    card: "rounded-xl shadow-xl border border-gray-100", // Apply custom styles to individual pricing cards
                    // You can target specific elements within Clerk's PricingTable for more customization
                    // Example:
                    // pricingCardHeader: "bg-indigo-50",
                    // pricingCardTitle: "text-indigo-800",
                    // pricingCardDescription: "text-gray-600",
                    // pricingCardPrice: "text-indigo-700",
                    // pricingCardCta: "bg-primary hover:bg-indigo-700 text-white", // Customize the CTA button
                    // pricingCardFeatureText: "text-gray-700",
                }
            }} />
        </div>
    </div>
  )
}

export default Plan
