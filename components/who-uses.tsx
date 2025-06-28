"use client"

import { motion } from "framer-motion"
import { AlertTriangle, Shield, Eye, Users } from "lucide-react"
import Image from "next/image"

const deepfakeControversies = [
  {
    name: "Narayana Murthy",
    role: "Founder, Infosys",
    incident: "Fake Investment Endorsements",
    description:
      "Deepfake videos circulated featuring the Infosys founder endorsing automated trading applications. Murthy issued a public warning about fake news items claiming he had invested in or endorsed trading apps.",
    impact: "Financial fraud targeting investors",
    date: "December 2023",
    image: "/murthy.jpg",
    socialProof: "/narayana murthy.png",
    category: "Financial Fraud",
  },
  {
    name: "Rashmika Mandanna",
    role: "Bollywood Actress",
    incident: "Viral Deepfake Video",
    description:
      "A viral deepfake video featuring the actress circulated widely on social media. Mandanna expressed her distress, calling it 'extremely scary' and highlighting how technology is being misused to harm individuals.",
    impact: "Personal reputation damage",
    date: "November 2023",
    image: "/rashmika.jpeg",
    socialProof: "/rashmika mandanna.png",
    category: "Personal Attack",
  },
  {
    name: "Ratan Tata",
    role: "Ex-Chairman, Tata Group",
    incident: "Fake Investment Advice",
    description:
      "A deepfake video on Instagram showed Tata appearing to give investment guidance with captions suggesting 'risk-free' investment opportunities, falsely depicting him offering financial advice.",
    impact: "Investment scam targeting public",
    date: "December 2023",
    image: "/ratan.jpeg",
    socialProof: "/ratan tata.png",
    category: "Investment Scam",
  },
  {
    name: "Sachin Tendulkar",
    role: "Cricket Legend",
    incident: "Mobile App Promotion Scam",
    description:
      "Deepfake videos promoting mobile applications using Tendulkar's likeness circulated on social media. The cricket icon expressed dismay at the 'rampant misuse of technology' and called for swift action from platforms.",
    impact: "Brand misuse and app fraud",
    date: "January 2024",
    image: "/sachin.avif",
    socialProof: "/sachin tendulkar.png",
    category: "Brand Misuse",
  },
]

const additionalCases = [
  {
    name: "Alia Bhatt",
    role: "Bollywood Actress",
    incident: "Compromising Deepfake",
    description:
      "Featured in a deceptive deepfake video with her face digitally placed onto another woman in a compromising position.",
    category: "Personal Attack",
    socialProof: "/alia bhat.png",
  },
  {
    name: "Priyanka Chopra",
    role: "Global Actress",
    incident: "Audio Manipulation",
    description:
      "Targeted in deepfakes where her face remained unaltered but audio was substituted with fake brand endorsements and income disclosures.",
    category: "Brand Fraud",
    socialProof: "/priyanka chopra.png",
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
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Deepfake Controversies
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Recent high-profile deepfake incidents in India that highlight the urgent need for detection technology
          </p>
          <div className="flex items-center justify-center mt-6 text-red-400">
            <AlertTriangle className="w-6 h-6 mr-2" />
            <span className="text-lg font-semibold">These are real documented cases</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {deepfakeControversies.map((controversy, index) => (
            <motion.div
              key={controversy.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="backdrop-blur-xl bg-white/5 border border-red-500/20 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-red-500/40">
                <div className="flex items-center mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-red-500/30">
                    <Image
                      src={controversy.image || "/placeholder.svg"}
                      alt={controversy.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{controversy.name}</h4>
                    <p className="text-gray-400 text-sm">{controversy.role}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">
                        {controversy.category}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">{controversy.date}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="text-red-400 font-semibold mb-2 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    {controversy.incident}
                  </h5>
                  <p className="text-gray-300 leading-relaxed text-sm mb-3">{controversy.description}</p>
                  <div className="flex items-center text-orange-400 text-sm">
                    <Eye className="w-4 h-4 mr-2" />
                    <span className="font-medium">Impact: {controversy.impact}</span>
                  </div>
                </div>

                {/* Social Media Proof - Fixed Responsive Design */}
                <div className="mb-4">
                  <div className="relative w-full bg-gray-800/50 rounded-lg overflow-hidden border border-white/10">
                    <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72">
                      <Image
                        src={controversy.socialProof || "/placeholder.svg"}
                        alt={`${controversy.name} social media response`}
                        fill
                        className="object-contain bg-white/5"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Official response on social media</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center text-red-400 text-sm">
                    <Shield className="w-4 h-4 mr-2" />
                    <span>Verified Case</span>
                  </div>
                  <div className="text-xs text-gray-500">Documented incident</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Cases Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="backdrop-blur-xl bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Users className="w-6 h-6 mr-3 text-red-400" />
            Additional Documented Cases
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {additionalCases.map((case_, index) => (
              <div key={case_.name} className="flex flex-col space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">{case_.name}</h4>
                    <p className="text-gray-400 text-sm mb-1">{case_.role}</p>
                    <p className="text-gray-300 text-sm mb-2">{case_.description}</p>
                    <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">{case_.category}</span>
                  </div>
                </div>
                {/* Social Media Evidence - Fixed Responsive Design */}
                <div className="ml-7">
                  <div className="relative w-full bg-gray-800/50 rounded-lg overflow-hidden border border-white/10">
                    <div className="relative w-full h-40 sm:h-48 md:h-56">
                      <Image
                        src={case_.socialProof || "/placeholder.svg"}
                        alt={`${case_.name} evidence`}
                        fill
                        className="object-contain bg-white/5"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Evidence of the incident</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          <div className="backdrop-blur-xl bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">6+</div>
            <div className="text-white font-semibold mb-1">High-Profile Cases</div>
            <div className="text-gray-400 text-sm">Documented in 2023-2024</div>
          </div>
          <div className="backdrop-blur-xl bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-red-400 mb-2">₹100Cr+</div>
            <div className="text-white font-semibold mb-1">Potential Fraud Value</div>
            <div className="text-gray-400 text-sm">From investment scams</div>
          </div>
          <div className="backdrop-blur-xl bg-green-500/10 border border-green-500/20 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">95%</div>
            <div className="text-white font-semibold mb-1">Detection Accuracy</div>
            <div className="text-gray-400 text-sm">FakeBuster's AI model</div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="backdrop-blur-xl bg-blue-500/10 border border-blue-500/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Protect Yourself from Deepfake Fraud</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              These real cases show how deepfakes are being used to deceive the public. FakeBuster's AI-powered
              detection helps identify manipulated content before it causes harm.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="flex items-center text-green-400">
                <Shield className="w-5 h-5 mr-2" />
                <span>95%+ Detection Accuracy</span>
              </div>
              <div className="flex items-center text-blue-400">
                <Eye className="w-5 h-5 mr-2" />
                <span>Real-time Analysis</span>
              </div>
              <div className="flex items-center text-purple-400">
                <AlertTriangle className="w-5 h-5 mr-2" />
                <span>Fraud Prevention</span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            >
              Try FakeBuster Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}