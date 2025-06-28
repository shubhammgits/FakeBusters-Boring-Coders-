"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { FileImage, FileVideo, Zap, Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { useDropzone } from "react-dropzone"

interface ScanResult {
  isAIGenerated: boolean
  confidence: number
  analysis: {
    visualArtifacts: string[]
    metadataFlags: string[]
    explanation: string
  }
  processingTime: number
}

export default function ScanPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [result, setResult] = useState<ScanResult | null>(null)
  const [usageCount, setUsageCount] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0]
    if (selectedFile) {
      setFile(selectedFile)
      setResult(null)
      setError(null)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
      "video/*": [".mp4", ".mov", ".avi", ".mkv"],
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    multiple: false,
  })

  const handleScan = async () => {
    if (!file) return

    // Check usage limit
    if (usageCount >= 20) {
      setError("You've reached your free scan limit. Please upgrade to continue.")
      return
    }

    setIsScanning(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/scan", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Scan failed")
      }

      const scanResult = await response.json()
      setResult(scanResult)
      setUsageCount((prev) => prev + 1)
    } catch (err) {
      setError("Failed to analyze the file. Please try again.")
    } finally {
      setIsScanning(false)
    }
  }

  const resetScan = () => {
    setFile(null)
    setResult(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Deepfake</span>{" "}
            Detector
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Upload your image or video to detect if it's AI-generated or manipulated using advanced machine learning
            analysis.
          </p>

          {/* Usage Counter */}
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-8">
            <Shield className="w-4 h-4 mr-2" />
            Free Scans: {usageCount}/20 used
          </div>
        </motion.div>

        {!file ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8"
          >
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
                isDragActive
                  ? "border-blue-400 bg-blue-500/10"
                  : "border-gray-600 hover:border-gray-500 hover:bg-white/5"
              }`}
            >
              <input {...getInputProps()} />

              <div className="flex justify-center space-x-4 mb-6">
                <FileImage className="w-12 h-12 text-gray-400" />
                <FileVideo className="w-12 h-12 text-gray-400" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">
                {isDragActive ? "Drop your file here" : "Drag & drop your files here"}
              </h3>
              <p className="text-gray-400 mb-6">or click to browse (Images & Videos)</p>

              <div className="text-sm text-gray-500">
                <p>Supported formats: PNG, JPG, GIF, WebP, MP4, MOV, AVI</p>
                <p>Maximum file size: 50MB</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* File Preview */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">File Selected</h3>
                <button onClick={resetScan} className="text-gray-400 hover:text-white transition-colors">
                  Change File
                </button>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                {file.type.startsWith("image/") ? (
                  <FileImage className="w-8 h-8 text-blue-400" />
                ) : (
                  <FileVideo className="w-8 h-8 text-purple-400" />
                )}
                <div>
                  <p className="text-white font-medium">{file.name}</p>
                  <p className="text-gray-400 text-sm">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              </div>

              {/* File Preview */}
              {file.type.startsWith("image/") && (
                <div className="mb-6">
                  <img
                    src={URL.createObjectURL(file) || "/placeholder.svg"}
                    alt="Preview"
                    className="max-w-full max-h-64 rounded-lg mx-auto"
                  />
                </div>
              )}

              {/* Scan Button */}
              <div className="text-center">
                <button
                  onClick={handleScan}
                  disabled={isScanning || usageCount >= 20}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto"
                >
                  {isScanning ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 mr-2" />
                      START SCANNING NOW
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="backdrop-blur-xl bg-red-500/10 border border-red-500/20 rounded-2xl p-6"
              >
                <div className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-400 mr-3" />
                  <p className="text-red-300">{error}</p>
                </div>
              </motion.div>
            )}

            {/* Results Display */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8"
              >
                <h3 className="text-3xl font-bold text-white mb-6 text-center">Analysis Results</h3>

                {/* Main Result */}
                <div
                  className={`text-center mb-8 p-6 rounded-xl ${
                    result.isAIGenerated
                      ? "bg-red-500/10 border border-red-500/20"
                      : "bg-green-500/10 border border-green-500/20"
                  }`}
                >
                  {result.isAIGenerated ? (
                    <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                  ) : (
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  )}

                  <h4 className={`text-2xl font-bold mb-2 ${result.isAIGenerated ? "text-red-300" : "text-green-300"}`}>
                    {result.isAIGenerated ? "AI-Generated Content Detected" : "Authentic Content"}
                  </h4>

                  <p className="text-gray-300 mb-4">
                    Confidence Level: <span className="font-bold">{result.confidence}%</span>
                  </p>
                </div>

                {/* Detailed Analysis */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h5 className="text-lg font-semibold text-white mb-3">Visual Artifacts</h5>
                    <ul className="space-y-2">
                      {result.analysis.visualArtifacts.map((artifact, index) => (
                        <li key={index} className="text-gray-300 text-sm flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                          {artifact}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h5 className="text-lg font-semibold text-white mb-3">Metadata Flags</h5>
                    <ul className="space-y-2">
                      {result.analysis.metadataFlags.map((flag, index) => (
                        <li key={index} className="text-gray-300 text-sm flex items-start">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                          {flag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* AI Explanation */}
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-6">
                  <h5 className="text-lg font-semibold text-white mb-3">AI Explanation</h5>
                  <p className="text-gray-300 leading-relaxed">{result.analysis.explanation}</p>
                </div>

                {/* Processing Stats */}
                <div className="text-center mt-6 text-gray-400 text-sm">
                  Processing completed in {result.processingTime}ms
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4 mt-8">
                  <button
                    onClick={resetScan}
                    className="bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300"
                  >
                    Scan Another File
                  </button>
                  <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300">
                    Download Report
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Usage Limit Warning */}
        {usageCount >= 15 && usageCount < 20 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 backdrop-blur-xl bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6 text-center"
          >
            <AlertTriangle className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <h4 className="text-lg font-semibold text-yellow-300 mb-2">Running Low on Free Scans</h4>
            <p className="text-yellow-200 mb-4">
              You have {20 - usageCount} free scans remaining. Upgrade to Pro for unlimited access.
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300">
              Upgrade Now
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}