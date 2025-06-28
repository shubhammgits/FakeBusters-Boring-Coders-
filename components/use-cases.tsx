"use client"

import { motion } from "framer-motion"
import { Users, Newspaper, Shield, GraduationCap, MessageSquare, Building } from "lucide-react"

const useCases = [
  {
    icon: Users,
    title: "Parents & Elders",
    description: "Protect your family from WhatsApp scams and fake viral videos targeting vulnerable users",
    example: "Verify suspicious videos before sharing with family groups",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Newspaper,
    title: "News & Media Professionals",
    description: "Verify authenticity of user-generated content and breaking news visuals before publication",
    example: "Check viral videos for authenticity before reporting",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Shield,
    title: "Law Enforcement & Legal",
    description: "Analyze digital evidence and verify multimedia content in legal proceedings and investigations",
    example: "Verify evidence authenticity in court cases",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: GraduationCap,
    title: "Teachers & Students",
    description: "Verify academic submissions and teach digital literacy to identify manipulated content",
    example: "Check student project submissions for authenticity",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: MessageSquare,
    title: "Social Media Influencers",
    description: "Protect your reputation by verifying content before sharing and identifying fake content about you",
    example: "Verify viral content before resharing to followers",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Building,
    title: "Enterprise & Organizations",
    description: "Protect brand reputation and verify user-generated content at scale with API integration",
    example: "Verify customer-submitted content automatically",
    color: "from-teal-500 to-blue-500",
  },
]

export default function UseCases() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Who Can{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Use This?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            FakeBuster is designed for everyone - from everyday users to professionals who need to verify content
            authenticity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full">
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-r ${useCase.color} p-3 mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <useCase.icon className="w-full h-full text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">{useCase.title}</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">{useCase.description}</p>

                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-3">
                  <p className="text-blue-300 text-sm font-medium">Example: {useCase.example}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}