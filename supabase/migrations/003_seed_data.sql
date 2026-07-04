-- Seed data for Arogyam
-- Run after 002_create_all_tables.sql

-- ============ FACILITIES ============
insert into facilities (id, name, type, district, taluka, village, overall_risk, risk_score, today_opd, week_avg_opd, doctors_present, doctors_required, nurses_present, nurses_required, total_beds, occupied_beds, high_risk_patients, total_patients, medicine_stock, medicine_required, health_score, doctor_availability, nurse_workload, medicine_risk, disease_risk, bed_occupancy, patient_risk, coordinates)
values
  ('fac-001', 'Primary Health Center - Sarjapur', 'phc', 'Bengaluru Urban', 'Anekal', 'Sarjapur', 'high', 78, 142, 128, 1, 3, 3, 6, 30, 27, 18, 1240, 340, 620, 42, 33, 82, 78, 72, 90, 68, '{"lat":12.9128,"lng":77.6872}'),
  ('fac-002', 'Community Health Center - Whitefield', 'chc', 'Bengaluru Urban', 'Bengaluru East', 'Whitefield', 'critical', 91, 287, 265, 3, 8, 8, 15, 100, 95, 42, 3890, 520, 1200, 29, 37, 88, 85, 79, 95, 82, '{"lat":12.9716,"lng":77.7506}'),
  ('fac-003', 'Primary Health Center - Yelahanka', 'phc', 'Bengaluru Urban', 'Bengaluru North', 'Yelahanka', 'medium', 52, 98, 91, 2, 3, 4, 5, 20, 14, 8, 890, 410, 480, 61, 66, 55, 45, 48, 70, 42, '{"lat":13.1007,"lng":77.5963}'),
  ('fac-004', 'Community Health Center - Mysore Road', 'chc', 'Bengaluru Urban', 'Kengeri', 'Mysore Road', 'high', 74, 215, 198, 4, 7, 9, 14, 80, 68, 28, 2450, 380, 750, 45, 57, 71, 72, 65, 85, 68, '{"lat":12.9216,"lng":77.5016}'),
  ('fac-005', 'Primary Health Center - Hoskote', 'phc', 'Bengaluru Rural', 'Hoskote', 'Hoskote', 'medium', 45, 76, 72, 2, 2, 3, 4, 15, 9, 5, 620, 480, 420, 68, 100, 62, 38, 35, 60, 32, '{"lat":13.0707,"lng":77.7987}'),
  ('fac-006', 'Community Health Center - Tumkur Road', 'chc', 'Bengaluru Urban', 'Bengaluru North', 'Tumkur Road', 'medium', 58, 168, 155, 5, 6, 10, 12, 60, 45, 18, 1890, 620, 680, 55, 83, 67, 52, 48, 75, 55, '{"lat":13.0285,"lng":77.5373}'),
  ('fac-007', 'Primary Health Center - Devanahalli', 'phc', 'Bengaluru Rural', 'Devanahalli', 'Devanahalli', 'low', 28, 52, 48, 2, 2, 3, 3, 10, 5, 2, 380, 380, 320, 78, 100, 42, 22, 25, 50, 18, '{"lat":13.2468,"lng":77.7110}'),
  ('fac-008', 'Community Health Center - K.R. Puram', 'chc', 'Bengaluru Urban', 'Bengaluru East', 'K.R. Puram', 'high', 82, 245, 228, 4, 7, 8, 14, 90, 86, 35, 3120, 410, 920, 35, 57, 85, 68, 72, 96, 78, '{"lat":12.9985,"lng":77.7015}'),
  ('fac-009', 'Primary Health Center - Nelamangala', 'phc', 'Bengaluru Rural', 'Nelamangala', 'Nelamangala', 'low', 22, 45, 42, 2, 2, 3, 3, 10, 4, 1, 310, 350, 280, 82, 100, 38, 18, 22, 40, 15, '{"lat":13.1000,"lng":77.3780}'),
  ('fac-010', 'Community Health Center - Banashankari', 'chc', 'Bengaluru Urban', 'Bengaluru South', 'Banashankari', 'medium', 55, 185, 172, 5, 6, 11, 12, 70, 52, 14, 2100, 560, 650, 58, 83, 58, 48, 42, 74, 48, '{"lat":12.9228,"lng":77.5468}'),
  ('fac-011', 'Primary Health Center - Jigani', 'phc', 'Bengaluru Urban', 'Anekal', 'Jigani', 'low', 32, 62, 58, 2, 2, 3, 4, 10, 6, 3, 450, 320, 300, 72, 100, 48, 28, 30, 60, 25, '{"lat":12.7838,"lng":77.6498}'),
  ('fac-012', 'Community Health Center - Electronic City', 'chc', 'Bengaluru Urban', 'Bengaluru South', 'Electronic City', 'high', 76, 232, 215, 5, 8, 10, 14, 80, 72, 32, 2780, 450, 980, 40, 62, 72, 65, 62, 90, 72, '{"lat":12.8399,"lng":77.6770}'),
  ('fac-013', 'Primary Health Center - Anekal', 'phc', 'Bengaluru Urban', 'Anekal', 'Anekal', 'low', 18, 38, 35, 2, 2, 3, 3, 8, 3, 1, 280, 300, 250, 85, 100, 32, 15, 18, 37, 12, '{"lat":12.7100,"lng":77.6960}'),
  ('fac-014', 'Community Health Center - Rajajinagar', 'chc', 'Bengaluru Urban', 'Bengaluru West', 'Rajajinagar', 'medium', 48, 158, 145, 4, 5, 9, 10, 55, 38, 10, 1680, 420, 520, 62, 80, 52, 42, 38, 69, 42, '{"lat":12.9890,"lng":77.5528}'),
  ('fac-015', 'Primary Health Center - Kengeri', 'phc', 'Bengaluru Urban', 'Kengeri', 'Kengeri', 'low', 25, 48, 45, 2, 2, 3, 3, 10, 4, 2, 340, 280, 260, 80, 100, 35, 20, 22, 40, 18, '{"lat":12.9116,"lng":77.4855}'),
  ('fac-016', 'Community Health Center - Yeshwanthpur', 'chc', 'Bengaluru Urban', 'Bengaluru North', 'Yeshwanthpur', 'medium', 42, 145, 135, 4, 5, 8, 10, 50, 32, 8, 1520, 380, 480, 65, 80, 55, 38, 32, 64, 35, '{"lat":13.0234,"lng":77.5465}')
