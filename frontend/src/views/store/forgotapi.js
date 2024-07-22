import axios from 'axios';
import {apiurl} from '../../Api/apiurl'
const API_BASE_URL = apiurl;

export const changePassword= async (value) => {
    try {     
    const response = await axios.post('http://13.233.79.22:3003/changepassword', value)
     return response.data;
    } catch (error) {
      console.error("Error: ", error);
      throw error; 
    }
  };


  export const verifyotp= async (value) => {
    try {     
      const response = await axios.post('http://13.233.79.22:3003/verifyotp', value);
     return response.data;
    } catch (error) {
      console.error("Error ", error);
      throw error; 
    }
  };

