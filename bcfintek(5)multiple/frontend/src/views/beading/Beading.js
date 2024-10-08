// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
// import "./beading.css";
// import { useNavigate, useParams } from "react-router-dom";
// import { checkMember, getDataId, updatebcstatus } from "../store/apiService";
// import {
//   fetchTotalAmountScheme,
//   fetchMemberData,
//   createBidding,
//   fetchBidding,
//   fetchWinner,
//   addentryvoucher,
//   createTransaction1,
//   createTransaction2,
//   createTransaction3,
//   createTransaction4,
//   createTransaction5,
//   createTransaction8,
// } from "../store/bSlice";
// import { bcstatus } from "../store/apiService";
// import { useDispatch, useSelector } from "react-redux";

// const Beading = () => {
//   const dispatch = useDispatch();
//   const { schemeId } = useParams();
//   const navigate = useNavigate();
//   const [showWinner, setShowWinner] = useState(false);
//   const [popup, setPopup] = useState(true);
//   const [currentMonth, setCurrentMonth] = useState("");
//   const [statusbc, setStatusbc] = useState(0);

//   const [value, setValue] = useState({
//     bid_name: "",
//     bid_amount: "",
//     bid_month: "",
//     bid_sch_id: schemeId,
//   });

//   const bgcolo = {
//     backgroundColor: "#00bcd4", // Background color
//     color: "black", // Text color
//   };

//   useEffect(() => {
//     const today = new Date();
//     const month = today.toISOString().substring(0, 7);
//     setCurrentMonth(month);
//     setValue((prevValue) => ({
//       ...prevValue,
//       bid_month: month,
//     }));
//     const checkMemberStatus = async () => {
//       try {
//         const res = await checkMember({ sch_id: schemeId });
//         setPopup(res.data.status);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     checkMemberStatus();
//   }, [schemeId, setShowWinner]);

//   useEffect(() => {
//     const checkMemberStatus1 = async () => {
//       try {
//         const res = await bcstatus({ sch_id: schemeId });

//         setStatusbc(res.allTrue);
//         console.log(statusbc);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     checkMemberStatus1();
//   }, []);

//   const { total, memberData, memberBiddingName } = useSelector(
//     (state) => state.bSlice
//   );

//   const handleInput = (e) => {
//     setValue({
//       ...value,
//       [e.target.name]: e.target.value,
//     });
//   };

//   useEffect(() => {
//     dispatch(fetchTotalAmountScheme({ sch_id: schemeId }));
//     dispatch(fetchBidding({ sch_id: schemeId }));
//   }, [schemeId, dispatch]);

//   useEffect(() => {
//     if (Object.keys(value).length !== 0) {
//       dispatch(fetchMemberData({ bid_sch_id: schemeId }));
//     }
//   }, [dispatch, schemeId, value]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await dispatch(createBidding(value));
//       setValue({
//         bid_name: "",
//         bid_amount: "",
//         bid_month: currentMonth,
//         bid_sch_id: schemeId,
//       });
//     } catch (error) {
//       console.error("Error adding bid: ", error);
//     }
//   };

//   const handleWinner = async () => {
//     try {
//       const response = await getDataId({ bid_sch_id: schemeId });
//       const bcdateId = response.data.data.bid_bcdate_id;
//       const today = new Date();
//       const formattedDate = today.toISOString().split("T")[0];

//       await dispatch(
//         addentryvoucher({ v_amount: total, v_date: formattedDate })
//       );
//       await dispatch(
//         createTransaction1({ bid_sch_id: schemeId, bid_bcdate_id: bcdateId })
//       );
//       await dispatch(
//         createTransaction2({ bid_sch_id: schemeId, bid_bcdate_id: bcdateId })
//       );
//       await dispatch(
//         addentryvoucher({ v_amount: total, v_date: formattedDate })
//       );
//       await dispatch(
//         createTransaction8({ bid_sch_id: schemeId, bid_bcdate_id: bcdateId })
//       );
//       await dispatch(
//         createTransaction3({ bid_sch_id: schemeId, bid_bcdate_id: bcdateId })
//       );
//       await dispatch(
//         createTransaction4({ bid_sch_id: schemeId, bid_bcdate_id: bcdateId })
//       );
//       await dispatch(
//         createTransaction5({ bid_sch_id: schemeId, bid_bcdate_id: bcdateId })
//       );
//       await dispatch(
//         fetchWinner({ bid_sch_id: schemeId, bid_bcdate_id: bcdateId })
//       );
//       await updatebcstatus({ sch_id: schemeId, bid_bcdate_id: bcdateId });