on conflict (id) do nothing;

-- ============ DOCTORS ============
insert into doctors (id, name, email, phone, specialty, facility_id, facility_name, present, patients_seen, max_capacity, pending_reviews, workload, attendance, avatar, rating, join_date) values
  ('doc-001', 'Dr. Arvind Sharma', 'arvind.sharma@arogyam.in', '+91-9876543210', 'General Medicine', 'fac-001', 'Primary Health Center - Sarjapur', true, 32, 50, 8, 64, 92, '/avatars/doctor-1.png', 4.5, '2022-03-15'),
  ('doc-002', 'Dr. Priya Patel', 'priya.patel@arogyam.in', '+91-9876543211', 'Pediatrics', 'fac-002', 'Community Health Center - Whitefield', true, 28, 40, 12, 70, 88, '/avatars/doctor-2.png', 4.8, '2021-07-01'),
  ('doc-003', 'Dr. Sanjay Verma', 'sanjay.verma@arogyam.in', '+91-9876543212', 'Orthopedics', 'fac-004', 'Community Health Center - Mysore Road', false, 18, 35, 15, 51, 75, '/avatars/doctor-3.png', 4.2, '2023-01-10'),
  ('doc-004', 'Dr. Ananya Singh', 'ananya.singh@arogyam.in', '+91-9876543213', 'Gynecology', 'fac-002', 'Community Health Center - Whitefield', true, 22, 35, 10, 62, 90, '/avatars/doctor-4.png', 4.6, '2020-11-20'),
  ('doc-005', 'Dr. Ravi Kumar', 'ravi.kumar@arogyam.in', '+91-9876543214', 'General Medicine', 'fac-008', 'Community Health Center - K.R. Puram', true, 38, 45, 18, 84, 85, '/avatars/doctor-5.png', 4.1, '2022-06-01'),
  ('doc-006', 'Dr. Meera Nair', 'meera.nair@arogyam.in', '+91-9876543215', 'Pediatrics', 'fac-006', 'Community Health Center - Tumkur Road', true, 25, 40, 8, 62, 95, '/avatars/doctor-6.png', 4.7, '2021-09-15'),
  ('doc-007', 'Dr. Karthik Iyer', 'karthik.iyer@arogyam.in', '+91-9876543216', 'Pulmonology', 'fac-012', 'Community Health Center - Electronic City', false, 20, 35, 14, 57, 78, '/avatars/doctor-7.png', 4.3, '2023-03-01'),
  ('doc-008', 'Dr. Pooja Deshmukh', 'pooja.deshmukh@arogyam.in', '+91-9876543217', 'General Medicine', 'fac-003', 'Primary Health Center - Yelahanka', true, 30, 45, 6, 66, 93, '/avatars/doctor-8.png', 4.4, '2022-01-20'),
  ('doc-009', 'Dr. Vikram Joshi', 'vikram.joshi@arogyam.in', '+91-9876543218', 'Cardiology', 'fac-010', 'Community Health Center - Banashankari', true, 24, 35, 10, 68, 87, '/avatars/doctor-9.png', 4.9, '2020-05-10'),
  ('doc-010', 'Dr. Sita Raman', 'sita.raman@arogyam.in', '+91-9876543219', 'Gynecology', 'fac-014', 'Community Health Center - Rajajinagar', true, 20, 30, 7, 66, 91, '/avatars/doctor-10.png', 4.5, '2021-12-01'),
  ('doc-011', 'Dr. Arun Prakash', 'arun.prakash@arogyam.in', '+91-9876543220', 'General Medicine', 'fac-005', 'Primary Health Center - Hoskote', true, 28, 45, 5, 62, 94, '/avatars/doctor-11.png', 4.3, '2022-08-15'),
  ('doc-012', 'Dr. Nalini Krishnan', 'nalini.krishnan@arogyam.in', '+91-9876543221', 'Pediatrics', 'fac-008', 'Community Health Center - K.R. Puram', true, 26, 40, 12, 65, 86, '/avatars/doctor-12.png', 4.6, '2021-04-10'),
  ('doc-013', 'Dr. Rajesh Hegde', 'rajesh.hegde@arogyam.in', '+91-9876543222', 'Orthopedics', 'fac-016', 'Community Health Center - Yeshwanthpur', true, 22, 35, 8, 62, 89, '/avatars/doctor-13.png', 4.4, '2022-11-01'),
  ('doc-014', 'Dr. Deepa Shah', 'deepa.shah@arogyam.in', '+91-9876543223', 'General Medicine', 'fac-002', 'Community Health Center - Whitefield', false, 15, 40, 20, 37, 65, '/avatars/doctor-14.png', 4.0, '2023-06-01'),
  ('doc-015', 'Dr. Manjunath Reddy', 'manjunath.reddy@arogyam.in', '+91-9876543224', 'Pulmonology', 'fac-012', 'Community Health Center - Electronic City', true, 28, 40, 10, 70, 84, '/avatars/doctor-15.png', 4.2, '2022-02-15'),
  ('doc-016', 'Dr. Asha Nair', 'asha.nair@arogyam.in', '+91-9876543225', 'General Medicine', 'fac-004', 'Community Health Center - Mysore Road', true, 35, 50, 12, 70, 88, '/avatars/doctor-16.png', 4.5, '2021-08-01'),
  ('doc-017', 'Dr. Srinivas Murthy', 'srinivas.murthy@arogyam.in', '+91-9876543226', 'Pediatrics', 'fac-007', 'Primary Health Center - Devanahalli', true, 20, 35, 4, 57, 96, '/avatars/doctor-17.png', 4.7, '2022-05-20'),
  ('doc-018', 'Dr. Kavita Bhat', 'kavita.bhat@arogyam.in', '+91-9876543227', 'General Medicine', 'fac-002', 'Community Health Center - Whitefield', true, 32, 45, 14, 71, 82, '/avatars/doctor-18.png', 4.1, '2020-09-10'),
  ('doc-019', 'Dr. Ganesh Rao', 'ganesh.rao@arogyam.in', '+91-9876543228', 'Cardiology', 'fac-014', 'Community Health Center - Rajajinagar', true, 18, 30, 6, 60, 90, '/avatars/doctor-19.png', 4.8, '2021-02-01'),
  ('doc-020', 'Dr. Laxmi Devi', 'laxmi.devi@arogyam.in', '+91-9876543229', 'General Medicine', 'fac-009', 'Primary Health Center - Nelamangala', true, 24, 40, 4, 60, 95, '/avatars/doctor-20.png', 4.6, '2022-04-15')
