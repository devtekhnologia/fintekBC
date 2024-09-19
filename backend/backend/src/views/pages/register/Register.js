// import React from 'react'
// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCol,
//   CContainer,
//   CForm,
//   CFormInput,
//   CInputGroup,
//   CInputGroupText,
//   CRow,
// } from '@coreui/react'
// import CIcon from '@coreui/icons-react'
// import { cilLockLocked, cilUser } from '@coreui/icons'

// const Register = () => {
//   return (
//     <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
//       <CContainer>
//         <CRow className="justify-content-center">
//           <CCol md={9} lg={7} xl={6}>
//             <CCard className="mx-4">
//               <CCardBody className="p-4">
//                 <CForm>
//                   <h1>Register</h1>
//                   <p className="text-body-secondary">Create your account</p>
//                   <CInputGroup className="mb-3">
//                     <CInputGroupText>
//                       <CIcon icon={cilUser} />
//                     </CInputGroupText>
//                     <CFormInput placeholder="Username" autoComplete="username" />
//                   </CInputGroup>
//                   <CInputGroup className="mb-3">
//                     <CInputGroupText>@</CInputGroupText>
//                     <CFormInput placeholder="Email" autoComplete="email" />
//                   </CInputGroup>
//                   <CInputGroup className="mb-3">
//                     <CInputGroupText>
//                       <CIcon icon={cilLockLocked} />
//                     </CInputGroupText>
//                     <CFormInput
//                       type="password"
//                       placeholder="Password"
//                       autoComplete="new-password"
//                     />
//                   </CInputGroup>
//                   <CInputGroup className="mb-4">
//                     <CInputGroupText>
//                       <CIcon icon={cilLockLocked} />
//                     </CInputGroupText>
//                     <CFormInput
//                       type="password"
//                       placeholder="Repeat password"
//                       autoComplete="new-password"
//                     />
//                   </CInputGroup>
//                   <div className="d-grid">
//                     <CButton color="success">Create Account</CButton>
//                   </div>
//                 </CForm>
//               </CCardBody>
//             </CCard>
//           </CCol>
//         </CRow>
//       </CContainer>
//     </div>
//   )
// }

// export default Register

// import React, { useState } from 'react';
// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCol,
//   CContainer,
//   CForm,
//   CFormInput,
//   CInputGroup,
//   CInputGroupText,
//   CRow,
// } from '@coreui/react';
// import CIcon from '@coreui/icons-react';
// import { cilLockLocked, cilUser } from '@coreui/icons';

// const Register = () => {
//   const [mobile, setMobile] = useState('');
//   const [password, setPassword] = useState('');
//   const [repeatPassword, setRepeatPassword] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [mobileError, setMobileError] = useState('');

