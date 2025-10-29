import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/review-code", async (req, res) => {
  // Set up SSE headers
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type"
  });

  const { prompt, code } = req.body;

  if (!code || !code.trim()) {
    res.write(`data: ${JSON.stringify({ error: "Please provide code to review" })}\n\n`);
    return res.end();
  }

  try {
    // Send start event
    res.write(`data: ${JSON.stringify({ status: "started" })}\n\n`);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
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

    const result = await model.generateContentStream(reviewPrompt);

    // Send chunks as they arrive
    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) {
        res.write(`data: ${JSON.stringify({ content: text })}\n\n`);
      }
    }

    // Send completion event
    res.write(`data: ${JSON.stringify({ status: "completed" })}\n\n`);
    res.end();

  } catch (error) {
    console.error("Code review error:", error);
    res.write(`data: ${JSON.stringify({
      error: true,
      message: "Error during code review",
      details: error.message
    })}\n\n`);
    res.end();
  }
});

export default router;