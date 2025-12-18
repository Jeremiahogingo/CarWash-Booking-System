🚗 Car Wash Booking System - Backend
📋 Project Overview

A comprehensive Spring Boot backend for a Car Wash Booking System that manages services, bookings, vehicles, and customer ratings. The system provides REST APIs for a React Native frontend application.
✨ Features

    Service Management: Create, read, update, and delete car wash services

    Booking System: Book appointments with time slot validation

    Vehicle Management: Register and manage customer vehicles

    Rating System: Rate completed services with reviews

    Real-time Availability: Check available time slots

    Booking Status Tracking: Track booking progress (Pending → Confirmed → In Progress → Completed)

🏗️ Technology Stack

    Java 17 - Programming language

    Spring Boot 3.1.5 - Application framework

    Spring Data JPA - Database access

    MySQL 8.0 - Database

    Maven - Build tool

    Lombok - Code generation

    Spring Validation - Input validation

📁 Project Structure

![Alt Project Structure]("Docs\Images\Screenshot 2025-12-16 133614.png")

🚀 Quick Start
Prerequisites

    Java 17 or higher

    MySQL 8.0 or higher

    Maven 3.6 or higher

    IDE (IntelliJ IDEA, Eclipse, or VS Code)

Installation

    Clone the repository
    bash

git clone <jerrylion39t@gmail.com>
cd carwash-backend

Set up MySQL database
sql

CREATE DATABASE carwash_db;
USE carwash_db;

Configure database credentials
Edit src/main/resources/application.properties:
properties

spring.datasource.username=your_username
spring.datasource.password=your_password

Build the project
bash

mvn clean install

Run the application
bash

mvn spring-boot:run

Or run the JAR file:
bash

java -jar target/carwash-backend-0.0.1-SNAPSHOT.jar

Verify the application is running
text

Application should start on http://localhost:8080

📊 Database Schema
Tables

    services

        id (PK): Unique service identifier

        name: Service name

        description: Service description

        price: Service price

        duration: Service duration in minutes

        category: Service category (BASIC, PREMIUM, DELUXE)

        is_active: Service availability flag

    vehicles

        id (PK): Unique vehicle identifier

        license_plate: Vehicle license plate (unique)

        make: Vehicle manufacturer

        model: Vehicle model

        color: Vehicle color

        vehicle_type: Vehicle type (CAR, SUV, TRUCK)

        customer_id: Customer identifier

    bookings

        id (PK): Unique booking identifier

        customer_id: Customer identifier

        vehicle_id: Vehicle identifier

        service_id: Service identifier

        booking_time: Scheduled appointment time

        completion_time: Actual completion time

        status: Booking status (PENDING, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED)

        total_price: Total booking price

        rating: Service rating (1-5)

        review: Customer review

        created_at: Booking creation timestamp

        updated_at: Booking update timestamp

        📊 Database Schema
Tables

    services

        id (PK): Unique service identifier

        name: Service name

        description: Service description

        price: Service price

        duration: Service duration in minutes

        category: Service category (BASIC, PREMIUM, DELUXE)

        is_active: Service availability flag

    vehicles

        id (PK): Unique vehicle identifier

        license_plate: Vehicle license plate (unique)

        make: Vehicle manufacturer

        model: Vehicle model

        color: Vehicle color

        vehicle_type: Vehicle type (CAR, SUV, TRUCK)

        customer_id: Customer identifier

    bookings

        id (PK): Unique booking identifier

        customer_id: Customer identifier

        vehicle_id: Vehicle identifier

        service_id: Service identifier

        booking_time: Scheduled appointment time

        completion_time: Actual completion time

        status: Booking status (PENDING, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED)

        total_price: Total booking price

        rating: Service rating (1-5)

        review: Customer review

        created_at: Booking creation timestamp

        updated_at: Booking update timestamp

🔧 API Documentation
Base URL
text

http://localhost:8080/api

Service    Endpoints
Method	Endpoint	Description	Request Body	Response
GET	/services	Get all services	None	List of services
GET	/services/active	Get active services	None	List of active services
GET	/services/{id}	Get service by ID	None	Service details
POST	/services	Create new service	Service object	Created service
PUT	/services/{id}	Update service	Service object	Updated service
DELETE	/services/{id}	Delete service	None	204 No Content
Booking Endpoints
Method	Endpoint	Description	Request Body	Response
POST	/bookings/create	Create booking	BookingRequest	Created booking
GET	/bookings/available-slots	Get available slots	date, serviceId query params	List of available times
PUT	/bookings/{id}/rate	Rate booking	RatingRequest	Updated booking
GET	/bookings/customer/{customerId}	Get customer bookings	None	List of bookings
PUT	/bookings/{id}/status/{status}	Update status	None	Updated booking
GET	/bookings/today	Get today's bookings	None	List of bookings
GET	/bookings/upcoming	Get upcoming bookings	None	List of bookings
GET	/bookings/{id}	Get booking by ID	None	Booking details
PUT	/bookings/{id}/cancel	Cancel booking	None	200 OK
Request/Response Examples

