import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Stack
} from "@mui/material";
import { useState } from "react";

export default function TicketModel({ open, onClose, event }) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  const handleSubmit = async () => {
    if (!email || !consent) return;

    await fetch(`${process.env.REACT_APP_API_BASE_URL}/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        consent,
        eventId: event._id,
        source: event.source
      })
    });

    window.open(event.sourceUrl, "_blank");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Get Tickets</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Email address"
            type="email"
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={consent}
                onChange={e => setConsent(e.target.checked)}
              />
            }
            label="I agree to receive event updates"
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          disabled={!email || !consent}
          onClick={handleSubmit}
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}
