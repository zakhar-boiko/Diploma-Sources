const { OpenAI } = require("openai");
require("dotenv").config();

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function askGroq(prompt: string) {
  const res = await groq.chat.completions.create({
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    messages: [{ role: "user", content: prompt }],
  });

  return res.choices[0].message.content;
}
