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
    const q = "SELECT intro_video_url from tutor_info where tutor_id = ?";
    db.query(q, [req.params.tutorId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  };


  export const fetchAddressInfo = (req, res) => {
    const q = "SELECT street_add, state, city from tutor_info where tutor_id = ?";
    db.query(q, [req.params.tutorId], (err, data) => {
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
    const q = "SELECT tutoring_preferences, language_preferences, travel_distance, can_do_assignmnet from tutor_info where tutor_id = ?";
    db.query(q, [req.params.tutorId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  };

  export const fetchEducationInfo = (req, res) => {
    const q = "SELECT * from tutor_education where tutor_id = ?";
    db.query(q, [req.params.tutorId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  };

  export const fetchSkillsInfo = (req, res) => {
    const q = "SELECT * from tutor_skills where tutor_id = ?";
    db.query(q, [req.params.tutorId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  };

  export const fetchTutorExperience = (req, res) => {
    const q = "SELECT * from tutor_experience where tutor_id = ?";
    const q2 = "SELECT total_exp_yrs, online_exp, total_online_exp_yrs from tutor_info where tutor_id = ?";
    db.query(q, [req.params.tutorId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
    db.query(q2, [req.params.tutorId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  };

  export const addAddressInfo = (req, res) => {
    const q =
      "update tutor_address set street_add = ?, state = ?, city = ? where tutor_id = ?";
    const values = [
      req.body.street_add,
      req.body.state,
      req.body.city,
      req.params.tutorId,
    ];
      db.query(q, [values], (err, data) => {
        console.log(values);
        if (err) return res.status(500).json(err);
        return res.status(200).json("Added Successfully");
      });
  };

  export const addFeeInfo = (req, res) => {
    const q =
      "update tutor_fee set fee_max = ?, fee_min = ?, fee_charged_for = ?, fee_details = ? where tutor_id = ?";
    const values = [
      req.body.fee_max,
      req.body.fee_min,
      req.body.fee_charged_for,
      req.body.fee_details,
      req.params.tutorId,
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
    const stateValues = req.body.tutor_skills.map((values) => [
        values.skill_name,
        values.from_level,
        values.to_level,
        req.params.tutorId,
      ]);

  db.query(q, [stateValues], (err, data) => {
    const q =
    "INSERT INTO tutor_skills ( skill_name, from_level, to_level, tutor_id) Values (?)";    
    const values = [
        req.body.skill_name,
        req.body.from_level,
        req.body.to_level,
        req.params.tutorId,
      ];
    db.query(q, [values], (err, data) => {
    console.log(stateValues);
    if (err) return res.status(500).json(err);
    return res.status(200).json("Added Successfully");
  });
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


// export const fetchAdDataById = (req, res) => {
//   const q = "SELECT * FROM ad_module where ad_id = ?";
//   db.query(q, [req.params.adId], (err, data) => {
//     if (err) return res.status(500).json(err);
//     return res.status(200).json(data);
//   });
// };


// export const fetchAllData = (req, res) => {
// updateAdListing();
//   //const q = "SELECT * FROM ad_module";
//   const q = "SELECT ad_module.*,  IF( DATEDIFF(ad_created_at, CONVERT_TZ(NOW(), '+00:00', '+05:30')) < -ad_days, '0', '1') as status  FROM ad_module;"
//   db.query(q, (err, data) => {
//     if (err) return res.status(500).json(err);
//     return res.status(200).json(data);
//   });
// };

// export const deleteAd = (req, res) => {
//   const q =
//     "DELETE ad_module from ad_module WHERE ad_id = ?";
//   db.query(q, [req.params.adId], (err, data) => {
//     if (err) return res.status(500).json(err);
//     return res.status(200).json("DELETED");
//   });
// };


// export const updateAdListingStatus = (req, res) => {
//   const q = "UPDATE ad_module SET ad_listed = ? WHERE ad_id = ?";
//   const values = [req.body.ad_listed, req.body.ad_id];
//   db.query(q, values, (err, data) => {
//     console.log(values);
//     if (err) return res.status(500).json(err);
//     return res.status(200).json("Updated Successfully");
//   });
// };