//       navigate(`/agency/winnerdata/${schemeId}/${bcdateId}`);
//     } catch (error) {
//       console.error("Error fetching winner", error);
//     }
//   };

//   const handleNavigate = () => {
//     navigate(`/agency/update/${schemeId}`);
//   };

//   const handelepop = () => {
//     navigate(`/agency/createm1/${schemeId}`);
//   };

//   if (statusbc == 1) {
//     return (
//       <div className="text-center fs-3 fw-bold">
//         "All scheme BCs completed."{" "}
//       </div>
//     );
//   }

//   return (
//     <Container fluid className="px-1 mx-auto">
//       <Row className="justify-content-center m-0">
//         <Col xl={7} lg={8} md={9} sm={11} xs={12}>
//           <div className="card">
//             {showWinner ? (
//               <></>
//             ) : (
//               <Form onSubmit={handleSubmit}>
//                 <Row className="justify-content-between text-left m-0 pb-2">
//                   <Row>
//                     <Col>
//                       <div>
//                         <h1 className="text-center Heading_form">
//                           <strong>Start Bidding</strong>
//                         </h1>
//                         <h5 className="text-center mb-4">
//                           <strong>Total Amount: {total}</strong>
//                         </h5>
//                       </div>
//                     </Col>
//                   </Row>
//                   <Col sm={6} className="flex-column d-flex">
//                     <Form.Group>
//                       <Form.Label>
//                         Name<span className="text-danger"> *</span>
//                       </Form.Label>
//                       <Form.Control
//                         as="select"
//                         name="bid_name"
//                         value={value.bid_name}
//                         onChange={handleInput}
//                         required
//                       >
//                         <option value="">Select Name</option>
//                         {memberBiddingName.map((name1, index) => (
//                           <option key={index} value={name1}>
//                             {name1}
//                           </option>
//                         ))}
//                       </Form.Control>
//                     </Form.Group>
//                   </Col>
//                   <Col sm={6} className="flex-column d-flex">
//                     <Form.Group>
//                       <Form.Label>
//                         Amount<span className="text-danger"> *</span>
//                       </Form.Label>
//                       <Form.Control
//                         type="number"
//                         name="bid_amount"
//                         value={value.bid_amount}
//                         onChange={handleInput}
//                         placeholder="Enter Amount"
//                         required
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Row className="justify-content-between text-left m-0 pb-2">
//                   <Col sm={6} className="flex-column d-flex">
//                     <Form.Group>
//                       <Form.Label>
//                         Month<span className="text-danger"> *</span>
//                       </Form.Label>
//                       <Form.Control
//                         type="month"
//                         name="bid_month"
//                         value={value.bid_month}
//                         onChange={handleInput}
//                         // min={getCurrentMonth()}
//                         required
//                       ></Form.Control>
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Row className="justify-content-center m-0 pt-2">
//                   <Col className="d-flex justify-content-center">
//                     <Button
//                       type="submit"
//                       style={bgcolo}
//                       className="btn-block h-100 "
//                     >
//                       ADD Bidding
//                     </Button>
//                     <div className="ps-3">
//                       <Button
//                         style={bgcolo}
//                         className="btn-block h-100"
//                         onClick={handleNavigate}
//                       >
//                         CHANGE AMOUNT
//                       </Button>
//                     </div>
//                   </Col>
//                 </Row>
//               </Form>
//             )}
//           </div>
//         </Col>
//       </Row>
//       {!showWinner && (
//         <Row className="justify-content-center m-0 pt-2">
//           <Col className="d-flex justify-content-center">
//             <Button
//               variant="success"
//               onClick={handleWinner}
//               disabled={memberData.length === 0}
//             >
//               Winner
//             </Button>
//           </Col>
//         </Row>
//       )}
//       {!showWinner ? (
//         <div className="py-4 container">
//           <div className="table-responsive">
//             <table className="table border shadow">
//               <thead>
//                 <tr className="text-center p-2">
//                   <th scope="col">SR.NO</th>
//                   <th scope="col">Name</th>
//                   <th scope="col">Amount</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {memberData.map((user, index) => (
//                   <tr className="text-center" key={index}>
//                     <th scope="row">{index + 1}</th>
//                     <td>{user.mem_name}</td>
//                     <td>{user.bid_amount}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       ) : (
//         <></>
//       )}
//       <Modal show={!popup}>
//         <div className="pt-3">
//           <p className="fs-3 text-center ">Attention</p>
//         </div>
//         <div className="fs-5 text-center">Please add member to the scheme.</div>
//         <div className="pt-2 pb-3 d-flex justify-content-center">
//           <Button style={bgcolo} onClick={handelepop}>
//             Add Member
//           </Button>
//         </div>
//       </Modal>
//     </Container>
//   );
// };

