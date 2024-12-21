import { Container, Typography, TextField, Button, Box } from '@mui/material';
import '../../styles/Contact.css'
const Contact = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h3" gutterBottom>
          Contact Us
        </Typography>
        <form>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            required
            type="email"
          />
          <TextField
            fullWidth
            label="Message"
            margin="normal"
            required
            multiline
            rows={4}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
          >
            Send Message
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Contact;
