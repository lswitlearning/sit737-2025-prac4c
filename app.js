const express = require("express")
const winston = require("winston")
const fs = require('fs')

const app = express()
const port = 3000

if(!fs.existsSync("logs")){
  fs.mkdirSync("logs");
}

// configure winston logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "calculator-microservice" },
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

// Parameter validation function
const validateParams = (num1, num2 = null, allowSingleParam = false) => {
  if (allowSingleParam) {
    if (!num1) {
      const errorMessage = `Missing num1 parameter: ${num1}`;
      logger.log({ level: "error", message: errorMessage });
      return { error: errorMessage };
    }
    const n1 = parseFloat(num1);
    if (isNaN(n1)) {
      const errorMessage = `Invalid num1 value: ${num1}`;
      logger.log({ level: "error", message: errorMessage });
      return { error: errorMessage };
    }
    return { n1 };
  } else {
    if (!num1 || !num2 || num1 ==='' || num2 ==='') {
      const errorMessage = `Missing num1 or num2 parameter: num1=${num1}, num2=${num2}`;
      logger.log({ level: "error", message: errorMessage });
      return { error: errorMessage };
    }
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    if (isNaN(n1) || isNaN(n2)) {
      const errorMessage = `Invalid num1 or num2 value: num1=${num1}, num2=${num2}`;
      logger.log({ level: "error", message: errorMessage });
      return { error: errorMessage };
    }
    return { n1, n2 };
  }
};

// Addition route
app.get('/add', (req,res) => {
  const { num1, num2 } = req.query;
  const validationResponse = validateParams(num1, num2);

  if(validationResponse.error){
    return res.status(400).json({ statuscode: 400, error: validationResponse.error});
  }

  const { n1, n2 } = validationResponse;
  const result = n1 + n2;
  logger.log({ level: "info", message: `Addition: ${n1} + ${n2} = ${result}`});
  return res.status(200).json({ statuscode: 200, result});
});

// Subtraction route
app.get('/subtract', (req,res) =>{
  const { num1, num2 } = req.query;
  const validationResponse = validateParams(num1, num2);

  if(validationResponse.error){
    return res.status(400).json({ statuscode: 400, error:validationResponse.error});
  }

  const { n1, n2 } = validationResponse;
  const result = n1 - n2;
  logger.log({level: "info", message: `Subtraction ${n1} - ${n2} = ${result}`});
  return res.status(200).json({ statuscode: 200, result}); 
})

// Multiplication route
app.get('/multiply', (req,res) => {
  const { num1, num2 } = req.query
  const validationResponse = validateParams(num1, num2);
  
  if(validationResponse.error){
    return res.status(400).json({ statuscode: 400, error: validationResponse.error})
  }

  const { n1, n2 } = validationResponse
  const result = n1 * n2
  logger.log({level: "info", message: `Multiplication ${n1} * ${n2} = ${result}`})
  return res.status(200).json({ statuscode: 200, result})    
})

// Division route
app.get('/divide', (req,res) =>{
  const { num1, num2 } = req.query;
  const validationResponse = validateParams(num1, num2);

  if(validationResponse.error){
    return res.status(400).json({ statuscode: 400, error:validationResponse.error})
  }

  const { n1, n2 } = validationResponse;
  if(n2 === 0){
    const errorMessage = `Division by zero is not allowed: num1=${n1}, num2=${n2}`;
    logger.log({level: "error", error: errorMessage});
    return res.status(400).json({statuscode: 400, error: errorMessage});
  }
  const result = n1 / n2
  logger.log({level: "info", message: `Division: ${n1} / ${n2} = ${result}`});
  return res.status(200).json({ statuscode: 200, result})
})

// Exponentiation route
app.get("/exponentiate", (req, res) => {
  const { num1, num2 } = req.query;
  const validationResponse = validateParams(num1, num2);

  if (validationResponse.error) {
    return res.status(400).json({ statuscode: 400, error: validationResponse.error });
  }

  const { n1, n2 } = validationResponse;
  const result = Math.pow(n1, n2);
  logger.log({ level: "info", message: `Exponentiation: ${n1} ^ ${n2} = ${result}` });
  return res.status(200).json({ statuscode: 200, result });
});

// Square root route
app.get("/sqrt", (req, res) => {
  const { num1 } = req.query;
  const validationResponse = validateParams(num1, null, true); // only num1 needed for sqrt

  if (validationResponse.error) {
    return res.status(400).json({ statuscode: 400, error: validationResponse.error });
  }

  const { n1 } = validationResponse;
  const result = Math.sqrt(n1);
  logger.log({ level: "info", message: `Square root: sqrt(${n1}) = ${result}` });
  return res.status(200).json({ statuscode: 200, result });
});

// Modulo route
app.get("/modulo", (req, res) => {
  const { num1, num2 } = req.query;
  const validationResponse = validateParams(num1, num2);

  if (validationResponse.error) {
    return res.status(400).json({ statuscode: 400, error: validationResponse.error });
  }

  const { n1, n2 } = validationResponse;
  const result = n1 % n2;
  logger.log({ level: "info", message: `Modulo: ${n1} % ${n2} = ${result}` });
  return res.status(200).json({ statuscode: 200, result });
});

app.listen(port, () => {
  console.log(`Calculator microservice running at http://localhost:${port}`);
  logger.log({level: "info", message:`Server started on port ${port}`});
})

