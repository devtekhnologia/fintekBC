// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { createPayment, sendAdditionalData } from "../store/paymentSlice";
// import { fetchAllMembers } from "../store/memberSlice1";
// import { fetchSchemeName } from "../store/winnersSlice";
// import axios from "axios";
// import { apiurl } from "../../Api/apiurl";
// import { sendPayPayment } from "../store/apiService";

// const Payment = () => {
//   const dispatch = useDispatch();
//   const members1 = useSelector((state) => state.member?.members1 || []);
//   const schemeNames = useSelector((state) => state.winners?.schemeNames || []);
//   // const payments = useSelector((state) => state.payments?.payments || []);
//   // const error = useSelector((state) => state.payments?.error);
//   const API_BASE_URL = apiurl;

//   const [Name, setName] = useState([]);

//   const bgcolo = {
//     backgroundColor: "#00bcd4", // Background color
//     color: "black", // Text color
//   };

//   const [value, setValue] = useState({
//     mem_name: "",
//     sch_name: "",
//     amount: "",
//     p_date: "",
//     bc_no: "",
//   });
//   console.log(value)
//   const [showModal, setShowModal] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       await dispatch(fetchAllMembers());
//       await dispatch(fetchSchemeName());
//     };
//     fetchData();
//   }, [dispatch]);

//   const handleInput = (e) => {
//     setValue({
//       ...value,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSchemeChange = async (e) => {
//     const schemeName = e.target.value;
//     setValue({
//       ...value,
//       sch_name: schemeName,
//     });

//     // Call the API when the scheme name is selected
//     try {
//       // const response = await axios.post("http://localhost:3002/drowpdown", {
//       //   sch_name: schemeName,
//       // });

//       const response = await axios.post(`${API_BASE_URL}/drowpdown`, {
//         sch_name: schemeName,
//       });
//       setName(response.data.bc_no);
//       console.log("API response for scheme change:", response.data.bc_no);
//     } catch (error) {
//       console.error("Error fetching data for selected scheme:", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log(value);

//       // const response1 = await axios.post("http://localhost:3002/getbcdate", {
//       //   sch_name: value.sch_name,
//       //   bc_no: value.bc_no,
//       // });

//       const response1 = await axios.post(`${API_BASE_URL}/getbcdate`, {
//         sch_name: value.sch_name,
//         bc_no: value.bc_no,
//       });

//       const bcdate_id = response1.data.data;
//       console.log(response1.data.data)

//       const newvalue = {
//         v_date: value.p_date,
//         v_amount: value.amount,
//       };

//       await dispatch(sendAdditionalData(newvalue)).unwrap();

//       const newvalue1 = {
//         sch_name: value.sch_name,
//         mem_name: value.mem_name,
//         amount: value.amount,
//         bcdate_id:bcdate_id,
//       };

//       await dispatch(createPayment(newvalue1)).unwrap();

//       const res=await sendPayPayment({schname:value.sch_name,amount:value.amount,memname:value.mem_name,bcno:value.bc_no})

//       setModalMessage("Payment is done");
//       setShowModal(true);
//       setValue({
//         mem_name: "",
//         sch_name: "",
//         amount: "",
//         p_date: "",
//         bc_no: "",
//       });
//     } catch (error) {
//       setModalMessage("Error creating payment: " + (error.message || error));
//       setShowModal(true);
//     }
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setModalMessage("");
//   };