on conflict (id) do nothing;

-- ============ NURSES ============
insert into nurses (id, name, email, phone, facility_id, facility_name, assigned_villages, pending_follow_ups, completed_today, high_risk_patients, total_patients, workload, present, avatar, rating) values
  ('nur-001', 'Sunita Devi', 'sunita.devi@arogyam.in', '+91-9988776655', 'fac-001', 'Primary Health Center - Sarjapur', '["Sarjapur","Dommasandra","Huskur"]', 12, 5, 8, 45, 78, true, '/avatars/nurse-1.png', 4.3),
  ('nur-002', 'Geetha Srinivas', 'geetha.srinivas@arogyam.in', '+91-9988776656', 'fac-001', 'Primary Health Center - Sarjapur', '["Sarjapur","Chandapura"]', 8, 7, 5, 38, 65, true, '/avatars/nurse-2.png', 4.5),
  ('nur-003', 'Lakshmi Bai', 'lakshmi.bai@arogyam.in', '+91-9988776657', 'fac-002', 'Community Health Center - Whitefield', '["Whitefield","Hoodi","Kadugodi"]', 22, 8, 15, 72, 88, true, '/avatars/nurse-3.png', 4.2),
  ('nur-004', 'Anita Joseph', 'anita.joseph@arogyam.in', '+91-9988776658', 'fac-002', 'Community Health Center - Whitefield', '["Whitefield","Hoodi"]', 18, 6, 12, 65, 82, true, '/avatars/nurse-4.png', 4.4),
  ('nur-005', 'Maya Patil', 'maya.patil@arogyam.in', '+91-9988776659', 'fac-003', 'Primary Health Center - Yelahanka', '["Yelahanka","Yelahanka New Town"]', 6, 8, 3, 32, 55, true, '/avatars/nurse-5.png', 4.6),
  ('nur-006', 'Rekha Nair', 'rekha.nair@arogyam.in', '+91-9988776660', 'fac-004', 'Community Health Center - Mysore Road', '["Kengeri","Mysore Road","Ullalu"]', 15, 7, 10, 55, 75, true, '/avatars/nurse-6.png', 4.3),
  ('nur-007', 'Parvati Amma', 'parvati.amma@arogyam.in', '+91-9988776661', 'fac-004', 'Community Health Center - Mysore Road', '["Kengeri","Nayandahalli"]', 14, 5, 8, 48, 70, true, '/avatars/nurse-7.png', 4.1),
  ('nur-008', 'Kavitha Raj', 'kavitha.raj@arogyam.in', '+91-9988776662', 'fac-005', 'Primary Health Center - Hoskote', '["Hoskote","Nandagudi"]', 5, 6, 3, 28, 52, true, '/avatars/nurse-8.png', 4.5),
  ('nur-009', 'Usha Kiran', 'usha.kiran@arogyam.in', '+91-9988776663', 'fac-006', 'Community Health Center - Tumkur Road', '["Tumkur Road","Peenya","Dasarahalli"]', 10, 9, 7, 50, 62, true, '/avatars/nurse-9.png', 4.4),
  ('nur-010', 'Shanti Devi', 'shanti.devi@arogyam.in', '+91-9988776664', 'fac-006', 'Community Health Center - Tumkur Road', '["Peenya","Mallasandra"]', 8, 7, 5, 42, 58, true, '/avatars/nurse-10.png', 4.6),
  ('nur-011', 'Vimala Thomas', 'vimala.thomas@arogyam.in', '+91-9988776665', 'fac-008', 'Community Health Center - K.R. Puram', '["K.R. Puram","Hoodi","Whitefield","Mahadevapura"]', 25, 6, 18, 80, 92, true, '/avatars/nurse-11.png', 4.0),
  ('nur-012', 'Susheela Verma', 'susheela.verma@arogyam.in', '+91-9988776666', 'fac-008', 'Community Health Center - K.R. Puram', '["K.R. Puram","Banaswadi"]', 20, 5, 14, 72, 85, true, '/avatars/nurse-12.png', 4.2),
  ('nur-013', 'Leela Menon', 'leela.menon@arogyam.in', '+91-9988776667', 'fac-010', 'Community Health Center - Banashankari', '["Banashankari","Jayanagar","JP Nagar"]', 12, 8, 8, 52, 65, true, '/avatars/nurse-13.png', 4.5),
  ('nur-014', 'Radhika Iyer', 'radhika.iyer@arogyam.in', '+91-9988776668', 'fac-010', 'Community Health Center - Banashankari', '["Banashankari","Basavanagudi"]', 10, 7, 6, 45, 60, true, '/avatars/nurse-14.png', 4.3),
  ('nur-015', 'Saraswati Das', 'saraswati.das@arogyam.in', '+91-9988776669', 'fac-012', 'Community Health Center - Electronic City', '["Electronic City","Bommanahalli","Hulimavu"]', 18, 6, 12, 62, 78, true, '/avatars/nurse-15.png', 4.1),
  ('nur-016', 'Jayanti Paul', 'jayanti.paul@arogyam.in', '+91-9988776670', 'fac-012', 'Community Health Center - Electronic City', '["Electronic City","Begur"]', 15, 5, 10, 55, 72, true, '/avatars/nurse-16.png', 4.3),
  ('nur-017', 'Anjali Gupta', 'anjali.gupta@arogyam.in', '+91-9988776671', 'fac-014', 'Community Health Center - Rajajinagar', '["Rajajinagar","Malleswaram","Vijayanagar"]', 9, 8, 6, 42, 56, true, '/avatars/nurse-17.png', 4.6),
  ('nur-018', 'Priya Rani', 'priya.rani@arogyam.in', '+91-9988776672', 'fac-014', 'Community Health Center - Rajajinagar', '["Rajajinagar","Vijayanagar"]', 7, 7, 4, 35, 52, true, '/avatars/nurse-18.png', 4.4),
  ('nur-019', 'Meena Kumar', 'meena.kumar@arogyam.in', '+91-9988776673', 'fac-016', 'Community Health Center - Yeshwanthpur', '["Yeshwanthpur","Mathikere"]', 8, 9, 5, 38, 54, true, '/avatars/nurse-19.png', 4.5),
  ('nur-020', 'Nirmala George', 'nirmala.george@arogyam.in', '+91-9988776674', 'fac-016', 'Community Health Center - Yeshwanthpur', '["Yeshwanthpur","Peenya"]', 6, 8, 4, 32, 48, true, '/avatars/nurse-20.png', 4.7),
  ('nur-021', 'Kalyani Rao', 'kalyani.rao@arogyam.in', '+91-9988776675', 'fac-002', 'Community Health Center - Whitefield', '["Whitefield","Kadugodi"]', 16, 5, 10, 58, 75, true, '/avatars/nurse-21.png', 4.2),
  ('nur-022', 'Shobha Daniel', 'shobha.daniel@arogyam.in', '+91-9988776676', 'fac-007', 'Primary Health Center - Devanahalli', '["Devanahalli","Vijayapura"]', 4, 6, 2, 22, 42, true, '/avatars/nurse-22.png', 4.6),
  ('nur-023', 'Vasantha Reddy', 'vasantha.reddy@arogyam.in', '+91-9988776677', 'fac-009', 'Primary Health Center - Nelamangala', '["Nelamangala","Dabaspet"]', 3, 7, 1, 18, 35, true, '/avatars/nurse-23.png', 4.8),
  ('nur-024', 'Tara Krishnan', 'tara.krishnan@arogyam.in', '+91-9988776678', 'fac-008', 'Community Health Center - K.R. Puram', '["K.R. Puram","Banaswadi","HBR Layout"]', 22, 4, 16, 75, 88, true, '/avatars/nurse-24.png', 3.9),
  ('nur-025', 'Rani Choudhury', 'rani.choudhury@arogyam.in', '+91-9988776679', 'fac-004', 'Community Health Center - Mysore Road', '["Kengeri","Ullalu"]', 12, 6, 8, 45, 65, true, '/avatars/nurse-25.png', 4.3)
