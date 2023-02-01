var express = require("express");
var router = express.Router();
const database = require("../database");

//get all reviews
router.get("/", async function (req, res, next) {
   let user_id = await database.checkCookie(req.cookies.mainCookie);
   if (user_id === -1) {
      return res.status(400).send({ message: "unknown user" });
   }
   try {
      const revs = await database.joinSelect(
         "review",
         "user",
         "user_id",
         "user_id",
         ["body", "stars", "rev_id"],
         ["first_name", "last_name"],
         { ...req.query },
      );
      res.status(200).send(revs);
   } catch (err) {
      return res.status(400).send({ message: "Something went wrong...\nPlease try again later", error: err });
   }
});

//add a review
router.post("/", async function (req, res, next) {
   if (!req.body || !req.body.user_id || !req.body.body || !req.body.target_id || !req.body.stars) {
      return res.status(400).send({ messasge: "Invalid data" });
   }
   let cols = [];
   let values = [];
   for (let key in req.body) {
      cols.push(key);
      values.push(req.body[key]);
   }
   try {
      let id = await database.insert("review", cols, values).insertId;
      return res.status(200).send({ message: "added successfuly", review_id: id });
   } catch (err) {
      return res.status(400).send({ message: "Something went wrong...\nPlease try again later", error: err });
   }
});

//delete a review
router.delete("/:rev_id", async function (req, res, next) {
   const { rev_id } = req.params;
   try {
      await database.delete("review", { rev_id });
      res.status(200).send({ message: "deleted successfuly!" });
   } catch (err) {
      return res.status(400).send({ message: "Something went wrong...\Please try later", error: err });
   }
});

//update a review
router.put("/:rev_id", async function (req, res, next) {
   const { rev_id } = req.params;
   let cols = [];
   let values = [];
   for (let key in req.body) {
      cols.push(key);
      values.push(req.body[key]);
   }
   try {
      await database.update("review", cols, values, { rev_id });
      return res.status(200).send({ message: "Updated successfuly" });
   } catch (err) {
      return res.status(400).send({ message: "Something went wrong...\nPlease try again later", error: err });
   }
});

module.exports = router;
