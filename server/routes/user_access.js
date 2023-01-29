var express = require("express");
var router = express.Router();
const database = require("../database");

function createCookie() {
   return new Promise((resolve, reject) => {
      let cookie = Math.floor(Math.random() * 0x1000000000000)
         .toString(16)
         .padStart(16, "0");
      database
         .select("user_access", undefined, { cookie })
         .then((res) => {
            if (res.length !== 0) {
               return createCookie();
            }
            resolve(cookie);
         })
         .catch((err) => reject(err));
   });
}

function createExpDate() {
   let exp_date = new Date(new Date().getTime() + 30 * 24 * 3600 * 1000);
   return `${exp_date.getFullYear()}-${exp_date.getMonth() + 1}-${exp_date.getDate()}`;
}

router.post("/login", function (req, res, next) {
   if (!req.body || !req.body.username || !req.body.password) {
      return res.status(400).send({ message: "Missing one or more values", logged: false });
   }
   database
      .select("user_access", undefined, { ...req.body })
      .then((result) => {
         if (result.length === 0) {
            return res.status(400).send({ message: "Invalid data!", logged: false });
         } else {
            result = result[0];
            if (result.cookie_exp_date.getTime() < new Date().getTime()) {
               database.update("user_access", ["cookie_exp_date"], [createExpDate()], { user_id: result.user_id });
            }
            return res.status(200).send({
               message: "Logged in successfuly",
               logged: true,
               id: result.user_id,
               cookie: result.cookie,
            });
         }
      })
      .catch((err) => {
         throw err;
      });
});

router.post("/register", (req, res, next) => {
   let { user_access, user_info } = req.body;
   createCookie().then((cookie) => {
      user_access.cookie = cookie;
      user_access.cookie_exp_date = createExpDate();
      user_info.banned = 0;
      let exp_date = new Date();
      user_info.creation_date = `${exp_date.getFullYear()}-${exp_date.getMonth() + 1}-${exp_date.getDate()}`;
      let params = [];
      let values = [];
      for (let key in user_access) {
         params.push(key);
         values.push(user_access[key]);
      }
      database
         .insert("user_access", params, values)
         .then(({ insertId }) => {
            user_info.user_id = insertId;
            params = [];
            values = [];
            for (let key in user_info) {
               params.push(key);
               values.push(user_info[key]);
            }
            database
               .insert("user", params, values)
               .then((result) => {
                  res.status(200).send({ message: "signed up successfuly", signed: true });
               })
               .catch((err) => {
                  res.status(400).send({ message: "somthing went wrong...", error: err, signed: false });
                  database.delete("user_access", { user_id: insertId });
               });
         })
         .catch((err) => {
            if (err.code === "ER_DUP_ENTRY") {
               return res.status(400).send({ message: "Username already taken", signed: false });
            }
            res.status(400).send({ message: "somthing went wrong...", error: err, signed: false });
         });
   });
});

module.exports = router;
