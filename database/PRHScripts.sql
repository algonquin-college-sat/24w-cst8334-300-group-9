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

-- Create the DEPARTMENTS table
CREATE TABLE DEPARTMENTS (
  department_id INT PRIMARY KEY IDENTITY,
  department_name VARCHAR(255) UNIQUE,
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
  c_ticket_id INT PRIMARY KEY IDENTITY,
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
  update_id INT PRIMARY KEY IDENTITY,
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
INSERT INTO CATEGORIES (category_name) VALUES
('Improvement'),
('Celebration');

-- Inserting into DEPARTMENTS
INSERT INTO DEPARTMENTS (department_name, display_board) VALUES
('Community Mental Health', 1),
('Infection Prevention and Control', 1),
('Patient Records', 1);

-- Inserting into IMPROVEMENT_TICKETS
INSERT INTO IMPROVEMENT_TICKETS (
  name, 
  date, 
  problem, 
  improve_idea, 
  improve_how, 
  safety_ohs, 
  safety_patient, 
  aim_patient_family, 
  aim_outcome, 
  aim_provider, 
  aim_value_efficiency, 
  input_patient_family, 
  input_community_partner, 
  category_id
) 
VALUES
(
  'Ticket 1', 
  '2024-03-22', 
  'Problem description for Ticket 1', 
  'Improvement idea for Ticket 1', 
  'Improvement plan for Ticket 1', 
  1, 
  1, 
  1, 
  1, 
  1, 
  1, 
  1, 
  1, 
  1
),
(
  'Ticket 2', 
  '2024-03-21', 
  'Problem description for Ticket 2', 
  'Improvement idea for Ticket 2', 
  'Improvement plan for Ticket 2', 
  1, 
  0, 
  1, 
  1, 
  1, 
  1, 
  1, 
  0, 
  1
),
(
  'Ticket 3', 
  '2024-03-20', 
  'Problem description for Ticket 3', 
  'Improvement idea for Ticket 3', 
  'Improvement plan for Ticket 3', 
  0, 
  0, 
  1, 
  0, 
  0, 
  1, 
  1, 
  1, 
  1
);
