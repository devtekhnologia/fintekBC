import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./home.css";
// import './2.png'
const Home = () => {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const countryCode = "+91"; // Fixed to India
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [usernameError, setUsernameError] = useState('');

  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d+$/.test(value) || value === '') {
      if (value.length <= 10) {
        setPhoneNumber(value);
        setPhoneNumberError('');
      } else {
        setPhoneNumberError('Mobile number must be 10 digits');
      }
    } else {
      setPhoneNumberError('Please enter only digits');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    if (value.startsWith(countryCode)) {
      setUsernameError(`Username cannot start with country code ${countryCode}`);
    } else {
      setUsernameError('');
    }
  };

  const handleLogin = () => {
    // Reset previous error messages
    setPasswordError('');
    setPhoneNumberError('');
    setUsernameError('');

    // Validate password
    if (!validatePassword(password)) {
      setPasswordError('Password must contain at least one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long');
      return; // Stop execution if password is invalid
    }

    // Validate phone number
    if (phoneNumber.length !== 10 || !/^\d+$/.test(phoneNumber)) {
      setPhoneNumberError('Mobile number must be 10 digits and contain only digits');
      return; // Stop execution if phone number is invalid
    }

    // Perform login logic
    if (password === "Ckvk@0627") {
      navigate('/user')
    }
  };

  return (
    <div>
      <div className="home_background">
        <Row className="m-0 pt-5 justify-content-center">
          <Col lg={11}>
            {/* <h1>Fintek</h1> */}
            <img src="https://images.app.goo.gl/o5nnsT2edjuJZai89" alt="finteck logo"></img>
          </Col>
        </Row>
        <Row className="mt-5 m-0">
          <Col>
            <section className="mt-5">
              <Container>
                <Row className="justify-content-center">
                  <Col md={6} lg={4}>
                    <div className="login-wrap p-0 pt-5">
                      <h1 className="mb-5 text-center text-black fw-5">Login</h1>
                      <Form
                        onSubmit={handleLogin}
                        className="signin-form container"
                      >
                        <Form.Group className="pb-3">
                          <Form.Control
                            type="tel"
                            placeholder="Username"
                            autoComplete="tel"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            className="transparent-input rounded-pill p-2 ps-2 inputBox "
                            required
                          />
                          {phoneNumberError && <p className="text-danger">{phoneNumberError}</p>}
                        </Form.Group>

                        <Form.Group controlId="formPassword" className="pb-1 text-black">
                          <Form.Control
                            className="rounded-pill transparent-input p-2 ps-2 text-black"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            autoComplete="current-password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                          />
                          {passwordError && <p className="text-danger">{passwordError}</p>}
                        </Form.Group>

                        <Form.Group className="d-md-flex">
                          <div className="w-100 text-md-right d-flex justify-content-center">
                            <a href="#">Forgot Password</a>
                          </div>
                        </Form.Group>

                        <Form.Group className="pb-3 d-flex justify-content-center pt-3  ">
                          <Button
                            type="submit"
                            className="btn btn-primary submit px-3 rounded-pill w-50 p-2"
                          >
                            Sign In
                          </Button>
                        </Form.Group>
                      </Form>
                      <Row className="m-0">
                        <Col>
                          {" "}
                          <p className=" text-center text-black">Don't have an account ? <span className="">Resigter Now</span>  </p>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
