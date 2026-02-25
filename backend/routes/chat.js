const express = require("express");
const router = express.Router();
const db = require("../db");
const generateReply = require("../llm");
const docs = require("../docs.json");

router.post("/", async (req, res) => {
  const { sessionId, message } = req.body;

  if (!sessionId || !message)
    return res.status(400).json({ error: "Missing sessionId or message" });

  try {
    // create session if not exists
    db.run(`INSERT OR IGNORE INTO sessions(id) VALUES(?)`, [sessionId]);

    // save user message
    db.run(
      `INSERT INTO messages(session_id, role, content) VALUES(?,?,?)`,
      [sessionId, "user", message]
    );

    // fetch last 10 messages (5 pairs)
    const history = await new Promise((resolve, reject) => {
      db.all(
        `SELECT role, content FROM messages
         WHERE session_id=?
         ORDER BY created_at DESC LIMIT 10`,
        [sessionId],
        (err, rows) => {
          if (err) reject(err);
          resolve(rows.reverse());
        }
      );
    });

    //const reply = await generateReply(docs, history, message);
    let reply = await generateReply(docs, history, message);

// fallback protection (STRICT RULE)
if (!reply || reply.trim().length === 0) {
  reply = "Sorry, I don’t have information about that.";
}

// ensure reply exists in docs content
const docText = docs.map(d => d.content.toLowerCase());

const isFromDocs = docText.some(text =>
  reply.toLowerCase().includes(text.substring(0, 20))
);

if (!isFromDocs) {
  reply = "Sorry, I don’t have information about that.";
}

    db.run(
      `INSERT INTO messages(session_id, role, content) VALUES(?,?,?)`,
      [sessionId, "assistant", reply]
    );

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "LLM or DB failure" });
  }
});

module.exports = router;