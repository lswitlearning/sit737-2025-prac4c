## Calculator Microservice
This is a simple calculator microservice built with Node.js and Express. It provides basic arithmetic operations (addition, subtraction, multiplication, division, exponentiation, modulo, and square root) via API endpoints.

### Prerequisites
- Install Node.js in your device
- Install Node Package Manager (npm) in your device

### Dependencies
This project uses the following npm packages:
- express
- winston
- fs (built-in)

### Installation
1. Clone the repository:
```
git clone https://github.com/lswitlearning/sit737-2025-prac4c.git
```
2. Navigate into the project directory:
```
cd calculator-microservice
```

3. Install required dependencies:
```
npm install
```

### Usage
1. Start the server:
```
node app.js
```
2. The service will run at http://localhost:3000.

### API Endpoints
| Operation       | Endpoint | Method | Parameters | Example Request | 
| ------------ | :----: | -----: | :----: | -----: |
|Addition       | /add | GET | num1 (float), num2 (float) | curl  http://localhost:3000/add?num1=5&num2=3
|Subtraction      | /subtract | GET | num1 (float), num2 (float) | curl  http://localhost:3000/subtract?num1=10&num2=4
|Multiplication       | /multiply | GET | num1 (float), num2 (float) | curl  http://localhost:3000/multiply?num1=7&num2=2
|Division      | /divide | GET | num1 (float), num2 (float, non-zero) | curl  http://localhost:3000/divide?num1=20&num2=4
|Exponentiation     | /exponentiate | GET | num1 (float), num2 (float) | curl http://localhost:3000/exponentiate?num1=2&num2=3
|Square Root      | /sqrt | GET | num1 (float) | curl http://localhost:3000/sqrt?num1=16
|Modulo      | /modulo | GET | num1 (float), num2 (float) | curl http://localhost:3000/modulo?num1=10&num2=3

**Example Response**
##### Successful Response (200 OK)
```
{ "statuscode": 200, "Result": 8 }
```
##### Error Response (400 Bad Request)
```
{ "statuscode": 400, "error": "Please provide valid numbers" }
```
**Note**: Division by zero will result in an error:

##### Division by Zero Error Response
```
{ "statuscode": 400, "error": "Division by zero is not allowed" }
```

### Logging
- Logs are stored in the `logs/` directory.
- Errors are logged in `logs/error.log`.
- All requests are logged in `logs/combined.log`.

### Error Handling
- If invalid numbers are provided, the service returns a `400 Bad Request` error.
- If parameters are missing, the service returns a `400 Bad Request` error.
- If division by zero is attempted, an error message is returned with a `400 Bad Request`.