//   return (
//     <Container fluid className="px-1 mx-auto">
//       <Row className="justify-content-center m-0">
//         <Col xl={7} lg={10} md={9} sm={11} xs={12}>
//           <div className="card">
//             <h1 className="text-center mb-4 Heading_form">
//               <strong>Payment</strong>
//             </h1>
//             <Form onSubmit={handleSubmit}>
//               <Row className="justify-content-between text-left m-0 pb-2">
//                 <Col sm={6} className="flex-column d-flex">
//                   <Form.Group>
//                     <Form.Label>
//                       Name<span className="text-danger"> *</span>
//                     </Form.Label>
//                     <Form.Control
//                       as="select"
//                       name="mem_name"
//                       value={value.mem_name}
//                       onChange={handleInput}
//                       required
//                     >
//                       <option value="">Select Name</option>
//                       {members1.map((name1, index) => (
//                         <option key={index} value={name1}>
//                           {name1}
//                         </option>
//                       ))}
//                     </Form.Control>
//                   </Form.Group>
//                 </Col>

//                 <Col sm={6} className="flex-column d-flex">
//                   <Form.Group>
//                     <Form.Label>
//                       Remark<span className="text-danger"> *</span>
//                     </Form.Label>
//                     <Form.Control
//                       as="select"
//                       name="sch_name"
//                       value={value.sch_name}
//                       onChange={handleSchemeChange}
//                       required
//                     >
//                       <option value="">Select Scheme</option>
//                       {schemeNames.map((scheme, index) => (
//                         <option key={index} value={scheme}>
//                           {scheme}
//                         </option>
//                       ))}
//                     </Form.Control>
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row className="justify-content-between text-left m-0 pb-3 pt-3">
//                 <Col sm={6} lg={4} className="flex-column d-flex">
//                   <Form.Group>
//                     <Form.Label>
//                       Amount<span className="text-danger"> *</span>
//                     </Form.Label>
//                     <Form.Control
//                       type="number"
//                       name="amount"
//                       value={value.amount}
//                       onChange={handleInput}
//                       placeholder="Enter Amount"
//                       required
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col sm={6} lg={4} className="flex-column d-flex pt-1">
//                   <Form.Group>
//                     <Form.Label>
//                       Bc NO<span className="text-danger"> *</span>
//                     </Form.Label>
//                     <Form.Control
//                       as="select"
//                       name="bc_no"
//                       value={value.bc_no}
//                       onChange={handleInput}
//                       required
//                     >
//                       <option value="">Select Bc NO</option>
//                       {Name.map((bc, index) => (
//                         <option key={index} value={bc.bc_no}>
//                           {bc.bc_no}
//                         </option>
//                       ))}
//                     </Form.Control>
//                   </Form.Group>
//                 </Col>

//                 <Col sm={6} lg={4}  className="flex-column d-flex">
//                   <Form.Group>
//                     <Form.Label>
//                       Date<span className="text-danger">*</span>
//                     </Form.Label>
//                     <Form.Control
//                       type="date"
//                       name="p_date"
//                       value={value.p_date}
//                       onChange={handleInput}
//                       required
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row className="justify-content-center m-0 pt-3">
//                 <Col className="d-flex justify-content-center">
//                   <Button type="submit" style={bgcolo} className="btn-block">
//                     SUBMIT
//                   </Button>
//                 </Col>
//               </Row>
//             </Form>
//           </div>
//         </Col>
//       </Row>

//       <Modal className="p-5" show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Message</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p className="text-center fs-5">{modalMessage}</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="primary" onClick={handleCloseModal}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default Payment;


































// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { createPayment, sendAdditionalData } from "../store/paymentSlice";
// import { fetchAllMembers } from "../store/memberSlice1";
// import { fetchSchemeName } from "../store/winnersSlice";
// import { apiurl } from "../../Api/apiurl";
// import { sendPayPayment } from "../store/apiService";

// const Payment = () => {
//   const dispatch = useDispatch();
//   const members1 = useSelector((state) => state.member?.members1 || []);
//   const schemeNames = useSelector((state) => state.winners?.schemeNames || []);


//   const bgcolo = {
//     backgroundColor: "#00bcd4", // Background color
//     color: "black", // Text color
//   };

//   const [value, setValue] = useState({
//     mem_name: "",
//     amount: "",
//     p_date: "",
//     remark: "",
//   });
//   console.log(value);
//   const [showModal, setShowModal] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       await dispatch(fetchAllMembers());
//       await dispatch(fetchSchemeName());
//     };
//     fetchData();
//   }, [dispatch]);

