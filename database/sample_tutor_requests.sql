-- Sample tutor request data
INSERT INTO tutor_requests (location, phone, requirement_details, subjects, student_level, tutoring_type, meeting_preferences, travel_distance, budget, gender_preference, time_preference, languages, attachment_urls, status) 
VALUES 
('Mumbai, Andheri West', '+91 9876543210', 'Need help with calculus and advanced mathematics', 'Mathematics, Calculus', 'University', 'In-person', 'Student''s home', 5, 1500.00, 'No preference', 'Weekday evenings', 'English, Hindi', NULL, 'pending'),

('Delhi, Rohini', '+91 8765432109', 'Looking for Physics tutor for JEE preparation', 'Physics', '12th Standard', 'Hybrid', 'Online and tutor''s place', 3, 2000.00, 'Male', 'Weekend mornings', 'English, Hindi', 'https://example.com/physics_syllabus.pdf', 'pending'),

('Bangalore, Whitefield', '+91 7654321098', 'English speaking and writing improvement', 'English Language', '8th Standard', 'Online', 'Google Meet preferred', NULL, 1200.00, 'Female', 'Weekday afternoons', 'English, Kannada', NULL, 'in-progress'),

('Chennai, T Nagar', '+91 6543210987', 'Chemistry tutor needed for NEET preparation', 'Chemistry, Biology', '11th Standard', 'In-person', 'Student''s home', 7, 2500.00, 'No preference', 'Daily 2 hours', 'English, Tamil', NULL, 'pending'),

('Pune, Kothrud', '+91 9876543211', 'Computer Science programming basics', 'Computer Science, Python', 'College', 'Online', 'Zoom meetings', NULL, 1800.00, 'No preference', 'Flexible timing', 'English', 'https://example.com/cs_requirements.doc', 'accepted'),

('Hyderabad, Gachibowli', '+91 8876543212', 'Need help with Business Studies', 'Business Studies, Economics', '12th Standard', 'Hybrid', 'Both online and in-person', 10, 1700.00, 'Female', 'Morning sessions', 'English, Telugu', NULL, 'pending'),

('Kolkata, Salt Lake', '+91 7776543213', 'Sanskrit language learning from basics', 'Sanskrit', '9th Standard', 'In-person', 'Tutor''s place', 4, 1000.00, 'No preference', 'Weekend only', 'Bengali, English', NULL, 'pending'),

('Mumbai, Powai', '+91 6676543214', 'Guitar lessons for beginner', 'Music - Guitar', 'Beginner', 'In-person', 'Student''s home', 6, 2000.00, 'No preference', 'Evening slots', 'English, Hindi', NULL, 'accepted'),

('Bangalore, Koramangala', '+91 9976543215', 'GMAT preparation - Quant section', 'GMAT - Quantitative', 'Graduate', 'Online', 'Zoom or Teams', NULL, 3000.00, 'Male', 'Late evenings', 'English', 'https://example.com/gmat_prep.pdf', 'in-progress'),

('Delhi, Vasant Kunj', '+91 8876543216', 'History tutor for UPSC preparation', 'History', 'UPSC', 'Hybrid', 'Flexible', 8, 2500.00, 'No preference', 'Morning or evening', 'English, Hindi', NULL, 'pending'),

('Chennai, Adyar', '+91 7776543217', 'Need help with Accountancy', 'Accountancy', '11th Standard', 'In-person', 'Student''s home', 5, 1500.00, 'Female', 'After school hours', 'English, Tamil', NULL, 'accepted'),

('Pune, Viman Nagar', '+91 6676543218', 'French language basics to advanced', 'French', 'Beginner', 'Online', 'Google Meet', NULL, 2000.00, 'Female', 'Weekend slots', 'English, Hindi', NULL, 'pending'),

('Hyderabad, Madhapur', '+91 9976543219', 'IIT-JEE Mathematics coaching', 'Mathematics', '11th Standard', 'In-person', 'Student''s home', 10, 3500.00, 'Male', 'Evening slots', 'English, Telugu', 'https://example.com/jee_math.pdf', 'in-progress'),

