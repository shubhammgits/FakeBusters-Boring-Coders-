"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Menu, X, Shield } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Scan Now", href: "/scan" },
    { name: "Products", href: "/products" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold text-white">FakeBuster</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    pathname === item.href
                      ? "text-blue-400 bg-blue-500/10"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  } ${item.name === "Scan Now" ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-400" : ""}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
            >
              Try Free
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-black/90 backdrop-blur-xl"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? "text-blue-400 bg-blue-500/10"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                } ${item.name === "Scan Now" ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-400" : ""}`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/login"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white block px-3 py-2 rounded-md text-base font-medium mx-3 text-center"
              onClick={() => setIsOpen(false)}
            >
              Try Free
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  )
}