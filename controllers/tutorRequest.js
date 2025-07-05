import { db } from "../connect.js";
import "dotenv/config";

export const fetchTutorRequest = (req, res) => {
    //await verifyJwt(req,res);
    const q = `
      select * from tutor_requests
  WHERE 
      tutor_requests.user_id = ? order by id desc;
      `;
    db.query(q, [req.params.userId], (err, data) => {
      if (err) return res.status(500).json(err);
  
      return res.status(200).json(data);
    });
  };