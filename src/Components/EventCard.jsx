import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Stack
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import { useState } from "react";
import TicketModel from "./TicketModel.jsx";

export default function EventCard({ event }) {
  const [open, setOpen] = useState(false);
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        borderRadius: 3,
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)"
      }}
    >
      {/* Image */}
      {event.imageUrl && (
        <CardMedia
          component="img"
          image={event.imageUrl}
          alt={event.title}
          sx={{
            width: { xs: "100%", sm: 220 },
            height: { xs: 180, sm: "100%" },
            objectFit: "cover"
          }}
        />
      )}

      {/* Content */}
      <Stack sx={{ flex: 1 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {event.title}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <EventIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {event.dateTime}
            </Typography>
          </Stack>

          {event.venue && (
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ mt: 1 }}
            >
              <LocationOnIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {event.venue}
              </Typography>
            </Stack>
          )}

          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <Chip
              label={event.source}
              size="small"
              variant="outlined"
            />
          </Stack>
        </CardContent>

        {/* Actions */}
        <CardActions sx={{ px: 2, pb: 2 }}>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Get Tickets
          </Button>
          <TicketModel
            open={open}
            onClose={() => setOpen(false)}
            event={event}
          />
        </CardActions>
      </Stack>
    </Card>
  );
}