('Mumbai, Bandra', '+91 8876543220', 'Drawing and painting classes', 'Art', 'Intermediate', 'In-person', 'Tutor''s place', 7, 1800.00, 'No preference', 'Weekend afternoons', 'English, Hindi', NULL, 'pending'),

('Bangalore, Indiranagar', '+91 7776543221', 'Java programming for interviews', 'Computer Science, Java', 'Professional', 'Online', 'Teams preferred', NULL, 2500.00, 'No preference', 'Late evenings', 'English', NULL, 'accepted'),

('Delhi, Dwarka', '+91 6676543222', 'Science tutor for middle school', 'Science', '7th Standard', 'In-person', 'Student''s home', 4, 1200.00, 'Female', 'After school', 'English, Hindi', NULL, 'pending'),

('Chennai, Velachery', '+91 9976543223', 'Vedic Mathematics coaching', 'Mathematics', '9th Standard', 'Hybrid', 'Both options', 6, 1500.00, 'Male', 'Morning slots', 'English, Tamil', NULL, 'in-progress'),

('Pune, Kalyani Nagar', '+91 8876543224', 'IELTS preparation - all modules', 'English, IELTS', 'Test Prep', 'Online', 'Zoom meetings', NULL, 2800.00, 'No preference', 'Flexible timing', 'English', 'https://example.com/ielts_req.pdf', 'pending'),

('Kolkata, Ballygunge', '+91 7776543225', 'Classical dance training', 'Dance - Bharatanatyam', 'Beginner', 'In-person', 'Tutor''s place', 8, 2000.00, 'Female', 'Evening slots', 'Bengali, English', NULL, 'accepted'),

('Hyderabad, Kondapur', '+91 6676543226', 'Statistics for Data Science', 'Statistics, Data Science', 'Graduate', 'Online', 'Any platform', NULL, 2200.00, 'No preference', 'Weekend only', 'English', 'https://example.com/stats_syllabus.pdf', 'pending'); 






CREATE TABLE tutor_experience (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tutor_id VARCHAR(12) NOT NULL,
    company VARCHAR(150),
    role VARCHAR(100),
    start_month VARCHAR(100),
    start_year VARCHAR(20),
    end_month VARCHAR(100),
    end_year VARCHAR(20),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE `tutor_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `profile_pic_url` varchar(255) DEFAULT NULL,
  `profile_tag_line` varchar(200) DEFAULT NULL,
  `profile_desc` text DEFAULT NULL,
  `intro_video_url` varchar(500) DEFAULT NULL,
  `street_add` text DEFAULT NULL,
  `state` varchar(300) DEFAULT NULL,
  `city` varchar(300) DEFAULT NULL,
    
  `fee_max` varchar(300) DEFAULT NULL,
  `fee_min` varchar(300) DEFAULT NULL,
  `fee_charged_for` varchar(100) DEFAULT NULL,
  `fee_details` text DEFAULT NULL,
    
  `tutoring_preferences` varchar(600) NOT NULL,
  `language_preferences` text DEFAULT NULL,
  `travel_distance` int(11) DEFAULT NULL,
  `can_do_assignmnet` varchar(50) DEFAULT NULL,

  `user_id` int(11) NOT NULL,
  `tutor_id` varchar(50) NOT NULL,
 
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    account_status VARCHAR(50) DEFAULT 'pending',
    PRIMARY KEY (`id`)
);

-- accoubt status 
-- pending - 1
-- approved - 2
-- rejected - 3
-- blocked - 4
-- suspended - 5
-- deleted - 6
-- expired - 7

CREATE TABLE tutor_skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tutor_id VARCHAR(50) NOT NULL,
    skill_name VARCHAR(200),
    from_level VARCHAR(200),
    to_level VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE tutor_education (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tutor_id VARCHAR(50) NOT NULL,
    degree_name VARCHAR(200),
    speciality VARCHAR(300),
    university VARCHAR(300),
    end_year VARCHAR(200),
    score VARCHAR(200) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);