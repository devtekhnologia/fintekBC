import React, { useEffect, useState, useCallback } from "react";
import { Row, Col, Card, Button,Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setSchemeId } from "../store/schemeSlice";
import { apiurl } from "../../Api/apiurl";
import {deletescheme} from '../store/apiService'

function Scheme() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const API_BASE_URL = apiurl;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [schemeToDelete, setSchemeToDelete] = useState(null);
  const [agencyData, setAgencyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/scheme`);
      setAgencyData(response.data.data);
    } catch (error) {
      setError("Error fetching data, please try again later.");
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  const handleDeleteConfirm = async (val) => {
    try {
      // Call your delete API endpoint with the schemeToDelete ID
      // await axios.delete(`${API_BASE_URL}/scheme/${schemeToDelete }`);
      await deletescheme({sch_id:val});

      // Refresh data after successful deletion
      fetchData();
    } catch (error) {
      console.error("Error deleting scheme: ", error);
    } finally {
      // Close the modal
      setShowDeleteModal(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, [fetchData]);



  const handleNavigate = (path, id) => {
    dispatch(setSchemeId(id));
    navigate(path.replace(":schemeId", id));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleDeleteClick = (id) => {
    console.log(id);
    setSchemeToDelete(id);
    setShowDeleteModal(true);
  };

  return (
    <div className="container">
      <Row className="m-0">
        <Col lg={12} className="text-center">
          <h1 className="pb-2">Schemes</h1>
        </Col>
        <Col className="text-end pe-lg-5">
          <Button
            variant="info"
            onClick={() => navigate("/agency/createscheme")}
          >
            Create Scheme
          </Button>
        </Col>
      </Row>
      <Row className="m-0 justify-content-evenly pt-0">
        {agencyData.map((group, index) => (
          <Col lg={6} key={index}>
            <Card
              className="p-3"
              style={{ border: "none", minHeight: "200px" }}
            >
              <div className="d-flex justify-content-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-calendar-fill"
                  viewBox="0 0 16 16"
                  onClick={() =>
                    handleNavigate("/agency/updateDate/:schemeId", group.sch_id)
                  }
                >
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5h16V4H0V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5" />
                </svg>
                <span className="ps-3"></span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-trash3-fill"
                  viewBox="0 0 16 16"
                  // onClick={() =>
                  //   handleNavigate("/agency/delete/:schemeId", group.sch_id)
                  // }
                  onClick={()=>{handleDeleteClick(group.sch_id)}}
                >
                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                </svg>
              </div>
              <Card.Body>
                <h3 className="text-center pb-3">{group.sch_name}</h3>
                <Row className="mb-3">
                  <Col className="d-flex">
                    <Card.Text>
                      Starting Date: {group.sch_starting_date.substring(0, 10)}
                    </Card.Text>
                  </Col>
                  <Col>
                    {group.sch_status === 1 ? (
                      <Card.Text>
                        Scheme Brokerage: {group.sch_commission}%
                      </Card.Text>
                    ) : (
                      <Card.Text>
                        Scheme Brokerage Amount: {group.sch_commission_amount}
                      </Card.Text>
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col className="d-flex">
                    <Card.Text>
                      Amount Per Head: {group.sch_amount_per_head}
                    </Card.Text>
                  </Col>
                  <Col>
                    <Card.Text>No of Month: {group.sch_month}</Card.Text>
                  </Col>
                </Row>
              </Card.Body>

              <Row className="pb-3">
                <Col className="d-flex justify-content-center">
                  <Button
                    variant="info"
                    className="rounded-pill w-100"
                    onClick={() =>
                      handleNavigate(`/agency/winnerdetails/:schemeId`, group.sch_id)
                    }
                  >
                    Winners
                  </Button>
                </Col>
                <Col className="d-flex justify-content-center">
                  <Button
                    variant="info"
                    className="rounded-pill w-100"
                    onClick={() =>
                      handleNavigate("/agency/beading/:schemeId", group.sch_id)
                    }
                  >
                    Bidding
                  </Button>
                </Col>
                <Col className="d-flex justify-content-center">
                  <Button
                    variant="info"
                    className="rounded-pill w-100"
                    onClick={() =>
                      handleNavigate("/agency/createm1/:schemeId", group.sch_id)
                    }
                  >
                    Member
                  </Button>
                </Col>
              </Row>

              <Row className="pb-3">
                <Col className="d-flex justify-content-center">
                  <Button
                    variant="info"
                    className="rounded-pill w-100"
                    onClick={() =>
                      handleNavigate("/agency/singlememberpaymentdetail/:schemeId", group.sch_id)
                    }
                  >
                    SingleM
                  </Button>
                </Col>
                <Col className="d-flex justify-content-center">
                  <Button
                    variant="info"
                    className="rounded-pill w-100"
                    onClick={() =>
                      handleNavigate("/agency/searchmonthpaymentdetail/:schemeId", group.sch_id)
                    }
                  >
                    MonthB
                  </Button>
                </Col>
                <Col className="d-flex justify-content-center">
                  <Button
                    variant="info"
                    className="rounded-pill w-100"
                    onClick={() =>
                      handleNavigate("/agency/report/:schemeId", group.sch_id)
                    }
                  >
                    Report
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>


      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
     
          <div className="fs-3 pt-3"><p className="text-center">Confirm Deletion</p></div>

<div><p className="text-center p-2 fs-5">Are you sure you want to delete this scheme ?</p></div>
     
       
   <div className=" d-flex justify-content-center pb-4">
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
        <span className="pe-3">  </span>
          <Button variant="danger" onClick={()=>handleDeleteConfirm(schemeToDelete)}>
            Delete
          </Button>
          </div>
      </Modal>
    </div>
  );
}

export default Scheme;