// export default Beading;

////////correct code for the    //////////  search member in

// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
// import "./beading.css";
// import { useNavigate, useParams } from "react-router-dom";
// import { checkMember, getDataId, updatebcstatus } from "../store/apiService";
// import { useRef } from "react";
// import {
//   fetchTotalAmountScheme,
//   fetchMemberData,
//   createBidding,
//   fetchBidding,
//   fetchWinner,
//   addentryvoucher,
//   createTransaction1,
//   createTransaction2,
//   createTransaction3,
//   createTransaction4,
//   createTransaction5,
//   createTransaction8,
// } from "../store/bSlice";
// import { bcstatus } from "../store/apiService";
// import { useDispatch, useSelector } from "react-redux";

// const Beading = () => {
//   const dispatch = useDispatch();
//   const { schemeId } = useParams();
//   const navigate = useNavigate();
//   const [showWinner, setShowWinner] = useState(false);
//   const [popup, setPopup] = useState(true);
//   const [currentMonth, setCurrentMonth] = useState("");
//   const [statusbc, setStatusbc] = useState(0);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [showDropdown, setShowDropdown] = useState(false);
//   const dropdownRef = useRef(null);

//   const { total, memberData, memberBiddingName } = useSelector(
//     (state) => state.bSlice
//   );
//   const [filteredMembers, setFilteredMembers] = useState(memberBiddingName);

//   const [value, setValue] = useState({
//     bid_name: "",
//     bid_amount: "",
//     bid_month: "",
//     bid_sch_id: schemeId,
//   });

//   const bgcolo = {
//     backgroundColor: "#00bcd4", // Background color
//     color: "black", // Text color
//   };

//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       const filtered = memberBiddingName.filter((member) =>
//         member.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredMembers(filtered);
//       setShowDropdown(filtered.length > 0); // Show dropdown if there are results
//     }, 300); // 300ms debounce time

//     return () => clearTimeout(delayDebounceFn); // Cleanup debounce timeout on each new keystroke
//   }, [searchTerm, memberBiddingName]);

//   useEffect(() => {
//     const today = new Date();
//     const month = today.toISOString().substring(0, 7);
//     setCurrentMonth(month);
//     setValue((prevValue) => ({
//       ...prevValue,
//       bid_month: month,
//     }));
//     const checkMemberStatus = async () => {
//       try {
//         const res = await checkMember({ sch_id: schemeId });
//         setPopup(res.data.status);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     checkMemberStatus();
//   }, [schemeId, setShowWinner]);

//   useEffect(() => {
//     const checkMemberStatus1 = async () => {
//       try {
//         const res = await bcstatus({ sch_id: schemeId });

//         setStatusbc(res.allTrue);
//         console.log(statusbc);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     checkMemberStatus1();
//   }, []);

//   const handleInput = (e) => {
//     setValue({
//       ...value,
//       [e.target.name]: e.target.value,
//     });

//   };

//   useEffect(() => {
//     dispatch(fetchTotalAmountScheme({ sch_id: schemeId }));
//     dispatch(fetchBidding({ sch_id: schemeId }));
//   }, [schemeId, dispatch]);