on conflict (id) do nothing;

-- ============ PATIENTS (sample) ============
insert into patients (id, name, age, gender, village, district, conditions, doctor, doctor_id, nurse, nurse_id, risk, last_visit, next_follow_up, status, phone, blood_group, vitals, visits, medicines, timeline, ai_summary, tasks) values
  ('pat-001', 'Ramesh Kulkarni', 65, 'male', 'Sarjapur', 'Bengaluru Urban', '["Diabetes Type 2","Hypertension","Chronic Kidney Disease"]', 'Dr. Arvind Sharma', 'doc-001', 'Sunita Devi', 'nur-001', 'high', '2026-07-02', '2026-07-09', 'active', '+91-9876540011', 'O+', '[{"date":"2026-07-02","bpSystolic":148,"bpDiastolic":94,"heartRate":82,"temperature":36.8,"oxygenSaturation":97,"bloodSugar":185}]', '[{"date":"2026-07-02","doctor":"Dr. Arvind Sharma","reason":"Routine checkup","diagnosis":"Blood pressure elevated, HbA1c 7.8","notes":"Increased insulin dose."}]', '[{"name":"Metformin 500mg","dosage":"1 tablet","frequency":"Twice daily","prescribedDate":"2026-01-15","endDate":"2026-07-15","refills":2}]', '[{"date":"2026-07-02","type":"visit","description":"Routine checkup - BP elevated","doctor":"Dr. Arvind Sharma"}]', 'Elderly male with poorly controlled T2DM and hypertension. Requires strict glycemic control.', '[{"id":"task-001","description":"Schedule nephrology appointment","dueDate":"2026-07-10","completed":false,"assignedTo":"Sunita Devi"}]'),
  ('pat-002', 'Lakshmi Narayan', 45, 'female', 'Whitefield', 'Bengaluru Urban', '["Hypertension","Anemia"]', 'Dr. Priya Patel', 'doc-002', 'Lakshmi Bai', 'nur-003', 'medium', '2026-07-01', '2026-07-15', 'active', '+91-9876540012', 'B+', '[{"date":"2026-07-01","bpSystolic":138,"bpDiastolic":88,"heartRate":76,"temperature":36.6,"oxygenSaturation":98,"bloodSugar":110}]', '[]', '[]', '[{"date":"2026-07-01","type":"visit","description":"Follow-up for hypertension"}]', 'Middle-aged female with hypertension and anemia. BP reasonably controlled.', '[]'),
  ('pat-003', 'Venkatesh Prasad', 58, 'male', 'Kengeri', 'Bengaluru Urban', '["Coronary Artery Disease","Hyperlipidemia"]', 'Dr. Sanjay Verma', 'doc-003', 'Rekha Nair', 'nur-006', 'critical', '2026-07-04', '2026-07-06', 'active', '+91-9876540013', 'AB+', '[{"date":"2026-07-04","bpSystolic":162,"bpDiastolic":98,"heartRate":92,"temperature":36.9,"oxygenSaturation":94,"bloodSugar":145}]', '[]', '[]', '[]', 'Patient with unstable angina admitted. Requires immediate cardiology consultation.', '[]')
