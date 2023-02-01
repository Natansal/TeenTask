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
      .joinSelect(
         "user_access",
         "user",
         "user_id",
         "user_id",
         ["user_id", "username", "password", "cookie", "cookie_exp_date"],
         ["user_type", "state", "city"],
         { ...req.body },
      )
      .then((result) => {
         console.log("resulet", result);
         if (result.length === 0) {
            return res.status(400).send({ message: "Invalid data!", logged: false });
         } else {
            let expDate = createExpDate();
            result = result[0];
            if (result.cookie_exp_date.getTime() < new Date().getTime()) {
               database.update("user_access", ["cookie_exp_date"], [expDate], { user_id: result.user_id });
            }
            return res.status(200).send({
               message: "Logged in successfuly",
               logged: true,
               id: result.user_id,
               cookie: result.cookie,
               expDate,
               user_type: result.user_type,
               state: result.state,
               city: result.city,
            });
         }
      })
      .catch((err) => {
         throw err;
      });
});

router.get("/login", function (req, res, next) {
   const cookie = req.cookies.mainCookie;
   return database
      .joinSelect(
         "user_access",
         "user",
         "user_id",
         "user_id",
         ["user_id", "username", "password", "cookie", "cookie_exp_date"],
         ["user_type", "state", "city"],
         { cookie },
      )
      .then((result) => {
         if (!result || result.length === 0) {
            return res.status(400).send({ message: "Cookie invalid! please log in", logged: false });
         }
         let time = result[0].cookie_exp_date;
         if (time.getTime() < new Date().getTime()) {
            return res.status(400).send({ message: "Cookie invalid! please log in", logged: false });
         }
         console.log(result[0]);
         return res.status(200).send({
            message: "Logged in successfuly",
            logged: true,
            id: result[0].user_id,
            user_type: result[0].user_type,
            city: result[0].city,
            state: result[0].state,
         });
      })
      .catch((err) => res.status(400).send({ message: "somthing went wrong...", error: err, signed: false }));
});

router.post("/register", (req, res, next) => {
   let { user_access, user_info } = req.body;
   user_info.city = user_info.city.toUpperCase();
   user_info.state = user_info.state.toUpperCase();
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
                  res.status(200).send({
                     message: "signed up successfuly",
                     signed: true,
                     cookie,
                     expDate: user_access.cookie_exp_date,
                     userId: insertId,
                     user_type: user_info.user_type,
                     state: user_info.state,
                     city: user_info.city,
                  });
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
