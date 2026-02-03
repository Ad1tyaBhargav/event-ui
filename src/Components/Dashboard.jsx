import {
  Container,
  TextField,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Stack,
  Chip,
  Drawer,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filters, setFilters] = useState({
    keyword: "",
    status: ""
  });

  const token = localStorage.getItem("token");

  const fetchEvents = async () => {
    const params = new URLSearchParams(filters).toString();
    const res = await fetch(
      `http://localhost:5000/api/events?${params}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    const data = await res.json();
    setEvents(data.events);
  };

  useEffect(() => {
    fetchEvents();
  }, [filters]);

  const importEvent = async id => {
    await fetch(
      `http://localhost:5000/api/events/${id}/import`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ notes: "Imported via dashboard" })
      }
    );
    fetchEvents();
    setSelected(null);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Event Dashboard
      </Typography>

      <Button
        variant="outlined"
        color="error"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
      >
        Logout
      </Button>

      {/* Filters */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <TextField
          label="Search"
          value={filters.keyword}
          onChange={e =>
            setFilters({ ...filters, keyword: e.target.value })
          }
        />

        <TextField
          select
          label="Status"
          value={filters.status}
          onChange={e =>
            setFilters({ ...filters, status: e.target.value })
          }
          sx={{ width: 160 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="new">New</MenuItem>
          <MenuItem value="updated">Updated</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
          <MenuItem value="imported">Imported</MenuItem>
        </TextField>
      </Stack>

      {/* Table */}
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Status</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {events.map(event => (
              <TableRow
                key={event._id}
                hover
                onClick={() => setSelected(event)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell>{event.title}</TableCell>
                <TableCell>{event.dateTime}</TableCell>
                <TableCell>{event.source}</TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    label={event.status}
                    color={
                      event.status === "new"
                        ? "success"
                        : event.status === "updated"
                          ? "warning"
                          : event.status === "inactive"
                            ? "default"
                            : "primary"
                    }
                  />
                </TableCell>
                <TableCell>
                  {event.status !== "imported" && (
                    <Button
                      size="small"
                      onClick={e => {
                        e.stopPropagation();
                        importEvent(event._id);
                      }}
                    >
                      Import
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Preview Panel */}
      <Drawer
        anchor="right"
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
      >
        {selected && (
          <Stack spacing={2} sx={{ p: 3, width: 320 }}>
            <Typography variant="h6">
              {selected.title}
            </Typography>
            <Typography>{selected.dateTime}</Typography>
            <Typography>{selected.venue}</Typography>
            <Typography variant="caption">
              Source: {selected.source}
            </Typography>

            {selected.status !== "imported" && (
              <Button
                variant="contained"
                onClick={() => importEvent(selected._id)}
              >
                Import Event
              </Button>
            )}
          </Stack>
        )}
      </Drawer>
    </Container>
  );
}