//   const handleMobileChange = (e) => {
//     const value = e.target.value;
//     if (/^\d+$/.test(value) || value === '') {
//       setMobile(value);
//       setMobileError('');
//     } else {
//       setMobileError('Please enter only digits');
//     }
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleRepeatPasswordChange = (e) => {
//     setRepeatPassword(e.target.value);
//   };

//   const validatePassword = (password) => {
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     return passwordRegex.test(password);
//   };

//   const handleSubmit = () => {
//     if (mobile.length !== 10) {
//       setMobileError('Mobile number must be 10 digits');
//     } else if (!validatePassword(password)) {
//       setPasswordError('Password must contain at least one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long');
//     } else if (password !== repeatPassword) {
//       setPasswordError('Passwords do not match');
//     } else {
//       // Perform POST request to create account
//       console.log('Mobile:', mobile);
//       console.log('Password:', password);
//       // Reset form fields and errors
//       setMobile('');
//       setPassword('');
//       setRepeatPassword('');
//       setMobileError('');
//       setPasswordError('');
//     }
//   };

//   return (
//     <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
//       <CContainer>
//         <CRow className="justify-content-center">
//           <CCol md={9} lg={7} xl={6}>
//             <CCard className="mx-4">
//               <CCardBody className="p-4">
//                 <CForm>
//                   <h1>Register</h1>
//                   <p className="text-body-secondary">Create your account</p>
//                   <CInputGroup className="mb-3">
//                     <CInputGroupText>
//                       <CIcon icon={cilUser} />
//                     </CInputGroupText>
//                     <CFormInput
//                       placeholder="Mobile Number"
//                       autoComplete="tel"
//                       value={mobile}
//                       onChange={handleMobileChange}
//                     />
//                   </CInputGroup>
//                   {mobileError && (
//                     <div className="text-danger">{mobileError}</div>
//                   )}
//                   <CInputGroup className="mb-3">
//                     <CInputGroupText>
//                       <CIcon icon={cilLockLocked} />
//                     </CInputGroupText>
//                     <CFormInput
//                       type="password"
//                       placeholder="Password"
//                       autoComplete="new-password"
//                       value={password}
//                       onChange={handlePasswordChange}
//                     />
//                   </CInputGroup>
//                   <CInputGroup className="mb-4">
//                     <CInputGroupText>
//                       <CIcon icon={cilLockLocked} />
//                     </CInputGroupText>
//                     <CFormInput
//                       type="password"
//                       placeholder="Repeat password"
//                       autoComplete="new-password"
//                       value={repeatPassword}
//                       onChange={handleRepeatPasswordChange}
//                     />
//                   </CInputGroup>
//                   {passwordError && (
//                     <div className="text-danger">{passwordError}</div>
//                   )}
//                   <div className="d-grid">
//                     <CButton color="success" onClick={handleSubmit}>
//                       Create Account
//                     </CButton>
//                   </div>
//                 </CForm>
//               </CCardBody>
//             </CCard>
//           </CCol>
//         </CRow>
//       </CContainer>
//     </div>
//   );
// };

// export default Register;

























// import React, { useState } from "react";
// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCol,
//   CContainer,
//   CForm,
//   CFormInput,
//   CInputGroup,
//   CInputGroupText,
//   CRow,
// } from "@coreui/react";
// import CIcon from "@coreui/icons-react";
// import { cilLockLocked, cilMobile, cilPhone, cilUser } from "@coreui/icons";
// import { FaMobileAlt } from "react-icons/fa";
// import { FaEye, FaEyeSlash } from "react-icons/fa6";

// const Register = () => {
//   const [name, setName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [password, setPassword] = useState("");
//   const [repeatPassword, setRepeatPassword] = useState("");
//   const [nameError, setNameError] = useState("");
//   const [mobileError, setMobileError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//     setNameError(""); // Clear name error on input change
//   };

//   const handleMobileChange = (e) => {
//     const value = e.target.value;
//     if (/^\d+$/.test(value) || value === "") {
//       setMobile(value);
//       setMobileError("");
//     } else {
//       setMobileError("Please enter only digits");
//     }
//   };
//   const handleNameChange = (e) => {
//     const value = e.target.value;
//     if (!/^\d+$/.test(value)) {
//       setName(value);
//       setNameError('');
//     } else {
//       setNameError('Name cannot contain numbers');
//     }
//   };
  

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//     setPasswordError("");
//   };

//   const handleRepeatPasswordChange = (e) => {
//     setRepeatPassword(e.target.value);
//   };

//   const validatePassword = (password) => {
//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     return passwordRegex.test(password);
//   };

//   const handleSubmit = () => {
//     if (!name) {
//       setNameError("Please enter your name");
//     } else if (mobile.length !== 10) {
//       setMobileError("Mobile number must be 10 digits");
//     } else if (!validatePassword(password)) {
//       setPasswordError(
//         "Password must contain at least one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long"
//       );
//     } else if (password !== repeatPassword) {
//       setPasswordError("Passwords do not match");
//     } else {
//       // Perform registration logic
//       console.log("Name:", name);
//       console.log("Mobile:", mobile);
//       console.log("Password:", password);
//       // Clear form fields after successful registration
//       setName("");
//       setMobile("");
//       setPassword("");
//       setRepeatPassword("");
//       // Optionally, you can also clear error messages here
//       setNameError("");
//       setMobileError("");
//       setPasswordError("");
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
//       <CContainer>
//         <CRow className="justify-content-center">
//           <CCol md={9} lg={7} xl={6}>
//             <CCard className="mx-4">
//               <CCardBody className="p-4">
//                 <CForm>
//                   <h1>Register</h1>
//                   <p className="text-body-secondary">Create your account</p>
//                   <CInputGroup className="mb-3">
//                     <CInputGroupText>
//                       <CIcon icon={cilUser} />
//                     </CInputGroupText>
//                     <CFormInput
//                       placeholder="Name"
//                       autoComplete="name"
//                       value={name}
//                       onChange={handleNameChange}
//                     />
//                   </CInputGroup>
//                   {nameError && <div className="text-danger">{nameError}</div>}
//                   <CInputGroup className="mb-3">
//                     <CInputGroupText>
//                       <CIcon icon={cilMobile} />
//                     </CInputGroupText>
//                     <CInputGroupText>{+91}</CInputGroupText>
//                     <CInputGroupText></CInputGroupText>
//                     <CFormInput
//                       type="text"
//                       placeholder="Name"
//                       autoComplete="name"
//                       value={name}
//                       onChange={handleNameChange}
//                       pattern="[A-Za-z]+"
//                     />
//                   </CInputGroup>
//                   {mobileError && (
//                     <div className="text-danger">{mobileError}</div>
//                   )}
//                   <CInputGroup className="mb-3">
//                     <CInputGroupText>
//                       <CIcon icon={cilLockLocked} />
//                     </CInputGroupText>
//                     <CFormInput
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Password"
//                       autoComplete="new-password"
//                       value={password}
//                       onChange={handlePasswordChange}
//                     />
//                     <CButton
//                       color="secondary"
//                       onClick={togglePasswordVisibility}
//                       className="btn-icon"
//                     >
//                       {showPassword ? <FaEyeSlash /> : <FaEye />}
//                     </CButton>
//                   </CInputGroup>
//                   <CInputGroup className="mb-4">
//                     <CInputGroupText>
//                       <CIcon icon={cilLockLocked} />
//                     </CInputGroupText>
//                     <CFormInput
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Repeat password"
//                       autoComplete="new-password"
//                       value={repeatPassword}
//                       onChange={handleRepeatPasswordChange}
//                     />
//                     <CButton
//                       color="secondary"
//                       onClick={togglePasswordVisibility}
//                       className="btn-icon"
//                     >
//                       {showPassword ? <FaEyeSlash /> : <FaEye />}
//                     </CButton>
//                   </CInputGroup>
//                   {passwordError && (
//                     <div className="text-danger">{passwordError}</div>
//                   )}
//                   <div className="d-grid">
//                     <CButton color="success" onClick={handleSubmit}>
//                       Create Account
//                     </CButton>
//                   </div>
//                 </CForm>
//               </CCardBody>
//             </CCard>
//           </CCol>
//         </CRow>
//       </CContainer>
//     </div>
//   );
// };

// export default Register;
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCardGroup,
//   CCol,
//   CContainer,
//   CForm,
//   CFormInput,
//   CInputGroup,
//   CInputGroupText,
//   CRow,
// } from '@coreui/react';
// import CIcon from '@coreui/icons-react';
// import { cilLockLocked, cilUser } from '@coreui/icons';
// import { FaEye, FaEyeSlash } from 'react-icons/fa6';


// const Login = () => {
//   const navigate = useNavigate();
//   const countryCode = "+91"; // Fixed to India
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [phoneNumberError, setPhoneNumberError] = useState('');
//   const [nameError, setNameError] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handlePhoneNumberChange = (e) => {
//     const value = e.target.value;
//     if (/^\d+$/.test(value) || value === '') {
//       setPhoneNumber(value);
//       setPhoneNumberError('');
//     } else {
//       setPhoneNumberError('Please enter only digits');
//     }
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleNameChange = (e) => {
//     const value = e.target.value;
//     if (!/^\d+$/.test(value)) {
//       setName(value);
//       setNameError('');
//     } else {
//       setNameError('Name cannot contain numbers');
//     }
//   };

//   const validatePassword = (password) => {
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     return passwordRegex.test(password);
//   };

//   const handleLogin = () => {
//     if (!validatePassword(password)) {
//       setPasswordError(
//         'Password must contain at least one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long'
//       );
//     } else if (phoneNumber.length !== 10) {
//       setPhoneNumberError('Mobile number must be 10 digits');
//     } else if (name.trim() === '') {
//       setNameError('Name is required');
//     } else {
//       // Perform login logic
//       setPasswordError('');
//       setPhoneNumberError('');
//       setNameError('');

//       // Simulate successful login for demonstration
//       if (password === "Ckvk@0627") {
//         navigate('/login');
//       }
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Call handleLogin to perform login logic
//     handleLogin();

//     // If you want to submit the form data to a server, you can do it here using fetch or any other method.
//     // Example:
//     // fetch('/api/login', {
//     //   method: 'POST',
//     //   body: JSON.stringify({ name, phoneNumber, password }),
//     //   headers: {
//     //     'Content-Type': 'application/json',
//     //   },
//     // })
//     //   .then(response => {
//     //     // Handle response
//     //   })
//     //   .catch(error => {
//     //     // Handle error
//     //   });
//   };

//   return (
//     <>
//       <div className="bg-body-tertiary vh-100 d-flex flex-row align-items-center">
//         <CContainer>
//           <CRow className="justify-content-center">
//             <CCol md={8}>
//               <CCardGroup>
//                 <CCard className="p-4">
//                   <CCardBody>
//                     <CForm onSubmit={handleSubmit}>
//                       <h1>Login</h1>
//                       <p className="text-body-secondary">Sign In to your account</p>
//                       <CInputGroup className="mb-3">
//                         <CInputGroupText>
//                           <CIcon icon={cilUser} />
//                         </CInputGroupText>
//                         <CInputGroupText>{countryCode}</CInputGroupText>
//                         <CFormInput
//                           type="tel"
//                           placeholder="Phone Number"
//                           autoComplete="tel"
//                           value={phoneNumber}
//                           onChange={handlePhoneNumberChange}
//                           className="inputBox"
//                         />
//                       </CInputGroup>
//                       {phoneNumberError && <div className="text-danger">{phoneNumberError}</div>}
//                       <CInputGroup className="mb-3">
//                         <CFormInput
//                           type={showPassword ? 'text' : 'password'}
//                           placeholder="Password"
//                           autoComplete="current-password"
//                           value={password}
//                           onChange={handlePasswordChange}
//                         />
//                         <CInputGroupText>
//                           <CIcon icon={cilLockLocked} />
//                         </CInputGroupText>
//                         <CButton
//                           color="secondary"
//                           onClick={togglePasswordVisibility}
//                           className="btn-icon"
//                         >
//                           {showPassword ? <FaEyeSlash /> : <FaEye />}
//                         </CButton>
//                       </CInputGroup>
//                       {passwordError && <div className="text-danger">{passwordError}</div>}
//                       <CInputGroup className="mb-3">
//                         <CFormInput
//                           type="text"
//                           placeholder="Name"
//                           autoComplete="name"
//                           value={name}
//                           onChange={handleNameChange}
//                           pattern="[A-Za-z]+"
//                         />
//                       </CInputGroup>
//                       {nameError && <div className="text-danger">{nameError}</div>}
//                       <CRow>
//                         <CCol xs={6}>
//                           <CButton color="primary" className="px-4" type="submit">
//                             Login
//                           </CButton>
//                         </CCol>
//                         <CCol xs={6} className="text-right">
//                           <CButton color="link" className="px-0">
//                             Forgot password?
//                           </CButton>
//                         </CCol>
//                       </CRow>
//                     </CForm>
//                   </CCardBody>
//                 </CCard>
//                 <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
//                   <CCardBody className="text-center">
//                     <div>
//                       <h2>Sign up</h2>
//                       <p>
//                         Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
//                         tempor incididunt ut labore et dolore magna aliqua.
//                       </p>
//                       <Link to="/register">
//                         <CButton color="primary" className="mt-3" active tabIndex={-1}>
//                           Register Now!
//                         </CButton>
//                       </Link>
//                     </div>
//                   </CCardBody>
//                 </CCard>
//               </CCardGroup>
//             </CCol>
//           </CRow>
//         </CContainer>
//       </div>
//     </>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';

const Register = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (value.trim() === '') {
      setNameError('Name is required');
    } else {
      setName(value);
      setNameError('');
    }
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    if (/^\d+$/.test(value) || value === '') {
      setMobile(value);
      setMobileError('');
    } else {
      setMobileError('Please enter only digits');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRepeatPasswordChange = (e) => {
    setRepeatPassword(e.target.value);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = () => {
    if (name.trim() === '') {
      setNameError('Name is required');
    } else if (mobile.length !== 10) {
      setMobileError('Mobile number must be 10 digits');
    } else if (!validatePassword(password)) {
      setPasswordError('Password must contain at least one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long');
    } else if (password !== repeatPassword) {
      setPasswordError('Passwords do not match');
    } else {
      // Perform POST request to create account
      console.log('Name:', name);
      console.log('Mobile:', mobile);
      console.log('Password:', password);
      // Reset form fields and errors
      setName('');
      setMobile('');
      setPassword('');
      setRepeatPassword('');
      setNameError('');
      setMobileError('');
      setPasswordError('');
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Name"
                      autoComplete="name"
                      value={name}
                      onChange={handleNameChange}
                    />
                  </CInputGroup>
                  {nameError && (
                    <div className="text-danger">{nameError}</div>
                  )}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Mobile Number"
                      autoComplete="tel"
                      value={mobile}
                      onChange={handleMobileChange}
                    />
                  </CInputGroup>
                  {mobileError && (
                    <div className="text-danger">{mobileError}</div>
                  )}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Confirm password"
                      autoComplete="new-password"
                      value={repeatPassword}
                      onChange={handleRepeatPasswordChange}
                    />
                  </CInputGroup>
                  {passwordError && (
                    <div className="text-danger">{passwordError}</div>
                  )}
                  <div className="d-grid">
                    <CButton color="success" onClick={handleSubmit}>
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
