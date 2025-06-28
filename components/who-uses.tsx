"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "FakeBuster saved me from a WhatsApp scam. The fake video of my son asking for money looked so real, but FakeBuster detected it was AI-generated.",
    author: "Priya Sharma",
    role: "Parent",
    location: "Mumbai",
  },
  {
    quote:
      "As a journalist, this tool is a must-have. I can verify images and videos from sources instantly before publishing. It's become part of our editorial workflow.",
    author: "Rajesh Kumar",
    role: "Senior Journalist",
    location: "Delhi",
  },
  {
    quote:
      "The metadata analysis feature helped us solve a case involving manipulated evidence. FakeBuster's detailed reports are court-ready.",
    author: "Inspector Meera Singh",
    role: "Cyber Crime Unit",
    location: "Bangalore",
  },
  {
    quote:
      "I use FakeBuster to protect my brand from deepfake videos. The confidence scoring helps me understand how serious each threat is.",
    author: "Arjun Patel",
    role: "Content Creator",
    location: "Pune",
  },
]

export default function WhoUses() {
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
            Real Stories from{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Real Users
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how FakeBuster is helping people across India protect themselves from deepfakes and fake content
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
            >
              <Quote className="w-8 h-8 text-blue-400 mb-4" />
              <blockquote className="text-gray-300 text-lg leading-relaxed mb-6">"{testimonial.quote}"</blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">
                    {testimonial.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <div className="text-white font-semibold">{testimonial.author}</div>
                  <div className="text-gray-400 text-sm">
                    {testimonial.role} • {testimonial.location}
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