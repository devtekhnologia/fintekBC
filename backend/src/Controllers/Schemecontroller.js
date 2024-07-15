const { query } = require("../utils/database");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");


const createScheme = async (req, res) => {
  try {
    const {
      sch_name,
      sch_starting_date,
      sch_month,
      sch_amount_per_head,
      sch_total,
      sch_fiexd_total,
      sch_status,
      sch_commission,
      sch_commission_amount
    } = req.body;

    // Convert empty string to null for sch_commission and sch_commission_amount
    const commission = sch_commission === '' ? null : sch_commission;
    const commissionAmount = sch_commission_amount === '' ? null : sch_commission_amount;

    // Validation logic
    if (
      !sch_name ||
      !sch_starting_date ||
      !sch_month ||
      !sch_amount_per_head ||
      !sch_total ||
      !sch_fiexd_total ||
      !sch_status ||
      (sch_status === "Scheme Brokerage" && !commission) ||
      (sch_status === "scheme Brokerage Amount" && !commissionAmount)
    ) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide all required fields" });
    }

    const checkAgencyQuery = "SELECT * FROM tbl_scheme WHERE sch_name = ?";
    const existingAgency = await query(checkAgencyQuery, [sch_name]);

    if (existingAgency.length > 0) {
      return res
        .status(200)
        .send({ status: false, message: "Scheme already exists" });
    }

    let status1 = sch_status === "Scheme Brokerage" ? 1 : 0;
let sch_total1=0;
    if(status1===0){
      sch_total1=sch_total-commissionAmount;
    }
    
    if(status1===1){
      sch_total1=sch_total;
    }

    const insertAgencyQuery =
      "INSERT INTO tbl_scheme (sch_name, sch_starting_date, sch_month, sch_amount_per_head, sch_total,sch_fiexd_total, sch_status, sch_commission, sch_commission_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ? ,?)";
    const result = await query(insertAgencyQuery, [
      sch_name,
      sch_starting_date,
      sch_month,
      sch_amount_per_head,
      sch_total1,
      sch_fiexd_total,
      status1,
      commission,
      commissionAmount
    ]);
    const insertedId = result.insertId;

    return res.status(200).send({
      status: true,
      data: insertedId,
      message: "Scheme created successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, message: "Internal server error" });
  }
};



const updatecommission = async (req, res) => {
  try {
    const {
      sch_id,
      sch_status,
      sch_commission,
      sch_commission_amount
    } = req.body;

    // Convert empty string to null for sch_commission and sch_commission_amount
    const commission = sch_commission === '' ? null : sch_commission;
    const commissionAmount = sch_commission_amount === '' ? null : sch_commission_amount;

    // Validation logic
    if (
      !sch_id ||
      !sch_status ||
      (sch_status === "Change Scheme Brokerage" && !commission) ||
      (sch_status === "Change Brokerage Amount" && !commissionAmount)
    ) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide all required fields" });
    }

    let status1 = sch_status === "Change Scheme Brokerage" ? 1 : 0;

    const updateQuery = `
      UPDATE tbl_scheme 
      SET 
        sch_status = ?,
        sch_commission = ?,
        sch_commission_amount = ?
      WHERE 
        sch_id = ?;
    `;

    const result = await query(updateQuery, [
      status1,
      commission,
      commissionAmount,
      sch_id
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).send({ status: false, message: "Scheme not found" });
    }

    return res.status(200).send({
      status: true,
      message: "Scheme updated successfully", 
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, message: "Internal server error" });
  }
};









