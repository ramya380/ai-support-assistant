// import { useState, useEffect } from "react";
// import { v4 as uuid } from "uuid";

// function App() {
//   const [sessionId, setSessionId] = useState("");
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     let id = localStorage.getItem("sessionId");
//     if (!id) {
//       id = uuid();
//       localStorage.setItem("sessionId", id);
//     }
//     setSessionId(id);
//   }, []);

//   const sendMessage = async () => {
//     if (!input) return;
//     const userMsg = { role: "user", content: input };
//     setMessages(prev => [...prev, userMsg]);
//     setLoading(true);

   

//     const res = await fetch("http://localhost:5000/api/chat", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ sessionId, message: input })
//     });

//     const data = await res.json();
//     setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
//     setInput("");
//     setLoading(false);
//   };

//   return (
//     <div style={{ maxWidth: 600, margin: "40px auto" }}>
//       <h2>AI Support Assistant</h2>
      

//       <div style={{ border: "1px solid #ccc", padding: 10, height: 400, overflowY: "auto" }}>
//         {messages.map((m, i) => (
//           <div key={i}>
//             <b>{m.role}:</b> {m.content}
//           </div>
//         ))}
//         {loading && <p>Thinking...</p>}
//       </div>

//       <input
//           value={input}
//           onChange={e => setInput(e.target.value)}
//           onKeyDown={e => {
//           if (e.key === "Enter" && !loading) {
//             sendMessage();
//           }
//         }}
//         placeholder="Ask Anything..."
//         style={{ width: "80%" }}
//      />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// }

// export default App;
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

function App() {
  const [sessionId, setSessionId] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let id = localStorage.getItem("sessionId");
    if (!id) {
      id = uuid();
      localStorage.setItem("sessionId", id);
    }
    setSessionId(id);
  }, []);

  const sendMessage = async () => {
    if (!input) return;

    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, message: input })
    });

    const data = await res.json();

    setMessages(prev => [
      ...prev,
      { role: "assistant", content: data.reply }
    ]);

    setInput("");
    setLoading(false);
  };

  // ✅ NEW CHAT FUNCTION (must be inside component)
  const newChat = () => {
    const id = uuid();
    localStorage.setItem("sessionId", id);
    setSessionId(id);
    setMessages([]);
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>

      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>AI Support Assistant</h2>
        <button
          onClick={newChat}
          style={{
            padding: "6px 12px",
            background: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          New Chat
        </button>
      </div>

      {/* CHAT BOX */}
      <div style={{ border: "1px solid #ccc", padding: 10, height: 400, overflowY: "auto" }}>
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.role}:</b> {m.content}
          </div>
        ))}
        {loading && <p>Thinking...</p>}
      </div>

      {/* INPUT */}
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter" && !loading) {
            sendMessage();
          }
        }}
        placeholder="Ask Anything..."
        style={{ width: "80%" }}
      />

      <button onClick={sendMessage}
       style={{
            padding: "6px 12px",
            background: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}>Send</button>
    </div>
  );
}

export default App;