var express = require("express");
var router = express.Router();
const database = require("../database");

router.get("/:userId/:attr", function (req, res) {
    database
        .checkCookie(req.cookies.mainCookie)
        .then((user_id) => {
            if (user_id === -1) {
                return res.status(400).send({ message: "unknown user" });
            } else {
                const { attr, userId } = req.params;
                database
                    .select("user", [attr], { user_id: userId })
                    .then((result) => res.status(200).send(result))
                    .catch((err) => res.status(400).send({ message: "Something went wrong", error: err }));
            }
        })
        .catch((err) => res.status(400).send({ message: "Something went wrong", error: err }));
});

router.put("/:userId", function (req, res) {
    const { password, user_info } = req.body;
    const { userId } = req.params;

    console.log(password, user_info, userId);
    params = [];
    values = [];
    for (let key in user_info) {
        params.push(key);
        values.push(user_info[key]);
    }
    database
        .select("user_access", ["user_id"], { password, user_id: userId })
        .then((result) => {
            console.log(result);
            if (result.length === 0) {
                return res.status(400).send({ message: "Password Incorrect" });
            }
            console.log("after first then");
            database
                .update("user", params, values, { user_id: userId })
                .then((response) => res.status(200).send({ message: "Updated successfully", updated: true }))
                .catch((err) => {
                    if (err.code === "ER_DUP_ENTRY") {
                        return res.status(400).send({ message: "Either the email or the citizen id are already in use" })
                    }
                    res.status(400).send({ message: "Something went wrong1", error: err })
                });
            if (req.body.user_type) {
                if (req.body.user_type == 1) {
                    //if he was an employee
                    database.delete("employee_history", { user_id: userId });
                } else {
                    //if he was an employer
                    database.delete("job", { user_id: userId });
                }
            }
        })
        .catch((err) => res.status(400).send({ message: "Something went wrong2", error: err }));
});

module.exports = router;