//   const handleInput = (e) => {
//     setValue({
//       ...value,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log(value);


//       const newvalue = {
//         v_date: value.p_date,
//         v_amount: value.amount,
//       };

//       await dispatch(sendAdditionalData(newvalue)).unwrap();

//       const newvalue1 = {
//         mem_name: value.mem_name,
//         amount: value.amount,
//         remark: value.remark,
//       };

//       await dispatch(createPayment(newvalue1)).unwrap();

//       //   const res=await sendPayPayment({schname:value.sch_name,amount:value.amount,memname:value.mem_name,bcno:value.bc_no})

//       setModalMessage("Payment is done");
//       setShowModal(true);
//       setValue({
//         mem_name: "",
//         amount: "",
//         p_date: "",
//       });
//     } catch (error) {
//       setModalMessage("Error creating payment: " + (error.message || error));
//       setShowModal(true);
//     }
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setModalMessage("");
//   };

//   return (
//     <Container fluid className="px-1 mx-auto">
//       <Row className="justify-content-center m-0">
//         <Col xl={7} lg={10} md={9} sm={11} xs={12}>
//           <div className="card">
//             <h1 className="text-center mb-4 Heading_form">
//               <strong>Payment</strong>
//             </h1>
//             <Form onSubmit={handleSubmit}>
//               <Row className="justify-content-between text-left m-0 pb-2">
//                 <Col sm={6} className="flex-column d-flex">
//                   <Form.Group>
//                     <Form.Label className="pb-1">
//                       Name<span className="text-danger"> *</span>
//                     </Form.Label>
//                     <Form.Control
//                       as="select"
//                       name="mem_name"
//                       value={value.mem_name}
//                       onChange={handleInput}
//                       required
//                     >
//                       <option value="">Select Name</option>
//                       {members1.map((name1, index) => (
//                         <option key={index} value={name1}>
//                           {name1}
//                         </option>
//                       ))}
//                     </Form.Control>
//                   </Form.Group>
//                 </Col>
//                 <Col sm={6}>
//                   <Form.Group>
//                     <Form.Label>
//                       Amount<span className="text-danger"> *</span>
//                     </Form.Label>
//                     <Form.Control
//                       type="number"
//                       name="amount"
//                       value={value.amount}
//                       onChange={handleInput}
//                       placeholder="Enter Amount"
//                       required
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <Row className="justify-content-between text-left m-0 pb-3 pt-3">
//                 <Col sm={6} className="flex-column d-flex">
//                   <Form.Group>
//                     <Form.Label>
//                       Date<span className="text-danger">*</span>
//                     </Form.Label>
//                     <Form.Control
//                       type="date"
//                       name="p_date"
//                       value={value.p_date}
//                       onChange={handleInput}
//                       required
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col sm={6} className="flex-column d-flex">
//                   <Form.Group>
//                     <Form.Label>
//                       Remark<span className="text-danger"> *</span>
//                     </Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="remark"
//                       value={value.remark}
//                       onChange={handleInput}
//                       placeholder="Write Remark"
//                       required
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row className="justify-content-center m-0 pt-3">
//                 <Col className="d-flex justify-content-center">
//                   <Button type="submit" style={bgcolo} className="btn-block">
//                     SUBMIT
//                   </Button>
//                 </Col>
//               </Row>
//             </Form>
//           </div>
//         </Col>
//       </Row>

//       <Modal className="p-5" show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Message</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p className="text-center fs-5">{modalMessage}</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="primary" onClick={handleCloseModal}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default Payment;












import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createPayment, sendAdditionalData } from "../store/paymentSlice";
import { fetchAllMembers } from "../store/memberSlice1";
import { fetchSchemeName } from "../store/winnersSlice";
import axios from "axios"; // Ensure axios is imported
import { currentbalance } from "../store/apiService";