const updatotal = async (req, res) => {
  const { sch_id } = req.body;

  try {
    if (!sch_id) {
      return res.status(400).send({
        status: false,
        message: "Please provide sch_id",
      });
    }

    const getPaymentQuery = `
      SELECT sch_total, sch_status, sch_commission, sch_commission_amount,sch_fiexd_total
      FROM tbl_scheme
      WHERE sch_id = ?
    `;
    const totalamount = await query(getPaymentQuery, [sch_id]);

    if (totalamount.length === 0) {
      return res.status(404).send({
        status: false,
        message: "Scheme not found",
      });
    }

    const sch_status = totalamount[0].sch_status;
    const sch_commission_amount = totalamount[0].sch_commission_amount;
    const sch_total = totalamount[0].sch_total;
    const sch_fiexd_total = totalamount[0].sch_fiexd_total;
    console.log(sch_status);

    if (sch_status === 1) {
      console.log("hello")
      const updatePaymentQuery = `
        UPDATE tbl_scheme
        SET sch_total = ?
        WHERE sch_id = ?
      `;
      await query(updatePaymentQuery, [sch_fiexd_total, sch_id]);

      return res.status(400).send({
        status: true,
        message: "update succefully",
      });
    }

    const updated_total = sch_fiexd_total - sch_commission_amount;

    if (sch_status === 0) {
      const updatePaymentQuery = `
        UPDATE tbl_scheme
        SET sch_total = ?
        WHERE sch_id = ?
      `;
      await query(updatePaymentQuery, [updated_total, sch_id]);
      
      const updatedAmount = await query(getPaymentQuery, [sch_id]);

      console.log(updatedAmount);
      return res.status(200).send({
        status: true,
        data: updatedAmount,
        message: "Total amount updated and retrieved successfully",
      });
    }

  
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, message: "Internal server error" });
  }
};









