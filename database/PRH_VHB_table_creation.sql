-- Create the database PRHDatabank and use it
CREATE DATABASE PRHDatabank;
USE PRHDatabank;

-- Create the DEPARTMENTS table
CREATE TABLE DEPARTMENTS (
  department_id INT PRIMARY KEY,
  department_name VARCHAR(255),
  display_board VARCHAR(255)  -- why do we need a display board?
);

-- create the CATEGORIES table
CREATE TABLE CATEGORIES (
  category_id INT PRIMARY KEY,
  category_name VARCHAR(255)
);

-- Create the IMPROVEMENT_TICKETS table
-- Where is the tracking info?
CREATE TABLE IMPROVEMENT_TICKETS (
  ticket_id INT PRIMARY KEY,
  name VARCHAR(255),
  date DATE,
  problem TEXT,
  improve_idea TEXT,
  improve_how TEXT,
  safety_ohs BOOLEAN,
  safety_patient BOOLEAN,
  aim_patient_family BOOLEAN,
  aim_outcome BOOLEAN,
  aim_provider BOOLEAN,
  aim_value_efficiency BOOLEAN,
  input_patient_family BOOLEAN,
  input_community_partner BOOLEAN,
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
  value_compassion BOOLEAN,
  value_life BOOLEAN,
  value_community BOOLEAN,
  value_excellence BOOLEAN,
  value_respect BOOLEAN,
  value_responsibility BOOLEAN,
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
-- why do we have improvement_department table?
CREATE TABLE IMPROVEMENT_DEPARTMENT (
  ticket_id INT,
  department_id INT,
  display_ticket BOOLEAN,
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
