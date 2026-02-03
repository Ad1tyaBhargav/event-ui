import { Stack } from "@mui/material";
import GoogleLoginButton from "./GoogleLoginButton";

export default function LoginBar({ onLogin }) {
  return (
    <Stack alignItems="center" sx={{ mb: 3 }}>
      <GoogleLoginButton onSuccess={onLogin} />
    </Stack>
  );
}