import { db } from "../connect.js";


export const checkTutorId = (req, res) => {
  const q = "SELECT tutor_id from tutor_info where tutor_id = ?";
  db.query(q, [req.params.tutorId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};


export const getTutorImageIsActive = (req, res) => {
  const q = "SELECT profile_pic_url, is_active from tutor_info where user_id = ?";
  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};


export const fetchBasicInfo = (req, res) => {
  const q = "SELECT name, email, phone, gender, profile_pic_url, profile_tag_line, profile_desc, tutor_id from tutor_info where user_id = ?";
  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchVideoInfo = (req, res) => {
  const q = "SELECT intro_video_url from tutor_info where user_id = ?";
  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};


export const fetchAddressInfo = (req, res) => {
  const q = "SELECT street_add, state, city from tutor_info where user_id = ?";
  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchFeeInfo = (req, res) => {
  const q = "SELECT fee_max, fee_min, fee_charged_for, fee_details from tutor_info where user_id = ?";
  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchTutorPreferences = (req, res) => {
  const q = "SELECT tutoring_preferences, language_preferences, travel_distance, can_do_assignmnet from tutor_info where user_id = ?";
  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchEducationInfo = (req, res) => {
  const q = "SELECT * from tutor_education where user_id = ?";
  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchSkillsInfo = (req, res) => {
  const q = "SELECT * from tutor_skills where user_id = ?";
  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchTutorExperience = (req, res) => {
  const q = "SELECT * from tutor_experience where user_id = ?";
  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};


export const fetchTeachingExperience = (req, res) => {
  const q = "SELECT total_exp_yrs, online_exp, total_online_exp_yrs from tutor_info where user_id = ?";
  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addVideoInfo = (req, res) => {
  const q = "update tutor_info set intro_video_url = ? where user_id = ?";
  console.log("req.body", req.body);
  const values = [req.body.url, req.body.user_id];
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Added Successfully");
  });
};

export const addAddressInfo = (req, res) => {
  const q =
    "update tutor_info set street_add = ?, state = ?, city = ? where user_id = ?";
  const values = [
    req.body.streetAddress,
    req.body.state,
    req.body.city,
    req.body.user_id,
  ];
  db.query(q, values, (err, data) => {
    console.log(values);
    if (err) return res.status(500).json(err);
    return res.status(200).json("Added Successfully");
  });
};

export const addFeeInfo = (req, res) => {
  const q =
    "update tutor_info set fee_max = ?, fee_min = ?, fee_charged_for = ?, fee_details = ? where user_id = ?";
  const values = [
    req.body.fee_max,
    req.body.fee_min,
    req.body.fee_charged_for,
    req.body.fee_details,
    req.body.user_id,
  ];
  db.query(q, values, (err, data) => {
    console.log(values);
    if (err) return res.status(500).json(err);
    return res.status(200).json("Added Successfully");
  });
};




export const addTutorPreferences = (req, res) => {
  console.log("req.body", req.body);
  
  // Convert arrays to JSON strings for database storage
  const tutoringPreferences = Array.isArray(req.body.tutoringTypes) ? JSON.stringify(req.body.tutoringTypes) : req.body.tutoringTypes;
  const languagePreferences = Array.isArray(req.body.languages) ? JSON.stringify(req.body.languages) : req.body.languages;
  
  const q =
    "update tutor_info set tutoring_preferences = ?, language_preferences = ?, travel_distance = ?, can_do_assignmnet = ? where user_id = ?";
  const values = [
    tutoringPreferences,
    languagePreferences,
    req.body.travelDistance,
    req.body.assignmentHelp,
    req.body.user_id,
  ];
  db.query(q, values, (err, data) => {
    console.log("SQL values:", values);
    if (err) return res.status(500).json(err);
    return res.status(200).json("Added Successfully");
  });
};

export const addEducationInfo = (req, res) => {
  console.log("req.body", req.body);
  const stateValues = req.body.map((values) => [
    values.degree,
    values.specialization,
    values.institution,
    values.year,
    values.grade,
    values.user_id,
  ]);

  const q =
    "INSERT INTO tutor_education ( degree_name, speciality, university, end_year, score, user_id) Values ?";
  db.query(q, [stateValues], (err, data) => {
    console.log(stateValues);
    if (err) return res.status(500).json(err);
    return res.status(200).json("Added Successfully");

  });
}


export const deleteEducationInfo = (req, res) => {
  const checkEducation = "SELECT * FROM tutor_education WHERE user_id = ?";
  db.query(checkEducation, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0) {
      const q = "DELETE FROM tutor_education WHERE user_id = ?";
      db.query(q, [req.params.userId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Deleted Successfully");
      });
    } else {
      return res.status(200).json("No education found");
    }
  });
};

export const addSkillsInfo = (req, res) => {
  console.log("req.body", req.body);

  const stateValues = req.body.map((values) => [
    values.skill,
    values.from,
    values.to,
    values.user_id,
  ]);
  const q = "INSERT INTO tutor_skills ( skill_name, from_level, to_level, user_id) Values ?";

  db.query(q, [stateValues], (err, data) => {
    console.log(stateValues);
    if (err) return res.status(500).json(err);
    return res.status(200).json("Added Successfully");
  });

};


export const deleteSkillsInfo = (req, res) => {
  const checkSkills = "SELECT * FROM tutor_skills WHERE user_id = ?";
  db.query(checkSkills, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0) {
      const q = "DELETE FROM tutor_skills WHERE user_id = ?";
      db.query(q, [req.params.userId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Deleted Successfully");
      });
    } else {
      return res.status(200).json("No skills found");
    }
  });
};



export const addTeachingExperience = (req, res) => {
  const q = "update tutor_info set total_exp_yrs = ?, online_exp = ?, total_online_exp_yrs = ? where user_id = ?";
  const values = [
    req.body.totalExpYrs,
    req.body.onlineExp,
    req.body.totalOnlineExpYrs,
    req.body.user_id,
  ];
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Added Successfully");
  });
}


export const addTutorExperience = (req, res) => {
  console.log("req.body", req.body);
  
  // Check if req.body is an array (multiple experiences) or single object
  const experiences = Array.isArray(req.body) ? req.body : [req.body];
  
  const stateValues = experiences.map((values) => [
    values.company,
    values.role,
    values.start_month,
    values.start_year,
    values.end_month,
    values.end_year,
    values.description,
    values.association,
    values.user_id,
  ]);

  const q = "INSERT INTO tutor_experience ( company, role, start_month, start_year, end_month, end_year, description, association, user_id) Values ?";
  
  db.query(q, [stateValues], (err, data) => {
    console.log("SQL values:", stateValues);
    if (err) return res.status(500).json(err);
    return res.status(200).json("Added Successfully");
  });
};


export const deleteTutorExperience = (req, res) => {
  const checkTutorExperience = "SELECT * FROM tutor_experience WHERE user_id = ?";
  db.query(checkTutorExperience, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0) {
      const q = "DELETE FROM tutor_experience WHERE user_id = ?";
      db.query(q, [req.params.userId], (err, data) => {
        if (err) return res.status(500).json(err);  
        return res.status(200).json("Deleted Successfully");
      });
    } else {
      return res.status(200).json("No tutor experience found");
    }
  });
};



