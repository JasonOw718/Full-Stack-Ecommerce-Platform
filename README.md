# 🛍️ Full Stack E-Commerce Platform

A secure, scalable, and modern e-commerce web application built with **Spring Boot**, **React.js**, **Stripe**, and **AWS**. This project showcases full-stack development skills with secure authentication, state management, and seamless payment integration.

---

## 🚀 Features

- 🔐 **JWT Authentication**  
  Secure HTTP-only cookie-based JWT authentication in Spring Boot to protect user sessions and prevent XSS attacks.

- 💳 **Stripe Payment Integration**  
  Easy and reliable third-party payment processing through Stripe API.

- ⚙️ **Redux Toolkit**  
  Efficient global state management across the React frontend for a consistent user experience.

- 📄 **Pagination for Product Listings**
Server-side pagination implemented to improve performance and user experience when browsing large product catalogs.

---

## 🛠️ Tech Stack

### Backend
- **Spring Boot** (Java)
- **JWT** for authentication

### Frontend
- **React.js**
- **Redux Toolkit**
- **Axios** for API requests

### Payment
- **Stripe API**

### Database
- **AWS RDS** (MySQL or PostgreSQL)

---

## 📁 Project Structure

```
/backend
  └── src
      └── main
          └── java
              └── com.example.ecommerce
/frontend
  └── src
      ├── components
      ├── pages
      ├── store
      └── App.js
```

---

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ecommerce-platform.git
cd ecommerce-platform
```

Got it! Here's the cleaned-up **Backend Setup** section with **placeholder credentials**, ready for safe inclusion in your `README.md`:

```markdown
### 2. Backend Setup

1. Navigate to the backend folder:

```bash
cd backend
```

2. Create and configure the `application.properties` file at `src/main/resources/application.properties`:

```properties
spring.application.name=Spring-Boot-Ecommerce
spring.h2.console.enabled=true
spring.datasource.url=jdbc:mysql://localhost:3306/<your-database-name>
spring.datasource.username=<your-db-username>
spring.datasource.password=<your-db-password>
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=create

# Local image storage path
image.path=images/

# Security settings
spring.security.secretKey=${JWT_SECRET_KEY}
spring.security.expirationMs=3000000
spring.security.cookieName=SpringBootEcom

# CORS and external links
frontend.url=http://localhost:5173/
base.url=http://localhost:8080/images

# Stripe secret key (loaded from environment variable or secure store)
spring.stripe.key=${STRIPE_SECRET_KEY}
```

3. Run the Spring Boot server:

```bash
./mvnw spring-boot:run
```
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 📸 Demo Video

Check out the full project demo on YouTube:  
[![E-Commerce Platform Demo](https://img.youtube.com/vi/oQtKEX0035o/0.jpg)](https://www.youtube.com/watch?v=oQtKEX0035o)

> 📺 Click the thumbnail above or [watch the video here](https://www.youtube.com/watch?v=oQtKEX0035o).

---

## 📌 Project Timeline

**March 2025 – April 2025**

---

## 📬 Contact

For questions or collaboration:

- LinkedIn: [linkedin](https://www.linkedin.com/in/owkasheng)  
- Email: kashengow@gmail.com

---
