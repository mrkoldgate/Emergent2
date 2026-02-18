import { NextResponse } from "next/server";

export async function GET() {
  const startTime = Date.now();
  
  try {
    const uptime = process.uptime();
    const memory = process.memoryUsage();
    
    return NextResponse.json({
      status: "healthy",
      uptime: `${Math.floor(uptime / 86400)}d ${Math.floor((uptime % 86400) / 3600)}h`,
      memory: {
        used: Math.round(memory.heapUsed / 1024 / 1024),
        total: Math.round(memory.heapTotal / 1024 / 1024),
      },
      convex: "connected",
      responseTime: Date.now() - startTime,
    });
  } catch (error) {
    return NextResponse.json(
      { status: "unhealthy", error: String(error) },
      { status: 500 }
    );
  }
}
