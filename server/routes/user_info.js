var express = require("express");
var router = express.Router();
const database = require("../database");


router.get("/:userId/:attr", function (req, res) {
    const { attr, userId } = req.params;
    database.select('user', [attr], { user_id: userId })
        .then(result => res.status(200).send(result));
})

module.exports = router;
