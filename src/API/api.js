const API_BASE = process.env.REACT_APP_API_BASE_URL;

export async function fetchEvents() {
  const res = await fetch(`${API_BASE}/events`);
  const data = await res.json();
  return data.events;
}
