import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const WORKSPACE_PATH = process.env.OPENCLAW_WORKSPACE || path.join(process.env.HOME || "", ".openclaw/workspace");
const TASKS_PATH = path.join(WORKSPACE_PATH, "state/suggested-tasks.json");

// Mock tasks data
const mockTasks = [
  { id: "1", title: "Launch product hunt campaign", reasoning: "PH launches drive significant early user acquisition", nextAction: "Prepare assets and schedule launch", category: "Revenue", priority: "high" as const, effort: "medium" as const, status: "pending" as const },
  { id: "2", title: "Implement agent memory compression", reasoning: "Reduce token costs by 30% with smart summarization", nextAction: "Research compression algorithms", category: "Product", priority: "high" as const, effort: "high" as const, status: "pending" as const },
  { id: "3", title: "Create Discord community bot", reasoning: "Automate community engagement and support", nextAction: "Define bot capabilities", category: "Community", priority: "medium" as const, effort: "medium" as const, status: "pending" as const },
  { id: "4", title: "Write comparison blog post", reasoning: "SEO opportunity for 'OpenClaw vs alternatives'", nextAction: "Outline key differentiators", category: "Content", priority: "medium" as const, effort: "low" as const, status: "approved" as const },
  { id: "5", title: "Set up monitoring dashboard", reasoning: "Proactive issue detection saves debugging time", nextAction: "Choose monitoring tools", category: "Operations", priority: "high" as const, effort: "medium" as const, status: "pending" as const },
  { id: "6", title: "Client case study series", reasoning: "Social proof increases conversion by 40%", nextAction: "Identify willing clients", category: "Clients", priority: "medium" as const, effort: "medium" as const, status: "pending" as const },
];

export async function GET() {
  try {
    let tasks = mockTasks;

    if (fs.existsSync(TASKS_PATH)) {
      const data = JSON.parse(fs.readFileSync(TASKS_PATH, "utf-8"));
      tasks = data.tasks || tasks;
    }

    return NextResponse.json({ tasks });
  } catch (error) {
    console.error("Error reading suggested tasks:", error);
    return NextResponse.json({ error: "Failed to read tasks" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, action } = body;

    let tasks = mockTasks;

    if (fs.existsSync(TASKS_PATH)) {
      const data = JSON.parse(fs.readFileSync(TASKS_PATH, "utf-8"));
      tasks = data.tasks || tasks;
    }

    tasks = tasks.map((task) =>
      task.id === id ? { ...task, status: action === "approve" ? "approved" : "rejected" } : task
    );

    // Ensure directory exists
    const dir = path.dirname(TASKS_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(TASKS_PATH, JSON.stringify({ tasks }, null, 2));

    return NextResponse.json({ success: true, tasks });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}
