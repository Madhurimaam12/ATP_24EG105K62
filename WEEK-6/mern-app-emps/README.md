Week 6: React Project - Employee Management System (mern-app-emps)

This week focused on building a complete Employee Management System using React for the frontend and Node.js/Express with MongoDB for the backend. The project is structured as a full-stack MERN application

Backend Files

server.js : Main server entry point that sets up Express.js, connects to MongoDB database, configures middleware, and mounts API routes for employee operations.

API/employees.js : Contains all CRUD API endpoints for employees including GET (fetch all/single employee), POST (create new employee), PUT (update employee), and DELETE (remove employee).

models/EmpModel.js : Defines the Employee database schema using Mongoose with fields like name, email, position, salary, department, and timestamps.

Frontend Files

main.jsx : Application entry point that renders the root React component into the DOM and wraps the app with Context Provider for global state.

App.jsx : Main application component that sets up routing, defines routes for different pages, and manages the overall application structure.

index.css : Global styling file containing CSS reset, fonts, colors, and utility classes used across the application.

components/Header.jsx : Navigation header component that displays the app title and navigation links for moving between different pages.

components/Home.jsx : Homepage component that welcomes users and provides an overview of the employee management system.

components/ListOfEmps.jsx : Displays a list of all employees fetched from the backend API using map() function. Includes options to edit or delete each employee.

components/CreateEmp.jsx : Form component for adding new employees with input fields for name, email, position, salary, and department. Sends POST request to backend API.

components/EditEmployee.jsx : Form component pre-filled with existing employee data for editing. Sends PUT request to update employee information.

components/Employee.jsx : Displays detailed information of a single employee including all fields and provides options to edit or go back.

components/RootLayout.jsx : Layout wrapper component that contains the Header and defines where child components should render using Outlet.

components/test.jsx : Testing component used for experimenting with new features or debugging.

contexts/ContextProvider.jsx : Implements React Context API for global state management, making employee data and functions available across all components without prop drilling.

api/employees.js : Contains frontend API service functions that make HTTP requests to the backend endpoints for CRUD operations.

models/EmpModel.js : Frontend data model defining the structure of employee objects used throughout the React application.

Configuration Files

package.json (Backend & Frontend) : Lists project dependencies and defines scripts for running development server, building for production, and running tests.

vite.config.js : Configuration file for Vite build tool including proxy settings to connect frontend with backend API.

vercel.json : Deployment configuration for hosting the application on Vercel platform.

eslint.config.js : ESLint configuration for maintaining code quality and consistent coding standards.

Key Features Implemented
Create Employee : Add new employees with form validation

Read Employees : View list of all employees and individual details

Update Employee : Edit existing employee information

Delete Employee : Remove employees from the database

Global State Management : Using Context API for state management

REST API Integration : Frontend connected to backend API

Responsive Design : Mobile-friendly layouts

Routing : Navigation between different pages

index.html : HTML template file where the React application is mounted to the root div.

.gitignore : Specifies which files and folders should be excluded from Git version control.
