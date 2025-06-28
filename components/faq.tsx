"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "How accurate is Copyleaks' AI content detection?",
    answer:
      "Our AI content detection achieves 99.12% accuracy across multiple AI models including ChatGPT, GPT-4, Bard, and Claude. We continuously update our detection algorithms to stay ahead of new AI models and techniques.",
  },
  {
    question: "What types of content can Copyleaks analyze?",
    answer:
      "Copyleaks can analyze text documents, academic papers, articles, source code, and web content. We support over 100 languages and can process various file formats including PDF, DOC, TXT, and more.",
  },
  {
    question: "How does the plagiarism detection work?",
    answer:
      "Our plagiarism detection compares your content against billions of web pages, academic databases, and published works. We use advanced algorithms to identify similarities and provide detailed reports with source citations.",
  },
  {
    question: "Is my content secure and private?",
    answer:
      "Yes, we take privacy seriously. Your content is encrypted during transmission and processing. We don't store your content permanently, and you maintain full ownership of your intellectual property.",
  },
  {
    question: "Can I integrate Copyleaks with my existing systems?",
    answer:
      "We offer comprehensive APIs and integrations with popular platforms like Canvas, Blackboard, Google Classroom, and more. Our developer-friendly API makes custom integrations straightforward.",
  },
  {
    question: "What's included in the free plan?",
    answer:
      "Our free plan includes 10 pages per month of AI content detection and basic plagiarism checking. You'll also get access to our Chrome extension and basic reporting features.",
  },
  {
    question: "How quickly do I get results?",
    answer:
      "Most scans complete within seconds to a few minutes, depending on the content length and complexity. Our advanced processing infrastructure ensures fast, reliable results even during peak usage.",
  },
  {
    question: "Do you offer educational discounts?",
    answer:
      "Yes! We offer special pricing for educational institutions, including volume discounts for schools and universities. Contact our sales team for custom educational pricing.",
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
          <p className="text-xl text-gray-300">Everything you need to know about Copyleaks and content detection</p>
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
