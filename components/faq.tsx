"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "Is FakeBuster free to use?",
    answer:
      "Yes! FakeBuster offers a free tier with basic functionality. You can scan up to 10 images per month without logging in. For more features and higher limits, check out our Pro and Enterprise plans.",
  },
  {
    question: "Does FakeBuster store my uploaded images or videos?",
    answer:
      "No. We do not store your files. All content is deleted immediately after processing. Your privacy and security are our top priorities.",
  },
  {
    question: "How accurate is FakeBuster?",
    answer:
      "We use state-of-the-art AI models trained on deepfake datasets. While not 100% foolproof, our confidence scoring lets you understand how likely something is fake. Our current accuracy rate is around 95%.",
  },
  {
    question: "Can it detect fake news?",
    answer:
      "FakeBuster doesn't analyze text content or headlines, but it helps verify whether a photo or video attached to news is manipulated or not. It focuses specifically on visual content authenticity.",
  },
  {
    question: "Can I use this on WhatsApp forwards or social media posts?",
    answer:
      "Yes! Just download the image/video and upload it to FakeBuster. Our upcoming browser plugin will allow one-click scanning directly on platforms like Facebook and Twitter.",
  },
  {
    question: "Is this tool for journalists or everyday users?",
    answer:
      "Both! It's designed to be simple for non-tech users but powerful enough for professional use. Whether you're a parent checking WhatsApp forwards or a journalist verifying sources, FakeBuster adapts to your needs.",
  },
  {
    question: "Is API access available?",
    answer:
      "Yes, API access is available for Pro and Enterprise users. You can integrate FakeBuster into your systems to verify media at scale. Contact us for custom enterprise solutions.",
  },
  {
    question: "Can it work offline?",
    answer:
      "Currently, FakeBuster requires an internet connection to process using cloud-hosted AI models. An offline version is in our roadmap for future releases.",
  },
  {
    question: "How can I contact support?",
    answer:
      "Email us at support@fakebuster.ai or use the contact form on our website. We usually respond within 24 hours.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-24">
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
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between focus:outline-none"
              >
                <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="w-6 h-6 text-blue-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                )}
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