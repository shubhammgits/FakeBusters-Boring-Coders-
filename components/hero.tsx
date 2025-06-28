"use client"

import { motion } from "framer-motion"
import { ArrowRight, Play, Shield, Zap, Lock } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-sm text-gray-300 mb-8">
            <Shield className="w-4 h-4 mr-2 text-blue-400" />
            Trusted by 100K+ users worldwide
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            Your AI Shield Against{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Deepfakes
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            Detect fake images and videos instantly — powered by real AI. Protect yourself from deepfakes, scams, and
            manipulated content with advanced detection technology.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/signup"
            className="group bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center"
          >
            Try FakeBuster Free
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>

          <button className="group flex items-center px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105">
            <Play className="mr-2 w-5 h-5" />
            Watch Demo
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
            <Zap className="w-8 h-8 text-blue-400 mb-4 mx-auto" />
            <h3 className="text-xl font-bold text-white mb-2">Lightning Fast</h3>
            <p className="text-gray-300">Get results in seconds, not minutes</p>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
            <Shield className="w-8 h-8 text-purple-400 mb-4 mx-auto" />
            <h3 className="text-xl font-bold text-white mb-2">95% Accurate</h3>
            <p className="text-gray-300">Advanced AI-powered detection</p>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
            <Lock className="w-8 h-8 text-green-400 mb-4 mx-auto" />
            <h3 className="text-xl font-bold text-white mb-2">Privacy First</h3>
            <p className="text-gray-300">Your files are never stored</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}