on conflict (id) do nothing;

-- ============ MEDICINES ============
insert into medicines (id, name, category, current_stock, average_usage, days_left, reorder_level, risk, unit, facility_id, facility_name, expiry_date, manufacturer) values
  ('med-001', 'Metformin 500mg', 'Antidiabetic', 1240, 180, 6, 500, 'high', 'tablets', 'fac-001', 'PHC - Sarjapur', '2027-06-01', 'Sun Pharma'),
  ('med-002', 'Amlodipine 5mg', 'Antihypertensive', 890, 120, 7, 400, 'high', 'tablets', 'fac-001', 'PHC - Sarjapur', '2027-08-01', 'Cipla'),
  ('med-003', 'Paracetamol 650mg', 'Analgesic', 2500, 300, 8, 800, 'medium', 'tablets', 'fac-002', 'CHC - Whitefield', '2027-05-01', 'Hetero'),
  ('med-004', 'Artemether-Lumefantrine', 'Antimalarial', 120, 45, 2, 200, 'critical', 'courses', 'fac-002', 'CHC - Whitefield', '2026-12-01', 'Ipca'),
  ('med-005', 'Insulin Glargine', 'Antidiabetic', 45, 12, 3, 30, 'critical', 'vials', 'fac-004', 'CHC - Mysore Road', '2026-11-01', 'Sanofi'),
  ('med-006', 'Isoniazid 300mg', 'Anti-TB', 320, 30, 10, 100, 'low', 'tablets', 'fac-009', 'PHC - Nelamangala', '2027-09-01', 'Lupin'),
  ('med-007', 'Rifampicin 600mg', 'Anti-TB', 280, 30, 9, 100, 'low', 'capsules', 'fac-009', 'PHC - Nelamangala', '2027-09-01', 'Lupin'),
  ('med-008', 'Azithromycin 500mg', 'Antibiotic', 450, 80, 5, 200, 'high', 'tablets', 'fac-006', 'CHC - Tumkur Road', '2027-04-01', 'Alkem'),
  ('med-009', 'Enalapril 5mg', 'Antihypertensive', 760, 90, 8, 300, 'medium', 'tablets', 'fac-008', 'CHC - K.R. Puram', '2027-07-01', 'Torrent'),
  ('med-010', 'Tiotropium inhaler', 'Respiratory', 85, 25, 3, 50, 'high', 'inhalers', 'fac-008', 'CHC - K.R. Puram', '2026-10-01', 'Cipla'),
  ('med-011', 'Losartan 50mg', 'Antihypertensive', 920, 110, 8, 350, 'medium', 'tablets', 'fac-010', 'CHC - Banashankari', '2027-06-01', 'Dr. Reddy''s'),
  ('med-012', 'Metoprolol 50mg', 'Cardiac', 340, 60, 5, 150, 'high', 'tablets', 'fac-012', 'CHC - Electronic City', '2027-03-01', 'Zydus'),
  ('med-013', 'ORS Packets', 'Hydration', 1800, 400, 4, 600, 'high', 'packets', 'fac-002', 'CHC - Whitefield', '2027-12-01', 'Generic'),
  ('med-014', 'IV Ringer''s Lactate', 'IV Fluids', 280, 50, 5, 120, 'high', 'bottles', 'fac-012', 'CHC - Electronic City', '2027-02-01', 'Baxter'),
  ('med-015', 'Atorvastatin 20mg', 'Lipid Lowering', 670, 85, 7, 250, 'medium', 'tablets', 'fac-016', 'CHC - Yeshwanthpur', '2027-05-01', 'Sun Pharma'),
  ('med-016', 'Amoxicillin-Clavulanate 625mg', 'Antibiotic', 380, 70, 5, 150, 'high', 'tablets', 'fac-005', 'PHC - Hoskote', '2027-01-01', 'GSK'),
  ('med-017', 'Thyroxine 50mcg', 'Thyroid', 520, 40, 13, 100, 'low', 'tablets', 'fac-003', 'PHC - Yelahanka', '2027-10-01', 'Merck'),
  ('med-018', 'Furosemide 40mg', 'Diuretic', 490, 55, 8, 150, 'medium', 'tablets', 'fac-016', 'CHC - Yeshwanthpur', '2027-06-01', 'Aventis'),
  ('med-019', 'Calcium + Vitamin D', 'Supplement', 1100, 130, 8, 300, 'low', 'tablets', 'fac-013', 'PHC - Anekal', '2027-08-01', 'Abbott'),
  ('med-020', 'Spironolactone 50mg', 'Diuretic', 310, 40, 7, 100, 'medium', 'tablets', 'fac-001', 'PHC - Sarjapur', '2027-04-01', 'Cipla')
