const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const cors = require("cors")
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


// require modules
const login = require("./routers/login")
const createUser = require("./routers/createUser")

// endpoint
//const db = require("./routers/queries");


// routes 
app.use('/login', login)
app.use('/createUser', createUser)

//app.post("/createUser", db.createUser);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
