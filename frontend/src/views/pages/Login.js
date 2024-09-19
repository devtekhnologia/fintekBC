import React, { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import {jwtDecode} from "jwt-decode";
import { Container, Row, Col, Form, Button, Alert, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import "./login.css";
import { apiurl } from "../../Api/apiurl";
import { Link } from "react-router-dom";

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const API_BASE_URL = apiurl;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: email,
        password: password,
      });

      if (response.data.status) {
        setMessage(response.data.message);
      }

      console.log(response.data.status);
      if (response.data.status === true) {
        const token = response.data.token;
        const decodedToken = jwtDecode(token);
        const userName = decodedToken.userName;
        console.log(userName);
        localStorage.setItem("userName", userName);
        localStorage.setItem("token", token);

      } else {
        setMessage("Please enter correct details"); // Display message for wrong credentials
      }
    } catch (error) {
      console.error("An error occurred during login:", error.message);
    }
  };

  return (
    <div className="bg-light vh-100 d-flex align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col lg={6} md={8} xs={12}>
            <div className="p-4 bg-white border rounded">
              <h1 className="mb-4">Login</h1>
              <p className="text-muted">Sign In to your account</p>
              {message && <Alert variant="danger">{message}</Alert>}
              <Form>
                <InputGroup className="mb-3">
                  <InputGroup.Text>
                    <i className="bi bi-person"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    value={email}
                    onChange={handleEmailChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>
                    <i className="bi bi-lock"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    autoComplete="current-password"
                    value={password}
                    onChange={handlePasswordChange}
                    isInvalid={!!errors.password}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={togglePasswordVisibility}
                    className="position-absolute end-0"
                    style={{ zIndex: 1 }}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </InputGroup>
                <Row className="mb-3">
                  <Col xs={6}>
                    <Button
                      variant="primary"
                      className="w-100"
                      onClick={handleLogin}
                    >
                      Login
                    </Button>
                  </Col>
                  <Col xs={6} className="text-end">
                    <a as={Link} to="https://react-bootstrap.netlify.app/docs/getting-started/introduction">Forgot password?</a>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
