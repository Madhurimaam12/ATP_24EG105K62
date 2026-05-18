### Steps to Create Backend with DB
1.Generate package.json
2.Create express server
3.Install mongoose and connect to MongoDB server
        REST API -----MongoDB nayive driver--->DB Server
        REST API -----Mongoose ODM tool ------->DB Server
4.Build USER REST API
        --Create User
        --Read all usera
        --Read a User by ID
        --Update a user by ID
        --Delete a User by ID
5.Create Schema and Model of the Resource(User)
6.Create USER API AND Define routes
7.Handling error in the code
    // error =>{name,message,callstack}
//status code
--->200 -- success expect create(for delete ,update,get)
--->201 -- created 
--->400 -- bad request
--->401 -- Unauthorised
--->404 -- Not found
--->500 -- Server error
(most fequently used status code)

Create Product REST API with below features
Product document structure
     a.productId (required)
     b.productName(required)
     c.price(required, min price 10000 and max price 50000)
     d.brand(required),
REST API with below operations
     a. Create product
     b. Read all products
     c. Read a product by productId
     d. Update a product by productId
     e. Delete a product by productId

### User Authentication(Login)
  -- Submit credentials and get token
        req------>Public routes(by anyone)
        req------>middleware------>protected routes(the routes which can be accessable by authenticated users only)
----csrf(important)
//middleware can exectue for all the statements


Make the following routes protected
        -Read Users and Products
        -Read User and Product by id
        -Update User and Product
        -Delete User and Product