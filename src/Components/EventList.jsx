import { useEffect, useState } from "react";
import { fetchEvents } from "../API/api.js";
import EventCard from "./EventCard.jsx";
import { Container, Stack } from "@mui/material";

export default function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      <Stack spacing={3}>
        {events.map(event => (
          <EventCard key={event._id} event={event} />
        ))}
      </Stack>
    </Container>
  );
}
