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
  const obj = {
    success: false,
    message: "",
  };
  console.log(req.body);
  pool.query(
    // check if the email is existing in user
    "SELECT * FROM users WHERE email = $1",
    [email],
    (error, results) => {
      if (error) {
        console.log(error);
      }
      console.log("results ", results.rows[0]);
      // if the email is not used add user
      if (results.rows[0] == undefined) {
        console.log("addUser stage", email, password);
        pool.query(
          "INSERT INTO users ( email, password ) VALUES ($1, $2)",
          [email, password],
          (error, results) => {
            if (error) {
              console.log(error);
            }

            obj.success = true;
            obj.message = "You succefully crete the profile";
            console.log("results", results);
            res.status(201).send(obj);
          }
        );
      } else {
        (obj.message = "The email is already in use"), res.send(obj);
      }
    }
  );
});

module.exports = router