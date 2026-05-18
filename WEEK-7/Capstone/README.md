Week 7: Capstone Project - BlogApp (Full-Stack Blog Application)

This week was all about building a complete full-stack Blog Application as the capstone project. The application includes role-based authentication (Admin, Author, User), article management, profile management, and Cloudinary integration for image uploads.

Backend Files

server.js : Main server entry point that sets up Express.js, connects to MongoDB database, configures CORS, mounts all API routes (Admin, Author, User, Common), and starts the server on the configured port.

APIs/AdminAPI.js : Contains admin-only endpoints including managing all users, deleting any article, viewing all articles from all authors, and system statistics.

APIs/AuthorAPI.js : Contains author-only endpoints including creating new articles, editing own articles, deleting own articles, and viewing their own article list.

APIs/UserAPI.js : Contains user-only endpoints including viewing articles, saving favorite articles, managing profile, and commenting on articles.

APIs/CommonAPI.js : Contains public endpoints accessible to all including login, registration, viewing published articles, and article search.

middlewares/VerifyToken.js : JWT token verification middleware that checks for valid tokens in request headers and adds user information to the request object.

config/cloudinary.js : Configuration file for Cloudinary cloud storage connection including API keys and cloud name setup.

config/cloudinaryUpload.js : Handles image upload logic to Cloudinary including file processing and returning image URLs.

config/multer.js : Multer configuration for handling multipart/form-data file uploads including storage settings and file filtering for images.

models/ : Contains Mongoose schema models for User, Article, Comment, and other database collections with validation rules and relationships.

Frontend Files

main.jsx : Application entry point that renders the root React component into the DOM and wraps the app with necessary providers.

App.jsx : Main application component that sets up React Router routes, defines protected routes based on user roles (Admin, Author, User), and manages the overall application structure.

index.css : Global styling file containing CSS variables, resets, fonts, and utility classes.

components/Header.jsx : Navigation header component that displays different menu items based on user login status and role (Admin/Author/User). Includes logout functionality.

components/Footer.jsx : Page footer component with copyright information, social media links, and contact details.

components/Home.jsx : Homepage component that displays featured articles, hero section, and call-to-action buttons.

components/Login.jsx : Login form component with email/username and password fields. Sends credentials to backend and stores JWT token on successful authentication.

components/Register.jsx : Registration form component with name, email, password, and role selection. Creates new user account.

components/Articles.jsx : Displays list of all published articles fetched from the backend. Includes search, filter, and pagination features.

components/ArticleByID.jsx : Displays detailed view of a single article including title, content, author info, publish date, and comments section.

components/WriteArticles.jsx : Form component for authors to create new articles with title, content, category, tags, and featured image upload.

components/EditArticle.jsx : Form component pre-filled with existing article data for authors to edit their own articles.

components/AuthorArticles.jsx : Displays list of articles written by the logged-in author with options to edit or delete each article.

components/AuthorProfile.jsx : Author profile page showing author information, bio, profile picture, and their published articles.

components/UserProfile.jsx : User profile page where regular users can view and edit their profile information.

components/AdminProfile.jsx : Admin dashboard showing system statistics, user management table, and article management interface.

components/ProtectedRoute.jsx : Route protection wrapper component that checks user authentication and role authorization before allowing access to protected pages.

components/Unauthorized.jsx : Access denied page shown when a user tries to access a page they don't have permission for.

components/RootLayout.jsx : Layout wrapper component that contains Header, Footer, and defines where child components render using Outlet.

api/axiosClient.js : Axios configuration with base URL, interceptors for adding auth tokens to requests, and handling response errors.

store/authStore.js : State management store using Zustand/Redux for managing authentication state including user info, login status, token, and role.

styles/common.js : Shared style constants, themes, and reusable CSS-in-JS styles used across components.

Key Features Implemented

Role-Based Authentication : Separate dashboards and permissions for Admin, Author, and User roles

JWT Token Authentication : Secure authentication using JSON Web Tokens

Article Management : Create, Read, Update, Delete articles

Image Upload : Cloudinary integration for featured images

User Registration & Login : Complete authentication flow

Protected Routes : Role-based route protection

Profile Management : Users can view and edit their profiles

Responsive Design : Mobile-friendly layouts

RESTful API : Well-structured backend API

State Management : Global state for authentication

Search & Filter : Find articles by title, category, or author

Comments System : Users can comment on articles
