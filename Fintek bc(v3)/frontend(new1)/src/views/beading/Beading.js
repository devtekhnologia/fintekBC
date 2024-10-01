import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import "./beading.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  checkMember,
  getDataId,
  updatebcstatus,
} from "../store/apiService";
import {
  fetchTotalAmountScheme,
  fetchMemberData,
  createBidding,
  fetchBidding,
  fetchWinner,
  addentryvoucher,
  createTransaction1,
  createTransaction2,
  createTransaction3,
  createTransaction4,
  createTransaction5,
  createTransaction8,
} from "../store/bSlice";
import { useDispatch, useSelector } from "react-redux";

const Beading = () => {
  const dispatch = useDispatch();
  const { schemeId } = useParams();
  const navigate = useNavigate();
  const [showWinner, setShowWinner] = useState(false);
  const [popup, setPopup] = useState(true);
  const [currentMonth, setCurrentMonth] = useState("");

  const [value, setValue] = useState({
    bid_name: "",
    bid_amount: "",
    bid_month: "",
    bid_sch_id: schemeId,
  });

  const bgcolo = {
    backgroundColor: "#00bcd4", // Background color
    color: "black", // Text color
  };

  useEffect(() => {
    const today = new Date();
    const month = today.toISOString().substring(0, 7);
    setCurrentMonth(month);
    setValue((prevValue) => ({
      ...prevValue,
      bid_month: month,
    }));

    const checkMemberStatus = async () => {
      try {
          const res = await checkMember({ sch_id: schemeId });
          setPopup(res.data.status);
      } catch (err) {
        console.log(err);
      }
    };

    checkMemberStatus();
  }, [schemeId, setShowWinner]);

  const { total, memberData, memberBiddingName } = useSelector(
    (state) => state.bSlice
  );

  const handleInput = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(fetchTotalAmountScheme({ sch_id: schemeId }));
    dispatch(fetchBidding({ sch_id: schemeId }));
  }, [schemeId, dispatch]);

  useEffect(() => {
    if (Object.keys(value).length !== 0) {
      dispatch(fetchMemberData({ bid_sch_id: schemeId }));
    }
  }, [dispatch, schemeId, value]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createBidding(value));
      setValue({
        bid_name: "",
        bid_amount: "",
        bid_month: currentMonth,
        bid_sch_id: schemeId,
      });
    } catch (error) {
      console.error("Error adding bid: ", error);
    }
  };

  const handleWinner = async () => {
    try {
      const response = await getDataId({ bid_sch_id: schemeId });
      const bcdateId = response.data.data.bid_bcdate_id;
      const today = new Date();
      const formattedDate = today.toISOString().split("T")[0];

      await dispatch(
        addentryvoucher({ v_amount: total, v_date: formattedDate })
      );
      await dispatch(
        createTransaction1({ bid_sch_id: schemeId, bid_bcdate_id: bcdateId })
      );
      await dispatch(
        createTransaction2({ bid_sch_id: schemeId, bid_bcdate_id: bcdateId })
      );
      await dispatch(
        addentryvoucher({ v_amount: total, v_date: formattedDate })
      );
      await dispatch(
        createTransaction8({ bid_sch_id: schemeId, bid_bcdate_id: bcdateId })
      );
      await dispatch(
        createTransaction3({ bid_sch_id: schemeId, bid_bcdate_id: bcdateId })
      );
      await dispatch(
        createTransaction4({ bid_sch_id: schemeId, bid_bcdate_id: bcdateId })
      );
      await dispatch(
        createTransaction5({ bid_sch_id: schemeId, bid_bcdate_id: bcdateId })
      );
      await dispatch(
        fetchWinner({ bid_sch_id: schemeId, bid_bcdate_id: bcdateId })
      );
      await updatebcstatus({ sch_id: schemeId, bid_bcdate_id: bcdateId });

      navigate(`/agency/winnerdata/${schemeId}/${bcdateId}`);
    } catch (error) {
      console.error("Error fetching winner", error);
    }
  };

  const handleNavigate = () => {
    navigate(`/agency/update/${schemeId}`);
  };

  const handelepop = () => {
    navigate(`/agency/createm1/${schemeId}`);
  };

  //   return (
  //     <div>
  //       {bedding === false ? (
  //         <p className="text-center fs-3 fw-bold">
  //           {" "}
  //           First Bidding is not Done....
  //         </p>
  //       ) : (
  //         <Container fluid className="px-1 mx-auto">
  //           <p className="text-center fs-3 fw-bold">Bidding is Done....</p>
  //           <div className="container">
  //             <div className="py-4">
  //               <div className="table-responsive">
  //                 <table className="table border shadow">
  //                   <thead>
  //                     <tr className="text-center p-2">
  //                       <th scope="col">SR.NO</th>
  //                       <th scope="col">Name</th>
  //                       <th scope="col">Mobile</th>
  //                       {/* <th scope="col">Date</th> */}
  //                       <th scope="col">pay_amount</th>
  //                       <th scope="col">winner_amount</th>
  //                       <th scope="col">amount_to_get</th>
  //                       <th scope="col">ag_commission</th>
  //                       <th scope="col">Total</th>
  //                     </tr>
  //                   </thead>
  //                   <tbody>
  //                     {checkWiner.map((item, index) => (
  //                       <tr className="text-center" key={index}>
  //                         <td>{index + 1}</td>
  //                         <td>{item.mem_name}</td>
  //                         <td>{item.mem_mobile}</td>
  //                         {/* <td>{item.v_date}</td> */}
  //                         <td>{item.pay_amount}</td>
  //                         <td>{item.winner_amount}</td>
  //                         <td>{item.amount_to_get}</td>
  //                         <td>{item.ag_commission}</td>
  //                         <td>{item.total}</td>
  //                       </tr>
  //                     ))}
  //                   </tbody>
  //                 </table>
  //               </div>
  //             </div>
  //           </div>
  //         </Container>
  //       )}
  //     </div>
  //   );
  // }

  // const getCurrentMonth = () => {
  //   const date = new Date();
  //   const year = date.getFullYear();
  //   const month = (`0${date.getMonth() + 1}`).slice(-2); // Add leading zero if necessary
  //   return `${year}-${month}`;
  // };

  return (
    <Container fluid className="px-1 mx-auto">
      <Row className="justify-content-center m-0">
        <Col xl={7} lg={8} md={9} sm={11} xs={12}>
          <div className="card">
            {showWinner ? (
              <></>
            ) : (
              <Form onSubmit={handleSubmit}>
                <Row className="justify-content-between text-left m-0 pb-2">
                  <Row>
                    <Col>
                      <div>
                        <h1 className="text-center Heading_form">
                          <strong>Start Bidding</strong>
                        </h1>
                        <h5 className="text-center mb-4">
                          <strong>Total Amount: {total}</strong>
                        </h5>
                      </div>
                    </Col>
                  </Row>
                  <Col sm={6} className="flex-column d-flex">
                    <Form.Group>
                      <Form.Label>
                        Name<span className="text-danger"> *</span>
                      </Form.Label>
                      <Form.Control
                        as="select"
                        name="bid_name"
                        value={value.bid_name}
                        onChange={handleInput}
                        required
                      >
                        <option value="">Select Name</option>
                        {memberBiddingName.map((name1, index) => (
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
                        Amount<span className="text-danger"> *</span>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="bid_amount"
                        value={value.bid_amount}
                        onChange={handleInput}
                        placeholder="Enter Amount"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="justify-content-between text-left m-0 pb-2">
                  <Col sm={6} className="flex-column d-flex">
                    <Form.Group>
                      <Form.Label>
                        Month<span className="text-danger"> *</span>
                      </Form.Label>
                      <Form.Control
                        type="month"
                        name="bid_month"
                        value={value.bid_month}
                        onChange={handleInput}
                        // min={getCurrentMonth()}
                        required
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="justify-content-center m-0 pt-2">
                  <Col className="d-flex justify-content-center">
                    <Button
                      type="submit"
                      style={bgcolo}
                      className="btn-block h-100 "
                    >
                      ADD Bidding
                    </Button>
                    <div className="ps-3">
                      <Button
                        style={bgcolo}
                        className="btn-block h-100"
                        onClick={handleNavigate}
                      >
                        CHANGE AMOUNT
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            )}
          </div>
        </Col>
      </Row>
      {!showWinner && (
        <Row className="justify-content-center m-0 pt-2">
          <Col className="d-flex justify-content-center">
            <Button
              variant="success"
              onClick={handleWinner}
              disabled={memberData.length === 0}
            >
              Winner
            </Button>
          </Col>
        </Row>
      )}
      {!showWinner ? (
        <div className="py-4 container">
          <div className="table-responsive">
            <table className="table border shadow">
              <thead>
                <tr className="text-center p-2">
                  <th scope="col">SR.NO</th>
                  <th scope="col">Name</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                {memberData.map((user, index) => (
                  <tr className="text-center" key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.mem_name}</td>
                    <td>{user.bid_amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <></>
      )}
      <Modal show={!popup}>
        <div className="pt-3">
          <p className="fs-3 text-center ">Attention</p>
        </div>
        <div className="fs-5 text-center">Please add member to the scheme.</div>
        <div className="pt-2 pb-3 d-flex justify-content-center">
          <Button style={bgcolo} onClick={handelepop}>
            Add Member
          </Button>
        </div>
      </Modal>
    </Container>
  );
};

export default Beading;
