"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Parent, Mumbai",
    content:
      "FakeBuster saved me from a WhatsApp scam. My elderly mother was about to share a fake video about a missing child. This tool helped us verify it was manipulated.",
    rating: 5,
    avatar: "/placeholder-user.jpg",
  },
  {
    name: "Rajesh Kumar",
    role: "Journalist, Delhi",
    content:
      "As a journalist covering breaking news, this tool is a must-have. I can quickly verify user-generated content before publishing. It's incredibly accurate and fast.",
    rating: 5,
    avatar: "/placeholder-user.jpg",
  },
  {
    name: "Dr. Anita Patel",
    role: "Professor, Bangalore",
    content:
      "I use FakeBuster to teach digital literacy to my students. The explainable AI feature helps them understand how deepfakes work and how to spot them.",
    rating: 5,
    avatar: "/placeholder-user.jpg",
  },
  {
    name: "Inspector Vikram Singh",
    role: "Cyber Crime Unit, Pune",
    content:
      "This tool has been invaluable for our investigations. The metadata analysis and confidence scoring help us build stronger cases against digital fraud.",
    rating: 5,
    avatar: "/placeholder-user.jpg",
  },
]

export default function WhoUses() {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Real{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              User Stories
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how FakeBuster is protecting people across India from deepfakes and manipulated content
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center mb-6">
                  <Quote className="w-8 h-8 text-blue-400 mr-4" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed text-lg">"{testimonial.content}"</p>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}