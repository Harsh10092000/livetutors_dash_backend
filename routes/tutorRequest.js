import express from "express";
import { fetchTutorRequest} from "../controllers/tutorRequest.js";
// import { verifyJwt } from "../controllers/verifyjwt.js";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { db } from "../connect.js";

const router = express.Router();

// Function to generate request ID
const generateRequestId = () => {
  const prefix = "LT-";
  const randomNum = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
  return prefix + randomNum;
};

// Function to create URL-friendly string
const generateUrlString = (data, requestId) => {

  // Convert tutoring type
  //const tutoringType = data.tutoringTypes?.toLowerCase() || 'online';
  const typeMap = {
    'Online (using Zoom etc)': 'online',
    'At my place (home/institute)': 'home',
    'Travel to tutor': ''
  };
  const tutoringType = typeMap[data.tutoringTypes] || 'tutor';

  // Clean and format subjects
  const subjects = data.subjects
    ?.split(',')
    .map(s => s.trim())
    .join('-')
    .toLowerCase()
    .replace(/\s+/g, '-');
  
  // Clean location
  const location = (data.city || data.streetAddress || '')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

const cleaned_requestId = (requestId)
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  // Determine tutor/teacher word
  const teacherWord = tutoringType.includes('home') ? 'teacher' : 'tutor';
  
  // Combine all parts
  const urlParts = [
    tutoringType,
    subjects,
    teacherWord,
    'required',
    'in',
    location,
    cleaned_requestId
  ].filter(Boolean); // Remove any empty parts

  return urlParts.join('-');
};

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/tutor_documents");
  },
  filename: (req, file, cb) => {
    // Generate unique request ID if not already generated
    if (!req.generatedRequestId) {
      let requestId;
      do {
        requestId = generateRequestId();
      } while (req.existingRequestIds?.includes(requestId)); // Keep generating until unique
      req.generatedRequestId = requestId;
    }
    
    // Create filename with request ID
    cb(
      null,
      file.fieldname + "-" + req.generatedRequestId + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB
  }
});

// Handle multiple file uploads
router.post("/submitrequesttutor", upload.array("files", 5), async (req, res) => {
  try {
    // Check if request ID already exists
    const checkQuery = "SELECT request_id FROM tutor_requests WHERE request_id = ?";
    let requestId;
    
    // Keep generating until we get a unique ID
    do {
      requestId = req.generatedRequestId || generateRequestId();
      // eslint-disable-next-line no-loop-func
      const [exists] = await db.promise().query(checkQuery, [requestId]);
      if (exists.length === 0) break;
      req.generatedRequestId = null; // Reset and try again if exists
    } while (true);

    // Generate URL-friendly string
    const urlString = generateUrlString(req.body, requestId);

    // Basic request data
    const requestData = {
      request_id: requestId,
      location: req.body.streetAddress,
      phone: req.body.phone,
      requirement_details: req.body.requirementDetails,
      subjects: req.body.subjects,
      student_level: req.body.studentLevel,
      tutoring_type: req.body.tutoringTypes,
      meeting_preferences: req.body.timePreferenceType,
      travel_distance: req.body.travelDistance,
      budget: req.body.budget,
      gender_preference: req.body.genderPreference,
      time_preference: req.body.timePreference,
      languages: req.body.languages,
      status: 'pending',
      created_at: new Date(),
      state: req.body.state,
      city: req.body.city,
      url: urlString,
      user_id: req.body.user_id,
      name: req.body.name,
      email: req.body.email,

    };

    // File URLs
    if (req.files && req.files.length > 0) {
      requestData.attachment_urls = req.files.map(file => file.filename).join(',');
    }

    // Insert into database
    const q = "INSERT INTO tutor_requests SET ?";
    
    db.query(q, requestData, (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({
          error: "Database error occurred",
          details: err.message
        });
      }

      return res.status(200).json({
        message: "Tutor request submitted successfully",
        requestId: requestId,
        url: urlString,
        files: req.files ? req.files.map(f => f.filename) : []
      });
    });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      error: "An error occurred while processing your request",
      details: error.message
    });
  }
});

router.get("/fetchTutorRequest/:userId", fetchTutorRequest);

export default router;
