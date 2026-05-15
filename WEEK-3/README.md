WEEK-3 Product Management API

This folder contains JavaScript programs that help in learning backend development with MongoDB, Mongoose, and Express.js. Each file focuses on building a complete REST API for product management.

ProductModel.js : Defines the product schema using Mongoose with validation rules including productId (required), productName (required), price (required with min: ₹10,000 and max: ₹50,000), and brand (required). Includes timestamps and disables version key.

ProductAPI.js : Creates a complete REST API using Express Router with all CRUD operations including create product (POST), read all products (GET), read single product by ID (GET), update product (PUT), and delete product (DELETE). Connects to MongoDB using the ProductModel.
