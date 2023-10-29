const jwt = require('jsonwebtoken');

const token = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Il9pZCI6IjY1M2NkMzhhYjFlOTMzNTgxMTE1MGY4NSIsImlzQWRtaW4iOnRydWUsImVtYWlsIjoiYTFAZW1haWwuY29tIn0sImlhdCI6MTY5ODU1NjM3NX0.dohuuvc8I-zPpX7u4IJ2wDm2YPlDj7rVkTrMW52xTbA", "123");
console.log(token);