on conflict (id) do nothing;

-- ============ DISEASE TRENDS ============
insert into disease_trends (disease, week_data, current_week, previous_week, change, risk, facilities, villages, medicine_impact) values
  ('Malaria', '[12,18,25,32,45,52,48]', 48, 52, -7.7, 'high', '[{"name":"PHC - Sarjapur","cases":8},{"name":"CHC - Whitefield","cases":15},{"name":"CHC - Electronic City","cases":12},{"name":"PHC - Hoskote","cases":5},{"name":"PHC - Jigani","cases":8}]', '[{"name":"Sarjapur","cases":8},{"name":"Whitefield","cases":12},{"name":"Electronic City","cases":10},{"name":"Jigani","cases":6},{"name":"Hoskote","cases":5}]', 45),
  ('Dengue', '[8,15,28,42,58,72,85]', 85, 72, 18.1, 'critical', '[{"name":"CHC - Whitefield","cases":22},{"name":"CHC - Electronic City","cases":18},{"name":"CHC - K.R. Puram","cases":16},{"name":"CHC - Mysore Road","cases":14},{"name":"CHC - Yeshwanthpur","cases":15}]', '[{"name":"Whitefield","cases":18},{"name":"Electronic City","cases":15},{"name":"K.R. Puram","cases":12},{"name":"Kengeri","cases":10},{"name":"Yeshwanthpur","cases":12}]', 28),
  ('Tuberculosis', '[5,6,4,7,5,8,6]', 6, 8, -25.0, 'medium', '[{"name":"PHC - Nelamangala","cases":2},{"name":"CHC - Whitefield","cases":1},{"name":"CHC - Tumkur Road","cases":2},{"name":"PHC - Hoskote","cases":1}]', '[{"name":"Nelamangala","cases":2},{"name":"Peenya","cases":2},{"name":"Whitefield","cases":1},{"name":"Hoskote","cases":1}]', 72),
  ('Diabetes', '[88,92,95,90,96,94,98]', 98, 94, 4.3, 'high', '[{"name":"CHC - Whitefield","cases":22},{"name":"CHC - K.R. Puram","cases":18},{"name":"CHC - Electronic City","cases":16},{"name":"CHC - Mysore Road","cases":15}]', '[{"name":"Whitefield","cases":18},{"name":"K.R. Puram","cases":14},{"name":"Electronic City","cases":12},{"name":"Sarjapur","cases":10}]', 65),
  ('Hypertension', '[120,125,118,130,128,135,130]', 130, 135, -3.7, 'medium', '[{"name":"CHC - Whitefield","cases":28},{"name":"CHC - K.R. Puram","cases":24},{"name":"CHC - Banashankari","cases":22},{"name":"CHC - Electronic City","cases":20}]', '[{"name":"Whitefield","cases":22},{"name":"Banashankari","cases":18},{"name":"K.R. Puram","cases":16},{"name":"Electronic City","cases":15}]', 35)
