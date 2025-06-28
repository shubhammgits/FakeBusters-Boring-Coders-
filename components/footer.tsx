"use client"

import { Shield, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">FakeBuster</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Your AI shield against deepfakes. Protect yourself from manipulated content, scams, and emotional
              manipulation with advanced AI detection technology.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-2" />
                support@fakebuster.ai
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 mr-2" />
                +91 (11) 2345-6789
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-2" />
                New Delhi, India
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                  Image Detector
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                  Video Analyzer
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                  Metadata Checker
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                  Enterprise API
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                  Browser Plugin
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 FakeBuster. All rights reserved. Protecting India from deepfakes.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Twitter
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              LinkedIn
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}