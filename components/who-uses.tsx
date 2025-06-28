"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    name: "Dr. Sarah Johnson",
    role: "Professor of English Literature",
    company: "Stanford University",
    content:
      "Copyleaks has revolutionized how we maintain academic integrity. The AI detection is incredibly accurate and has helped us identify sophisticated attempts at academic dishonesty.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Michael Chen",
    role: "Content Director",
    company: "TechCorp Media",
    content:
      "As a publishing company, content originality is crucial. Copyleaks helps us ensure every piece we publish meets our high standards for authenticity and originality.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Emily Rodriguez",
    role: "Legal Compliance Officer",
    company: "Global Law Firm",
    content:
      "The detailed reports and accuracy of Copyleaks have made it an essential tool in our document verification process. It's saved us countless hours of manual review.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "David Park",
    role: "Head of Engineering",
    company: "CodeAcademy",
    content:
      "For our programming courses, detecting code plagiarism was always challenging. Copyleaks' source code analysis has been a game-changer for maintaining course integrity.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Lisa Thompson",
    role: "Editorial Director",
    company: "Digital News Network",
    content:
      "In today's world of AI-generated content, we need tools we can trust. Copyleaks gives us the confidence that our editorial standards remain uncompromised.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

const companies = [
  { name: "Stanford", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Harvard", logo: "/placeholder.svg?height=40&width=120" },
  { name: "MIT", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Oxford", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Cambridge", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Yale", logo: "/placeholder.svg?height=40&width=120" },
]

export default function WhoUses() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900/50 to-transparent">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              15M+ Users
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Leading institutions and organizations worldwide rely on Copyleaks for content integrity
          </p>
        </motion.div>

        {/* Company Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-8 mb-16 opacity-60"
        >
          {companies.map((company, index) => (
            <div key={company.name} className="grayscale hover:grayscale-0 transition-all duration-300">
              <img src={company.logo || "/placeholder.svg"} alt={company.name} className="h-10 w-auto" />
            </div>
          ))}
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12">
            <div className="text-center">
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed italic">
                "{testimonials[currentTestimonial].content}"
              </p>

              <div className="flex items-center justify-center mb-6">
                <img
                  src={testimonials[currentTestimonial].avatar || "/placeholder.svg"}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div className="text-left">
                  <h4 className="text-white font-bold text-lg">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-gray-400">{testimonials[currentTestimonial].role}</p>
                  <p className="text-blue-400 font-medium">{testimonials[currentTestimonial].company}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? "bg-gradient-to-r from-blue-400 to-purple-400"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
