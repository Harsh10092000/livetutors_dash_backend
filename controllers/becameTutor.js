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
    const q = "SELECT fee_max, fee_min, fee_charged_for, fee_details from tutor_info where tutor_id = ?";
    db.query(q, [req.params.tutorId], (err, data) => {
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
    const q2 = "SELECT total_exp_yrs, online_exp, total_online_exp_yrs from tutor_info where user_id = ?";
    db.query(q, [req.params.userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
    db.query(q2, [req.params.tutorId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  };

  export const addVideoInfo = (req, res) => {
    const q = "update tutor_info set intro_video_url = ? where user_id = ?";
    console.log("req.body" ,req.body);
    const values = [req.body.url, req.body.user_id];
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Added Successfully");
    });
  };

  export const addAddressInfo = (req, res) => {
    const q =
      "update tutor_address set street_add = ?, state = ?, city = ? where user_id = ?";
    const values = [
      req.body.street_add,
      req.body.state,
      req.body.city,
      req.body.user_id,
    ];
      db.query(q, [values], (err, data) => {
        console.log(values);
        if (err) return res.status(500).json(err);
        return res.status(200).json("Added Successfully");
      });
  };

  export const addFeeInfo = (req, res) => {
    const q =
      "update tutor_fee set fee_max = ?, fee_min = ?, fee_charged_for = ?, fee_details = ? where user_id = ?";
    const values = [
      req.body.fee_max,
      req.body.fee_min,
      req.body.fee_charged_for,
      req.body.fee_details,
      req.body.user_id,
    ];
      db.query(q, [values], (err, data) => {
        console.log(values);
        if (err) return res.status(500).json(err);
        return res.status(200).json("Added Successfully");
      });
  };




  export const addTutorPreferences = (req, res) => {
    const q =
      "update tutor_preferences set tutoring_preferences = ?, language_preferences = ?, travel_distance = ?, can_do_assignmnet = ? where tutor_id = ?";
    const values = [
      req.body.tutoring_preferences,
      req.body.language_preferences,
      req.body.travel_distance, 
      req.body.can_do_assignmnet,
      req.params.tutorId,
    ];
      db.query(q, [values], (err, data) => {
        console.log(values);
        if (err) return res.status(500).json(err);
        return res.status(200).json("Added Successfully");
      });
  };

  export const addEducationInfo = (req, res) => {
    const stateValues = req.body.tutor_education.map((values) => [
        values.degree_name,
        values.degree_type,
        values.start_month,
        values.start_year,
        values.end_month,
        values.end_year,
        values.association,
        values.speciality,
      ]);


    db.query(q, [stateValues], (err, data) => {
    const q =
      "INSERT INTO tutor_education ( degree_name, degree_type, start_month, start_year, end_month, end_year, association, speciality) Values (?)";
    const values = [
      req.body.degree_name,
      req.body.degree_type,
      req.body.start_month, 
      req.body.start_year,
      req.body.end_month,
      req.body.end_year,
      req.body.association,
      req.body.speciality,
      req.params.tutorId,
    ];
    db.query(q, [values], (err, data) => {
      console.log(values);
      if (err) return res.status(500).json(err);
      return res.status(200).json("Added Successfully");
    });
  });
}

export const addSkillsInfo = (req, res) => {
  console.log("req.body" ,req.body);
     
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

export const addTutorExperience = (req, res) => {
    const stateValues = req.body.tutor_experience.map((values) => [
        values.company,
        values.role,
        values.start_month,
        values.start_year,
        values.end_month,   
        values.end_year,
        values.description,
        req.params.tutorId,
      ]);
      
    db.query(q, [stateValues], (err, data) => {
        const q =
        "INSERT INTO tutor_experience ( company, role, start_month, start_year, end_month, end_year, description, tutor_id) Values (?)";
        const values = [
            req.body.company,
            req.body.role,
            req.body.start_month,   
            req.body.start_year,
            req.body.end_month,
            req.body.end_year,
            req.body.description,
            req.params.tutorId,
          ];    
    db.query(q, [values], (err, data) => {
        console.log(stateValues);
        if (err) return res.status(500).json(err);
        return res.status(200).json("Added Successfully");
      });
    });
  };


