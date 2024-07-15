const { query } = require("../utils/database");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const { winnerData } = require("./WinnerController");
const { getRandomValues } = require("crypto");
const { receiveMessageOnPort } = require("worker_threads");

// const trasactionentrymember1 = async (req, res) => {
//   try {
//     const { bid_sch_id } = req.body;

//     // Step 1: Get all schmem_mem_id associated with the provided sch_id
//     const findMemberQuery =
//       "SELECT schmem_mem_id FROM tbl_schememember WHERE schmem_sch_id = ?";
//     const members = await query(findMemberQuery, [bid_sch_id]);

//     if (members.length === 0) {
//       return res.status(404).send({
//         status: false,
//         message: "No members found for the provided scheme ID",
//       });
//     }

//     const memIds = members.map((row) => row.schmem_mem_id);

//     // Step 2: Get the amount per head for the scheme
//     const findAmountPerHeadQuery =
//       "SELECT sch_amount_per_head FROM tbl_scheme WHERE sch_id = ?";
//     const schAmountPerHeadResult = await query(findAmountPerHeadQuery, [
//       bid_sch_id,
//     ]);

//     if (!schAmountPerHeadResult || schAmountPerHeadResult.length === 0) {
//       return res
//         .status(404)
//         .send({ status: false, message: "No scheme found" });
//     }

//     const schAmountPerHead = schAmountPerHeadResult[0].sch_amount_per_head;
//     const t_amount = -schAmountPerHead;

//     // Step 3: Get the last voucher ID
//     const findLastVoucherIdQuery =
//       "SELECT v_id FROM tbl_vaoucher ORDER BY v_id DESC LIMIT 1";
//     const recentVoucherIdResult = await query(findLastVoucherIdQuery);

//     if (!recentVoucherIdResult || recentVoucherIdResult.length === 0) {
//       return res
//         .status(404)
//         .send({ status: false, message: "No voucher found" });
//     }

//     const recent_v_id = recentVoucherIdResult[0].v_id;

//     // Step 4: Insert transaction entries for each member using map and Promise.all
//     const insertTransactionQuery =
//       "INSERT INTO tbl_transaction (t_vid, t_mem_id, t_amount, t_sch_id,t_remark) VALUES (?, ?, ?, ? , ?)";

//     await Promise.all(
//       memIds.map((memId) =>
//         query(insertTransactionQuery, [
//           recent_v_id,
//           memId,
//           t_amount,
//           bid_sch_id,
//           1,
//         ])
//       )
//     );

//     return res.status(200).send({
//       status: true,
//       message: "Transaction entries inserted successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .send({ status: false, message: "Internal Server Error" });
//   }
// };



