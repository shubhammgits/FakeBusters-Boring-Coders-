"use client"

import { motion } from "framer-motion"
import { Shield, Search, FileText, Brain, Video, Zap, Code, Lock } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Deepfake Detection using AI Models",
    description:
      "Uses pre-trained models like XceptionNet and EfficientNet to analyze visual cues in images and video frames.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Search,
    title: "Confidence Scoring System",
    description: "FakeBuster doesn't just say 'fake' — it tells you how confident it is with detailed scoring.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: FileText,
    title: "Metadata Forensics",
    description: "Checks camera info, timestamps, GPS data, and flags if metadata is missing or modified.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Brain,
    title: "Explainable AI (XAI)",
    description:
      "Generates human-readable explanations like 'Faces are blurred at unnatural points; lighting is inconsistent'.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Video,
    title: "Video Support with Frame Extraction",
    description: "Processes short video clips, gives verdict per frame and provides an overall assessment.",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Zap,
    title: "Lightweight UI – No Login Required",
    description: "Just upload and get results instantly. Free tier requires no registration or login.",
    color: "from-teal-500 to-blue-500",
  },
  {
    icon: Code,
    title: "Enterprise API",
    description: "Integrate FakeBuster into your apps, CRMs, and verification platforms with our robust API.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Lock,
    title: "Privacy-First Architecture",
    description: "No media stored, files deleted after scan, complies with GDPR and data safety standards.",
    color: "from-pink-500 to-rose-500",
  },
]

export default function Features() {
  return (
    <section className="py-24 bg-gradient-to-b from-transparent to-gray-900/50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Powerful{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Features</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to detect deepfakes and protect yourself from AI-generated fake content
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} p-2.5 mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-full h-full text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}