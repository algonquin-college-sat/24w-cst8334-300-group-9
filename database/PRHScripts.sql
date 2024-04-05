USE master;
GO
ALTER DATABASE PRHDatabank
SET SINGLE_USER 
WITH ROLLBACK IMMEDIATE;
GO
-- Create the database PRHDatabank and use it
IF EXISTS (SELECT * FROM sys.databases WHERE name = 'PRHDatabank')
    DROP DATABASE PRHDatabank;
GO

CREATE DATABASE PRHDatabank;
GO

USE PRHDatabank;
GO

-- Drop the IMPROVEMENT_TICKETS table if it exists
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'IMPROVEMENT_TICKETS')
BEGIN
    DROP TABLE IMPROVEMENT_TICKETS;
END
GO

-- Drop the CELEBRATION_TICKET table if it exists
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'CELEBRATION_TICKET')
BEGIN
    DROP TABLE CELEBRATION_TICKET;
END
GO

-- Drop the CATEGORIES table if it exists
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'CATEGORIES')
BEGIN
    DROP TABLE CATEGORIES;
END
GO

-- Drop the QUADRUPLE_AIM table if it exists
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'QUADRUPLE_AIM')
BEGIN
    DROP TABLE QUADRUPLE_AIM;
END
GO

-- Drop the TICKET_UPDATES table if it exists
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'TICKET_UPDATES')
BEGIN
    DROP TABLE TICKET_UPDATES;
END
GO

-- Drop the IMPROVEMENT_DEPARTMENT table if it exists
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'IMPROVEMENT_DEPARTMENT')
BEGIN
    DROP TABLE IMPROVEMENT_DEPARTMENT;
END
GO

-- Drop the DEPARTMENTS table if it exists
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'DEPARTMENTS')
BEGIN
    DROP TABLE DEPARTMENTS;
END
GO

-- Create the QUADRUPLE_AIM table
CREATE TABLE QUADRUPLE_AIM (
  quadruple_aim_id INT PRIMARY KEY IDENTITY,
  aim_name VARCHAR(255) UNIQUE NOT NULL
);

-- Create the DEPARTMENTS table
CREATE TABLE DEPARTMENTS (
  department_id INT PRIMARY KEY IDENTITY,
  department_name VARCHAR(255) UNIQUE NOT NULL,
  display_board BIT
);

-- create the CATEGORIES table
CREATE TABLE CATEGORIES (
  category_id INT PRIMARY KEY IDENTITY,
  category_name VARCHAR(255)
);

-- Create the IMPROVEMENT_TICKETS table
CREATE TABLE IMPROVEMENT_TICKETS (
  ticket_id INT PRIMARY KEY IDENTITY,
  department_id INT,
  name VARCHAR(255),
  date TEXT,
  isArchived BIT,
  problem TEXT,
  source_issue TEXT,
  improve_idea TEXT,
  input_needed_from TEXT,
  safety_issue TEXT,
  quadruple_aim_id INT,
  solution_outcome TEXT,
  category_id INT,
  FOREIGN KEY (quadruple_aim_id) REFERENCES QUADRUPLE_AIM(quadruple_aim_id),
  FOREIGN KEY (category_id) REFERENCES CATEGORIES(category_id)
);

-- Create the CELEBRATION_TICKET table
CREATE TABLE CELEBRATION_TICKET (
  c_ticket_id INT PRIMARY KEY IDENTITY,
  i_ticket_id INT,
  department_id INT,
  date TEXT,
  who_what TEXT,
  details TEXT,
  value_compassion BIT,
  value_life BIT,
  value_community BIT,
  value_excellence BIT,
  value_respect BIT,
  value_responsibility BIT,
  FOREIGN KEY (i_ticket_id) REFERENCES IMPROVEMENT_TICKETS(ticket_id),
  FOREIGN KEY (department_id) REFERENCES DEPARTMENTS(department_id)
);

-- Create the TICKET_UPDATES table
CREATE TABLE TICKET_UPDATES (
  update_id INT PRIMARY KEY IDENTITY,
  i_ticket_id INT,
  date TEXT,
  update_note TEXT,
  owner VARCHAR(255),
  FOREIGN KEY (i_ticket_id) REFERENCES IMPROVEMENT_TICKETS(ticket_id)
);