on conflict (disease) do nothing;

-- ============ ALERTS ============
insert into alerts (id, type, severity, title, description, facility_id, facility_name, timestamp, acknowledged, resolved) values
  ('alr-001', 'medicine', 'critical', 'Artemether-Lumefantrine Stock Critical', 'CHC Whitefield has only 2 days of malaria medication left. Immediate restocking required.', 'fac-002', 'CHC - Whitefield', '2026-07-04T06:00:00Z', false, false),
  ('alr-002', 'doctor', 'high', 'Doctor Shortage at CHC Whitefield', 'Only 3 of 8 required doctors present at CHC Whitefield. Patient load exceeds capacity.', 'fac-002', 'CHC - Whitefield', '2026-07-04T07:00:00Z', false, false),
  ('alr-003', 'disease', 'critical', 'Dengue Outbreak Warning', '85 cases reported this week in Bengaluru Urban. 18.1% increase from last week.', null, null, '2026-07-04T08:00:00Z', false, false),
  ('alr-004', 'facility', 'high', 'CHC K.R. Puram Bed Crisis', 'Bed occupancy at 96% with 86 of 90 beds occupied. Approaching full capacity.', 'fac-008', 'CHC - K.R. Puram', '2026-07-04T05:30:00Z', true, false),
  ('alr-005', 'medicine', 'high', 'Insulin Glargine Running Low', 'CHC Mysore Road has only 3 days of insulin supply for diabetic patients.', 'fac-004', 'CHC - Mysore Road', '2026-07-04T06:30:00Z', false, false),
  ('alr-006', 'doctor', 'medium', 'Dr. Karthik Iyer Absent - Pulmonology', 'Dr. Karthik Iyer has been absent for 3 days. Pulmonary patients at CHC Electronic City affected.', 'fac-012', 'CHC - Electronic City', '2026-07-03T14:00:00Z', false, false),
  ('alr-007', 'patient', 'high', 'Critical Patient - Venkatesh Prasad', 'Patient with unstable angina admitted. Requires immediate cardiology consultation.', 'fac-004', 'CHC - Mysore Road', '2026-07-04T09:00:00Z', true, false),
  ('alr-008', 'medicine', 'critical', 'Budesonide Inhaler Shortage', 'CHC Mysore Road running out of respiratory inhalers. Only 3 days stock left.', 'fac-004', 'CHC - Mysore Road', '2026-07-04T07:15:00Z', false, false),
  ('alr-009', 'facility', 'high', 'PHC Sarjapur Doctor Shortage', 'Only 1 of 3 doctors present today. OPD patients waiting for extended periods.', 'fac-001', 'PHC - Sarjapur', '2026-07-04T08:30:00Z', false, false),
  ('alr-010', 'disease', 'medium', 'Malaria Cases Rising in Anekal Taluka', 'Week-over-week increase of 28% in malaria cases. Focus on vector control.', null, null, '2026-07-04T06:45:00Z', false, false),
  ('alr-011', 'nurse', 'high', 'Nurse Workload Critical at CHC K.R. Puram', 'Nurse workload at 85% with 8 nurses handling 14 positions. Burnout risk high.', 'fac-008', 'CHC - K.R. Puram', '2026-07-04T07:45:00Z', false, false),
  ('alr-012', 'medicine', 'high', 'ORS Packets Depleting Fast', 'CHC Whitefield has only 4 days of ORS stock due to dengue cases surge.', 'fac-002', 'CHC - Whitefield', '2026-07-04T08:00:00Z', false, false)
