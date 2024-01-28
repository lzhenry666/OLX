require("dotenv").config();

// Adicionando console.log para verificar os valores das variáveis de ambiente
console.log("PORT:", process.env.PORT);
console.log("BASE:", process.env.BASE);
console.log("DATABASE:", process.env.DATABASE);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileupload = require("express-fileupload");

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Database connected"))
.catch(err => console.log("Mongoose connection error:", err));

const server = express()

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(fileupload());

server.use(express.static(__dirname+"/public"));
const PORT = process.env.PORT ;
server.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.BASE}`);
});

server.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
const userRoutes = require('./src/routes');
server.use("/", userRoutes);