-- Create the IMPROVEMENT_DEPARTMENT table
CREATE TABLE IMPROVEMENT_DEPARTMENT (
  ticket_id INT,
  department_id INT,
  display_ticket BIT,
  PRIMARY KEY (ticket_id, department_id),
  FOREIGN KEY (ticket_id) REFERENCES IMPROVEMENT_TICKETS(ticket_id),
  FOREIGN KEY (department_id) REFERENCES DEPARTMENTS(department_id)
);

-- Inserting into CATEGORIES
INSERT INTO CATEGORIES (category_name) VALUES
('New Ideas'),
('Work in Progress'),
('Almost Done'),
('Implement'),
('Challenge'),
('Possible'),
('Kibosh'),
('Celebration'),
('Complete');


-- Inserting into DEPARTMENTS
INSERT INTO DEPARTMENTS (department_name, display_board) VALUES
('Community Mental Health', 1),
('Infection Prevention and Control', 1),
('Patient Records', 1);

INSERT INTO QUADRUPLE_AIM (aim_name) VALUES
('Patient & Family Experience'),
('Best Possible Health Outcome'),
('Provider Experience'),
('Value & Efficiency');

-- Inserting into IMPROVEMENT_TICKETS
INSERT INTO IMPROVEMENT_TICKETS (
  department_id,
  name, 
  date, 
  problem, 
  isArchived,
  improve_idea, 
  source_issue, 
  input_needed_from, 
  safety_issue, 
  quadruple_aim_id, -- Corrected column name
  solution_outcome, 
  category_id
) 
VALUES
(
  
  1,
  'Improvement Ticket 1', 
  '2024-03-22', 
  'Problem description for Ticket 1', 
  0,
  'Improvement idea for Ticket 1', 
  'Improvement plan for Ticket 1', 
  'CommunityPartner', 
  'OtherDepartments', 
  1, 
  'Solution outcome for Ticket 1', 
  1
),
(
  2,
  'Improvement Ticket 2', 
  '2024-03-21', 
  'Problem description for Ticket 2', 
  0,
  'Improvement idea for Ticket 2', 
  'Improvement plan for Ticket 2', 
  'CommunityPartner', 
  'OccupationalHealthSafety', 
  2, 
  'Solution outcome for Ticket 2', 
  2
),
(
  3,
  'Improvement Ticket 3', 
  '2024-03-20', 
  'Problem description for Ticket 3', 
  0,
  'Improvement idea for Ticket 3', 
  'Improvement plan for Ticket 3', 
  'PatientFamily', 
  'PatientSafety', 
  3, 
  'Solution outcome for Ticket 3', 
  3
),(2, -- Department ID
  'Improvement Ticket 4', -- Ticket name
  '2024-03-25', -- Date
  'Long wait times in the Emergency Room', -- Problem description
  0, -- isArchived
  'Hiring more triage nurses', -- Improvement idea
  'Understaffing in the ER department', -- Source issue
  'PatientFamily', -- Input needed from
  'PatientSafety', -- Safety issue
  1, -- Quadruple Aim ID
  'Implemented new triage system', -- Solution outcome
  4 -- Category ID
),
(
  1, -- Department ID
  'Improvement Ticket 5', -- Ticket name
  '2024-03-26', -- Date
  'High patient readmission rates', -- Problem description
  0, -- isArchived
  'Implementing discharge planning protocols', -- Improvement idea
  'Lack of standardized discharge procedures', -- Source issue
  'CommunityPartner', -- Input needed from
  'OtherDepartments', -- Safety issue
  2, -- Quadruple Aim ID
  'Reduced readmission rates by 20%', -- Solution outcome
  5 -- Category ID
),
(
  3, -- Department ID
  'Improvement Ticket 6', -- Ticket name
  '2024-03-27', -- Date
  'Inefficient medication reconciliation process', -- Problem description
  0, -- isArchived
  'Implementing electronic medication reconciliation system', -- Improvement idea
  'Manual reconciliation process prone to errors', -- Source issue
  'PatientFamily', -- Input needed from
  'OccupationalHealthSafety', -- Safety issue
  3, -- Quadruple Aim ID
  'Reduced medication errors by 50%', -- Solution outcome
  7 -- Category ID
);