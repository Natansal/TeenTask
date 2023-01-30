var express = require("express");
var router = express.Router();
const database = require("../database");


router.get("/:userId/:attr", function (req, res) {
    const { attr, userId } = req.params;
    database.select('user', [attr], { user_id: userId })
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send({ message: "Something went wrong", error: err }));
})

router.put("/:userId", function (req, res) {
    const { password, user_info } = req.body;
    const { userId } = req.params
    params = [];
    values = [];
    for (let key in user_info) {
        params.push(key);
        values.push(user_info[key]);
    }
    database
        .select('user_access', userId, { password })
        .then(result => {
            if (result.length === 0) {
                return res.status(400).send({ message: "Password Incorrect", error: err });
            }
            database
                .update("user", cols, values, { userId })
                .then(response = res.status(200).send({ message: "Updated successfully" }))
                .catch(err => res.status(400).send({ message: "Something went wrong", error: err }))
        })
        .catch(err => res.status(400).send({ message: "Something went wrong", error: err }))
})


module.exports = router;
