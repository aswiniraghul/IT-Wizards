import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

const ContactUs = () => {
  const form = useRef();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_xrolzrh', 'template_woputc8', form.current, {
        publicKey: '-UGhv6vIVJOdfvSRq',
      })
      .then(
        () => {
          setMessage('Message Sent!');
          setError(null);
          form.current.reset();
        },
        (error) => {
          setMessage(null);
          setError('Failed to send message. Please try again later.');
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h2 className="mb-4 text-center fw-bold">Contact Us</h2>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form ref={form} onSubmit={sendEmail}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="from_name" placeholder="Enter your name" required />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="from_email" placeholder="Enter your email" required />
            </Form.Group>

            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" name="message" rows={4} placeholder="Enter your message" required />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Send Message
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
