import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Button, Typography, Container } from "@mui/material";

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "50vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

export const Error404 = () => {
  return (
    <Container>
      <ContentStyle sx={{ textAlign: "center", alignItems: "center" }}>
        <Typography variant="h3" paragraph>
          Sorry, page not found!
        </Typography>

        <Typography sx={{ color: "text.secondary" }}>
          We couldn’t find the page you’re looking for :(
        </Typography>
        <br />
        <Button
          to="/"
          sx={{
            bgcolor: "orange",
            ":hover": {
              bgcolor: "orange",
              color: "white",
            },
          }}
          size="large"
          variant="contained"
          component={RouterLink}
        >
          Go Back Home
        </Button>
      </ContentStyle>
    </Container>
  );
};
