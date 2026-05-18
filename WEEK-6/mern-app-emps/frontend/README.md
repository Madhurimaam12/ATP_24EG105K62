fetch and axios differences:1. Syntax: Fetch uses a more modern and cleaner syntax with promises, while Axios uses a more traditional syntax with callbacks.2. Browser support: Fetch is a built-in API in modern browsers, while Axios is a third-party library that needs to be included in the project.3. Interceptors: Axios provides interceptors that allow you to modify requests and responses before they are handled, while Fetch does not have this feature.4. Error handling: Fetch does not automatically reject HTTP error statuses (like 404 or 500), while Axios does. In Fetch, you need to manually check the response status and throw an error if it's not successful.5. Request cancellation: Axios supports request cancellation using the CancelToken API, while Fetch does not have built-in support for request cancellation.6. Response parsing: Fetch requires you to manually parse the response using methods like .json() or .text(), while Axios automatically parses the response based on the content type.7. File uploads: Axios provides easier file upload support with progress tracking, while Fetch requires more manual handling.   




# state management
        sharing state + keeping state sync across appq

        we can do using 2 things
        1) context API -> used for small apps
        2) Redux / Zustand-> used for Huge apps they are the advance state libraries

# Context API 
       -create context object(compared to a pipeline)
       - add state to context object(add water to pipeline)
       - set this context provider to a parent


# issues with context
     - context with use state hook is a best and simple state management mechanism for small applications.But it creates unnecessary rerendering issues when multiple state is a part of a context
     - to overcome this unnecessary re-rendering issue,create multiple context and make sure each context have a single state.\
     - when the application size is huge,then maintanance of multiple contexts will become an issue.For such large applications advance state management tools like redux or Zustand can be used.


# ADVANCED STATE MANAGEMENT with ZUSTAND
- Install Zustand
                npm install zustand
- Create a global store and keep state and functions that modify state

---

# MERN Employee Management App - Vercel Deployment

## Deployment Steps

### 1. Set up MongoDB Atlas
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Create a database user
4. Get your connection string (replace `<password>` with your actual password)

### 2. Deploy to Vercel
1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and sign up/login
3. Click "New Project" and import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 3. Set Environment Variables
In your Vercel project settings, add this environment variable:
- **Name**: `MONGODB_URI`
- **Value**: Your MongoDB Atlas connection string (e.g., `mongodb+srv://username:password@cluster.mongodb.net/empdb`)

### 4. Deploy
Click "Deploy" and wait for the build to complete.

## Features
- Create new employees
- View all employees
- Edit employee details
- Delete employees

## API Endpoints
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee
