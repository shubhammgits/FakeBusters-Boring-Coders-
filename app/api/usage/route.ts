import { type NextRequest, NextResponse } from "next/server"

// In a real application, you would use a database
// For demo purposes, we'll use in-memory storage
const userUsage = new Map<string, { count: number; lastReset: Date }>()

function getUserId(request: NextRequest): string {
  // In a real app, you'd get this from authentication
  // For demo, we'll use IP address or a session identifier
  const forwarded = request.headers.get("x-forwarded-for")
  const ip = forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip") || "anonymous"
  return ip
}

export async function GET(request: NextRequest) {
  try {
    const userId = getUserId(request)
    const usage = userUsage.get(userId) || { count: 0, lastReset: new Date() }

    // Reset count if it's a new month
    const now = new Date()
    const lastReset = new Date(usage.lastReset)

    if (now.getMonth() !== lastReset.getMonth() || now.getFullYear() !== lastReset.getFullYear()) {
      usage.count = 0
      usage.lastReset = now
      userUsage.set(userId, usage)
    }

    return NextResponse.json({
      count: usage.count,
      limit: 20,
      remaining: Math.max(0, 20 - usage.count),
    })
  } catch (error) {
    console.error("Usage API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = getUserId(request)
    const usage = userUsage.get(userId) || { count: 0, lastReset: new Date() }

    // Increment usage count
    usage.count += 1
    userUsage.set(userId, usage)

    return NextResponse.json({
      count: usage.count,
      limit: 20,
      remaining: Math.max(0, 20 - usage.count),
    })
  } catch (error) {
    console.error("Usage increment error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}