on conflict (id) do nothing;

-- ============ AI INSIGHTS ============
insert into ai_insights (id, type, title, description, recommendation, severity, timestamp, acknowledged, resolved) values
  ('ins-001', 'disease', 'Dengue Epidemic Risk', 'AI analysis predicts continued increase in dengue cases across Bengaluru Urban, especially in Whitefield, Electronic City, and K.R. Puram clusters.', 'Initiate fogging in affected areas. Stock up on ORS, IV fluids, and paracetamol.', 'critical', '2026-07-04T04:00:00Z', false, false),
  ('ins-002', 'medicine', 'Antimalarial Stock Risk', 'Artemether-Lumefantrine stock is critically low across 3 facilities. With malaria cases rising 28% week-over-week, current inventory will be exhausted in 2 days.', 'Urgent procurement of 400 courses of Artemether-Lumefantrine.', 'high', '2026-07-04T05:00:00Z', false, false),
  ('ins-003', 'facility', 'CHC K.R. Puram Overcapacity', 'Bed occupancy at 96% with high-risk patients needing ICU beds. Nurse-to-patient ratio at 1:12.', 'Temporary expansion of bed capacity. Request staffing reinforcement from district.', 'high', '2026-07-04T03:30:00Z', true, false),
  ('ins-004', 'doctor', 'Physician Coverage Gap', '3 facilities operating below 50% of required physician strength. Patient wait times exceeded 4 hours.', 'Deploy mobile medical units. Rotate doctors from underutilized facilities.', 'high', '2026-07-04T06:00:00Z', false, false),
  ('ins-005', 'patient', 'High-Risk Patient Clustering', 'AI identified 18 high-risk patients in Sarjapur area concentrated among elderly males with multiple comorbidities.', 'Deploy community health worker for home visits. Schedule catch-up clinics.', 'medium', '2026-07-04T05:30:00Z', false, false)
on conflict (id) do nothing;
