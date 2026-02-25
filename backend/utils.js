const docs = require("./docs.json");

function findRelevantDocs(query) {
  const q = query.toLowerCase();
  return docs.filter(d =>
    q.includes(d.title.toLowerCase()) ||
    q.includes(d.content.toLowerCase())
  );
}

function buildPrompt(docs, history, question) {
  return `
You are a support assistant.

RULES:
- Answer ONLY from documentation.
- If not found, reply EXACTLY:
"Sorry, I don’t have information about that."

DOCUMENTATION:
${docs.map(d => d.content).join("\n")}

CHAT HISTORY:
${history.map(h => `${h.role}: ${h.content}`).join("\n")}

QUESTION:
${question}

ANSWER:
`;
}

module.exports = { findRelevantDocs, buildPrompt };