const getSchemeData = async (req, res) => {
  try {
    const getAllUsersQuery = "SELECT * FROM tbl_scheme";
    const userData = await query(getAllUsersQuery);
    console.log(userData);
    return res.status(200).send({
      status: true,
      data: userData,
      message: "User data retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};



const gettotalaomunt = async (req, res) => {
  const { sch_id } = req.body;
  try {
    if (!sch_id) {
      return res.status(400).send({
        status: false,
        message: "Please provide sch_id",
      });
    }

    const getPaymentQuery = `
                SELECT sch_total
                FROM 
                    tbl_scheme
                WHERE 
              sch_id = ?
            `;
    const totalamount = await query(getPaymentQuery, [sch_id]);
    console.log(totalamount);
    return res.status(200).send({
      status: true,
      data: totalamount,
      message: "Total amount retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};


const addschememember = async (req, res) => {
  try {
    const { mem_name, sch_id } = req.body;
    console.log(req.body);

    if (!mem_name || !sch_id) {
      return res.status(400).send({ status: false, message: "Please provide all required fields" });
    }

    // Find the member ID based on the member name
    const findMemberQuery = "SELECT mem_id FROM tbl_member WHERE mem_name = ?";
    const [member] = await query(findMemberQuery, [mem_name]);

    if (!member) {
      return res.status(404).send({ status: false, message: "Member not found" });
    }

    const mem_id = member.mem_id;

    // Check if the member is already assigned to the scheme
    const checkSchemeQuery = "SELECT * FROM tbl_schememember WHERE schmem_sch_id = ? AND schmem_mem_id = ?";
    const [existingAssignment] = await query(checkSchemeQuery, [mem_id, sch_id]);

    if (existingAssignment) {
      return res.status(200).send({ status: false, message: "Member is already assigned to this scheme" });
    }

    // Insert the new scheme assignment
    const insertSchemeQuery = "INSERT INTO tbl_schememember (schmem_sch_id, schmem_mem_id) VALUES (?, ?)";
    const result = await query(insertSchemeQuery, [sch_id, mem_id]);

    return res.status(200).send({
      status: true,
      data: result.insertId, // Assuming insertId is the ID of the newly inserted row
      message: "Scheme created successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};



const fechSchemeinformation = async (req, res) => {
  try {
    const { sch_id } = req.body;

    if (!sch_id) {
      return res.status(400).send({ status: false, message: "Please provide the scheme ID" });
    }

    // Get all member IDs associated with the scheme
    const getMemberIdsQuery = "SELECT schmem_mem_id FROM tbl_schememember WHERE schmem_sch_id = ?";
    const members = await query(getMemberIdsQuery, [sch_id]);
    console.log(members);

    if (!members.length) {
      return res.status(404).send({ status: false, message: "No members found for the scheme" });
    }

    const memberInfoPromises = members.map(member => {
      const getMemberInfoQuery = "SELECT * FROM tbl_member WHERE mem_id = ?";
      return query(getMemberInfoQuery, [member.schmem_mem_id]);
    });

    // Resolve all promises to get member information
    const memberInfoResults = await Promise.all(memberInfoPromises);

    // Flatten the array of arrays and filter out any empty results
    const memberInfo = memberInfoResults.flat();

    if (!memberInfo.length) {
      return res.status(404).send({ status: false, message: "No member information found" });
    }

    // Send the collected member information in array format
    return res.status(200).send({
      status: true,
      data: memberInfo,
      message: "Member information retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};









// const createScheme1 = async (req, res) => {
//   try {
//     const { sch_id, mem_name } = req.body;

//     if (!sch_id || !mem_name) {
//       return res.status(400).send({ status: false, message: "Please provide the scheme ID and Member name" });
//     }

//     // Step 1: Find mem_id from tbl_member based on mem_name
//     const findMemberIdQuery = "SELECT mem_id FROM tbl_member WHERE mem_name = ?";
//     const [member] = await query(findMemberIdQuery, [mem_name]);

//     if (!member) {
//       return res.status(404).send({ status: false, message: "Member not found" });
//     }

//     const mem_id = member.mem_id;

//     // Step 2: Check if the association already exists
//     const checkAssociationQuery = "SELECT * FROM tbl_schememember WHERE schmem_mem_id = ? AND schmem_sch_id = ?";
//     const existingAssociation = await query(checkAssociationQuery, [mem_id, sch_id]);

//     if (existingAssociation.length > 0) {
//       return res.status(409).send({ status: false, message: "Association already exists" });
//     }








//     // Insert the association into tbl_schememember
//     const insertAssociationQuery = "INSERT INTO tbl_schememember (schmem_sch_id, schmem_mem_id) VALUES (?, ?)";
//     await query(insertAssociationQuery, [sch_id, mem_id]);

//     return res.status(200).send({ status: true, message: "Association inserted successfully" });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).send({ status: false, message: err.message });
//   }
// };








//on the scheme id basis find the member_is from tbl_schememember  and after that on the mem_id bases get mem_name from tbl_member and return the in array format


const createScheme1 = async (req, res) => {
  try {
    const { sch_id, mem_name } = req.body;

    if (!sch_id || !mem_name) {
      return res.status(400).send({ status: false, message: "Please provide the scheme ID and Member name" });
    }

    // Step 1: Find mem_id from tbl_member based on mem_name
    const findMemberIdQuery = "SELECT mem_id FROM tbl_member WHERE mem_name = ?";
    const [member] = await query(findMemberIdQuery, [mem_name]);

    if (!member) {
      return res.status(404).send({ status: false, message: "Member not found" });
    }

    const mem_id = member.mem_id;

    // Step 2: Check if the association already exists
    const checkAssociationQuery = "SELECT * FROM tbl_schememember WHERE schmem_mem_id = ? AND schmem_sch_id = ?";
    const existingAssociation = await query(checkAssociationQuery, [mem_id, sch_id]);

    if (existingAssociation.length > 0) {
      return res.status(409).send({ status: false, message: "Association already exists" });
    }


    const checkTotal = "SELECT sch_month FROM tbl_scheme WHERE sch_id = ?";
    const totalMonthsResult = await query(checkTotal, [sch_id]);
    
    // Query to get the total number of members in the scheme
    const totalRecord = "SELECT * FROM tbl_schememember WHERE schmem_sch_id = ?";
    const totalMembersResult = await query(totalRecord, [sch_id]);
    
    // Extract the total number of months and members
    const totalMonths = totalMonthsResult[0].sch_month
    const totalMembers = totalMembersResult.length;

    console.log(totalMonths);
    console.log(totalMembers);

if(totalMembers<totalMonths){
  const insertAssociationQuery = "INSERT INTO tbl_schememember (schmem_sch_id, schmem_mem_id) VALUES (?, ?)";
  await query(insertAssociationQuery, [sch_id, mem_id]);

  return res.status(200).send({ status: true, message: "Add member successfully" });

}else
{
  return res.status(200).send({ status: false, message: "Limit of member ids done" });
}











    

    // Insert the association into tbl_schememember
    
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};





const getMemberDataOnScheme= async (req, res) => {
  const { sch_id } = req.body;

  if (!sch_id) {
    return res.status(400).send({
      status: false,
      message: "Please provide a sch_id",
    });
  }


  


  try {
    // Get member_ids from tbl_schememember based on sch_id
    const memberIdsResult = await query('SELECT schmem_mem_id FROM tbl_schememember WHERE schmem_sch_id = ?', [sch_id]);
    const memberIds = memberIdsResult.map(row => row.schmem_mem_id );

    if (memberIds.length === 0) {
      return res.status(404).send({
        status: false,
        message: "No members found for the given sch_id",
      });
    }

    // Get member names from tbl_member based on member_ids
    const membersResult = await query('SELECT mem_name FROM tbl_member WHERE mem_id IN (?)', [memberIds]);

    const memberNames = membersResult.map(row => row.mem_name);

    return res.status(200).send({
      status: true,
      data: memberNames,
      message: "Member Name information retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      status: false,
      message: err.message,
    });
  }
};

/////////////////////////////////////////////////////////////////////////////

const getMemberDataOnSchemebidding = async (req, res) => {
  const { sch_id } = req.body;

  if (!sch_id) {
    return res.status(400).send({
      status: false,
      message: "Please provide a sch_id",
    });
  }

  try {
    // Get member_ids from tbl_schememember based on sch_id
    const memberIdsResult = await query('SELECT schmem_mem_id FROM tbl_schememember WHERE schmem_sch_id = ?', [sch_id]);
    const memberIds = memberIdsResult.map(row => row.schmem_mem_id);

    if (memberIds.length === 0) {
      return res.status(404).send({
        status: false,
        message: "No members found for the given sch_id",
      });
    }

    // Get member_ids from tbl_transaction based on sch_id and t_remark
    const memberIdsResult1 = await query('SELECT t_mem_id FROM tbl_transaction WHERE t_sch_id = ? AND t_remark = ?', [sch_id, 3]);
    const memberIds1 = memberIdsResult1.map(row => row.t_mem_id);

    // Filter out the common member IDs
    const uniqueMemberIds = memberIds.filter(id => !memberIds1.includes(id));

    if (uniqueMemberIds.length === 0) {
      return res.status(404).send({
        status: false,
        message: "No unique members found for the given sch_id",
      });
    }

    // Get member names from tbl_member based on unique member_ids
    const membersResult = await query('SELECT mem_name FROM tbl_member WHERE mem_id IN (?)', [uniqueMemberIds]);
    const memberNames = membersResult.map(row => row.mem_name);

    return res.status(200).send({
      status: true,
      data: memberNames,
      message: "Member Name information retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      status: false,
      message: err.message,
    });
  }
};



//   const { sch_id } = req.body;

//   if (!sch_id) {
//     return res.status(400).send({
//       status: false,
//       message: "Please provide a sch_id",
//     });
//   }

//   try {
    
//     const getBiddingQuery = 'SELECT bcdate_id FROM tbl_bcdate WHERE dc_sch_id = ? AND bc_status = ? ORDER BY bcdate_id LIMIT 1';
//     const result = await query(getBiddingQuery, [sch_id, false]);
    
//   const bcdate_id=result[0].bcdate_id;

//     // Get member names from tbl_member based on unique member_ids
//     const membersResult = await query('SELECT m.mem_name, m.mem_mobile, m.mem_address, b.bid_month, b.bid_amountFROM tbl_member m JOIN tbl_bidding b ON m.mem_id = b.bid_mem_id WHERE b.bid_sch_id = ? AND b.bid_bcdate_id = ?', [uniqueMemberIds]);
//     const memberNames =await query('membersResult',[sch_id,bcdate_id]);

//     return res.status(200).send({
//       status: true,
//       data: memberNames,
//       message: "Member Name information retrieved successfully",
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).send({
//       status: false,
//       message: err.message,
//     });
//   }
// };

// const getMemberDataOnSchemebidding = async (req, res) => {
//   const { sch_id } = req.body;

//   if (!sch_id) {
//     return res.status(400).send({
//       status: false,
//       message: "Please provide a sch_id",
//     });
//   }

//   try {
//     // Get the latest bcdate_id where bc_status is false
//     const getBiddingQuery = 'SELECT bcdate_id FROM tbl_bcdate WHERE dc_sch_id = ? AND bc_status = ? ORDER BY bcdate_id LIMIT 1';
//     const result = await query(getBiddingQuery, [sch_id, false]);
//     const bcdate_id = result[0].bcdate_id;


//     // Get member names from tbl_member based on bid_sch_id and bid_bcdate_id
//     const memberNamesQuery = `
//       SELECT m.mem_name, m.mem_mobile, m.mem_address, b.bid_month, b.bid_amount
//       FROM tbl_member m
//       JOIN tbl_bidding b ON m.mem_id = b.bid_mem_id
//       WHERE b.bid_sch_id = ? AND b.bid_bcdate_id = ?
//     `;
//     const memberNames = await query(memberNamesQuery, [sch_id, bcdate_id]);

//     return res.status(200).send({
//       status: true,
//       data: memberNames,
//       message: "Member Name information retrieved successfully",
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).send({
//       status: false,
//       message: err.message,
//     });
//   }
// };




///////////////////////////////////////////////////////////
const getSchemeName = async (req, res) => {
  try {
    const getAllUsersQuery = "SELECT sch_name FROM tbl_scheme";
    const userData = await query(getAllUsersQuery);
    const memberNames = userData.map(user => user.sch_name);
    console.log(memberNames);
    return res.status(200).send({
      status: true,
      data: memberNames,
      message: "schemeName data retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};



const deleteMemberscheme = async (req, res) => {
  const { mem_id, sch_id } = req.body; 
  try {
    const deleteQuery = "DELETE FROM tbl_schememember WHERE schmem_mem_id = ? AND schmem_sch_id = ?";
    await query(deleteQuery, [mem_id, sch_id]);

    return res.status(200).send({
      status: true,
      message: "Member deleted successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};



const deleteScheme = async (req, res) => {
  const { sch_id } = req.body; 
  try {
    const deleteQuery = "DELETE FROM tbl_scheme WHERE sch_id = ?";
    await query(deleteQuery, [sch_id]);

    return res.status(200).send({
      status: true,
      message: "Scheme deleted successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};




const CheckTotaladdschememember = async (req, res) => {
  const { sch_id } = req.body;
  try {
    // Query to get the total number of months in the scheme
    const checkTotal = "SELECT sch_month FROM tbl_scheme WHERE sch_id = ?";
    const totalMonthsResult = await query(checkTotal, [sch_id]);
    
    // Query to get the total number of members in the scheme
    const totalRecord = "SELECT * FROM tbl_schememember WHERE schmem_sch_id = ?";
    const totalMembersResult = await query(totalRecord, [sch_id]);
    
    // Extract the total number of months and members
    const totalMonths = totalMonthsResult[0].sch_month
    const totalMembers = totalMembersResult.length;

    console.log(totalMonths);
    console.log(totalMembers);
    
    // Check if the number of members matches the number of months
    if (totalMembers >= totalMonths) {
      return res.status(200).send({
        status: true,
        message: "The number of members matches or exceeds the number of months in the scheme",
      });
    } else {
      return res.status(200).send({
        status: false,
        message: "The number of members is less than the number of months in the scheme",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};


















module.exports = { createScheme, getSchemeData, gettotalaomunt,addschememember,createScheme1 ,getMemberDataOnScheme,getSchemeName,deleteMemberscheme,fechSchemeinformation,deleteScheme,updatecommission,updatotal,getMemberDataOnSchemebidding,CheckTotaladdschememember};


