import { CssBaseline, Typography } from "@mui/material";
import { useState } from "react";
import EventList from "./Components/EventList.jsx";
import Dashboard from "./Components/Dashboard.jsx";
import LoginBar from "./Components/LoginBar.jsx";

export default function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  return (
    <>
      <CssBaseline />

      {token ? (
        <Dashboard />
      ) : (
        <>
          <Typography
            variant="h4"
            align="center"
            sx={{ mt: 4, mb: 2, fontWeight: 600 }}
          >
            Sydney Events
          </Typography>

          {/* 🔥 LOGIN BUTTON IS HERE */}
          <LoginBar
            onLogin={googleToken => {
              fetch(process.env.REACT_APP_API_BASE_URL + '/auth/google', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: googleToken })
              })
                .then(res => res.json())
                .then(data => {
                  localStorage.setItem("token", data.token);
                  setToken(data.token);
                });
            }}
          />

          <EventList />
        </>
      )}
    </>
  );
}
