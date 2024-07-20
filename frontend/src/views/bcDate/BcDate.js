import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBcDateData, updateBcDate } from '../store/dateSlice';
import { useParams } from 'react-router-dom';

function BcDate() {
  const {schemeId}=useParams()
  const dispatch = useDispatch();
  const bcDateData = useSelector((state) => state.date);

  useEffect(() => {
    dispatch(fetchBcDateData({sch_id:schemeId}));
  }, [dispatch]);

  const handleDateChange = (id, newDate) => {
    dispatch(updateBcDate({ id, newDate }));
  };

  return (
    <div>
      <h2 className='text-center'>BcDate</h2>
      <div className="container">
        <div className="py-4">
          <div className="table-responsive">
            <table className="table border shadow">
              <thead>
                <tr className="text-center p-2">
                  <th scope="col">SR.NO</th>
                  <th scope="col">BC Number</th>
                  <th scope="col">Date</th>
                  <th scope="col">Edit Date</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {bcDateData.map((item, index) => (
                  <tr className="text-center" key={index}>
                    <td>{index + 1}</td>
                    <td>{item.bc_no}</td>
                    <td>{item.bc_date}</td>
                    <td>
                      <input
                        type="date"
                        value={item.bc_date}
                        onChange={(event) => handleDateChange(item.bcdate_id, event.target.value)}
                        disabled={item.bc_status === 1}
                      />
                    </td>
                    <td>{item.bc_status === 0 ? "Not Done" : "Done"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BcDate;