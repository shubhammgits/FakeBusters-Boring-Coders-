"use client"

import { motion } from "framer-motion"
import { Shield, Search, FileText, Users, Zap, Globe } from "lucide-react"

const products = [
  {
    icon: Shield,
    title: "AI Content Detector",
    description: "Detect AI-generated content with 99.12% accuracy across multiple languages and platforms.",
    features: ["Multi-language support", "API integration", "Batch processing", "Real-time detection"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Search,
    title: "Plagiarism Detector",
    description: "Comprehensive plagiarism detection across billions of web pages and academic databases.",
    features: ["Academic database access", "Citation assistance", "Similarity reports", "Source identification"],
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: FileText,
    title: "Codeleaks",
    description: "Source code plagiarism detection for educational institutions and enterprises.",
    features: ["Multi-language code support", "Repository scanning", "Assignment protection", "Detailed reports"],
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Users,
    title: "Enterprise Solutions",
    description: "Scalable content integrity solutions for large organizations and institutions.",
    features: ["Custom integrations", "Advanced analytics", "Team management", "Priority support"],
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Zap,
    title: "API Platform",
    description: "Integrate our detection capabilities directly into your applications and workflows.",
    features: ["RESTful API", "Webhook support", "Custom models", "Developer tools"],
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Globe,
    title: "Chrome Extension",
    description: "Real-time content verification while browsing, writing, or researching online.",
    features: ["Browser integration", "Instant alerts", "One-click scanning", "Privacy focused"],
    color: "from-teal-500 to-blue-500",
  },
]

export default function ProductsPage() {
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
            Our{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Products</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive content integrity solutions powered by advanced AI technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-r ${product.color} p-3 mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <product.icon className="w-full h-full text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">{product.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{product.description}</p>

                <ul className="space-y-2 mb-8">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-400">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105">
                  Learn More
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
