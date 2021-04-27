const { Router } = require("express");
const router = new Router();

const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSAWORD,
  port: process.env.DB_PORT,
});

router.post("/", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  // res for the front end
  const obj = {
    success: false,
    // message:""
  };

  pool.query(
    "SELECT * FROM users WHERE email = $1 AND password = $2",
    [email, password],
    (error, results) => {
      if (error) {
        console.log(error);
      }
      console.log("results ", results.rows[0]);

      if (results.rows[0] != undefined) {
        console.log("if statement ");
        obj.success = true;
        obj.message = "wellcomeback";
        res.status(201).send(JSON.stringify(obj));
      } else {
        obj.message = "Uppss username or password incorrect!";
        console.log(obj);
        res.send(JSON.stringify(obj));
      }
    }
  );
});

module.exports = router;
