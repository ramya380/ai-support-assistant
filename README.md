AI Support Assistant (Full Stack Project)

A full-stack AI-powered customer support assistant built using React, Node.js, Express, and SQLite.
The assistant answers user questions based only on provided product documentation and maintains session-wise conversation history.

Features

Chat interface built with React

Document-based answering (no hallucinations)

Session-wise chat memory using SQLite

New Chat session support

Strict fallback response for unknown queries

Fully deployed backend and frontend

Tech Stack

Frontend

React.js

Fetch API

UUID for session handling

Backend

Node.js

Express.js

SQLite

Deployment

Backend: Render

Frontend: Vercel

Project Structure

ai-support-assistant/
├── frontend/ (React UI)
├── backend/ (Node API + SQLite)
└── README.md

Setup Instructions
Clone Repository

git clone https://github.com/ramya380/ai-support-assistant.git

cd ai-support-assistant

Backend Setup

cd backend
npm install
node server.js

Backend runs on:
http://localhost:5000

Frontend Setup

cd frontend
npm install
npm start

Frontend runs on:
http://localhost:3000

Database Schema
sessions table

id (TEXT)
created_at (DATETIME)
updated_at (DATETIME)

messages table

id (INTEGER, primary key)
session_id (TEXT)
role (TEXT)
content (TEXT)
created_at (DATETIME)

AI Logic Rules

Responses are generated only from docs.json

If the answer is not found in documentation, the system responds with:
Sorry, I don’t have information about that.

Last 5 message pairs are used as context

Chat history is stored in SQLite

Live Demo

Backend: https://ai-support-assistant-1-ucu5.onrender.com

Frontend: Add your Vercel link here

Author

Ramya Thogiti
GitHub: https://github.com/ramya380

LinkedIn: https://linkedin.com/in/thogiti-ramya-a75373210/
