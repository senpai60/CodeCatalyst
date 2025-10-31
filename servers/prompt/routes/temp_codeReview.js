import express from "express";
import { GoogleGenAI } from "@google/genai";

const router = express.Router();
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post("/review-code", async (req, res) => {
  const { prompt, code } = req.body;

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
    const reviewPrompt = `
Analyze the provided code and respond in JSON format matching this schema:

{
  "language": "string",
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

Code to review:
${code}

${prompt ? `User note: ${prompt}` : ""}
`;

    res.write('data: {"status":"started"}\n\n');

    // ADD generationConfig with responseMimeType
    const response = await genAI.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: reviewPrompt,
      generationConfig: {
        responseMimeType: "application/json"  // This forces clean JSON
      }
    });

    for await (const chunk of response) {
      const text = chunk.text;
      if (text) {
        res.write(`data: ${JSON.stringify({ content: text })}\n\n`);
      }
    }

    res.write('data: {"status":"completed"}\n\n');
    res.end();

  } catch (err) {
    console.error("Error during code review:", err);
    res.write(`data: ${JSON.stringify({
      error: true,
      message: "Server error. Please try again later.",
      details: err.message
    })}\n\n`);
    res.end();
  }
});

export default router;
