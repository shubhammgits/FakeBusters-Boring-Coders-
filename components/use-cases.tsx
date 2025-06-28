"use client"

import { motion } from "framer-motion"
import { Users, Newspaper, Star, Shield, GraduationCap, Palette } from "lucide-react"

const useCases = [
  {
    icon: Users,
    title: "Parents & Elders",
    description:
      "Protect your family from WhatsApp scams and fake content. Verify suspicious images and videos before sharing.",
    benefits: ["WhatsApp scam detection", "Family photo verification", "Social media safety", "Easy-to-use interface"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Newspaper,
    title: "News/Media Professionals",
    description: "Ensure editorial integrity and verify the authenticity of images and videos before publication.",
    benefits: [
      "Source verification",
      "Editorial workflow integration",
      "Breaking news validation",
      "Professional reporting tools",
    ],
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Star,
    title: "Influencers & Public Figures",
    description: "Protect your reputation by detecting manipulated content featuring your likeness or brand.",
    benefits: ["Brand protection", "Reputation management", "Content authenticity", "Social media monitoring"],
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Shield,
    title: "Law Enforcement & Legal Teams",
    description: "Verify digital evidence and detect manipulated content in legal proceedings and investigations.",
    benefits: ["Digital evidence verification", "Court-ready reports", "Investigation support", "Forensic analysis"],
    color: "from-orange-500 to-red-500",
  },
  {
    icon: GraduationCap,
    title: "Teachers/Students",
    description:
      "Verify academic submissions and teach digital literacy to identify fake content in educational settings.",
    benefits: [
      "Academic integrity checking",
      "Digital literacy education",
      "Assignment verification",
      "Research validation",
    ],
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Palette,
    title: "Content Creators",
    description: "Protect your original work and verify the authenticity of content in your creative projects.",
    benefits: [
      "Original content protection",
      "Creative work verification",
      "Copyright protection",
      "Content authenticity",
    ],
    color: "from-teal-500 to-blue-500",
  },
]

export default function UseCases() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Who Can Use{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              FakeBuster?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From everyday users to professionals, FakeBuster adapts to your specific deepfake detection needs
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
                <p className="text-gray-300 mb-6 leading-relaxed">{useCase.description}</p>

                <ul className="space-y-2">
                  {useCase.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-gray-400">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}