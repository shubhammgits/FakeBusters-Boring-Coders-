"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

const faqs = [
  {
    question: "Is FakeBuster free to use?",
    answer:
      "Yes! FakeBuster offers a free tier with basic functionality. You can scan up to 10 images per month without even logging in. For more features and higher limits, we offer Pro and Enterprise plans.",
  },
  {
    question: "Does FakeBuster store my uploaded images or videos?",
    answer:
      "No, we prioritize your privacy. We do not store your files. All content is deleted immediately after processing. Our privacy-first architecture ensures your data remains secure.",
  },
  {
    question: "How accurate is FakeBuster?",
    answer:
      "We use state-of-the-art AI models trained on extensive deepfake datasets, achieving 95% accuracy. While not 100% foolproof, our confidence scoring system lets you understand how likely something is fake.",
  },
  {
    question: "Can it detect fake news?",
    answer:
      "FakeBuster doesn't analyze text content or headlines, but it helps verify whether a photo or video attached to news is manipulated or authentic, which is crucial for fact-checking.",
  },
  {
    question: "Can I use this on WhatsApp forwards or social media posts?",
    answer:
      "Yes! Just download the image/video and upload it to FakeBuster. Our upcoming browser plugin will allow one-click scanning directly on platforms like Facebook, Twitter, and WhatsApp Web.",
  },
  {
    question: "Is this tool for journalists or everyday users?",
    answer:
      "Both! FakeBuster is designed to be simple enough for non-technical users but powerful enough for professional use by journalists, law enforcement, and educators.",
  },
  {
    question: "Is API access available?",
    answer:
      "Yes, API access is available for Pro and Enterprise users. You can integrate FakeBuster into your systems to verify media at scale, perfect for news organizations and content platforms.",
  },
  {
    question: "How can I contact support?",
    answer:
      "Email us at support@fakebuster.ai or use the contact form on our website. We usually respond within 24 hours, with priority support for Enterprise customers.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-300">Everything you need to know about FakeBuster and deepfake detection</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-8 pb-6"
                >
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}