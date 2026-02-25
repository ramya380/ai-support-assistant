export function getSessionId() {
  let id = localStorage.getItem("sessionId");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("sessionId", id);
  }
  return id;
}

export function newSession() {
  const id = crypto.randomUUID();
  localStorage.setItem("sessionId", id);
  return id;
}