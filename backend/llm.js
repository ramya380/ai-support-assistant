const docs = require("./docs.json");

function generateReply(_, history, question) {
  const q = question.toLowerCase();

  const match = docs.find(d =>
    q.includes(d.title.toLowerCase()) ||
    d.content.toLowerCase().includes(q)
  );

  if (!match) {
    return "Sorry, I don’t have information about that.";
  }

  return match.content;
}

module.exports = generateReply;