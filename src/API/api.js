export async function fetchEvents() {
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/events`);
  const data = await res.json();
  return data.events;
}
