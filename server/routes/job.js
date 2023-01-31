var express = require("express");
var router = express.Router();
const database = require("../database");

//get all jobs
router.get("/", async function (req, res, next) {
   let user_id = await database.checkCookie(req.cookies.mainCookie);
   if (user_id === -1) {
      return res.status(400).send({ message: "unknown user" });
   }
   try {
      let query1 = { ...req.query };
      delete query1.state, query1.city, query1.first_name, query1.last_name;
      let query2 = {};
      if (req.query.state) {
         query2.state = req.query.state;
      }
      if (req.query.city) {
         query2.city = req.query.city;
      }
      if (req.query.first_name) {
         query2.first_name = req.query.first_name;
      }
      if (req.query.last_name) {
         query2.last_name = req.query.last_name;
      }
      const jobs = await database.joinSelect(
         "job",
         "user",
         "user_id",
         "user_id",
         ["job_id", "user_id", "description", "category", "payment", "start_date", "end_date", "payment_type"],
         ["first_name", "last_name", "city", "state"],
         query1,
         query2,
      );
      res.status(200).send(jobs);
   } catch (err) {
      return res.status(400).send({ message: "Something went wrong...", error: err });
   }
});

//get all upliments to a job | or to all jobs
router.get("/:job_id", async function (req, res, next) {
   const { job_id } = req.params;
   let user_id = await database.checkCookie(req.cookies.mainCookie);
   if (user_id === -1) {
      return res.status(400).send({ message: "unknown user" });
   }
   let queryObj = { ...req.query };
   if (job_id !== "*") {
      queryObj.job_id = job_id;
   }
   try {
      const emp = await database.joinSelect(
         "employee_history",
         "user",
         "user_id",
         "user_id",
         [("eh_id", "user_id", "job_id", "paid", "done")],
         ["first_name", "last_name"],
         { ...req.query },
      );
      res.status(200).send(emp);
   } catch (err) {
      return res.status(400).send({ message: "Something went wrong...", error: err });
   }
});

//add a job
router.post("/", async function (req, res, next) {
   if (
      !req.body ||
      !req.body.user_id ||
      !req.body.description ||
      !req.body.category ||
      !req.body.payment ||
      !req.body.start_date ||
      !req.body.payment_type ||
      !req.body.end_date
   ) {
      return res.status(400).send({ messasge: "Invalid data" });
   }
   let cols = [];
   let values = [];
   for (let key in req.body) {
      cols.push(key);
      values.push(req.body[key]);
   }
   try {
      let id = await database.insert("job", cols, values);
      console.log(id);
      return res.status(200).send({ message: "added successfuly", job_id: id.insertId });
   } catch (err) {
      return res.status(400).send({ message: "Something went wrong...", error: err });
   }
});

//add an upliment to a job
router.post("/:job_id", async function (req, res, next) {
   const { job_id } = req.params;
   if (!req.body || !req.body.user_id) {
      return res.status(400).send({ messasge: "Invalid data" });
   }
   let obj = { ...req.body, job_id };
   obj.paid = obj.paid ? obj.paid : 0;
   obj.done = obj.done ? obj.done : 0;
   let cols = [];
   let values = [];
   for (let key in obj) {
      cols.push(key);
      values.push(obj[key]);
   }
   try {
      let id = await database.insert("employee_history", cols, values).insertId;
      return res.status(200).send({ message: "Applied successfuly!", req_id: id });
   } catch (err) {
      return res.status(400).send({ message: "Something went wrong...", error: err });
   }
});

//delete a job
router.delete("/:job_id", async function (req, res, next) {
   const { job_id } = req.params;
   try {
      await database.delete("job", { job_id });
      res.status(200).send({ message: "deleted successfuly!" });
   } catch (err) {
      return res.status(400).send({ message: "Something went wrong...", error: err });
   }
});

//delete an upliment to a job
router.delete("/:job_id/:eh_id", async function (req, res, next) {
   const { job_id, eh_id } = req.params;
   try {
      await database.delete("employee_id", { job_id, eh_id });
      res.status(200).send({ message: "deleted successfuly!" });
   } catch (err) {
      return res.status(400).send({ message: "Something went wrong...", error: err });
   }
});

//update a job
router.put("/:job_id", async function (req, res, next) {
   const { job_id } = req.params;
   let cols = [];
   let values = [];
   for (let key in req.body) {
      cols.push(key);
      values.push(req.body[key]);
   }
   try {
      await database.update("job", cols, values, { job_id });
      return res.status(200).send({ message: "Updated successfuly" });
   } catch (err) {
      return res.status(400).send({ message: "Something went wrong...", error: err });
   }
});

//update an upliment to a job
router.put("/:job_id/:eh_id", async function (req, res, next) {
   const { job_id, eh_id } = req.params;
   let cols = [];
   let values = [];
   for (let key in req.body) {
      cols.push(key);
      values.push(req.body[key]);
   }
   try {
      await database.update("employee_history", cols, values, { job_id, eh_id });
      return res.status(200).send({ message: "Updated successfuly" });
   } catch (err) {
      return res.status(400).send({ message: "Something went wrong...", error: err });
   }
});
module.exports = router;
