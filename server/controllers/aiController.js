const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateResources = async (req, res) => {
  const { topic } = req.body;
  console.log("📥 Received topic:", topic);

  try {
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

    const prompt = `
Generate detailed, accurate, and reliable study resources for the topic "${topic}". The response should include:

1. 🔍 **Key Summary Points**: Bullet-pointed, crisp and useful for revision.
2. 📺 **Helpful YouTube Links**: 2-3 direct, high-quality, working YouTube URLs (do not suggest to search manually or replace anything).
3. 📄 **Helpful Article Links**: 2-3 real, working article/blog links. Do not add placeholders or say "search for" — include real URLs only.

❌ Do not include notes like “replace bracketed links” or “search online”.

✅ Make the output clean, well-formatted in markdown, and ready to be used as is.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("✅ Gemini response generated");
    res.status(200).json({ content: text });
  } catch (error) {
    console.error("❌ Gemini API error:", error);
    res.status(500).json({ message: "Failed to generate resources" });
  }
};

module.exports = { generateResources };