const trasactionentrymember1 = async (req, res) => {
  try {
    const { bid_sch_id,bid_bcdate_id } = req.body;

    // Step 1: Get all schmem_mem_id associated with the provided sch_id
    const findMemberQuery =
      "SELECT schmem_mem_id FROM tbl_schememember WHERE schmem_sch_id = ?";
    const members = await query(findMemberQuery, [bid_sch_id]);

    if (members.length === 0) {
      return res.status(404).send({
        status: false,
        message: "No members found for the provided scheme ID",
      });
    }

    const memIds = members.map((row) => row.schmem_mem_id);

    // Step 2: Get the amount per head for the scheme
    const findAmountPerHeadQuery =
      "SELECT sch_amount_per_head FROM tbl_scheme WHERE sch_id = ?";
    const schAmountPerHeadResult = await query(findAmountPerHeadQuery, [
      bid_sch_id,
    ]);

    if (!schAmountPerHeadResult || schAmountPerHeadResult.length === 0) {
      return res
        .status(404)
        .send({ status: false, message: "No scheme found" });
    }

    const schAmountPerHead = schAmountPerHeadResult[0].sch_amount_per_head;
    const t_amount = -schAmountPerHead;

    // Step 3: Get the last voucher ID
    const findLastVoucherIdQuery =
      "SELECT v_id FROM tbl_vaoucher ORDER BY v_id DESC LIMIT 1";
    const recentVoucherIdResult = await query(findLastVoucherIdQuery);

    if (!recentVoucherIdResult || recentVoucherIdResult.length === 0) {
      return res
        .status(404)
        .send({ status: false, message: "No voucher found" });
    }

    const recent_v_id = recentVoucherIdResult[0].v_id;

    // Step 4: Insert transaction entries for each member using map and Promise.all
    const insertTransactionQuery =
      "INSERT INTO tbl_transaction (t_vid, t_mem_id, t_amount, t_sch_id, t_remark, t_bcdate_id) VALUES (?, ?, ?, ? , ?, ?)";

    await Promise.all(
      memIds.map((memId) =>
        query(insertTransactionQuery, [
          recent_v_id,
          memId,
          t_amount,
          bid_sch_id,
          1,
          bid_bcdate_id
        ])
      )
    );

    return res.status(200).send({
      status: true,
      message: "Transaction entries inserted successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ status: false, message: "Internal Server Error" });
  }
};

































// const trasactionentrymember2 = async (req, res) => {
//   try {
//     const { bid_sch_id } = req.body;

//     // Step 1: Get the total amount for the scheme
//     const findAmountTotalQuery =
//       "SELECT sch_total,sch_fiexd_total FROM tbl_scheme WHERE sch_id = ?";
//     const schAmountTotalResult = await query(findAmountTotalQuery, [
//       bid_sch_id,
//     ]);

//     if (!schAmountTotalResult || schAmountTotalResult.length === 0) {
//       return res
//         .status(404)
//         .send({ status: false, message: "No scheme found" });
//     }


//     const schTotal = schAmountTotalResult[0].sch_total;
//     const sch_fiexd_total = schAmountTotalResult[0].sch_fiexd_total;
//     const t_amount = -sch_fiexd_total;

//     // Step 2: Get the last voucher ID
//     const findLastVoucherIdQuery =
//       "SELECT v_id FROM tbl_vaoucher ORDER BY v_id DESC LIMIT 1";
//     const recentVoucherIdResult = await query(findLastVoucherIdQuery);

//     if (!recentVoucherIdResult || recentVoucherIdResult.length === 0) {
//       return res
//         .status(404)
//         .send({ status: false, message: "No voucher found" });
//     }

//     const recent_v_id = recentVoucherIdResult[0].v_id;
//     const agency_id = 1;

//     // Step 3: Insert a transaction entry for the agency
//     const insertTransactionQuery =
//       "INSERT INTO tbl_transaction (t_vid, t_mem_id, t_amount, t_sch_id,t_remark) VALUES (?, ?, ?, ?,?)";
//     await query(insertTransactionQuery, [
//       recent_v_id,
//       agency_id,
//       sch_fiexd_total,
//       bid_sch_id,
//       2,
//     ]);

//     // const insertTransactionQuery2 =
//     //   "INSERT INTO tbl_transaction (t_vid, t_mem_id, t_amount, t_sch_id,t_remark) VALUES (?, ?, ?, ?,?)";
//     // await query(insertTransactionQuery2, [
//     //   recent_v_id,
//     //   agency_id,
//     //   t_amount,
//     //   bid_sch_id,
//     //   2,
//     // ]);

//     return res.status(200).send({
//       status: true,
//       message: "Transaction entry inserted successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .send({ status: false, message: "Internal Server Error" });
//   }
// };







const trasactionentrymember2 = async (req, res) => {
  try {
    const { bid_sch_id ,bid_bcdate_id} = req.body;

    // Step 1: Get the total amount for the scheme
    const findAmountTotalQuery =
      "SELECT sch_total,sch_fiexd_total FROM tbl_scheme WHERE sch_id = ?";
    const schAmountTotalResult = await query(findAmountTotalQuery, [
      bid_sch_id,
    ]);

    if (!schAmountTotalResult || schAmountTotalResult.length === 0) {
      return res
        .status(404)
        .send({ status: false, message: "No scheme found" });
    }


    const schTotal = schAmountTotalResult[0].sch_total;
    const sch_fiexd_total = schAmountTotalResult[0].sch_fiexd_total;
    const t_amount = -sch_fiexd_total;

    // Step 2: Get the last voucher ID
    const findLastVoucherIdQuery =
      "SELECT v_id FROM tbl_vaoucher ORDER BY v_id DESC LIMIT 1";
    const recentVoucherIdResult = await query(findLastVoucherIdQuery);

    if (!recentVoucherIdResult || recentVoucherIdResult.length === 0) {
      return res
        .status(404)
        .send({ status: false, message: "No voucher found" });
    }

    const recent_v_id = recentVoucherIdResult[0].v_id;
    const agency_id = 1;

    // Step 3: Insert a transaction entry for the agency
    const insertTransactionQuery =
      "INSERT INTO tbl_transaction (t_vid, t_mem_id, t_amount, t_sch_id, t_remark, t_bcdate_id) VALUES (?, ?, ?, ?, ?, ?)";
    await query(insertTransactionQuery, [
      recent_v_id,
      agency_id,
      sch_fiexd_total,
      bid_sch_id,
      2,
      bid_bcdate_id
    ]);
    return res.status(200).send({
      status: true,
      message: "Transaction entry inserted successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ status: false, message: "Internal Server Error" });
  }
};




















// const trasactionentrymember8 = async (req, res) => {
//   try {
//     const { bid_sch_id } = req.body;

//     // Step 1: Get the total amount for the scheme
//     const findAmountTotalQuery =
//       "SELECT sch_total,sch_fiexd_total FROM tbl_scheme WHERE sch_id = ?";
//     const schAmountTotalResult = await query(findAmountTotalQuery, [
//       bid_sch_id,
//     ]);

//     if (!schAmountTotalResult || schAmountTotalResult.length === 0) {
//       return res
//         .status(404)
//         .send({ status: false, message: "No scheme found" });
//     }


//     const schTotal = schAmountTotalResult[0].sch_total;
//     const sch_fiexd_total = schAmountTotalResult[0].sch_fiexd_total;
//     const t_amount = -sch_fiexd_total;

//     // Step 2: Get the last voucher ID
//     const findLastVoucherIdQuery =
//       "SELECT v_id FROM tbl_vaoucher ORDER BY v_id DESC LIMIT 1";
//     const recentVoucherIdResult = await query(findLastVoucherIdQuery);

//     if (!recentVoucherIdResult || recentVoucherIdResult.length === 0) {
//       return res
//         .status(404)
//         .send({ status: false, message: "No voucher found" });
//     }

//     const recent_v_id = recentVoucherIdResult[0].v_id;
//     const agency_id = 1;



//     const insertTransactionQuery2 =
//       "INSERT INTO tbl_transaction (t_vid, t_mem_id, t_amount, t_sch_id,t_remark) VALUES (?, ?, ?, ?,?)";
//     await query(insertTransactionQuery2, [
//       recent_v_id,
//       agency_id,
//       t_amount,
//       bid_sch_id,
//       2,
//     ]);

//     return res.status(200).send({
//       status: true,
//       message: "Transaction entry inserted successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .send({ status: false, message: "Internal Server Error" });
//   }
// };








const trasactionentrymember8 = async (req, res) => {
  try {
    const { bid_sch_id ,bid_bcdate_id} = req.body;

    // Step 1: Get the total amount for the scheme
    const findAmountTotalQuery =
      "SELECT sch_total,sch_fiexd_total FROM tbl_scheme WHERE sch_id = ?";
    const schAmountTotalResult = await query(findAmountTotalQuery, [
      bid_sch_id,
    ]);

    if (!schAmountTotalResult || schAmountTotalResult.length === 0) {
      return res
        .status(404)
        .send({ status: false, message: "No scheme found" });
    }


    const schTotal = schAmountTotalResult[0].sch_total;
    const sch_fiexd_total = schAmountTotalResult[0].sch_fiexd_total;
    const t_amount = -sch_fiexd_total;

    // Step 2: Get the last voucher ID
    const findLastVoucherIdQuery =
      "SELECT v_id FROM tbl_vaoucher ORDER BY v_id DESC LIMIT 1";
    const recentVoucherIdResult = await query(findLastVoucherIdQuery);

    if (!recentVoucherIdResult || recentVoucherIdResult.length === 0) {
      return res
        .status(404)
        .send({ status: false, message: "No voucher found" });
    }

    const recent_v_id = recentVoucherIdResult[0].v_id;
    const agency_id = 1;



    const insertTransactionQuery2 =
      "INSERT INTO tbl_transaction (t_vid, t_mem_id, t_amount, t_sch_id, t_remark ,t_bcdate_id) VALUES (?, ?, ?, ?, ? , ?)";
    await query(insertTransactionQuery2, [
      recent_v_id,
      agency_id,
      t_amount,
      bid_sch_id,
      2,
      bid_bcdate_id
    ]);

    return res.status(200).send({
      status: true,
      message: "Transaction entry inserted successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ status: false, message: "Internal Server Error" });
  }
};





































// const trasactionentrymember3 = async (req, res) => {
//   try {
//     const { bid_sch_id } = req.body;
//     // Step 1: Get the total amount for the scheme
//     const findAmountTotalQuery1 =
//       "SELECT sch_total ,sch_commission FROM tbl_scheme WHERE sch_id = ?";
//     const schAmountTotalResult1 = await query(findAmountTotalQuery1, [
//       bid_sch_id,
//     ]);

//     if (!schAmountTotalResult1 || schAmountTotalResult1.length === 0) {
//       return res
//         .status(404)
//         .send({ status: false, message: "No scheme found" });
//     }

//     const schTotal = schAmountTotalResult1[0].sch_total;
//     const commission = schAmountTotalResult1[0].sch_commission;

//     // Step 1: Calculate the start time for the last 24 hours
//     const now = new Date();
//     const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

//     // Step 2: Get the highest bid amount for the scheme in the last 24 hours using created_at field
//     const findAmountTotalQuery = `
//         SELECT bid_mem_id, bid_amount 
//         FROM tbl_bidding 
//         WHERE bid_sch_id = ? AND created_at BETWEEN ? AND ?
//         ORDER BY bid_amount DESC 
//         LIMIT 1
//       `;
//     const schAmountTotalResult = await query(findAmountTotalQuery, [
//       bid_sch_id,
//       last24Hours,
//       now,
//     ]);

//     if (!schAmountTotalResult || schAmountTotalResult.length === 0) {
//       return res.status(404).send({
//         status: false,
//         message: "No bid found for the provided scheme in the last 24 hours",
//       });
//     }

//     const highestBid = schAmountTotalResult[0];
//     const { bid_mem_id, bid_amount } = highestBid;

//     // Step 3: Get the last voucher ID
//     const findLastVoucherIdQuery =
//       "SELECT v_id FROM tbl_vaoucher ORDER BY v_id DESC LIMIT 1";
//     const recentVoucherIdResult = await query(findLastVoucherIdQuery);

//     if (!recentVoucherIdResult || recentVoucherIdResult.length === 0) {
//       return res
//         .status(404)
//         .send({ status: false, message: "No voucher found" });
//     }

//     const recent_v_id = recentVoucherIdResult[0].v_id;



//     const winnerAmount = schTotal - bid_amount;

//     const remark = 3;

//     // Step 4: Insert a transaction entry for the highest bid
//     const insertTransactionQuery =
//       "INSERT INTO tbl_transaction (t_vid, t_mem_id, t_amount, t_sch_id,t_remark) VALUES (?, ?, ?, ? , ?)";
//     await query(insertTransactionQuery, [
//       recent_v_id,
//       bid_mem_id,
//       winnerAmount,
//       bid_sch_id,
//       remark,
//     ]);

//     return res.status(200).send({
//       status: true,
//       message: "Transaction entry inserted successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .send({ status: false, message: "Internal Server Error" });
//   }
// };





// const trasactionentrymember4 = async (req, res) => {
//   try {
//     const { bid_sch_id } = req.body;

//     // Step 1: Get the total amount for the scheme
//     const findAmountTotalQuery =
//       "SELECT sch_total ,sch_commission FROM tbl_scheme WHERE sch_id = ?";
//     const schAmountTotalResult = await query(findAmountTotalQuery, [
//       bid_sch_id,
//     ]);

//     if (!schAmountTotalResult || schAmountTotalResult.length === 0) {
//       return res
//         .status(404)
//         .send({ status: false, message: "No scheme found" });
//     }

//     const schTotal = schAmountTotalResult[0].sch_total;
//     const commission = schAmountTotalResult[0].sch_commission;

//     console.log(schTotal);
//     console.log(commission);

//     const now = new Date();
//     const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

//     const findAmountTotalQuery1 = `
//          SELECT bid_mem_id, bid_amount 
//          FROM tbl_bidding 
//          WHERE bid_sch_id = ? AND created_at BETWEEN ? AND ?
//          ORDER BY bid_amount DESC 
//          LIMIT 1
//        `;
//     const schAmountTotalResult1 = await query(findAmountTotalQuery1, [
//       bid_sch_id,
//       last24Hours,
//       now,
//     ]);

//     if (!schAmountTotalResult1 || schAmountTotalResult1.length === 0) {
//       return res.status(404).send({
//         status: false,
//         message: "No bid found for the provided scheme in the last 24 hours",
//       });
//     }

//     const highestBid = schAmountTotalResult1[0].bid_amount;

//     console.log(highestBid);

//     const winnerAmount = schTotal - highestBid;
//     const temp = (schTotal - winnerAmount) * (commission / 100);
//     console.log(temp);

//     // Step 2: Get the last voucher ID
//     const findLastVoucherIdQuery =
//       "SELECT v_id FROM tbl_vaoucher ORDER BY v_id DESC LIMIT 1";
//     const recentVoucherIdResult = await query(findLastVoucherIdQuery);

//     if (!recentVoucherIdResult || recentVoucherIdResult.length === 0) {
//       return res
//         .status(404)
//         .send({ status: false, message: "No voucher found" });
//     }

//     const recent_v_id = recentVoucherIdResult[0].v_id;
//     const agency_id = 2;

//     // Step 3: Insert a transaction entry for the agency
//     const insertTransactionQuery =
//       "INSERT INTO tbl_transaction (t_vid, t_mem_id, t_amount, t_sch_id,t_remark) VALUES (?, ?, ?, ?,?)";
//     await query(insertTransactionQuery, [
//       recent_v_id,
//       agency_id,
//       temp,
//       bid_sch_id,
//       4,
//     ]);

//     return res.status(200).send({
//       status: true,
//       message: "Transaction entry inserted successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .send({ status: false, message: "Internal Server Error" });
//   }
// };








const trasactionentrymember3 = async (req, res) => {
  try {
    const { bid_sch_id,bid_bcdate_id } = req.body;
    // Step 1: Get the total amount for the scheme
    const findAmountTotalQuery1 =
      "SELECT sch_total ,sch_commission FROM tbl_scheme WHERE sch_id = ?";
    const schAmountTotalResult1 = await query(findAmountTotalQuery1, [
      bid_sch_id,
    ]);

    if (!schAmountTotalResult1 || schAmountTotalResult1.length === 0) {
      return res
        .status(404)
        .send({ status: false, message: "No scheme found" });
    }

    const schTotal = schAmountTotalResult1[0].sch_total;
    const commission = schAmountTotalResult1[0].sch_commission;

    

    // Step 2: Get the highest bid amount for the scheme in the last 24 hours using created_at field
    const findAmountTotalQuery = `
        SELECT bid_mem_id, bid_amount 
        FROM tbl_bidding 
        WHERE bid_sch_id = ? AND bid_bcdate_id = ?
        ORDER BY bid_amount DESC 
        LIMIT 1
      `;
    const schAmountTotalResult = await query(findAmountTotalQuery, [
      bid_sch_id,
     bid_bcdate_id
    ]);

    if (!schAmountTotalResult || schAmountTotalResult.length === 0) {
      return res.status(404).send({
        status: false,
        message: "No bid found for the provided scheme in the last 24 hours",
      });
    }

    const highestBid = schAmountTotalResult[0];
    const { bid_mem_id, bid_amount } = highestBid;
console.log(bid_amount)
    // Step 3: Get the last voucher ID
    const findLastVoucherIdQuery =
      "SELECT v_id FROM tbl_vaoucher ORDER BY v_id DESC LIMIT 1";
    const recentVoucherIdResult = await query(findLastVoucherIdQuery);

    if (!recentVoucherIdResult || recentVoucherIdResult.length === 0) {
      return res
        .status(404)
        .send({ status: false, message: "No voucher found" });
    }

    const recent_v_id = recentVoucherIdResult[0].v_id;


console.log(schTotal)
console.log(bid_amount)
    const winnerAmount = schTotal - bid_amount;

    const remark = 3;

    // Step 4: Insert a transaction entry for the highest bid
    const insertTransactionQuery =
      "INSERT INTO tbl_transaction (t_vid, t_mem_id, t_amount, t_sch_id, t_remark,t_bcdate_id) VALUES (?, ?, ?, ? , ? , ?)";
    await query(insertTransactionQuery, [
      recent_v_id,
      bid_mem_id,
      winnerAmount,
      bid_sch_id,
      remark,
      bid_bcdate_id
    ]);

    return res.status(200).send({
      status: true,
      message: "Transaction entry inserted successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ status: false, message: "Internal Server Error" });
  }
};


























































// const trasactionentrymember4 = async (req, res) => {
//   try {
//     const { bid_sch_id } = req.body;

//     // Step 1: Get the total amount for the scheme
//     const findAmountTotalQuery =
//       "SELECT sch_total ,sch_commission ,sch_commission_amount,sch_status,sch_fiexd_total FROM tbl_scheme WHERE sch_id = ?";
//     const schAmountTotalResult = await query(findAmountTotalQuery, [
//       bid_sch_id,
//     ]);

//     if (!schAmountTotalResult || schAmountTotalResult.length === 0) {
//       return res
//         .status(404)
//         .send({ status: false, message: "No scheme found" });
//     }

//     const schTotal = schAmountTotalResult[0].sch_total;
//     const commission = schAmountTotalResult[0].sch_commission;
//     const commission_amount = schAmountTotalResult[0].sch_commission_amount;
//     const sch_status = schAmountTotalResult[0].sch_status;
//     const sch_fiexd_total = schAmountTotalResult[0].sch_fiexd_total;



//     // console.log(schTotal);
//     // console.log(commission);

//     const now = new Date();
//     const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

//     const findAmountTotalQuery1 = `
//          SELECT bid_mem_id, bid_amount 
//          FROM tbl_bidding 
//          WHERE bid_sch_id = ? AND created_at BETWEEN ? AND ?
//          ORDER BY bid_amount DESC 
//          LIMIT 1
//        `;
//     const schAmountTotalResult1 = await query(findAmountTotalQuery1, [
//       bid_sch_id,
//       last24Hours,
//       now,
//     ]);

//     if (!schAmountTotalResult1 || schAmountTotalResult1.length === 0) {
//       return res.status(404).send({
//         status: false,
//         message: "No bid found for the provided scheme in the last 24 hours",
//       });
//     }

//     const highestBid = schAmountTotalResult1[0].bid_amount;

//     console.log(highestBid);

//   let temp=0;
// if(sch_status===1){
//   const winnerAmount = sch_fiexd_total - highestBid;
//    temp = (sch_fiexd_total - winnerAmount) * (commission / 100);
// }



// if(sch_status===0){
//   // const winnerAmount1 = schTotal - highestBid;
//  temp = commission_amount;
// }
  


//     console.log(temp);

//     // Step 2: Get the last voucher ID
//     const findLastVoucherIdQuery =
//       "SELECT v_id FROM tbl_vaoucher ORDER BY v_id DESC LIMIT 1";
//     const recentVoucherIdResult = await query(findLastVoucherIdQuery);

//     if (!recentVoucherIdResult || recentVoucherIdResult.length === 0) {
//       return res
//         .status(404)
//         .send({ status: false, message: "No voucher found" });
//     }

//     const recent_v_id = recentVoucherIdResult[0].v_id;
//     const agency_id = 2;

//     // Step 3: Insert a transaction entry for the agency
//     const insertTransactionQuery =
//       "INSERT INTO tbl_transaction (t_vid, t_mem_id, t_amount, t_sch_id,t_remark) VALUES (?, ?, ?, ?,?)";
//     await query(insertTransactionQuery, [
//       recent_v_id,
//       agency_id,
//       temp,
//       bid_sch_id,
//       4,
//     ]);

//     return res.status(200).send({
//       status: true,
//       message: "Transaction entry inserted successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .send({ status: false, message: "Internal Server Error" });
//   }
// };








const trasactionentrymember4 = async (req, res) => {
  try {
    const { bid_sch_id,bid_bcdate_id } = req.body;

    // Step 1: Get the total amount for the scheme
    const findAmountTotalQuery =
      "SELECT sch_total ,sch_commission ,sch_commission_amount,sch_status,sch_fiexd_total FROM tbl_scheme WHERE sch_id = ?";
    const schAmountTotalResult = await query(findAmountTotalQuery, [
      bid_sch_id,
    ]);

    if (!schAmountTotalResult || schAmountTotalResult.length === 0) {
      return res
        .status(404)
        .send({ status: false, message: "No scheme found" });
    }

    const schTotal = schAmountTotalResult[0].sch_total;
    const commission = schAmountTotalResult[0].sch_commission;
    const commission_amount = schAmountTotalResult[0].sch_commission_amount;
    const sch_status = schAmountTotalResult[0].sch_status;
    const sch_fiexd_total = schAmountTotalResult[0].sch_fiexd_total;



    // console.log(schTotal);
    // console.log(commission);

  

    const findAmountTotalQuery1 = `
         SELECT bid_mem_id, bid_amount 
         FROM tbl_bidding 
         WHERE bid_sch_id = ? AND bid_bcdate_id = ?
         ORDER BY bid_amount DESC 
         LIMIT 1
       `;
    const schAmountTotalResult1 = await query(findAmountTotalQuery1, [
      bid_sch_id,
      bid_bcdate_id
    ]);

    if (!schAmountTotalResult1 || schAmountTotalResult1.length === 0) {
      return res.status(404).send({
        status: false,
        message: "No bid found for the provided scheme in the last 24 hours",
      });
    }

    const highestBid = schAmountTotalResult1[0].bid_amount;

    console.log(highestBid);

  let temp=0;
if(sch_status===1){
  const winnerAmount = sch_fiexd_total - highestBid;
   temp = (sch_fiexd_total - winnerAmount) * (commission / 100);
}



if(sch_status===0){
  // const winnerAmount1 = schTotal - highestBid;
 temp = commission_amount;
}
  


    console.log(temp);

    // Step 2: Get the last voucher ID
    const findLastVoucherIdQuery =
      "SELECT v_id FROM tbl_vaoucher ORDER BY v_id DESC LIMIT 1";
    const recentVoucherIdResult = await query(findLastVoucherIdQuery);

    if (!recentVoucherIdResult || recentVoucherIdResult.length === 0) {
      return res
        .status(404)
        .send({ status: false, message: "No voucher found" });
    }

    const recent_v_id = recentVoucherIdResult[0].v_id;
    const agency_id = 2;

    // Step 3: Insert a transaction entry for the agency
    const insertTransactionQuery =
      "INSERT INTO tbl_transaction (t_vid, t_mem_id, t_amount, t_sch_id, t_remark ,t_bcdate_id) VALUES (?, ?, ?, ?, ? ,?)";
    await query(insertTransactionQuery, [
      recent_v_id,
      agency_id,
      temp,
      bid_sch_id,
      4,
      bid_bcdate_id
    ]);

    return res.status(200).send({
      status: true,
      message: "Transaction entry inserted successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ status: false, message: "Internal Server Error" });
  }
};


























// const trasactionentrymember5 = async (req, res) => {
//   try {
//     const { bid_sch_id } = req.body;

//     // Step 1: Get all schmem_mem_id associated with the provided sch_id
//     const findMemberQuery =
//       "SELECT schmem_mem_id FROM tbl_schememember WHERE schmem_sch_id = ?";
//     const members = await query(findMemberQuery, [bid_sch_id]);

//     if (members.length === 0) {
//       return res.status(404).send({
//         status: false,
//         message: "No members found for the provided scheme ID",
//       });
//     }

//     const memIds = members.map((row) => row.schmem_mem_id);

//     // Step 2: Get the total for the scheme
//     const findAmounTotalrHeadQuery =
//       "SELECT sch_total,sch_commission,sch_month FROM tbl_scheme WHERE sch_id = ?";
//     const schAmountTResult = await query(findAmounTotalrHeadQuery, [
//       bid_sch_id,
//     ]);

//     if (!schAmountTResult || schAmountTResult.length === 0) {
//       return res
//         .status(404)
//         .send({ status: false, message: "No scheme found" });
//     }

//     const schATHead = schAmountTResult[0].sch_total;
//     const schC = schAmountTResult[0].sch_commission;
//     const schM = schAmountTResult[0].sch_month;

//     // Step 3: Get the last voucher ID
//     const findLastVoucherIdQuery =
//       "SELECT v_id FROM tbl_vaoucher ORDER BY v_id DESC LIMIT 1";
//     const recentVoucherIdResult = await query(findLastVoucherIdQuery);

//     if (!recentVoucherIdResult || recentVoucherIdResult.length === 0) {
//       return res
//         .status(404)
//         .send({ status: false, message: "No voucher found" });
//     }

//     const recent_v_id = recentVoucherIdResult[0].v_id;

//     // Step 4: Calculate the start time for the last 24 hours
//     const now = new Date();
//     const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

//     // Step 2: Get the highest bid amount for the scheme in the last 24 hours using created_at field
//     const findAmountTotalQuery = `
//          SELECT bid_mem_id, bid_amount 
//          FROM tbl_bidding 
//          WHERE bid_sch_id = ? AND created_at BETWEEN ? AND ?
//          ORDER BY bid_amount DESC 
//          LIMIT 1
//        `;
//     const schAmountTotalResult = await query(findAmountTotalQuery, [
//       bid_sch_id,
//       last24Hours,
//       now,
//     ]);

    
//     if (!schAmountTotalResult || schAmountTotalResult.length === 0) {
//       return res.status(404).send({
//         status: false,
//         message: "No bid found for the provided scheme in the last 24 hours",
//       });
//     }

//     const highestBid = schAmountTotalResult[0];
//     const { bid_mem_id, bid_amount } = highestBid;

//     const temp1 = schATHead - bid_amount;
//     // console.log(temp1)

//     const temp = (schATHead - temp1) * schC;

//     const schcommissionA = temp * 0.01;

//     const remaingA = (schATHead - temp1 - schcommissionA) / schM;

//     // console.log(schATHead)
//     // console.log(bid_amount)
//     // console.log(schcommissionA)
//     // console.log(remaingA)

//     // Step 4: Insert transaction entries for each member using map and Promise.all
//     const insertTransactionQuery =
//       "INSERT INTO tbl_transaction (t_vid, t_mem_id, t_amount, t_sch_id,t_remark) VALUES (?, ?, ?, ?, ?)";

//     await Promise.all(
//       memIds.map((memId) =>
//         query(insertTransactionQuery, [
//           recent_v_id,
//           memId,
//           remaingA,
//           bid_sch_id,
//           5,
//         ])
//       )
//     );
//     return res.status(200).send({
//       status: true,
//       message: "Transaction entries inserted successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .send({ status: false, message: "Internal Server Error" });
//   }
// };

















////////////////////////////////////////payment //////////////////////////////////////////////








const trasactionentrymember5 = async (req, res) => {
  try {
    const { bid_sch_id,bid_bcdate_id } = req.body;

    // Step 1: Get all schmem_mem_id associated with the provided sch_id
    const findMemberQuery =
      "SELECT schmem_mem_id FROM tbl_schememember WHERE schmem_sch_id = ?";
    const members = await query(findMemberQuery, [bid_sch_id]);

    if (members.length === 0) {
      return res.status(404).send({
        status: false,
        message: "No members found for the provided scheme ID",
      });
    }

    const memIds = members.map((row) => row.schmem_mem_id);

    // Step 2: Get the total for the scheme
    const findAmounTotalrHeadQuery =
      "SELECT sch_total,sch_commission,sch_month FROM tbl_scheme WHERE sch_id = ?";
    const schAmountTResult = await query(findAmounTotalrHeadQuery, [
      bid_sch_id,
    ]);

    if (!schAmountTResult || schAmountTResult.length === 0) {
      return res
        .status(404)
        .send({ status: false, message: "No scheme found" });
    }

    const schATHead = schAmountTResult[0].sch_total;
    const schC = schAmountTResult[0].sch_commission;
    const schM = schAmountTResult[0].sch_month;

    // Step 3: Get the last voucher ID
    const findLastVoucherIdQuery =
      "SELECT v_id FROM tbl_vaoucher ORDER BY v_id DESC LIMIT 1";
    const recentVoucherIdResult = await query(findLastVoucherIdQuery);

    if (!recentVoucherIdResult || recentVoucherIdResult.length === 0) {
      return res
        .status(404)
        .send({ status: false, message: "No voucher found" });
    }

    const recent_v_id = recentVoucherIdResult[0].v_id;

    // Step 4: Calculate the start time for the last 24 hours
    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Step 2: Get the highest bid amount for the scheme in the last 24 hours using created_at field
    const findAmountTotalQuery = `
         SELECT bid_mem_id, bid_amount 
         FROM tbl_bidding 
         WHERE bid_sch_id = ? AND bid_bcdate_id = ?
         ORDER BY bid_amount DESC 
         LIMIT 1
       `;
    const schAmountTotalResult = await query(findAmountTotalQuery, [
      bid_sch_id,
      bid_bcdate_id
    ]);

    
    if (!schAmountTotalResult || schAmountTotalResult.length === 0) {
      return res.status(404).send({
        status: false,
        message: "No bid found for the provided scheme in the last 24 hours",
      });
    }

    const highestBid = schAmountTotalResult[0];
    const { bid_mem_id, bid_amount } = highestBid;

    const temp1 = schATHead - bid_amount;
    // console.log(temp1)

    const temp = (schATHead - temp1) * schC;

    const schcommissionA = temp * 0.01;

    const remaingA = (schATHead - temp1 - schcommissionA) / schM;

    // console.log(schATHead)
    // console.log(bid_amount)
    // console.log(schcommissionA)
    // console.log(remaingA)

    // Step 4: Insert transaction entries for each member using map and Promise.all
    const insertTransactionQuery =
      "INSERT INTO tbl_transaction (t_vid, t_mem_id, t_amount, t_sch_id, t_remark,t_bcdate_id) VALUES (?, ?, ?, ?, ? , ? )";

    await Promise.all(
      memIds.map((memId) =>
        query(insertTransactionQuery, [
          recent_v_id,
          memId,
          remaingA,
          bid_sch_id,
          5,
          bid_bcdate_id
        ])
      )
    );
    return res.status(200).send({
      status: true,
      message: "Transaction entries inserted successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ status: false, message: "Internal Server Error" });
  }
};



























































// const trasactionentrymember6 = async (req, res) => {
//   try {
//     const { sch_name, mem_name, amount } = req.body;
//     if (!sch_name || !mem_name || !amount) {
//       return res
//         .status(400)
//         .send({ status: false, message: "Please provide all required fields" });
//     }
//     // Step 1: Get the member ID associated with the provided mem_name
//     const findMemberQuery = "SELECT mem_id FROM tbl_member WHERE mem_name = ?";
//     const members = await query(findMemberQuery, [mem_name]);

//     if (members.length === 0) {
//       return res.status(404).send({
//         status: false,
//         message: "No members found with the provided member name",
//       });
//     }
//     const memberId = members[0].mem_id;
//     // Step 2: Get the scheme ID associated with the provided sch_name
//     const findSchemeIdQuery =
//       "SELECT sch_id FROM tbl_scheme WHERE sch_name = ?";
//     const schemes = await query(findSchemeIdQuery, [sch_name]);

//     if (schemes.length === 0) {
//       return res.status(404).send({
//         status: false,
//         message: "No schemes found with the provided scheme name",
//       });
//     }
//     const schemeId = schemes[0].sch_id;
//     // Step 3: Get the last voucher ID
//     const findLastVoucherIdQuery =
//       "SELECT v_id FROM tbl_vaoucher ORDER BY v_id DESC LIMIT 1";
//     const recentVoucherIdResult = await query(findLastVoucherIdQuery);

//     if (!recentVoucherIdResult || recentVoucherIdResult.length === 0) {
//       return res.status(404).send({
//         status: false,
//         message: "No voucher found",
//       });
//     }

//     const recent_v_id = recentVoucherIdResult[0].v_id;

//     // Step 4: Insert the transaction for the member and the agency
//     const insertTransactionQuery =
//       "INSERT INTO tbl_transaction (t_vid, t_mem_id, t_amount, t_sch_id, t_remark) VALUES (?, ?, ?, ?, ?), (?, ?, ?, ?, ?)";
//     await query(insertTransactionQuery, [
//       recent_v_id,
//       memberId,
//       amount,
//       schemeId,
//       6,
//       recent_v_id,
//       1,
//       -amount,
//       schemeId,
//       6,
//     ]);

//     return res.status(200).send([
//       {
//         status: true,
//         message: "Transaction entry inserted successfully",
//       },
//     ]);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send({
//       status: false,
//       message: "Internal Server Error",
//     });
//   }
// };











const trasactionentrymember6 = async (req, res) => {
  try {
    const { sch_name, mem_name, amount, bcdate_id } = req.body;
    if (!sch_name || !mem_name || !amount,!bcdate_id) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide all required fields" });
    }
    // Step 1: Get the member ID associated with the provided mem_name
    const findMemberQuery = "SELECT mem_id FROM tbl_member WHERE mem_name = ?";
    const members = await query(findMemberQuery, [mem_name]);

    if (members.length === 0) {
      return res.status(404).send({
        status: false,
        message: "No members found with the provided member name",
      });
    }
    const memberId = members[0].mem_id;
    // Step 2: Get the scheme ID associated with the provided sch_name
    const findSchemeIdQuery =
      "SELECT sch_id FROM tbl_scheme WHERE sch_name = ?";
    const schemes = await query(findSchemeIdQuery, [sch_name]);

    if (schemes.length === 0) {
      return res.status(404).send({
        status: false,
        message: "No schemes found with the provided scheme name",
      });
    }
    const schemeId = schemes[0].sch_id;
    // Step 3: Get the last voucher ID
    const findLastVoucherIdQuery =
      "SELECT v_id FROM tbl_vaoucher ORDER BY v_id DESC LIMIT 1";
    const recentVoucherIdResult = await query(findLastVoucherIdQuery);

    if (!recentVoucherIdResult || recentVoucherIdResult.length === 0) {
      return res.status(404).send({
        status: false,
        message: "No voucher found",
      });
    }

    const recent_v_id = recentVoucherIdResult[0].v_id;

    // Step 4: Insert the transaction for the member and the agency
    const insertTransactionQuery =
      "INSERT INTO tbl_transaction (t_vid, t_mem_id, t_amount, t_sch_id, t_remark,t_bcdate_id) VALUES (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?)";
    await query(insertTransactionQuery, [
      recent_v_id,
      memberId,
      amount,
      schemeId,
      6,
      bcdate_id,
      recent_v_id,
      1,
      -amount,
      schemeId,
      6,
      bcdate_id
    ]);

    return res.status(200).send([
      {
        status: true,
        message: "Transaction entry inserted successfully",
      },
    ]);
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: false,
      message: "Internal Server Error",
    });
  }
};






















// const trasactionentrymember7 = async (req, res) => {
//   try {
//     const { sch_name, mem_name, amount } = req.body;
//     if (!sch_name || !mem_name || !amount) {
//       return res
//         .status(400)
//         .send({ status: false, message: "Please provide all required fields" });
//     }
//     // Step 1: Get the member ID associated with the provided mem_name
//     const findMemberQuery = "SELECT mem_id FROM tbl_member WHERE mem_name = ?";
//     const members = await query(findMemberQuery, [mem_name]);

//     if (members.length === 0) {
//       return res.status(404).send({
//         status: false,
//         message: "No members found with the provided member name",
//       });
//     }
//     const memberId = members[0].mem_id;
//     // Step 2: Get the scheme ID associated with the provided sch_name
//     const findSchemeIdQuery =
//       "SELECT sch_id FROM tbl_scheme WHERE sch_name = ?";
//     const schemes = await query(findSchemeIdQuery, [sch_name]);

//     if (schemes.length === 0) {
//       return res.status(404).send({
//         status: false,
//         message: "No schemes found with the provided scheme name",
//       });
//     }
//     const schemeId = schemes[0].sch_id;
//     // Step 3: Get the last voucher ID
//     const findLastVoucherIdQuery =
//       "SELECT v_id FROM tbl_vaoucher ORDER BY v_id DESC LIMIT 1";
//     const recentVoucherIdResult = await query(findLastVoucherIdQuery);

//     if (!recentVoucherIdResult || recentVoucherIdResult.length === 0) {
//       return res.status(404).send({
//         status: false,
//         message: "No voucher found",
//       });
//     }

//     const recent_v_id = recentVoucherIdResult[0].v_id;

//     // Step 4: Insert the transaction for the member and the agency
//     const insertTransactionQuery =
//       "INSERT INTO tbl_transaction (t_vid, t_mem_id, t_amount, t_sch_id, t_remark) VALUES (?, ?, ?, ?, ?), (?, ?, ?, ?, ?)";
//     await query(insertTransactionQuery, [
//       recent_v_id,
//       memberId,
//       -amount,
//       schemeId,
//       7,
//       recent_v_id,
//       1,
//       amount,
//       schemeId,
//       7,
//     ]);

//     return res.status(200).send([
//       {
//         status: true,
//         message: "Transaction entry inserted successfully",
//       },
//     ]);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send({
//       status: false,
//       message: "Internal Server Error",
//     });
//   }
// };








const trasactionentrymember7 = async (req, res) => {
  try {
    const { sch_name, mem_name, amount,bcdate_id } = req.body;
    if (!sch_name || !mem_name || !amount || !bcdate_id) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide all required fields" });
    }
    // Step 1: Get the member ID associated with the provided mem_name
    const findMemberQuery = "SELECT mem_id FROM tbl_member WHERE mem_name = ?";
    const members = await query(findMemberQuery, [mem_name]);

    if (members.length === 0) {
      return res.status(404).send({
        status: false,
        message: "No members found with the provided member name",
      });
    }
    const memberId = members[0].mem_id;
    // Step 2: Get the scheme ID associated with the provided sch_name
    const findSchemeIdQuery =
      "SELECT sch_id FROM tbl_scheme WHERE sch_name = ?";
    const schemes = await query(findSchemeIdQuery, [sch_name]);

    if (schemes.length === 0) {
      return res.status(404).send({
        status: false,
        message: "No schemes found with the provided scheme name",
      });
    }
    const schemeId = schemes[0].sch_id;
    // Step 3: Get the last voucher ID
    const findLastVoucherIdQuery =
      "SELECT v_id FROM tbl_vaoucher ORDER BY v_id DESC LIMIT 1";
    const recentVoucherIdResult = await query(findLastVoucherIdQuery);

    if (!recentVoucherIdResult || recentVoucherIdResult.length === 0) {
      return res.status(404).send({
        status: false,
        message: "No voucher found",
      });
    }

    const recent_v_id = recentVoucherIdResult[0].v_id;

    // Step 4: Insert the transaction for the member and the agency
    const insertTransactionQuery =
      "INSERT INTO tbl_transaction (t_vid, t_mem_id, t_amount, t_sch_id, t_remark,t_bcdate_id) VALUES (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?)";
    await query(insertTransactionQuery, [
      recent_v_id,
      memberId,
      -amount,
      schemeId,
      7,
      bcdate_id,
      recent_v_id,
      1,
      amount,
      schemeId,
      7,
      bcdate_id
    ]);

    return res.status(200).send([
      {
        status: true,
        message: "Transaction entry inserted successfully",
      },
    ]);
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: false,
      message: "Internal Server Error",
    });
  }
};



















module.exports = {
  trasactionentrymember1,
  trasactionentrymember2,
  trasactionentrymember3,
  trasactionentrymember4,
  trasactionentrymember5,
  trasactionentrymember6,
  trasactionentrymember7,
  trasactionentrymember8
};




// ///////
// 1=consider Payment
// 2=TOTAL amount
// 3=winnerData
// 4=commission
// 5=ALL getValues
// 6=RECEIPT
// 7=Payment
// ////////////////