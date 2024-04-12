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
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'I_TICKET_UPDATE_NOTES')
BEGIN
    DROP TABLE I_TICKET_UPDATE_NOTES;
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
  isArchived BIT,
  FOREIGN KEY (department_id) REFERENCES DEPARTMENTS(department_id)
);

-- Create the TICKET_UPDATES table
CREATE TABLE I_TICKET_UPDATE_NOTES (
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
INSERT INTO DEPARTMENTS (department_name) VALUES
('Community Mental Health'),
('Infection Prevention and Control'),
('Patient Records');

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
  'Comunity Partner', 
  'Occupational Health Safety', 
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
  'Comunity Partner', 
  'Occupational Health Safety', 
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
  'Patient Family', 
  'Patient Safety', 
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
  'Patient Family', -- Input needed from
  'Patient Safety', -- Safety issue
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
  'Other Departments', -- Input needed from
  'Patient Safety', -- Safety issue
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
  'Patient Family', -- Input needed from
  'Occupational Health Safety', -- Safety issue
  3, -- Quadruple Aim ID
  'Reduced medication errors by 50%', -- Solution outcome
  7 -- Category ID
);

-- Data dump for Improvement ticket notes
INSERT INTO I_TICKET_UPDATE_NOTES (i_ticket_id, date, update_note, owner)
VALUES
(1, '2024-04-10', 'Update note 1 for ticket 1', 'John Doe'),
(2, '2024-04-11', 'Update note 1 for ticket 2', 'Jane Smith'),
(3, '2024-04-12', 'Update note 1 for ticket 3', 'Alice Johnson');

-- Data dump for Celebration ticket
INSERT INTO CELEBRATION_TICKET (department_id, date, who_what, details, value_compassion, value_life, value_community, value_excellence, value_respect, value_responsibility, isArchived)
VALUES 
(1, '2024-04-11', 'Employee Promotion', 'John Doe promoted to Senior Manager', 1, 0, 0, 1, 1, 0, 0),
(2, '2024-04-12', 'Team Achievement', 'Project X completed ahead of schedule', 0, 1, 1, 0, 1, 1, 0),
(3, '2024-04-13', 'Employee Recognition', 'Jane Smith awarded Employee of the Month', 1, 0, 0, 1, 1, 0, 0),
(1, '2024-04-14', 'Milestone Celebration', 'Company anniversary - 10 years in business', 1, 1, 1, 1, 1, 1, 0),
(2, '2024-04-15', 'Special Event', 'Annual company picnic held at the park', 1, 1, 1, 1, 1, 1, 0);