//   useEffect(() => {
//     if (Object.keys(value).length !== 0) {
//       dispatch(fetchMemberData({ bid_sch_id: schemeId }));
//     }
//   }, [dispatch, schemeId, value]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const newvalue={
//         bid_name:searchTerm,
//         bid_amount:value.bid_amount,
//         bid_month:value.bid_month,
//         bid_sch_id:value.bid_sch_id
//       }
//       await dispatch(createBidding(newvalue));
//       setValue({
//         bid_name: "",
//         bid_amount: "",
//         bid_month: currentMonth,
//         bid_sch_id: schemeId,
//       });
//     } catch (error) {
//       console.error("Error adding bid: ", error);
//     }
//   };

//   const handleWinner = async () => {
//     try {
//       const response = await getDataId({ bid_sch_id: schemeId });
//       const bcdateId = response.data.data.bid_bcdate_id;
//       const today = new Date();
//       const formattedDate = today.toISOString().split("T")[0];

//       await dispatch(
//         addentryvoucher({ v_amount: total, v_date: formattedDate })
//       );
//       await dispatch(
//         createTransaction1({ bid_sch_id: schemeId, bid_bcdate_id: bcdateId })
//       );
//       await dispatch(
//         createTransaction2({ bid_sch_id: schemeId, bid_bcdate_id: bcdateId })
//       );
//       await dispatch(
//         addentryvoucher({ v_amount: total, v_date: formattedDate })
//       );
//       await dispatch(
//         createTransaction8({ bid_sch_id: schemeId, bid_bcdate_id: bcdateId })
//       );
//       await dispatch(
//         createTransaction3({ bid_sch_id: schemeId, bid_bcdate_id: bcdateId })
//       );
//       await dispatch(
//         createTransaction4({ bid_sch_id: schemeId, bid_bcdate_id: bcdateId })
//       );
//       await dispatch(
//         createTransaction5({ bid_sch_id: schemeId, bid_bcdate_id: bcdateId })
//       );
//       await dispatch(
//         fetchWinner({ bid_sch_id: schemeId, bid_bcdate_id: bcdateId })
//       );
//       await updatebcstatus({ sch_id: schemeId, bid_bcdate_id: bcdateId });

//       navigate(`/agency/winnerdata/${schemeId}/${bcdateId}`);
//     } catch (error) {
//       console.error("Error fetching winner", error);
//     }
//   };

//   const handleNavigate = () => {
//     navigate(`/agency/update/${schemeId}`);
//   };

//   const handelepop = () => {
//     navigate(`/agency/createm1/${schemeId}`);
//   };

//   if (statusbc == 1) {
//     return (
//       <div className="text-center fs-3 fw-bold">
//         "All scheme BCs completed."{" "}
//       </div>
//     );
//   }

//   const handleSelectMember = (member) => {
//     setValue({ ...value, mem_name: member });
//     setSearchTerm(member);
//     setShowDropdown(false); // Close dropdown after selection
//   };

//   const handleClickOutside = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setShowDropdown(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);
//   return (
//     <Container fluid className="px-1 mx-auto">
//       <Row className="justify-content-center m-0">
//         <Col xl={7} lg={8} md={9} sm={11} xs={12}>
//           <div className="card">
//             {showWinner ? (
//               <></>
//             ) : (
//               <Form onSubmit={handleSubmit}>
//                 <Row className="justify-content-between text-left m-0 pb-2">
//                   <Row>
//                     <Col>
//                       <div>
//                         <h1 className="text-center Heading_form">
//                           <strong>Start Bidding</strong>
//                         </h1>
//                         <h5 className="text-center mb-4">
//                           <strong>Total Amount: {total}</strong>
//                         </h5>
//                       </div>
//                     </Col>
//                   </Row>
//                   <Col sm={6} className="flex-column d-flex">
//                     <Form.Group>
//                       <Form.Label>
//                         Name<span className="text-danger"> *</span>
//                       </Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Search Member Name"
//                         name="bid_name"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         onClick={() => setShowDropdown(true)}

