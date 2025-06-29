"use client"

import { motion } from "framer-motion"
import { Check, Star } from "lucide-react"
import { useState } from "react"

const plans = [
  {
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    currency: "₹",
    description: "Perfect for personal use and trying out FakeBuster",
    features: [
      "10 uploads per month",
      "Image detection",
      "Basic confidence scoring",
      "Email support",
      "No login required",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: { monthly: 199, yearly: 1990 },
    currency: "₹",
    description: "Ideal for professionals and content creators",
    features: [
      "500 uploads per month",
      "Image + Video detection",
      "Metadata analysis",
      "Explainable AI reports",
      "Priority support",
      "API access",
      "Advanced analytics",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: { monthly: "Custom", yearly: "Custom" },
    currency: "",
    description: "For organizations and large-scale operations",
    features: [
      "Unlimited uploads",
      "Custom integrations",
      "White-label solution",
      "Dedicated support",
      "SLA guarantee",
      "Custom AI models",
      "Team management",
      "Advanced reporting",
    ],
    popular: false,
  },
]

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            Simple{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Pricing</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your deepfake detection needs
          </p>

          <div className="flex items-center justify-center space-x-4">
            <span className={`text-lg ${!isYearly ? "text-white" : "text-gray-400"}`}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
                isYearly ? "bg-gradient-to-r from-blue-500 to-purple-500" : "bg-gray-600"
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                  isYearly ? "translate-x-9" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`text-lg ${isYearly ? "text-white" : "text-gray-400"}`}>
              Yearly <span className="text-green-400 text-sm">(Save 17%)</span>
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`relative group ${plan.popular ? "scale-105" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div
                className={`backdrop-blur-xl border rounded-2xl p-8 hover:scale-105 transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30 shadow-2xl"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-300 mb-6">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-4xl font-extrabold text-white">
                    {plan.currency}
                    {typeof plan.price.monthly === "number" && isYearly
                      ? plan.price.yearly
                      : typeof plan.price.monthly === "number"
                        ? plan.price.monthly
                        : plan.price.monthly}
                  </span>
                  {typeof plan.price.monthly === "number" && (
                    <span className="text-gray-400 ml-2">/{isYearly ? "year" : "month"}</span>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg"
                      : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  }`}
                >
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          
        </motion.div>
      </div>
    </div>
  )
}