Create Booking:
json

POST /api/bookings/create
{
  "customerId": 1,
  "vehicleId": 1,
  "serviceId": 1,
  "bookingTime": "2024-01-20T10:00:00"
}

Rate Booking:
json

PUT /api/bookings/1/rate
{
  "rating": 5,
  "review": "Excellent service, very thorough!"
}

Get Available Slots:
text

GET /api/bookings/available-slots?date=2024-01-20&serviceId=1

🧪 Testing
Using cURL

    Get all services:
    bash

curl http://localhost:8080/api/services

Create a booking:
bash

curl -X POST http://localhost:8080/api/bookings/create \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": 1,
    "vehicleId": 1,
    "serviceId": 1,
    "bookingTime": "2024-01-20T10:00:00"
  }'

Get available slots:
bash

curl "http://localhost:8080/api/bookings/available-slots?date=2024-01-20&serviceId=1"

Using Postman

Import the following collection:
json

{
  "info": {
    "name": "Car Wash Booking API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Services",
      "item": [
        {
          "name": "Get All Services",
          "request": {
            "method": "GET",
            "url": "http://localhost:8080/api/services"
          }
        }
      ]
    }
  ]
}

⚙️ Configuration
Application Properties

Key configurations in application.properties:
properties

# Server
server.port=8080

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/carwash_db
spring.datasource.username=root
spring.datasource.password=your_password

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Initial Data
spring.sql.init.mode=always
spring.sql.init.data-locations=classpath:data.sql

Business Rules

    Business hours: 8:00 AM to 6:00 PM

    Time slots: 30-minute intervals

    Minimum booking advance: Current time + 1 hour

    Maximum booking advance: 30 days

    Rating scale: 1-5 stars

🐳 Docker Support
Docker Compose Setup

Create a docker-compose.yml file:
yaml

version: '3.8'

services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: carwash_db
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

  backend:
    build: .
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/carwash_db
      SPRING_DATASOURCE_USERNAME: root
      SPRING_DATASOURCE_PASSWORD: rootpassword
    depends_on:
      - mysql

volumes:
  mysql_data:

Dockerfile
dockerfile

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/carwash-backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

Run with Docker Compose:
bash

docker-compose up --build

🔍 Troubleshooting
Common Issues

    Database Connection Failed
    text

Error: Communications link failure

Solution: Ensure MySQL is running and credentials are correct.

Port 8080 Already in Use
bash

# Find process using port 8080
lsof -i :8080

# Kill the process
kill -9 <PID>

CORS Errors in Frontend
text

Access-Control-Allow-Origin error

    Solution: Update CORS configuration in CarwashApplication.java to include frontend origin.

    Lombok Not Working
    Solution: Install Lombok plugin in your IDE and enable annotation processing.

Logs

Check application logs for debugging:
bash

tail -f logs/carwash-app.log

📈 Monitoring
Health Check
text

GET http://localhost:8080/actuator/health

Metrics (if enabled)
text

GET http://localhost:8080/actuator/metrics

🔄 Development
Code Standards

    Naming Conventions

        Classes: PascalCase (e.g., BookingService)

        Methods: camelCase (e.g., createBooking)

        Variables: camelCase (e.g., customerId)

        Constants: UPPER_SNAKE_CASE (e.g., MAX_RATING)

    Package Structure

        Keep related classes together

        Use subpackages for better organization

        Follow Spring Boot conventions

Adding New Features

    Create entity class in entity/ package

    Create repository interface in repository/ package

    Create service class in service/ package

    Create controller in controller/ package

    Add DTOs if needed

    Update data.sql with sample data

    Test endpoints

🤝 Contributing

    Fork the repository

    Create a feature branch

    Commit your changes

    Push to the branch

    Create a Pull Request

Commit Message Convention

    feat: New feature

    fix: Bug fix

    docs: Documentation

    style: Formatting

    refactor: Code restructuring

    test: Testing

    chore: Maintenance

📚 Additional Resources

    Spring Boot Documentation

    Spring Data JPA Documentation

    MySQL Documentation

    REST API Best Practices

📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
👥 Authors

    Your Name - Initial work

🙏 Acknowledgments

    Spring Boot team for the amazing framework

    MySQL team for the reliable database

    All contributors who helped improve this project

📞 Support

For support, email [jerrylion39t@gmail.com] or create an issue in the GitHub repository.