//                         required
//                       />
//                       {showDropdown && (
//                         <ul
//                           className="dropdown-list list-unstyled border rounded shadow"
//                           style={{
//                             position: "absolute",
//                             zIndex: 1000,
//                             maxHeight: "150px",
//                             overflowY: "auto",
//                             marginTop: "5px",
//                             width: "43%",
//                             backgroundColor: "#333333",
//                           }}
//                           ref={dropdownRef}
//                         >
//                           {filteredMembers.length > 0 ? (
//                             filteredMembers.map((member, index) => (
//                               <li
//                                 className="dropdown-item p-1 ps-3"
//                                 key={index}
//                                 onClick={() => handleSelectMember(member)}
//                               >
//                                 {member}
//                               </li>
//                             ))
//                           ) : (
//                             <li className="dropdown-item p-1 ps-3">
//                               No members found
//                             </li>
//                           )}
//                         </ul>
//                       )}
//                     </Form.Group>
//                   </Col>
//                   <Col sm={6} className="flex-column d-flex">
//                     <Form.Group>
//                       <Form.Label>
//                         Amount<span className="text-danger"> *</span>
//                       </Form.Label>
//                       <Form.Control
//                         type="number"
//                         name="bid_amount"
//                         value={value.bid_amount}
//                         onChange={handleInput}
//                         placeholder="Enter Amount"
//                         required
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Row className="justify-content-between text-left m-0 pb-2">
//                   <Col sm={6} className="flex-column d-flex">
//                     <Form.Group>
//                       <Form.Label>
//                         Month<span className="text-danger"> *</span>
//                       </Form.Label>
//                       <Form.Control
//                         type="month"
//                         name="bid_month"
//                         value={value.bid_month}
//                         onChange={handleInput}
//                         // min={getCurrentMonth()}
//                         required
//                       ></Form.Control>
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Row className="justify-content-center m-0 pt-2">
//                   <Col className="d-flex justify-content-center">
//                     <Button
//                       type="submit"
//                       style={bgcolo}
//                       className="btn-block h-100 "
//                     >
//                       ADD Bidding
//                     </Button>
//                     <div className="ps-3">
//                       <Button
//                         style={bgcolo}
//                         className="btn-block h-100"
//                         onClick={handleNavigate}
//                       >
//                         CHANGE AMOUNT
//                       </Button>
//                     </div>
//                   </Col>
//                 </Row>
//               </Form>
//             )}
//           </div>
//         </Col>
//       </Row>
//       {!showWinner && (
//         <Row className="justify-content-center m-0 pt-2">
//           <Col className="d-flex justify-content-center">
//             <Button
//               variant="success"
//               onClick={handleWinner}
//               disabled={memberData.length === 0}
//             >
//               Winner
//             </Button>
//           </Col>
//         </Row>
//       )}
//       {!showWinner ? (
//         <div className="py-4 container">
//           <div className="table-responsive">
//             <table className="table border shadow">
//               <thead>
//                 <tr className="text-center p-2">
//                   <th scope="col">SR.NO</th>
//                   <th scope="col">Name</th>
//                   <th scope="col">Amount</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {memberData.map((user, index) => (
//                   <tr className="text-center" key={index}>
//                     <th scope="row">{index + 1}</th>
//                     <td>{user.mem_name}</td>
//                     <td>{user.bid_amount}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       ) : (
//         <></>
//       )}
//       <Modal show={!popup}>
//         <div className="pt-3">
//           <p className="fs-3 text-center ">Attention</p>
//         </div>
//         <div className="fs-5 text-center">Please add member to the scheme.</div>
//         <div className="pt-2 pb-3 d-flex justify-content-center">
//           <Button style={bgcolo} onClick={handelepop}>
//             Add Member
//           </Button>
//         </div>
//       </Modal>
//     </Container>
//   );
// };

// export default Beading;

////////////////////////////////////////////////////////////




import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import "./beading.css";
import { useNavigate, useParams } from "react-router-dom";
import { checkMember, getDataId, updatebcstatus } from "../store/apiService";
import { useRef } from "react";
import { Dropdown } from "react-bootstrap";
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
import { bcstatus } from "../store/apiService";
import { useDispatch, useSelector } from "react-redux";

const Beading = () => {
  const [selectedMemberIds, setSelectedMemberIds] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const dispatch = useDispatch();
  const { schemeId } = useParams();
  const navigate = useNavigate();
  const [showWinner, setShowWinner] = useState(false);
  const [popup, setPopup] = useState(true);
  const [currentMonth, setCurrentMonth] = useState("");
  const [statusbc, setStatusbc] = useState(0);

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

  useEffect(() => {
    const checkMemberStatus1 = async () => {
      try {
        const res = await bcstatus({ sch_id: schemeId });

        setStatusbc(res.allTrue);
        console.log(statusbc);
      } catch (err) {
        console.log(err);
      }
    };
    checkMemberStatus1();
  }, []);

  const { total, memberData, memberBiddingName } = useSelector(
    (state) => state.bSlice
  );



console.log(memberBiddingName)
const selectedMembers = memberBiddingName.filter(member => 
  selectedMemberIds.includes(member.mem_id)
);
const selectedMemberNames = selectedMembers.map(member => member.mem_name).join(", ");



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

    console.log(selectedMemberIds);
    const selectedMemberIdsString = JSON.stringify(selectedMemberIds);

    const newvalue={
      bid_name: selectedMemberIdsString,
      bid_amount: value.bid_amount,
      bid_month: currentMonth,
      bid_sch_id: schemeId,
    }
    try {
      await dispatch(createBidding(newvalue));
      setValue({
        bid_name: "",
        bid_amount: "",
        bid_month: currentMonth,
        bid_sch_id: schemeId,
      });

    setSelectedMemberIds([])
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

  const handleMemberSelect = (id) => {


    setSelectedMemberIds((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((memberId) => memberId !== id);
      }
      return [...prevIds, id];
    });
  };

  // Function to toggle dropdown open/close
  const toggleDropdown = () => {
    setDropdownOpen((prevOpen) => !prevOpen);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };





  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);




  const filteredMembers = memberBiddingName.filter(
    (member) =>
      member &&
      member.mem_name &&
      member.mem_name.toLowerCase().includes(searchTerm.toLowerCase())
  );






  if (statusbc == 1) {
    return (
      <div className="text-center fs-3 fw-bold">
        "All scheme BCs completed."{" "}
      </div>
    );
  }

  return (
    <Container fluid className="px-1 mx-auto">
      <Row className="justify-content-center m-0">
        <Col xl={7} lg={8} md={9} sm={11} xs={12}>
          <div className="card">
            {showWinner ? (
              <></>
            ) : (
              <Form onSubmit={handleSubmit}>
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
                  <Row className="justify-content-between text-left m-0 pb-2">

                  <Col sm={6} className="flex-column d-flex">
                    <Form.Group>
                      <Form.Label>
                        Name<span className="text-danger"> *</span>
                      </Form.Label>




<Dropdown show={dropdownOpen} ref={dropdownRef} >

  <Button
    id="dropdown-basic-button"
    onClick={toggleDropdown}
    className="background_dropdown dropdown_width" 
    // style={{width:'25rem'}}
  >
    <span className="w-100 d-flex justify-content-start ">
      {selectedMemberNames.length > 0 ? selectedMemberNames : 'Select Member'}
    </span>
  </Button>



  <Dropdown.Menu className="w-100">
    <Dropdown.Item as="div" className="p-2">
      <Form.Control
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </Dropdown.Item>

    {filteredMembers.length > 0 ? (
      filteredMembers.map((member, index) => (
        <Dropdown.Item key={member.mem_id} as="div">
          <div className="d-flex align-items-center">
            <Form.Check
              type="checkbox"
              value={member.mem_id}
              onChange={() => handleMemberSelect(member.mem_id)}
              checked={selectedMemberIds.includes(member.mem_id)}
            />
            <span className="ps-3">{member.mem_name}</span>
          </div>
        </Dropdown.Item>
      ))
    ) : (
      <Dropdown.Item as="div">No members found</Dropdown.Item>
    )}
  </Dropdown.Menu>
</Dropdown>






















                      {/* <Form.Control
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
                      </Form.Control> */}
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
                    <td>{user.bid_mem_id}</td>
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
