# Top 58 Express.js Interview Questions and Answers (2025)


## 1. What is _Express.js_, and how does it relate to _Node.js_?

**Express.js** is a web application framework that runs on **Node.js**. It simplifies the process of building web applications and APIs by providing a range of powerful features, including robust routing, middleware support, and HTTP utility methods. Thanks to its modular design, you can expand its functionality through additional libraries and Node.js modules.

### Key Features

- **Middleware**: Express.js makes use of middleware functions that have access to the request-response cycle. This allows for a variety of operations such as logging, authentication, and data parsing.

- **Routing**: The framework offers a flexible and intuitive routing system, making it easy to handle different HTTP request methods on various URLs.

- **Templates**: Integrated support for template engines enables the dynamic rendering of HTML content.

- **HTTP Methods**: It provides built-in methods for all HTTP requests, such as `get`, `post`, `put`, `delete`, simplifying request handling.

- **Error Handling**: Express streamlines error management, and its middleware functions can specifically handle errors.

- **RESTful APIs**: Its features such as request and response object chaining, along with HTTP method support, make it ideal for creating RESTful APIs.

### Relationship with Node.js

Express.js is a web application framework specifically designed to extend the capabilities of **Node.js** for web development. Node.js, on the other hand, is a cross-platform JavaScript runtime environment that allows developers to build server-side and networking applications.

Express.js accomplishes this through a layer of abstractions and a more structured approach, which Node.js, by itself, doesn't provide out of the box.

### Code Example: Basic Express Server

Here is the Node.js code:

```javascript
// Import required modules
const express = require('express');

// Create an Express application
const app = express();
const port = 3000;

// Define a route and its callback function
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
```
<br>

## 2. Explain the concept of _middleware_ in _Express.js_.

**Middleware** acts as a bridge between incoming HTTP requests and your Express.js application, allowing for a range of operations such as parsing request bodies, handling authentication, and even serving static files.

### Middleware Functions

A middleware function in Express is a **handler invoked in sequence** when an HTTP request is received. It has access to the request and response objects, as well as the `next` function to trigger the next middleware in line.

Each middleware function typically follows this signature:

```javascript
function middlewareFunction(req, res, next) {
    // ...middleware logic
    next(); // or next(err); based on whether to proceed or handle an error
}
```

Note that the `next()` call is essential to move on to the next middleware.

### Types of Middleware

#### Application-Level Middleware

Registered via `app.use(middlewareFunction)`, it's active for every incoming request, making it suitable for tasks like request logging or establishing cross-cutting concerns.

#### Router-Level Middleware

Operates on specific router paths and is defined using `router.use(middlewareFunction)`. It's useful for tasks related to particular sets of routes.

#### Error-Handling Middleware

Recognizable via its function signature `(err, req, res, next)`, this type of middleware specifically handles errors. In the middleware chain, it should be placed after regular middlewares and can be added using `app.use(function(err, req, res, next) { ... })`.

#### Built-In Middleware

Express offers ready-to-use middleware for tasks like serving static files or parsing the request body.

### Middleware Chaining

By **sequentially** calling `next()` within each middleware, you form a chain, facilitating a cascade of operations for an incoming request.

Consider a multi-tiered security setup, for example, with authentication, authorization, and request validation. Only when a request passes through all three tiers will it be processed by the actual route handler.

### Code Example: Middleware Chaining

Here is the code:

```javascript
const express = require('express');
const app = express();

// Sample middleware functions
function authenticationMiddleware(req, res, next) {
    console.log('Authenticating...');
    next();
}

function authorizationMiddleware(req, res, next) {
    console.log('Authorizing...');
    next();
}

function requestValidationMiddleware(req, res, next) {
    console.log('Validating request...');
    next();
}

// The actual route handler
app.get('/my-secured-endpoint', authenticationMiddleware, authorizationMiddleware, requestValidationMiddleware, (req, res) => {
    res.send('Welcome! You are authorized.');
});

app.listen(3000);
```
<br>

## 3. How would you set up a basic _Express.js_ application?

To set up a **basic Express.js** application, follow these steps:

### 1. Initialize the Project

Create a new directory for your project and run `npm init` to generate a `package.json` file.

### 2. Install Dependencies

Install **Express** as a dependency using the Node Package Manager (NPM):
```bash
npm install express
```

### 3. Create the Application

In your project directory, create a main file (usually named `app.js` or `index.js`) to set up the Express application.

Here is the JavaScript code:

```javascript
// Import the Express module
const express = require('express');

// Create an Express application
const app = express();

// Define a sample route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

### 4. Run the Application

You can start your Express server using Node.js:
```bash
node app.js
```

For convenience, you might consider using **Nodemon** as a development dependency which automatically restarts the server upon file changes.
<br>

## 4. What is the purpose of the `app.use()` function?

In Express.js, the `app.use()` function is a powerful tool for **middleware management**. It can handle HTTP requests and responses, as well as prepare data or execute processes in between.

### Key Functions

- **Global Middleware**: Without a specified path, the middleware will process every request.
- **Route-specific Middleware**: When given a path, the middleware will only apply to the matched routes.

### Common Use-Cases

- **Body Parsing**: To extract data from incoming requests, especially useful for POST and PUT requests.

  ```javascript
  const bodyParser = require('body-parser');
  app.use(bodyParser.json());
  ```

- **Handling CORS**: Useful in API applications to manage cross-origin requests.

  ```javascript
  app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
  });
  ```

- **Static File Serving**: For serving files like images, CSS, or client-side JavaScript.

  ```javascript
  app.use(express.static('public'));
  ```

- **Logging**: To record request details for debugging or analytics.

  ```javascript
  app.use(function(req, res, next) {
      console.log(`${new Date().toUTCString()}: ${req.method} ${req.originalUrl}`);
      next();
  });
  ```

- **Error Handling**: To manage and report errors during request processing.

  ```javascript
  app.use(function(err, req, res, next) {
      console.error(err);
      res.status(500).send('Internal Server Error');
  });
  ```

### Chaining Middleware

You can **stack multiple middleware** using `app.use()` in the order they need to execute. For a matched route, control can be passed to the next matching route or terminated early using `next()`.
<br>

## 5. How do you serve _static files_ using _Express.js_?

In an Express.js **web application**, you often need to **serve static files** such as stylesheets, client-side JavaScript, and images. You can accomplish this using the `express.static` middleware.

### Middleware for Serving Static Files

The `express.static` middleware function serves static files and is typically used to serve assets like images, **CSS**, and **client-side JavaScript**.

Here is the code example:

```javascript
app.use(express.static('public'));
```

In this example, the folder named `public` will be used to serve the static assets.

### Additional Configuration with Method Chaining

You can further configure the behavior of the `express.static` middleware by chaining methods.

For example, to set the cache-control header, the code looks like this:

```javascript
app.use(express.static('public', {
    maxAge: '1d'
}));
```

Here, the `'1d'` ensures that caching is enabled for a day.

### Using a Subdirectory

If you want to serve files from a subdirectory, you can specify it when using the `express.static` middleware.

Here is the code example:

```javascript
app.use('/static', express.static('public'));
```

This serves the files from the `public` folder but any requests for these files should start with `/static`.

### What `express.static` Serves

- **Images**: PNG, JPEG, GIF
- **Text Content**: HTML, CSS, JavaScript
- **Fonts**
- **JSON Data**

#### Not for dynamic content

While `express.static` is excellent for **static assets**, it's not suitable for dynamic content or data in **POST** requests.
<br>

## 6. Discuss the difference between `app.get()` and `app.post()` in _Express.js_.

In **Express.js**, `app.get()` and `app.post()` are two of the most commonly used HTTP method middleware. The choice between them (or using both) typically depends on whether you are **retrieving** or **submitting/persisting** data.

### Key Distinctions

#### HTTP Verbs: External Visibility

- **app.get()**: Listens for GET requests. Designed for data retrieval. Visible URLs typically trigger such requests (e.g., links or direct URL entry in the browser).

- **app.post()**: Listens for POST requests. Intended for data submission. Typically not visible in the URL bar, commonly used for form submissions.

#### Data Transmission

- **app.get()**: Uses query parameters for data transmission, visible in the URL. Useful for simple, non-sensitive, read-only data (e.g., filtering or pagination). 

- **app.post()**: Uses request body for data transmission, which can be in various formats (e.g., JSON, form data). Ideal for more complex data, file uploads, or sensitive information.

### Using Both `app.get()` and `app.post()` for the Same Route

There are cases, especially for **RESTful** design, where a single URL needs to handle both data retrieval and data submission.

- **Resource Retrieval and Creation**: 
   - **Fetch a Form**: Use `app.get()` to return a form for users to fill out.
   - **Form Submission**: Use `app.post()` to process and save the submitted form data.
- **Complete Entity Modification**: For a complete update (or replacement in REST), using `app.post()` ensures that the update action is triggered via a post request, not a get request. This distiction is important to obey the RESTful principles. 

### Code Example: Using both `app.get()` and `app.post()` for a single route

Here is the JavaScript code:
```javascript
const userRecords = {}; // in-memory "database" for the sake of example

// Handle user registration form
app.get('/users/register', (req, res) => {
    res.send('Please register: <form method="POST"><input name="username"></form>');
});

// Process submitted registration form
app.post('/users/register', (req, res) => {
    userRecords[req.body.username] = req.body;
    res.send('Registration complete');
});
```
<br>

## 7. How do you retrieve the _URL parameters_ from a _GET request_ in _Express.js_?

In **Express.js**, you can extract **URL parameters** from a **GET** request using the `req.params` object. Here's a quick look at the steps and the code example:

### Code Example: Retrieving URL Parameters

```javascript
// Sample URL: http://example.com/users/123
// Relevant Route: /users/:id

// Define the endpoint/route
app.get('/users/:id', (req, res) => {
    // Retrieve the URL parameter
    const userId = req.params.id;
    // ... (rest of the code)
});
```

In this example, the URL parameter `id` is extracted and used to fetch the corresponding user data.

### Additional Steps for Complex GET Requests

For simple and straightforward **GET** requests, supplying URL parameters directly works well. However, for more complex scenarios, such as parsing parameters from a URL with the help of `querystrings` or handling optional parameters, **Express.js** offers more advanced techniques which are outlined below:

#### Parsing Query Parameters

- **What It Is**: Additional data passed in a URL after the `?` character. Example: `http://example.com/resource?type=user&page=1`.

- **How to Access It**: Use `req.query`, an object that provides key-value pairs of the parsed query parameters.

#### Code Example: Parsing Query Parameters

```javascript
app.get('/search', (req, res) => {
    const { q, category } = req.query;
    // ... (rest of the code)
});
```

#### Optional and Catch-All Segments

- **Optional Segments**: URL segments enclosed in parentheses are optional and can be accessed using `req.params`. Example: `/book(/:title)`

- **Catch-All Segments**: Captures the remainder of the URL and is useful in cases like URL rewriting. Denoted by an asterisk (`*`) or double asterisk (`**`). Accessed using `req.params` as well. Example: `/documents/*`
<br>

## 8. What are _route handlers_, and how would you implement them?

**Route handlers** in Express.js are middleware functions designed to manage specific paths in your application.

Depending on the HTTP method and endpoint, they can perform diverse tasks, such as data retrieval from a database, view rendering, or HTTP response management.

### Code Example: Setting Up a Simple Route Handler

Here is the code:

```javascript
// Responds with "Hello, World!" for GET requests to the root URL (/)
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
```

In this example, the route handler is `(req, res) => { res.send('Hello, World!'); }`. It listens for GET requests on the root URL and responds with "Hello, World!".

### What Are Route-Handler Chains?

You can associate numerous route-managing **middleware functions** to a single route. Every middleware function in the chain has to either proceed to the following function using `next()` or conclude the request-response cycle.

This allows for checks like user authentication before accessing a route.

### HTTP Method Convenience Methods

Express.js offers specialized, highly-readable methods for the most common HTTP requests:

- `app.get()`
- `app.post()`
- `app.put()`
- `app.delete()`
- `app.use()`

These methods streamline route handling setup.
<br>

## 9. How do you enable _CORS_ in an _Express.js_ application?

**Cross-Origin Resource Sharing** (CORS) is a mechanism that allows web pages to make requests to a different domain. In Express.js, you can enable CORS using the `cors` package or by setting headers manually.

### Using the `cors` Package

1. **Install `cors`**:

   Use npm or yarn to install the `cors` package.

   ```bash
   npm install cors
   ```

2. **Integrate with Your Express App**:

   Use the `app.use(cors())` middleware. You can also customize CORS behavior with options.

   ```javascript
   const express = require('express');
   const cors = require('cors');
   const app = express();

   // Enable CORS for all routes
   app.use(cors());

   // Example: Enable CORS only for a specific route
   app.get('/public-data', cors(), (req, res) => {
       // ...
   });

   // Example: Customize CORS options
   const customCorsOptions = {
       origin: 'https://example.com',
       optionsSuccessStatus: 200 // Some legacy browsers choke on 204
   };

   app.use(cors(customCorsOptions));
   ```

### Manual CORS Setup

Use the following code example to **set CORS headers manually** in your Express app:

```javascript
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        return res.status(200).json({});
    }
    next();
});
```

Make sure to place this middleware before your route definitions.
<br>

## 10. Explain the use of `next()` in _Express.js middleware_.

In Express.js, **middleware** functions are crucial for handling HTTP requests. A single request can pass through multiple middlewares before reaching its endpoint, providing opportunities for tasks like logging, data parsing, and error handling. The `next()` function is instrumental in this process, allowing for both regular middleware chaining and special error handling.

### What is `next()`?

- `next()`: A callback function that, when called within a middleware, passes control to the next middleware in the stack.
- `next()` is typically invoked to signal that a middleware has completed its tasks and that the request should move on to the next middleware.
- If a middleware doesn't call `next()`, the request flow can get **stuck**, and the subsequent middlewares won't be executed.

### Use-Cases

1. **Regular Flow**: Invoke `next()` to move the request and response objects through the middleware stack.
2. **Error Handling**: If a middleware detects an error, it can short-circuit the regular flow and jump directly to an error-handling middleware (defined with `app.use(function(err, req, res, next) {})`). This is achieved by calling `next(err)`, where `err` is the detected error.

### Code Example: Logging Middleware

Here is the code:

```javascript
const app = require('express')();

// Sample middleware: logs the request method and URL
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // Move to the next middleware
});

// Sample middleware: logs the current UTC time
app.use((req, res, next) => {
    console.log(new Date().toUTCString());
    next(); // Move to the next middleware
});

app.listen(3000);
```

In this example, both middlewares call `next()` to allow the request to progress to the next logging middleware and eventually to the **endpoint** (not shown, but would be the next in the chain).

Without the `next()` calls, the request would get **stuck** after the first middleware.
<br>

## 11. What is the role of the `express.Router` class?

The `express.Router` is a powerful tool for **managing multiple route controllers**. It helps in organizing routes and their handling functions into modular, self-contained groups.

### Key Features

- **Modularity**: Rely on separate route modules for improved code organization, maintainability, and collaboration.

- **Middlewares**: Like the main `express` app, the router can also use middlewares to process incoming requests.

- **HTTP Method Chaining**: Simplifies route handling by allowing method-specific routes to be defined using method names.

#### Example: Middleware and Route Handling

Here is the Node.js code:

```javascript
const express = require('express');
const router = express.Router();

// Logger Middleware
router.use((req, res, next) => {
  console.log('Router-specific Request Time:', Date.now());
  next();
});

// "GET" method route
router.get('/', (req, res) => {
  res.send('Router Home Page');
});

// "POST" method route
router.post('/', (req, res) => {
  res.send('Router Home Page - POST Request');
});

module.exports = router;
```

In this example, we:

- Utilize the built-in `express.Router`.
- Attach a general-purpose middleware and two different HTTP method-specific routes.
- The router is then integrated into the main `express` app using:

```javascript
const app = express();
const router = require('./myRouterModule');

app.use('/routerExample', router);
```

Here, `app.use('/routerExample', router);` assigns all routes defined in the router to `/routerExample`.
<br>

## 12. How do you handle _404 errors_ in _Express.js_?

**Handling 404 errors** in Express is essential for capturing and responding to requests for non-existent resources. You typically use both **middleware** and **HTTP response** mechanisms for this purpose.

### Middleware for 404s

1. Use `app.use` at the end of the middleware chain to capture unresolved routes.
2. Invoke the middleware with `next()` and an `Error` object to forward to the error-handling middleware.

Here is the Node.js code example:

```javascript
app.use((req, res, next) => {
    const err = new Error(`Not Found: ${req.originalUrl}`);
    err.status = 404;
    next(err);
});
```

### Error-Handling Middleware for 404s and Other Errors

1. Define an error-handling middleware with **four** arguments. The first one being the `error` object.
2. Check the error's status and respond accordingly. If it's a 404, handle it as a not-found error; otherwise, handle it as a server error.

Here is the Node.js code:

```javascript
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).send(message);
});
```

### Full Example: 

Here is the complete Node.js application:

```javascript
const express = require('express');
const app = express();
const port = 3000;

// Sample router for demonstration
const usersRouter = express.Router();
usersRouter.get('/profile', (req, res) => {
    res.send('User Profile');
});
app.use('/users', usersRouter);

// Capture 404s
app.use((req, res, next) => {
    const err = new Error(`Not Found: ${req.originalUrl}`);
    err.status = 404;
    next(err);
});

// Error-handling middleware
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).send(message);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
```
<br>

## 13. What are the differences between `req.query` and `req.params`?

In Express.js, `req.query` is used to access **GET** request parameters, while `req.params` is used to capture parameters defined in the **URL path**.

### Understanding Express.js Routing

Express.js uses **app.get()** and similar functions to handle different types of HTTP requests.

- **app.get('/users/:id')**: Matches GET requests to `/users/123` where `123` is the `:id` parameter in the path.

### Accessing Request Data

- **req.query**: Utilized to extract query string parameters from the request URL. Example: For the URL `/route?id=123`, use `req.query.id` to obtain `123`.
- **req.params**: Used to retrieve parameters from the request URL path. For the route `/users/:id`, use `req.params.id` to capture the ID, such as for `/users/123`.

### Code Example: Request Data

Here is the Express.js server setup:

```javascript
const express = require('express');
const app = express();
const port = 3000;

// Endpoint to capture query string parameter
app.get('/query', (req, res) => {
  console.log(req.query);
  res.send('Received your query param!');
});

// Endpoint to capture URL parameter
app.get('/user/:id', (req, res) => {
  console.log(req.params);
  res.send('Received your URL param!');
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
```
<br>

## 14. Describe the purpose of `req.body` and how you would access it.

In an Express.js application, `req.body` is a property of the **HTTP request object** that contains data submitted through an HTTP POST request.

The POST request might originate from an HTML form, a client-side JavaScript code, or another API client. The data in `req.body` is typically structured as a JSON object or a URL-encoded form.

### Middleware and Parsing Request Body

The `express.json()` and `express.urlencoded()` middleware parse incoming `Request` objects before passing them on. These middlewares populate `req.body` with the parsed JSON and URL-encoded data, respectively.

Here is an example of how you might set up body parsing in an Express app:

```javascript
const express = require('express');
const app = express();

// Parse JSON and URL-encoded data into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

### Accessing `req.body` Data

Once the body parsing middleware is in place, you can access the parsed data in your **route handling** functions:

- **POST** or **PUT** Requests: When a client submits a POST or PUT request with a JSON payload in the request body, you can access this data through `req.body`.

Here is an example:

Client-side JavaScript:

```javascript
fetch('/example-route', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ key: 'value' })
});
```

Server-side Express route handler:

```javascript
app.post('/example-route', (req, res) => {
  console.log(req.body); // Outputs: { key: 'value' }
});
```

- **HTML Forms**: When a form is submitted using `<form>` with `action` pointing to your Express route and `method` as POST or PUT, and the form fields are input elements within the form, `req.body` will contain these form field values.

Here is an example:

HTML form:

```html
<form action="/form-endpoint" method="POST">
  <input type="text" name="username" />
  <input type="password" name="password" />
  <button type="submit">Submit</button>
</form>
```

Express route:

```javascript
app.post('/form-endpoint', (req, res) => {
  console.log(req.body.username, req.body.password);
});
```

A modern technique for sending form data using `fetch` is by setting the `Content-Type` header to `'application/x-www-form-urlencoded'` and using the `URLSearchParams` object:

```javascript
fetch('/form-endpoint', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: new URLSearchParams({ username: 'user', password: 'pass' })
});
```

- **Custom Parsers**: While Express provides built-in body parsers for JSON and URL-encoded data, you might receive data in another format. In such cases, you can create custom middleware to parse and shape the data as needed. This middleware should populate `req.body`.
<br>

## 15. How do you create a _middleware_ that logs the _request method_ and _URL_ for every request?

In Express.js, **middlewares** allow you to handle HTTP requests. Here, you will learn how to create a simple **logging middleware** that records the request method and URL.

### Setting Up the Express App

First, install Express via npm, and set up your `app.js` file:

```javascript
const express = require('express');
const app = express();
```

### Creating the Logging Middleware

Define a logging function that extracts the request method and URL, and then use `app.use()` to mount it as middleware.

```javascript
// Logging Middleware
const logRequest = (req, res, next) => {
  console.log(`Received ${req.method}  request for: ${req.url}`);
  next(); // Call next to proceed to the next middleware
};

// Mount the middleware for all routes
app.use(logRequest);
```

### Testing the Setup

Use `app.get()` to handle GET requests, and `app.listen()` to start the server.

```javascript
// Sample route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

When you visit `http://localhost:3000/` in your browser and check the server console, you should see the request being logged.
<br>





## 16. How does Express.js handle errors, and what is the correct way to write error-handling middleware?

In Express, errors are handled using a special type of middleware that has **four parameters** instead of the usual three. The extra first parameter is the error object. Express knows this function is for errors precisely because of this four-argument signature.

Key rules:
- Define error-handling middleware **after** all your regular routes.
- Always pass errors via `next(err)` rather than throwing them directly.
- Send an appropriate HTTP status code and message back to the client.

### Code Example

```javascript
const express = require('express');
const app = express();

app.get('/broken', (req, res, next) => {
  const err = new Error('Something went wrong!');
  err.status = 500;
  next(err); // Pass the error to the error handler
});

// Error-handling middleware — must have exactly 4 parameters
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
});

app.listen(3000);
```

If you don't call `next(err)`, Express will leave the request hanging and the client will time out.
<br>

## 17. How do you handle errors inside async/await route handlers?

When you use `async/await` inside a route handler, Express 4.x does **not** automatically catch errors from rejected promises. If an error is thrown and not caught, Express never knows about it and the request hangs.

### Option 1: Use try/catch and call next(err)

```javascript
app.get('/user/:id', async (req, res, next) => {
  try {
    const user = await getUserFromDB(req.params.id);
    res.json(user);
  } catch (err) {
    next(err); // Forward to error-handling middleware
  }
});
```

### Option 2: Write a reusable async wrapper

```javascript
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

app.get('/user/:id', asyncHandler(async (req, res) => {
  const user = await getUserFromDB(req.params.id);
  res.json(user);
}));
```

> **Note:** Express 5.x (currently in beta) handles rejected promises automatically, removing the need for try/catch wrappers.
<br>

## 18. What is a template engine, and how do you use one in Express?

A **template engine** lets you build dynamic HTML pages on the server by combining a template file with real data. Express fills in the placeholders before sending the page to the browser.

Popular choices: **EJS** (HTML-like with `<% %>` tags) and **Pug** (indentation-based shorthand).

### Setting Up EJS

```bash
npm install ejs
```

```javascript
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/profile', (req, res) => {
  res.render('profile', { name: 'Rahul', age: 28 });
});

app.listen(3000);
```

`views/profile.ejs`:
```html
<h1>Hello, <%= name %>!</h1>
<p>You are <%= age %> years old.</p>
```

EJS feels familiar to anyone who knows HTML. Pug offers a cleaner syntax but requires learning its indentation rules.
<br>

## 19. What is the difference between `app.use()` and `app.get()` / `app.post()`?

| Feature | `app.use()` | `app.get()` / `app.post()` etc. |
|---|---|---|
| HTTP method | Matches **all** methods | Matches only the **specific** method |
| Path matching | Matches if URL **starts with** the path | Requires an **exact** path match |
| Primary purpose | Mounting middleware | Handling specific route actions |

```javascript
// Runs for ALL HTTP methods on any path starting with /api
app.use('/api', (req, res, next) => {
  console.log('API request received');
  next();
});

// Only runs for GET /api/users
app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: 'Rahul' }]);
});
```

Use `app.use()` for broad middleware (logging, auth checks) and `app.get()` etc. for specific route handling.
<br>

## 20. How do you validate incoming request data in Express?

Always validate what clients send — never trust user input. The most popular library for this is **express-validator**.

```bash
npm install express-validator
```

```javascript
const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express();
app.use(express.json());

app.post(
  '/register',
  body('email').isEmail().withMessage('Provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.json({ message: 'Registration successful!' });
  }
);

app.listen(3000);
```

If validation fails, the client gets a `400 Bad Request` with a clear description of what went wrong. You can also use **Joi** for more complex schema validation.
<br>

## 21. How do you implement sessions in Express?

Sessions let you store information about a user on the **server** across multiple requests. The client gets a cookie with a session ID; the server uses it to look up the user's data.

```bash
npm install express-session
```

```javascript
const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, maxAge: 3600000 },
}));

app.get('/login', (req, res) => {
  req.session.userId = 42;
  res.send('Logged in!');
});

app.get('/dashboard', (req, res) => {
  if (!req.session.userId) return res.status(401).send('Please log in');
  res.send(`Welcome, user ${req.session.userId}`);
});

app.listen(3000);
```

By default sessions are stored in memory — fine for development, but use a session store like `connect-redis` or `connect-mongo` in production.
<br>

## 22. How do you implement JWT-based authentication in Express?

**JWT (JSON Web Token)** authentication is stateless — the server issues a signed token and the client sends it with every request. The server just verifies the signature; no session storage needed.

```bash
npm install jsonwebtoken
```

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

const SECRET = 'my-super-secret-key';

// Login: issue a token
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'rahul' && password === '1234') {
    const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

// Middleware to protect routes
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token required' });
  const token = authHeader.split(' ')[1];
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
}

app.get('/profile', authenticate, (req, res) => {
  res.json({ message: `Hello, ${req.user.username}` });
});

app.listen(3000);
```
<br>

## 23. What is Helmet.js and why should you use it?

**Helmet** is a collection of middleware functions that set important HTTP security headers to protect your Express app from common attacks.

```bash
npm install helmet
```

```javascript
const express = require('express');
const helmet = require('helmet');
const app = express();

app.use(helmet()); // Sets all security headers with sensible defaults

app.listen(3000);
```

Just that one line protects against:
- **XSS** via `Content-Security-Policy`
- **Clickjacking** via `X-Frame-Options: DENY`
- **MIME sniffing** via `X-Content-Type-Options: nosniff`
- **Stack fingerprinting** by removing the `X-Powered-By: Express` header

Always add Helmet to production Express apps — it's a five-second win for meaningful security.
<br>

## 24. How do you implement rate limiting in Express?

Rate limiting protects your server from being overwhelmed by too many requests — from bots, scrapers, or brute-force attacks.

```bash
npm install express-rate-limit
```

```javascript
const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15-minute window
  max: 100,
  message: 'Too many requests, please try again later.',
});

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10-minute window
  max: 5, // Only 5 login attempts allowed
  message: 'Too many login attempts, please try again in 10 minutes.',
});

app.use(generalLimiter);
app.post('/login', loginLimiter, (req, res) => res.send('Login route'));

app.listen(3000);
```

Apply a stricter limiter to sensitive routes like `/login`, `/register`, and `/forgot-password`.
<br>

## 25. What is the difference between `res.send()`, `res.json()`, and `res.end()`?

| Method | Best For |
|---|---|
| `res.send()` | General use — sends strings, Buffers, or objects; sets `Content-Type` automatically |
| `res.json()` | JSON API responses — calls `JSON.stringify()` and sets `Content-Type: application/json` |
| `res.end()` | Low-level — ends the response with no body; used when you just need to close the connection |

```javascript
app.get('/text', (req, res) => res.send('Hello!'));          // text/html
app.get('/data', (req, res) => res.json({ name: 'Rahul' })); // application/json
app.get('/ping', (req, res) => res.status(204).end());       // No body
```

For REST APIs, prefer `res.json()`. Use `res.end()` only when you explicitly don't want to send a body.
<br>

## 26. How do you chain multiple route handlers for a single route?

You can attach multiple middleware functions to one route by passing them as extra arguments. This is great for separating authentication, authorization, and business logic into clean, reusable pieces.

```javascript
function isAuthenticated(req, res, next) {
  if (req.headers['x-auth-token'] === 'valid-token') return next();
  res.status(401).send('Unauthorized');
}

function isAdmin(req, res, next) {
  if (req.headers['x-role'] === 'admin') return next();
  res.status(403).send('Forbidden');
}

app.get('/admin/dashboard', isAuthenticated, isAdmin, (req, res) => {
  res.send('Welcome to the admin dashboard!');
});
```

If any middleware in the chain sends a response without calling `next()`, the remaining handlers are skipped.
<br>

## 27. What is `app.route()` and when would you use it?

`app.route()` lets you group all HTTP method handlers for a single URL path together using method chaining. This avoids repeating the path string and keeps related handlers close together.

```javascript
app.route('/users')
  .get((req, res) => res.json([{ id: 1, name: 'Rahul' }]))
  .post((req, res) => res.status(201).json({ message: 'User created' }));

app.route('/users/:id')
  .get((req, res) => res.json({ id: req.params.id }))
  .put((req, res) => res.json({ message: 'User updated' }))
  .delete((req, res) => res.json({ message: 'User deleted' }));
```

This is especially useful in REST APIs where you naturally group operations by resource.
<br>

## 28. How does Express handle file uploads?

Express doesn't handle file uploads on its own. You need the **Multer** middleware, which parses `multipart/form-data` (the format browsers use when submitting file inputs).

```bash
npm install multer
```

```javascript
const express = require('express');
const multer = require('multer');
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

app.post('/upload', upload.single('photo'), (req, res) => {
  res.json({ message: 'Uploaded!', file: req.file });
});

app.listen(3000);
```

`req.file` contains details about the uploaded file (name, size, path). For multiple files, use `upload.array('photos', 5)` and `req.files`. Always validate file types and sizes for security.
<br>

## 29. How do you compress responses in Express to improve performance?

The **compression** middleware automatically gzip-compresses your HTTP responses, reducing their size and making your API faster for clients on slow connections.

```bash
npm install compression
```

```javascript
const express = require('express');
const compression = require('compression');
const app = express();

app.use(compression()); // Compresses all responses

app.get('/data', (req, res) => {
  const largeArray = Array.from({ length: 1000 }, (_, i) => ({ id: i }));
  res.json(largeArray);
});

app.listen(3000);
```

The middleware checks the client's `Accept-Encoding` header automatically. You can also set a `threshold` to skip compression for very small responses:

```javascript
app.use(compression({ threshold: 1024 })); // Only compress responses > 1 KB
```
<br>

## 30. How do you structure a large Express application to keep it maintainable?

As your app grows, a single file becomes unmanageable. The standard approach is to separate concerns across multiple folders:

```
my-app/
├── src/
│   ├── routes/        # Route definitions
│   ├── controllers/   # Business logic per route
│   ├── services/      # Database/external API access
│   ├── middleware/    # Custom middleware (auth, logging)
│   ├── models/        # Database schemas
│   └── utils/         # Helper functions
├── app.js             # Express setup (middleware, routes)
└── server.js          # Server entry point (app.listen)
```

`routes/userRoutes.js`:
```javascript
const express = require('express');
const router = express.Router();
const { getAllUsers, createUser } = require('../controllers/userController');
router.get('/', getAllUsers);
router.post('/', createUser);
module.exports = router;
```

`app.js`:
```javascript
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);
module.exports = app;
```

This separation makes each piece independently testable and keeps files small and focused.
<br>


## 31. How do you test an Express application?

Testing an Express app typically involves two levels:

1. **Unit tests** — test individual functions (controllers, middleware, utils) in isolation using a test runner like **Jest** or **Mocha**.
2. **Integration tests** — test actual HTTP routes by sending real requests to your app without starting a live server. The **Supertest** library is the standard tool for this.

```bash
npm install --save-dev jest supertest
```

`app.js` (export the app without calling `listen`):
```javascript
const express = require('express');
const app = express();
app.use(express.json());
app.get('/users', (req, res) => res.json([{ id: 1, name: 'Rahul' }]));
module.exports = app;
```

`app.test.js`:
```javascript
const request = require('supertest');
const app = require('./app');

describe('GET /users', () => {
  it('returns a list of users', async () => {
    const res = await request(app).get('/users');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBe('Rahul');
  });
});
```

The key is to **export your app** separately from starting the server so Supertest can import it directly.
<br>

## 32. What is the purpose of `express.json()` and `express.urlencoded()`?

These are two built-in middleware functions that tell Express how to **parse the body** of incoming requests.

- `express.json()` — parses requests where the `Content-Type` is `application/json`. Without it, `req.body` will be `undefined` for JSON POST requests.
- `express.urlencoded({ extended: true })` — parses requests where the `Content-Type` is `application/x-www-form-urlencoded`, which is the format traditional HTML forms use.

```javascript
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
  console.log(req.body); // Works for both JSON and form data
  res.json({ received: req.body });
});
```

Before Express 4.16, you had to use the separate `body-parser` package. Now these are built in and you should prefer them over `body-parser`.
<br>

## 33. Why would `req.body` be `undefined`, and how do you fix it?

`req.body` is `undefined` when you haven't set up body-parsing middleware, or when the middleware is placed **after** the route that tries to use `req.body`.

**Common causes and fixes:**

| Cause | Fix |
|---|---|
| Missing `express.json()` | Add `app.use(express.json())` before your routes |
| Missing `express.urlencoded()` | Add it for HTML form submissions |
| Middleware added after routes | Move `app.use(express.json())` to the top, before any routes |
| Wrong `Content-Type` header | Make sure the client sends `Content-Type: application/json` for JSON requests |

```javascript
const express = require('express');
const app = express();

// CORRECT: middleware before routes
app.use(express.json());

app.post('/data', (req, res) => {
  console.log(req.body); // Now this works
  res.json(req.body);
});
```
<br>

## 34. How do you redirect a request in Express?

Use `res.redirect()` to send the client to a different URL. By default it sends a `302 Found` status (temporary redirect), but you can specify any redirect status code.

```javascript
// Temporary redirect (302 by default)
app.get('/old-page', (req, res) => {
  res.redirect('/new-page');
});

// Permanent redirect (301)
app.get('/old-api/users', (req, res) => {
  res.redirect(301, '/api/v2/users');
});

// Redirect to an external URL
app.get('/go-to-google', (req, res) => {
  res.redirect('https://www.google.com');
});
```

Use `301` for permanent redirects (e.g., after renaming a route) so search engines and clients update their cached links. Use `302` for temporary redirects (e.g., while a page is under maintenance).
<br>

## 35. What is the difference between `res.redirect()` and `res.render()`?

| Method | What it does |
|---|---|
| `res.redirect()` | Tells the client to make a **new request** to a different URL |
| `res.render()` | Renders an HTML template **on the server** and sends it to the client in the current response |

```javascript
// Redirect: client browser navigates to /home
app.get('/old-home', (req, res) => {
  res.redirect('/home');
});

// Render: server processes the template and sends HTML
app.get('/home', (req, res) => {
  res.render('home', { title: 'Welcome', user: 'Rahul' });
});
```

Use `redirect` when you want the client to go somewhere else. Use `render` when you want to generate and send back an HTML page from a template.
<br>

## 36. How do you set custom HTTP response headers in Express?

Use `res.set()` or `res.header()` (they are identical) to add or override response headers before sending the response.

```javascript
app.get('/api/data', (req, res) => {
  res.set('X-Custom-Header', 'MyValue');
  res.set('Cache-Control', 'no-store');
  res.json({ data: 'hello' });
});

// Setting multiple headers at once
app.get('/multi', (req, res) => {
  res.set({
    'X-App-Version': '2.0',
    'X-Request-Id': '12345',
  });
  res.send('Done');
});
```

You can also use `res.append()` to add to an existing header without overwriting it. Custom response headers are useful for API versioning, caching control, and passing metadata to clients.
<br>

## 37. What is the `req.ip` property, and how do you get the real client IP behind a proxy?

`req.ip` gives you the IP address of the request sender. However, if your Express app runs behind a reverse proxy (like Nginx or a load balancer), `req.ip` will give you the proxy's IP, not the real client's IP.

To get the real client IP, you need to trust the proxy and read the `X-Forwarded-For` header:

```javascript
const express = require('express');
const app = express();

// Tell Express to trust the first proxy in front of it
app.set('trust proxy', 1);

app.get('/ip', (req, res) => {
  res.send(`Your IP is: ${req.ip}`);
});
```

With `trust proxy` set, Express reads the IP from the `X-Forwarded-For` header automatically. Be careful with this setting — only trust proxies you actually control, otherwise clients can spoof their IP address.
<br>

## 38. How do you handle environment-specific configuration in Express?

The standard way is to use **environment variables** via `process.env`, usually loaded from a `.env` file using the **dotenv** package.

```bash
npm install dotenv
```

`.env` file (never commit this to Git):
```
PORT=3000
DB_URL=mongodb://localhost:27017/myapp
JWT_SECRET=supersecretkey
NODE_ENV=development
```

`app.js`:
```javascript
require('dotenv').config(); // Load .env variables into process.env

const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`Running in ${process.env.NODE_ENV} mode`);
});

app.listen(port, () => console.log(`Server running on port ${port}`));
```

Never hardcode secrets like passwords, API keys, or JWT secrets in your source code. Use environment variables and a `.gitignore` to keep `.env` out of version control.
<br>

## 39. How do you use Passport.js for authentication in Express?

**Passport.js** is an authentication middleware for Node.js that supports many authentication strategies — local username/password, Google OAuth, GitHub, JWT, and more. It plugs into Express via `app.use()`.

```bash
npm install passport passport-local express-session
```

```javascript
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Define how to verify a user
passport.use(new LocalStrategy((username, password, done) => {
  if (username === 'rahul' && password === '1234') {
    return done(null, { id: 1, name: 'Rahul' });
  }
  return done(null, false, { message: 'Incorrect credentials' });
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => done(null, { id, name: 'Rahul' }));

app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
}));

app.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/login');
  res.send(`Hello ${req.user.name}`);
});

app.listen(3000);
```
<br>

## 40. What happens if you call `next()` after already sending a response?

If you call `next()` after sending a response (e.g., after `res.json()`), Express will continue executing the next middleware in the stack. If that next middleware also tries to send a response, you'll get the error: **"Cannot set headers after they are sent to the client"**.

```javascript
// BAD: calls next() after sending a response
app.get('/bad', (req, res, next) => {
  res.send('Response sent');
  next(); // This continues to the next middleware, which can cause errors
});

// GOOD: return after sending, or use if/else
app.get('/good', (req, res, next) => {
  if (someCondition) {
    return res.send('Response sent'); // return prevents further execution
  }
  next();
});
```

Always use `return` before `res.send()`, `res.json()`, or `res.end()` when there is more code below it in the same function, to prevent accidentally calling `next()` afterwards.
<br>

## 41. Can you call `res.send()` more than once in the same request?

No. You can only send **one response** per request in Express. Calling `res.send()` or `res.json()` a second time will throw an error: **"Cannot set headers after they are sent to the client"**.

```javascript
// BAD: sends the response twice — causes an error
app.get('/wrong', (req, res) => {
  res.send('First response');
  res.send('Second response'); // Error! Headers already sent
});

// GOOD: only one response per request
app.get('/correct', (req, res) => {
  if (someCondition) {
    return res.send('Condition is true');
  }
  res.send('Condition is false');
});
```

This is a common bug when using `if` statements without `return`. Always return immediately after sending a response.
<br>

## 42. What is the difference between third-party middleware and built-in middleware in Express?

**Built-in middleware** comes packaged with Express itself and requires no extra installation:

- `express.json()` — parses JSON request bodies
- `express.urlencoded()` — parses URL-encoded form data
- `express.static()` — serves static files

**Third-party middleware** is installed from npm and extends Express with extra functionality:

- `cors` — handles Cross-Origin Resource Sharing
- `helmet` — sets security headers
- `morgan` — logs HTTP requests
- `multer` — handles file uploads
- `express-session` — manages user sessions
- `express-rate-limit` — rate limiting

```javascript
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

// Built-in
app.use(express.json());

// Third-party
app.use(morgan('dev'));
app.use(cors());
```

Built-in middleware handles core parsing; third-party extends for real-world needs like logging, security, and auth.
<br>

## 43. What is `morgan` and why is it useful?

**Morgan** is a popular HTTP request logger for Express. It automatically logs details about every incoming request — the method, URL, status code, response time, and more — which makes debugging and monitoring much easier.

```bash
npm install morgan
```

```javascript
const express = require('express');
const morgan = require('morgan');
const app = express();

// 'dev' format: colourful, concise logs for development
app.use(morgan('dev'));

// 'combined' format: detailed Apache-style logs for production
// app.use(morgan('combined'));

app.get('/', (req, res) => res.send('Hello!'));
app.listen(3000);
```

Sample output with `'dev'` format:
```
GET / 200 5.123 ms - 6
POST /login 401 2.456 ms - 12
```

In production, use `'combined'` format and pipe the output to a log file or a logging service like Datadog or Loggly.
<br>

## 44. How do you enable HTTP request logging in Express?

The easiest way is to use the **morgan** middleware (see Q43). But you can also write your own simple logging middleware if you want more control:

```javascript
const express = require('express');
const app = express();

// Custom logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

app.get('/', (req, res) => res.send('Hello'));
app.listen(3000);
```

The `res.on('finish')` event fires after the response is sent, so you can log the actual status code and response time.

For production, always log to a persistent storage or a monitoring service — console logs are lost when the process restarts.
<br>


## 45. What is the difference between cookies and sessions in Express?

Both cookies and sessions are ways to persist data between HTTP requests, but they work differently:

| Feature | Cookies | Sessions |
|---|---|---|
| Where data is stored | In the **client's browser** | On the **server** (memory, DB, etc.) |
| Size limit | ~4 KB | Practically unlimited |
| Security | Data is visible/editable by the client | Only a session ID is exposed to the client |
| Best for | Non-sensitive preferences (theme, language) | Sensitive data (user login state) |

In an Express session setup, a **cookie is still used** — but it only contains the session ID, not the actual data. The real data lives on the server.

```javascript
// Cookie: stores data directly in the browser
res.cookie('theme', 'dark', { maxAge: 86400000, httpOnly: true });

// Session: stores an ID in the browser, data on the server
req.session.userId = 42;
```

Use sessions for anything related to authentication or sensitive user data. Use cookies for lightweight, non-sensitive preferences.
<br>

## 46. How do you set and read cookies in Express?

Use `res.cookie()` to set a cookie and `req.cookies` to read cookies. To read cookies, you need the **cookie-parser** middleware.

```bash
npm install cookie-parser
```

```javascript
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

// Setting a cookie
app.get('/set-cookie', (req, res) => {
  res.cookie('username', 'rahul', {
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    httpOnly: true,               // Not accessible via JavaScript
    secure: false,                // Set to true in production (HTTPS only)
  });
  res.send('Cookie has been set!');
});

// Reading a cookie
app.get('/get-cookie', (req, res) => {
  const username = req.cookies.username;
  res.send(`Hello, ${username || 'stranger'}`);
});

// Deleting a cookie
app.get('/clear-cookie', (req, res) => {
  res.clearCookie('username');
  res.send('Cookie cleared!');
});

app.listen(3000);
```
<br>

## 47. How do you handle a REST API with Express and what conventions should you follow?

A **REST API** organises resources around URLs and uses HTTP methods to define the action on those resources. Here are the conventions to follow:

| HTTP Method | URL | Action |
|---|---|---|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get one user |
| POST | `/api/users` | Create a new user |
| PUT | `/api/users/:id` | Replace a user entirely |
| PATCH | `/api/users/:id` | Partially update a user |
| DELETE | `/api/users/:id` | Delete a user |

```javascript
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json({ users: [] }));
router.get('/:id', (req, res) => res.json({ id: req.params.id }));
router.post('/', (req, res) => res.status(201).json({ message: 'Created' }));
router.put('/:id', (req, res) => res.json({ message: 'Replaced' }));
router.patch('/:id', (req, res) => res.json({ message: 'Updated' }));
router.delete('/:id', (req, res) => res.json({ message: 'Deleted' }));

module.exports = router;
```

Also follow these best practices:
- Use **nouns** in URLs, not verbs (`/users` not `/getUsers`)
- Return proper HTTP status codes (`201` for created, `404` for not found, `400` for bad request)
- Always return JSON with a consistent structure
- Version your API (`/api/v1/users`)
<br>

## 48. How do you implement API versioning in Express?

API versioning lets you release new versions of your API without breaking existing clients. The most common approach is to include the version number in the URL path.

```javascript
const express = require('express');
const app = express();
app.use(express.json());

// Version 1 router
const v1Router = express.Router();
v1Router.get('/users', (req, res) => {
  res.json({ version: 'v1', users: [{ id: 1, name: 'Rahul' }] });
});

// Version 2 router — returns more data
const v2Router = express.Router();
v2Router.get('/users', (req, res) => {
  res.json({ version: 'v2', users: [{ id: 1, name: 'Rahul', email: 'rahul@example.com' }] });
});

// Mount each version under its own prefix
app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);

app.listen(3000);
```

Now `/api/v1/users` and `/api/v2/users` work independently. Old clients keep using v1 while new clients can adopt v2 at their own pace.
<br>

## 49. How do you connect an Express app to a MongoDB database?

The most popular way to connect Express to MongoDB is through **Mongoose**, which gives you schemas, models, and a clean query API.

```bash
npm install mongoose
```

```javascript
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Connection error:', err));

// Define a schema and model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});
const User = mongoose.model('User', userSchema);

// Create a user
app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.listen(3000);
```

Always move the connection URL to an environment variable in production.
<br>

## 50. How do you handle PATCH vs PUT requests differently in Express?

- **PUT** is for **replacing** an entire resource with new data. If a field is missing in the body, it gets removed.
- **PATCH** is for **partially updating** a resource. Only the fields included in the body are changed; everything else stays the same.

```javascript
const users = { 1: { name: 'Rahul', email: 'rahul@example.com', age: 28 } };

// PUT: replaces the whole user object
app.put('/users/:id', (req, res) => {
  users[req.params.id] = req.body; // Overwrites everything
  res.json(users[req.params.id]);
});

// PATCH: only updates provided fields
app.patch('/users/:id', (req, res) => {
  const user = users[req.params.id];
  if (!user) return res.status(404).json({ message: 'User not found' });
  Object.assign(user, req.body); // Merges only the provided fields
  res.json(user);
});
```

In practice, `PATCH` is safer and more efficient because you only send the fields that actually changed.
<br>

## 51. How do you send a file as a response in Express?

Use `res.sendFile()` to send a file to the client. The browser will handle it based on the file type — for example, it will render a PDF in-browser or prompt a download for a ZIP file.

```javascript
const express = require('express');
const path = require('path');
const app = express();

app.get('/download/report', (req, res) => {
  const filePath = path.join(__dirname, 'files', 'report.pdf');
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(500).send('Could not send the file');
    }
  });
});

// Force a download prompt with res.download()
app.get('/download/data', (req, res) => {
  const filePath = path.join(__dirname, 'files', 'data.csv');
  res.download(filePath, 'my-data.csv'); // Client will see filename as 'my-data.csv'
});

app.listen(3000);
```

Use `res.sendFile()` when the browser should handle the file, and `res.download()` when you want to force a download with a custom filename.
<br>

## 52. What is middleware order and why does it matter?

In Express, middleware runs in the **exact order it is defined**. If you register middleware in the wrong order, it won't work as expected.

Classic examples where order matters:

1. **Body parser before routes** — if you put `express.json()` after a route, `req.body` will be `undefined` in that route.
2. **Authentication before protected routes** — your auth middleware must come before the routes it's supposed to protect.
3. **Error handler after everything** — error-handling middleware must be the last thing registered.
4. **404 handler after all routes** — the catch-all route must come after all defined routes.

```javascript
const express = require('express');
const app = express();

// 1. Body parsing first
app.use(express.json());

// 2. Auth middleware
app.use(authenticate);

// 3. Routes
app.get('/profile', (req, res) => res.json(req.user));

// 4. 404 catch-all — after all routes
app.use((req, res) => res.status(404).json({ message: 'Not found' }));

// 5. Error handler — always last
app.use((err, req, res, next) => res.status(500).json({ error: err.message }));

app.listen(3000);
```
<br>

## 53. How do you implement pagination in an Express REST API?

Pagination lets clients request data in chunks instead of loading everything at once, which is essential for performance with large datasets.

The most common approach is **page-based pagination** using `page` and `limit` query parameters.

```javascript
app.get('/api/products', async (req, res) => {
  const page = parseInt(req.query.page) || 1;   // Default: page 1
  const limit = parseInt(req.query.limit) || 10; // Default: 10 items per page
  const skip = (page - 1) * limit;

  try {
    const total = await Product.countDocuments();
    const products = await Product.find().skip(skip).limit(limit);

    res.json({
      data: products,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

A client would call `/api/products?page=2&limit=20` to get the second page with 20 items.
<br>

## 54. How do you prevent SQL injection and XSS attacks in an Express application?

**SQL Injection** — When user input is used directly in a database query, attackers can inject malicious SQL. Always use parameterised queries or an ORM instead of string concatenation.

```javascript
// BAD: vulnerable to SQL injection
const query = `SELECT * FROM users WHERE id = ${req.params.id}`;

// GOOD: parameterised query (using a library like 'pg' or 'mysql2')
const result = await db.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
```

**XSS (Cross-Site Scripting)** — When user input is rendered in HTML without escaping, attackers can inject JavaScript. Prevent this by:

1. **Escaping output** — Use template engines that auto-escape by default (EJS's `<%= %>` escapes; `<%- %>` does not).
2. **Content Security Policy** — Use Helmet's CSP to restrict what scripts can run.
3. **Sanitising input** — Strip HTML tags from user input using a library like `sanitize-html` or `DOMPurify`.
4. **Never trust `req.body`** — Always validate and sanitise before using or storing user data.

```bash
npm install sanitize-html
```

```javascript
const sanitizeHtml = require('sanitize-html');
const clean = sanitizeHtml(req.body.comment); // Strips any injected HTML tags
```
<br>

## 55. What is `process.env.NODE_ENV` and how does it affect your Express app?

`NODE_ENV` is a standard environment variable that tells your application what environment it is running in. Common values are `development`, `test`, and `production`.

Express itself uses `NODE_ENV` to change some behaviour automatically:
- In **production**, Express caches template files for better performance.
- In **development**, detailed error messages are shown.
- Some libraries (like `express-session`) also adjust defaults based on `NODE_ENV`.

```javascript
if (process.env.NODE_ENV === 'production') {
  // Use a proper logger, enable strict security settings
  app.use(helmet());
} else {
  // Use detailed dev logging
  app.use(morgan('dev'));
}
```

You set it when starting the server:

```bash
NODE_ENV=production node server.js
```

Or via a `.env` file:
```
NODE_ENV=production
```

Always set `NODE_ENV=production` when deploying — it enables performance optimisations and prevents leaking stack traces in error responses.
<br>

## 56. How do you gracefully shut down an Express server?

When your server receives a termination signal (like `SIGTERM` from Docker or a process manager), you should **stop accepting new connections** while letting existing requests finish, and then cleanly close database connections.

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello!'));

const server = app.listen(3000, () => console.log('Server started on port 3000'));

// Handle SIGTERM (sent by Docker, Kubernetes, PM2 etc.)
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('All connections closed. Process terminating.');
    process.exit(0);
  });
});

// Handle SIGINT (Ctrl+C in terminal)
process.on('SIGINT', () => {
  server.close(() => {
    console.log('Server shut down.');
    process.exit(0);
  });
});
```

Without graceful shutdown, in-flight requests get cut off abruptly, which can lead to corrupted data or incomplete operations.
<br>

## 57. How do you implement caching in an Express application?

Caching reduces server load and speeds up responses by storing results that don't change often. There are two main types:

### 1. HTTP Cache-Control Headers

Tell browsers and CDNs to cache your responses:

```javascript
app.get('/static-data', (req, res) => {
  res.set('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
  res.json({ data: 'This rarely changes' });
});
```

### 2. Server-Side Caching with Redis

For API responses that are expensive to compute:

```bash
npm install redis
```

```javascript
const redis = require('redis');
const client = redis.createClient();

app.get('/api/products', async (req, res) => {
  const cached = await client.get('products');
  if (cached) {
    return res.json(JSON.parse(cached)); // Return cached result
  }

  const products = await Product.find(); // Fetch from DB
  await client.setEx('products', 3600, JSON.stringify(products)); // Cache for 1 hour
  res.json(products);
});
```

Use HTTP caching for static content and Redis for dynamic data that is expensive to fetch.
<br>

## 58. What are some best practices for building production-ready Express applications?

Here is a checklist of things you should do before deploying an Express app to production:

**Security:**
- Use `helmet` to set security headers
- Enable CORS only for trusted origins
- Implement rate limiting on all public routes
- Validate and sanitise all user input
- Store secrets in environment variables, never in code
- Use HTTPS — redirect all HTTP to HTTPS

**Performance:**
- Enable response compression with `compression`
- Use a reverse proxy (Nginx) in front of Express
- Use clustering or a process manager (PM2) to use all CPU cores
- Implement caching (Redis) for expensive queries

**Reliability:**
- Implement graceful shutdown handlers
- Use an async error handler so no promise rejection goes unhandled
- Set `NODE_ENV=production` to enable Express optimisations

**Observability:**
- Use structured logging (e.g., **winston** or **pino**) instead of `console.log`
- Log every request with response time and status code
- Set up health check endpoints (`/health`) for load balancers

**Code quality:**
- Separate routes, controllers, services, and models into their own files
- Write integration tests with Supertest
- Keep your `.env` file out of version control with `.gitignore`



---

> 💡 **Tip:** Star this repo if you find it helpful, and revisit often — more questions are added regularly.

**[⬆ Back to Top](#)**