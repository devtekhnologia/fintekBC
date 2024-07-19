import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {  useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMembers,
  addMember,
  fetchAllMembers,
  clearMembers,
  deletememberScheme
} from "../store/memberSlice1";

const CreateMember1 = () => {
  const { schemeId } = useParams();
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const members1 = useSelector((state) => state.member.members1);
  const members = useSelector((state) => state.member.members);
  // const memberStatus = useSelector((state) => state.member.status);
  // const error = useSelector((state) => state.member.error);

  const [value, setValue] = useState({
    mem_name: "",
    sch_id: schemeId,
  });

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {  
    dispatch(fetchAllMembers());
  }, [dispatch]);

  useEffect(() => {
    if (schemeId) {
      dispatch(clearMembers()); // Clear members before fetching new data
      dispatch(fetchMembers({ sch_id: schemeId }));
    }
  }, [schemeId, dispatch]);

  const handleInput = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = async (id) => {
    try {
      const value1 = {
        mem_id: id,
        sch_id: schemeId
      };
      await dispatch(deletememberScheme(value1));
      // Fetch members again after deletion
      dispatch(fetchMembers({ sch_id: schemeId }));
    } catch (error) {
      console.error("Error deleting member: ", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addMember(value)).then(() => {
      dispatch(fetchMembers({ sch_id: schemeId }));
    });
    setValue({
      mem_name: "",
      sch_id: schemeId,
    });
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const bgcolo = {
    backgroundColor: '#00bcd4', // Background color
    color: 'black' // Text color
  };
  // const bgcolor1 = {
  //   backgroundColor: 'red', // Background color
  //   color: 'black' // Text color
  // };
  return (
    <Container fluid className="px-1 mx-auto">  
      <div className="container">
        <Row>
          <Col className="text-end pe-lg-5">
            <Button style={bgcolo} onClick={toggleForm}>
              {showForm ? "Hide Form" : "Add Member"}
            </Button>
          </Col>
        </Row>
      </div>
      {showForm && (
        <Row className="justify-content-center m-0">
          <Col xl={10} lg={12} md={10} sm={11} xs={12}>
            <div className="card">
              <h1 className="text-center mb-4 Heading_form">
                <strong>Add Member</strong>
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
                        {members1.map((name, index) => (
                          <option key={index} value={name}>
                            {name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col className="d-flex justify-content-center">
                    {/* <div className="pt-4 d-flex ">
                      <div className="pe-3">
                         <Button
                        type="submit"
                        style={bgcolo}
                        className="btn-block"
                      >
                        ADD MEMBER
                      </Button>
                      <>   </>
                      <Button
                        type="submit"
                      style={bgcolo}
                        className="btn-block"
                        onClick={()=>navigate('/agency/createmember')}
                      >
                        CREATE MEMBER
                      </Button>
                     </div>
                     <div className="pt-1"> 
                  
                     </div>
                    </div> */}


<div className="pt-4 d-flex justify-content-center">
      <div className="d-flex flex-wrap">
        <Button
          type="submit"
          style={bgcolo}
          className="btn-block mb-2 me-2"
      
        >
          ADD MEMBER
        </Button>
        <Button
          type="submit"
          style={bgcolo}
          className="btn-block mb-2"
          onClick={() => navigate('/agency/createmember')}
        >
          CREATE 
        </Button>
      </div>
    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      )}

      <div className="container">
        <div className="py-4">
          <div className="table-responsive">
            {members.length === 0 ? (
              <div className="text-center">No data available</div>
            ) : (
              <table className="table border shadow">
                <thead>
                  <tr className="text-center p-2">
                    <th scope="col">SR.NO</th>
                    <th scope="col">Name</th>
                    <th scope="col">Mobile NO</th>
                    <th scope="col">Address</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((post1, index) => (
                    <tr className="text-center" key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{post1.mem_name}</td>
                      <td>{post1.mem_mobile}</td>
                      <td>{post1.mem_address}</td>
                      <td>
                        <Button
                          className="btn mx-2 mb-2 mb-md-0"
                          style={bgcolo}
                          onClick={() => handleDelete(post1.mem_id)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CreateMember1;
