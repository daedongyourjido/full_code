import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export default function LoginPageButton(props) {
  const navigate = useNavigate();

  return (
    <Button
      data-cy="login-btn"
      variant="outlined"
      sx={{
        borderColor: props.font,
        color: props.font,
        height: 40,
      }}
      onClick={() => {
        navigate("/login");
      }}
    >
      Sign In
    </Button>
  );
}
