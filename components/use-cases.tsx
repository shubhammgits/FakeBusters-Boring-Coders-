"use client"

import { motion } from "framer-motion"
import { GraduationCap, Building, FileText, Users, Newspaper, Code } from "lucide-react"

const useCases = [
  {
    icon: GraduationCap,
    title: "Educational Institutions",
    description:
      "Maintain academic integrity with comprehensive plagiarism detection for essays, research papers, and assignments.",
    benefits: [
      "Student assignment checking",
      "Research paper verification",
      "Academic integrity enforcement",
      "Bulk processing for classes",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Building,
    title: "Enterprise & Business",
    description:
      "Protect your brand and content with AI detection and plagiarism checking for marketing materials and publications.",
    benefits: [
      "Content authenticity verification",
      "Brand protection",
      "Marketing material checking",
      "Employee content screening",
    ],
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Newspaper,
    title: "Publishers & Media",
    description:
      "Ensure editorial integrity and originality in journalism, publishing, and content creation workflows.",
    benefits: [
      "Article originality checking",
      "Editorial workflow integration",
      "Source verification",
      "Content quality assurance",
    ],
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Code,
    title: "Software Development",
    description: "Detect code plagiarism and ensure originality in programming assignments and software projects.",
    benefits: [
      "Source code analysis",
      "Programming assignment checking",
      "Open source compliance",
      "Code review automation",
    ],
    color: "from-orange-500 to-red-500",
  },
  {
    icon: FileText,
    title: "Legal & Compliance",
    description: "Maintain document integrity and compliance with legal standards for contracts and legal documents.",
    benefits: ["Legal document verification", "Compliance checking", "Contract originality", "Regulatory adherence"],
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Users,
    title: "Content Creators",
    description: "Protect your creative work and ensure originality in blogs, articles, and digital content.",
    benefits: [
      "Blog post verification",
      "Content originality checking",
      "SEO content protection",
      "Creative work authentication",
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
            Perfect for{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Every Industry
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From education to enterprise, our platform adapts to your specific content integrity needs
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
