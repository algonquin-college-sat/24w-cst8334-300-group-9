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



-- Create the DEPARTMENTS table
CREATE TABLE DEPARTMENTS (
  department_id INT PRIMARY KEY,
  department_name VARCHAR(255),
  display_board BIT
);

-- create the CATEGORIES table
CREATE TABLE CATEGORIES (
  category_id INT PRIMARY KEY,
  category_name VARCHAR(255)
);

-- Create the IMPROVEMENT_TICKETS table
CREATE TABLE IMPROVEMENT_TICKETS (
  ticket_id INT PRIMARY KEY,
  name VARCHAR(255),
  date DATE,
  problem TEXT,
  improve_idea TEXT,
  improve_how TEXT,
  safety_ohs BIT,
  safety_patient BIT,
  aim_patient_family BIT,
  aim_outcome BIT,
  aim_provider BIT,
  aim_value_efficiency BIT,
  input_patient_family BIT,
  input_community_partner BIT,
  category_id INT,
  FOREIGN KEY (category_id) REFERENCES CATEGORIES(category_id)
);

-- Create the CELEBRATION_TICKET table
CREATE TABLE CELEBRATION_TICKET (
  c_ticket_id INT PRIMARY KEY,
  i_ticket_id INT,
  department_id INT,
  date DATE,
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
  update_id INT PRIMARY KEY,
  i_ticket_id INT,
  date DATE,
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
INSERT INTO CATEGORIES (category_id, category_name) VALUES
(1, 'Improvement'),
(2, 'Celebration');

-- Inserting into DEPARTMENTS
INSERT INTO DEPARTMENTS (department_id, department_name) VALUES
(1, 'Community Mental Health'),
(2, 'Infection Prevention and Control'),
(3, 'Patient Records');

-- Insert sample data into IMPROVEMENT_TICKETS
INSERT INTO IMPROVEMENT_TICKETS (ticket_id, name, date, problem, improve_idea, category_id) VALUES
(1, 'Reducing ER Wait Times', '2024-03-18', 'Long wait times in the Emergency Room', 'Hiring more triage nurses', 1),
(2, 'Improving Patient Feedback', '2024-03-17', 'Low patient satisfaction scores', 'Implementing regular patient surveys', 1),
(3, 'Enhancing Surgical Efficiency', '2024-03-16', 'Operational delays in surgery department', 'Optimizing pre-operative procedures', 1);

-- Insert sample data into CELEBRATION_TICKET
INSERT INTO CELEBRATION_TICKET (c_ticket_id, i_ticket_id, department_id, date, who_what, details) VALUES
(1, 1, 1, '2024-03-18', 'ER Wait Times Reduced', 'Successfully reduced ER wait times by 30%'),
(2, 2, 2, '2024-03-17', 'Improved Patient Feedback', 'Received positive feedback from patients');

-- Insert sample data into TICKET_UPDATES
INSERT INTO TICKET_UPDATES (update_id, i_ticket_id, date, update_note, owner) VALUES
(1, 1, '2024-03-18', 'Hired 3 new triage nurses', 'Manager A'),
(2, 1, '2024-03-19', 'Implemented new triage system', 'Manager B'),
(3, 2, '2024-03-17', 'Conducted patient survey', 'Manager C');

-- Inserting into IMPROVEMENT_DEPARTMENT
INSERT INTO IMPROVEMENT_DEPARTMENT (ticket_id, department_id, display_ticket) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1);