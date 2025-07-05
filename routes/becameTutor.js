import express from "express";
import { checkTutorId, getTutorImageIsActive, fetchBasicInfo, fetchVideoInfo, fetchAddressInfo, fetchFeeInfo, fetchTutorPreferences, fetchEducationInfo, fetchSkillsInfo, fetchTutorExperience, addAddressInfo, addFeeInfo, addTutorPreferences, addEducationInfo, addSkillsInfo, addTutorExperience } from "../controllers/becameTutor.js";
import multer from "multer";
import path from "path";
import { db } from "../connect.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/tutorImages");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage,
});

const generateTutorId = () => {
  // Generate unique tutor ID using timestamp + random string
  // Format: LT-YYYYMMDD-HHMMSS-RANDOM
  const now = new Date();
  const timestamp = now.getFullYear().toString() +
                   (now.getMonth() + 1).toString().padStart(2, '0') +
                   now.getDate().toString().padStart(2, '0') + '-' +
                   now.getHours().toString().padStart(2, '0') +
                   now.getMinutes().toString().padStart(2, '0') +
                   now.getSeconds().toString().padStart(2, '0') +
                   now.getMilliseconds().toString().padStart(3, '0');
  
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `LT-${timestamp}-${randomStr}`;
}



router.post("/addBasicInfo", upload.single("image"), (req, res) => {
  console.log("req.body : ", req.body);
  console.log("req.file : ", req.file);
  
  // Generate unique tutor ID
  const tutorId = generateTutorId();
  
  const q = "INSERT INTO tutor_info (name, email, phone, gender, profile_pic_url, profile_tag_line, profile_desc, user_id, tutor_id) Values (?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.phone,
    req.body.gender,
    req.file ? req.file.filename : "",
    req.body.profile_tag_line,
    req.body.profile_desc,
    req.body.user_id,
    tutorId,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json({ 
      message: "Inserted Successfully",
      tutorId: tutorId 
    });
  });
});

router.put("/updateBasicInfo/:tutorId", upload.single("image"), (req, res) => {
  console.log("req.body : ", req.body);
  console.log("req.file : ", req.file);
  
  const q = "UPDATE tutor_info SET name = ?, email = ?, phone = ?, gender = ?, profile_pic_url = ?, profile_tag_line = ?, profile_desc = ? WHERE tutor_id = ?";
  const values = [
    req.body.name,
    req.body.email,
    req.body.phone,
    req.body.gender,
    req.file ? req.file.filename : req.body.profile_pic_url,
    req.body.profile_tag_line,
    req.body.profile_desc,
    req.params.tutorId,
  ];
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("updated successfully");
  });
});

// router.put("/updateAd", upload.single("image"), (req, res) => {
//     //console.log("req.body : ", req.body);
//     //console.log("req.file : ", req.file);
//     const q =
//       "UPDATE ad_module SET ad_type = ?, ad_link = ?, ad_days = ?, ad_image  = ? WHERE ad_id = ?";
//     const values = [
//       req.body.ad_type,
//       req.body.ad_link,
//       req.body.ad_days,
//       req.file ? req.file.filename : req.body.ad_image,
//       req.body.ad_id,
//     ];
//     console.log("values : ", req.body);
//     db.query(q, values, (err, data) => {
//       if (err) return res.status(500).json(err);
//       return res.status(200).json("updated successfully");
//       //}
//     });
//   });


router.get("/checkTutorId/:tutorId", checkTutorId);
router.get("/getTutorImageIsActive/:userId", getTutorImageIsActive);
router.get("/fetchBasicInfo/:userId", fetchBasicInfo);
router.get("/fetchVideoInfo/:tutorId", fetchVideoInfo);
router.get("/fetchAddressInfo/:tutorId", fetchAddressInfo);
router.get("/fetchFeeInfo/:tutorId", fetchFeeInfo);
router.get("/fetchTutorPreferences/:tutorId", fetchTutorPreferences);
router.get("/fetchEducationInfo/:tutorId", fetchEducationInfo);
router.get("/fetchSkillsInfo/:tutorId", fetchSkillsInfo);
router.get("/fetchTutorExperience/:tutorId", fetchTutorExperience);
router.put("/addAddressInfo/:tutorId", addAddressInfo);
router.put("/addFeeInfo/:tutorId", addFeeInfo);

export default router;
