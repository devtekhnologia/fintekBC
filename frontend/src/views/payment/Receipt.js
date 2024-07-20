import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createPayment1, sendAdditionalData } from "../store/paymentSlice";
import { fetchAllMembers } from "../store/memberSlice1";
import { fetchSchemeName } from "../store/winnersSlice";
import axios from "axios";
import { apiurl } from "../../Api/apiurl";


const Receipt = () => {
  const dispatch = useDispatch();
  const members1 = useSelector((state) => state.member?.members1 || []);
  const schemeNames = useSelector((state) => state.winners?.schemeNames || []);
  // const payments = useSelector((state) => state.payments?.payments || []);
  // const error = useSelector((state) => state.payments?.error);
  const API_BASE_URL = apiurl;
  const [Name, setName] = useState([]);

  const bgcolo = {
    backgroundColor: "#00bcd4", // Background color
    color: "black", // Text color
  };

  const [value, setValue] = useState({
    mem_name: "",
    sch_name: "",
    amount: "",
    p_date: "",
    bc_no: "",
  });
  console.log(value)
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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

  const handleSchemeChange = async (e) => {
    const schemeName = e.target.value;
    setValue({
      ...value,
      sch_name: schemeName,
    });


    try {
      // const response = await axios.post("http://65.0.85.112:3004/drowpdown", {
      //   sch_name: schemeName,
      // });
      const response = await axios.post(`${API_BASE_URL}/drowpdown`, {
        sch_name: schemeName,
      });
      setName(response.data.bc_no);
      console.log("API response for scheme change:", response.data.bc_no);
    } catch (error) {
      console.error("Error fetching data for selected scheme:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(value);

      // const response1 = await axios.post("http://65.0.85.112:3004/getbcdate", {
      //   sch_name: value.sch_name,
      //   bc_no: value.bc_no,
      // });

      const response1 = await axios.post(`${API_BASE_URL}/getbcdate`, {
        sch_name: value.sch_name,
        bc_no: value.bc_no,
      });

      const bcdate_id = response1.data.data;
      console.log(response1.data.data)

      const newvalue = {
        v_date: value.p_date,
        v_amount: value.amount,
      };


      await dispatch(sendAdditionalData(newvalue)).unwrap();

      const newvalue1 = {
        sch_name: value.sch_name,
        mem_name: value.mem_name,
        amount: value.amount,
        bcdate_id:bcdate_id,
      };

      await dispatch(createPayment1(newvalue1)).unwrap();
      setModalMessage("Payment is done");
      setShowModal(true);
      setValue({
        mem_name: "",
        sch_name: "",
        amount: "",
        p_date: "",
        bc_no: "",
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
              <strong>Receipt</strong>
            </h1>
            <Form onSubmit={handleSubmit}>
              <Row className="justify-content-between text-left m-0 pb-2">
                <Col sm={6} className="flex-column d-flex">
                  <Form.Group>
                    <Form.Label>
                      Name<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="mem_name"
                      value={value.mem_name}
                      onChange={handleInput}
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

                <Col sm={6} className="flex-column d-flex">
                  <Form.Group>
                    <Form.Label>
                      Remark<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="sch_name"
                      value={value.sch_name}
                      onChange={handleSchemeChange}
                      required
                    >
                      <option value="">Select Scheme</option>
                      {schemeNames.map((scheme, index) => (
                        <option key={index} value={scheme}>
                          {scheme}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="justify-content-between text-left m-0 pb-3 pt-3">
                <Col sm={6} lg={4} className="flex-column d-flex">
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
                <Col sm={6} lg={4} className="flex-column d-flex pt-1">
                  <Form.Group>
                    <Form.Label>
                      Bc NO<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="bc_no"
                      value={value.bc_no}
                      onChange={handleInput}
                      required
                    >
                      <option value="">Select Bc NO</option>
                      {Name.map((bc, index) => (
                        <option key={index} value={bc.bc_no}>
                          {bc.bc_no}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>

                <Col sm={6} lg={4}  className="flex-column d-flex">
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

export default Receipt;
