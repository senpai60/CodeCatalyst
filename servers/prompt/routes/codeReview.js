import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

// 💡 FIX 1: Initialize the client with just the API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/review-code", async (req, res) => {
    const { prompt, code } = req.body;
    
    // Setup headers for Server-Sent Events (SSE)
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
    });

    if (!code || !code.trim()) {
      res.write(`data: ${JSON.stringify({ error: "Please provide code to review" })}\n\n`);
      return res.end();
    }

  try {
    // Set up SSE headers properly
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type"
    });

    // Structured review prompt
    const reviewPrompt = `
You are an expert code reviewer. 
Analyze the provided code and respond **strictly in JSON format** matching this schema:

{
  "language": "string (detected language name)",
  "prompt": "string",
  "code": "string",
  "review": {
    "overall": "string",
    "score": number,
    "strengths": ["string"],
    "issues": [
      {
        "severity": "high | medium | low",
        "line": number or null,
        "issue": "string",
        "suggestion": "string"
      }
    ],
    "improvedCode": "string",
    "recommendations": ["string"],
    "complexity": "Low | Medium | High",
    "readability": "Low | Medium | High",
    "maintainability": "Low | Medium | High"
  }
}

Only output valid JSON, nothing else. Avoid markdown, explanations, or extra text.

Code to review:
\`\`\`
${code}
\`\`\`

${prompt ? `User note: ${prompt}` : ""}
`;

    // Use gemini-pro model which is stable and supports streaming
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Stream the response with proper event formatting
    res.write('data: {"status":"started"}\n\n');

    const result = await model.generateContentStream(reviewPrompt);

    // Send chunks as they arrive as Server-Sent Events
    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) {
        // Format as SSE data
        res.write(`data: ${JSON.stringify({ content: text })}\n\n`);
      }
    }

    // Send completion event
    res.write('data: {"status":"completed"}\n\n');

    res.end();

  } catch (err) {
    console.error("Error during code review:", err);
    // Send error event through SSE
    res.write(`data: ${JSON.stringify({
      error: true,
      message: "Server error. Please try again later.",
      details: err.message
    })}\n\n`);
    res.end();
  }
});

export default router;