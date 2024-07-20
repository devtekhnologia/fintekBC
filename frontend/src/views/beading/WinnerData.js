import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "react-bootstrap";
import { fetchWinner,fetchTotalAmountScheme } from "../store/bSlice";
import { useNavigate, useParams } from 'react-router-dom';

const WinnerData = () => {
    const {schemeId}=useParams();
    const {bcdateId}=useParams()
    const navigate=useNavigate();
  const dispatch = useDispatch();
  const { total, winners } = useSelector((state) => state.bSlice);

  useEffect(() => {
    dispatch(fetchWinner({ bid_sch_id: schemeId, bid_bcdate_id: bcdateId }));
    dispatch(fetchTotalAmountScheme({ sch_id: schemeId }));
  }, [dispatch, schemeId, bcdateId]);
  
  const handleOk = () => {
    navigate('/agency')
  };

  return (<>
    <div className="winner-details">
    <h2 className="text-center pt-2">Congratulations!</h2>
    <h5 className="text-center pb-3">
    The winner is: {winners[0].winner_Name} 💐
    </h5>
  </div>
   <div className="py-4 container">
   <div className="table-responsive">
     <table className="table border shadow">
       <thead>
         <tr className="text-center p-2 fs-5">
           <th scope="col">SR.NO</th>
           <th scope="col">Name</th>
           <th scope="col">Total Amount</th>
           <th scope="col">Bidding Amount</th>
           <th scope="col">Winner Amount</th>
         </tr>
       </thead>
       <tbody>
         {winners.map((user, index) => (
           <tr className="text-center" key={index}>
             <th scope="row">{index + 1}</th>
             <td>{user.winner_Name}</td>
             <td>{total}</td>
             <td>{user.biddingAmount}</td>
             <td>{user.winnerAmount}</td>
           
           </tr>
         ))}
       </tbody>
     </table>
     <div className="d-flex justify-content-center">
       <Button onClick={handleOk} >OK</Button>
     </div>
   </div>
 </div>
 </>
  )
}

export default WinnerData