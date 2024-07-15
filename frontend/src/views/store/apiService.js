import axios from 'axios';
import {apiurl} from '../../Api/apiurl'
const API_BASE_URL = apiurl;

export const createBidding = async (newPayment) => {
  const response = await axios.post(`${API_BASE_URL}/addbidding`, newPayment);
  return response.data;
};

export const createPaymentApi = async (newPayment) => {
  const response = await axios.post(`${API_BASE_URL}/createpayment`, newPayment);
  return response.data;
};



export const fetchMasterData = async () => {
  const response = await axios.get(`${API_BASE_URL}/getmember`);
  return response.data;
};



export const fetchPaymentsByMonthSchemeApi = async (newPayment) => {
  const response = await axios.post(`${API_BASE_URL}/geroutert`, newPayment);
  return response.data;
};


  
  export const deleteMember = async (id) => {
    try {
      await axios.post(`${API_BASE_URL}/deletemember`,id);
    } catch (error) {
      console.error("Error deleting member: ", error);
      throw error; 
    }
  };




  export const addbidding= async (value) => {
    try {
      await axios.post(`${API_BASE_URL}/addbidding`,value);
    } catch (error) {
      console.error("Error deleting member: ", error);
      throw error; 
    }
  };

  export const fetchmemberData= async (value) => {
    try {
      await axios.post(`${API_BASE_URL}/addbidding`,value);
    } catch (error) {
      console.error("Error deleting member: ", error);
      throw error; 
    }
  };


  export const deletescheme= async (value) => {
    try {
     const response= await axios.post(`${API_BASE_URL}/deletescheme`,value);
     return response.data;
    } catch (error) {
      console.error("Error deleting member: ", error);
      throw error; 
    }
  };


  export const loginUser= async (value) => {
    try {
     const response= await axios.post(`${API_BASE_URL}/login`,value);
     return response.data;
    } catch (error) {
      console.error("Error deleting member: ", error);
      throw error; 
    }
  };

  export const checkMember= async (value) => {
    try {
    const response= await axios.post(`${API_BASE_URL}/w`,value);
     return response;
    } catch (error) {
      console.error("Error deleting member: ", error);
      throw error; 
    }
  };

  export const checkWinner1 = async (value) => {
    try {
      console.log("Request payload:", value);
      const response = await axios.post(`${API_BASE_URL}/w1`, value);
      return response;
    } catch (error) {
      console.error("Error checking winner: ", error);
      throw error; 
    }
  };

  
  export const winnerLastmonth= async (value) => {
    try {
    const response= await axios.post(`${API_BASE_URL}/reportlastmonth`,value);
     return response;
    } catch (error) {
      console.error("Error deleting member: ", error);
      throw error; 
    }
  };

  export const getDataId= async (value) => {
    try {
    const response= await axios.post(`${API_BASE_URL}/bidbcdateid`,value);
     return response;
    } catch (error) {
      console.error("Error deleting member: ", error);
      throw error; 
    }
  };

  export const updatebcstatus= async (value) => {
    try {
    const response= await axios.post(`${API_BASE_URL}/updatstatus`,value);
     return response;
    } catch (error) {
      console.error("Error deleting member: ", error);
      throw error; 
    }
  };


  export const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/scheme`);
      return response.data.dat;
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };




  
  export const fetchWinner = async (value) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/scheme`,value);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };