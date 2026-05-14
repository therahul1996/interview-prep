# API Interview Questions (100) - MOHITDECODES

A comprehensive guide covering Beginner, Advanced, and Real-Time Scenarios for API interviews.

---

## Table of Contents
1. [Section 1: API Basics (Q1-Q30)](#section-1-api-basics)
2. [Section 2: Intermediate API Concepts (Q31-Q60)](#section-2-intermediate-api-concepts)
3. [Section 3: Advanced & Real-Time Scenarios (Q61-Q100)](#section-3-advanced--real-time-scenarios)

---

## Section 1: API Basics

### 1. What is an API?
- **Definition:** An API (Application Programming Interface) is a set of rules and protocols that allows different software applications to communicate with each other.
- **Real-time Scenario:** A weather app calling a service like OpenWeatherMap to fetch data for your location.

### 2. What is REST API?
- **Definition:** REST (Representational State Transfer) is an architectural style for designing networked applications using HTTP methods to perform operations on resources.
- **Real-time Scenario:** A food delivery app using `GET /restaurants`, `POST /orders`, and `DELETE /orders/{id}`.

### 3. What are HTTP methods?
- **Definition:** Standard operations defined by the HTTP protocol for web communication.
- **Usage:**
  - `GET`: Retrieve data
  - `POST`: Submit/Create data
  - `PUT`: Update entire resource
  - `PATCH`: Partial update
  - `DELETE`: Remove resource

### 4. Difference between GET and POST?
| Feature | GET | POST |
| :--- | :--- | :--- |
| **Purpose** | Retrieve data | Submit data |
| **Visibility** | Parameters visible in URL | Data hidden in request body |
| **Capacity** | Limited | Larger |
| **Bookmarkable**| Yes | No |

### 5. What is an endpoint?
- **Definition:** A specific URL where an API can be accessed.
- **Example:** `/api/accounts` (Banking App).

### 7. What is JSON?
- **Definition:** JavaScript Object Notation is a lightweight, human-readable data interchange format.

### 8. Common HTTP Status Codes
- **200 OK:** Success
- **201 Created:** Resource created successfully
- **400 Bad Request:** Invalid input
- **401 Unauthorized:** Authentication required
- **403 Forbidden:** Authenticated but not authorized
- **404 Not Found:** Resource doesn't exist
- **500 Internal Server Error:** Server problem

### 11. What is Statelessness?
- **Definition:** Each request must contain all info needed for processing. The server doesn't store client context between requests.

### 12. What is CRUD?
- **Definition:** Create, Read, Update, Delete.

---

## Section 2: Intermediate API Concepts

### 31. Authentication vs Authorization
- **Authentication:** "Who are you?" (Verifying identity).
- **Authorization:** "What are you allowed to do?" (Permissions).

### 32. What is JWT (JSON Web Token)?
- **Definition:** A compact, URL-safe token used to securely transmit info.
- **Structure:** `Header.Payload.Signature`.

### 36. What is OAuth?
- **Definition:** An authorization framework allowing third-party apps access without exposing passwords (e.g., "Login with Google").

### 40. What is Idempotency?
- **Definition:** An operation is idempotent if performing it multiple times produces the same result (e.g., `GET`, `PUT`, `DELETE`).

### 42. What is Pagination?
- **Definition:** Dividing large datasets into smaller chunks (e.g., loading 10 posts at a time on Instagram).

### 46. What is HATEOAS?
- **Definition:** Hypermedia As The Engine Of Application State; responses include links to related actions.

### 48. What is Microservices Architecture?
- **Definition:** Splitting an application into small, independent services (e.g., User Service, Order Service).

### 50. REST vs SOAP
- **REST:** Uses JSON, HTTP, faster, simpler.
- **SOAP:** Uses XML, strict protocol, slower, complex.

---

## Section 3: Advanced & Real-Time Scenarios

### 61. How do you secure an API?
- Use HTTPS (SSL/TLS).
- Authentication (JWT, OAuth).
- Input validation & Rate limiting.
- Firewalls/WAF.

### 74. What is a Webhook?
- **Definition:** A way for a server to push real-time data to another system automatically when an event occurs (e.g., Stripe payment success).

### 81. What is a Circuit Breaker?
- **Definition:** Stops sending requests to a failing service to prevent total system collapse.

### 89. Blue-Green vs. Canary Deployment
- **Blue-Green:** Running two identical versions and switching traffic.
- **Canary:** Gradually releasing to a small % of users first.

### 98. What is Distributed Tracing?
- **Definition:** Tracking a single request across multiple microservices to debug performance/failures.

### 99. What is an API-First Approach?
- **Definition:** Designing the API contracts before writing frontend or backend code.

---
*Created by MOHITDECODES*