const Payment = () => {
  const dispatch = useDispatch();
  const members1 = useSelector((state) => state.member?.members1 || []);

  const bgcolo = {
    backgroundColor: "#00bcd4", // Background color
    color: "black", // Text color
  };

  const [value, setValue] = useState({
    mem_name: "",
    amount: "",
    p_date: "",
    remark: "",
  });
  const [name, setName] = useState([]); // For storing the response from the API
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [totalAmount, setTotalAmount] = useState(0); // Updated state for total amount

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAllMembers());
      await dispatch(fetchSchemeName());
    };
    fetchData();
  }, [dispatch]);

  const handleInput = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleMemberChange = async (e) => {
    const mem_name = e.target.value;
    setValue({
      ...value,
      mem_name: mem_name,
    });

    // Call the API when the member name is selected
    try {
      const response = await currentbalance({
        mem_name: mem_name,
      })
      
      
      // axios.post("http://localhost:3002/reportmember", );

      const data = response.data || [];
      setName(response); 
console.log(data)
      // Calculate the total amount based on fetched data
      const total = data.reduce((sum, item) => sum + item.amount, 0);
      console.log(total)
      setTotalAmount(total);
    } catch (error) {
      console.error("Error fetching data for selected member:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newvalue = {
        v_date: value.p_date,
        v_amount: value.amount,
      };

      await dispatch(sendAdditionalData(newvalue)).unwrap();

      const newvalue1 = {
        mem_name: value.mem_name,
        amount: value.amount,
        remark: value.remark,
      };

      await dispatch(createPayment(newvalue1)).unwrap();

      setModalMessage("Payment is done");
      setShowModal(true);
      setValue({
        mem_name: "",
        amount: "",
        p_date: "",
        remark: "",
      });
    } catch (error) {
      setModalMessage("Error creating payment: " + (error.message || error));
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalMessage("");
  };

  return (
    <Container fluid className="px-1 mx-auto">
      <Row className="justify-content-center m-0">
        <Col xl={7} lg={10} md={9} sm={11} xs={12}>
          <div className="card">
            <h1 className="text-center mb-4 Heading_form">
              <strong>Payment</strong>
            </h1>
            <Form onSubmit={handleSubmit}>
              <Row className="justify-content-between text-left m-0 pb-2">
                <Col sm={6} className="flex-column d-flex">
                  <Form.Group>
                    <Form.Label className="pb-1">
                      Name<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="mem_name"
                      value={value.mem_name}
                      onChange={handleMemberChange} 
                      required
                    >
                      <option value="">Select Name</option>
                      {members1.map((name1, index) => (
                        <option key={index} value={name1}>
                          {name1}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>

                <Col sm={6}>
                  <Form.Group>
                    <Form.Label>
                      Current Amount<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="totalamount"
                      value={totalAmount} // Set from the calculated total
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="justify-content-between text-left m-0 pb-3 pt-1">
                <Col sm={6}>
                  <Form.Group>
                    <Form.Label>
                      Amount<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="amount"
                      value={value.amount}
                      onChange={handleInput}
                      placeholder="Enter Amount"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col sm={6} className="flex-column d-flex">
                  <Form.Group>
                    <Form.Label>
                      Date<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="p_date"
                      value={value.p_date}
                      onChange={handleInput}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="justify-content-between text-left m-0 pb-3 pt-1">
                <Col sm={6} lg={12} className="flex-column d-flex">
                  <Form.Group>
                    <Form.Label>
                      Remark<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="remark"
                      value={value.remark}
                      onChange={handleInput}
                      placeholder="Write Remark"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="justify-content-center m-0 pt-3">
                <Col className="d-flex justify-content-center">
                  <Button type="submit" style={bgcolo} className="btn-block">
                    SUBMIT
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>

      <Modal className="p-5" show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center fs-5">{modalMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Payment;




























