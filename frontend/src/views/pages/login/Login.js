import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests
import { jwtDecode } from "jwt-decode";

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormFeedback,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./login.css";
import { apiurl } from "../../../Api/apiurl";
const Login = () => {
  const navigate = useNavigate();
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
      // const response = await axios.post("http://13.233.79.22:3003/login", {
      //   email: email,
      //   password: password,
      // });

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
        navigate("/agency");
      } else {
        setMessage("Please enter correct details"); // Display message for wrong credentials
      }
    } catch (error) {
      console.error("An error occurred during login:", error.message);
    }
  };

  return (
    <>
      <div className="bg-body-tertiary vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol lg={6} md={8} xs={12}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Login</h1>
                      <p className="text-medium-emphasis">
                        Sign In to your account
                      </p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          type="email"
                          placeholder="Email"
                          autoComplete="email"
                          value={email}
                          onChange={handleEmailChange}
                          invalid={!!errors.email}
                        />
                        <CFormFeedback invalid>{errors.email}</CFormFeedback>
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          autoComplete="current-password"
                          value={password}
                          onChange={handlePasswordChange}
                          invalid={!!errors.password}
                        />
                        <CButton
                          color="secondary"
                          onClick={togglePasswordVisibility}
                          className="btn-icon"
                        >
                          {showPassword ? <FaEye /> : <FaEyeSlash />} 
                        </CButton>
                        <CFormFeedback invalid>{errors.password}</CFormFeedback>
                      </CInputGroup>
                      <CRow>
                        <CFormFeedback className="pt-2" invalid>
                          {message}{" "}
                          {/* Display message for wrong credentials */}
                        </CFormFeedback>
                        <CCol xs={6}>
                          <CButton
                            color="primary"
                            className="px-4"
                            onClick={handleLogin}
                          >
                            Login
                          </CButton>
                        </CCol>
                        <CCol xs={6} className="text-right">
                          <CButton color="link" as={Link} to={'/forgotemail'} className="px-0">
                            Forgot password?
                          </CButton>
                          {/* <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton> */}
                        </CCol>
                      </CRow>

                      <div>
                        <span className="text-center text-red">{message}</span>
                      </div>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  );
};

export default Login;
