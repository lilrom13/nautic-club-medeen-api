/**
 * Created by romain on 2017-06-05.
 */
var jwt = require('jwt-simple');

module.exports = function(req, res, next) {
    var token = req.headers['x-access-token'];
    var user_id = req.params.id;

    if (user_id) {
        try {
            var decoded = jwt.decode(token, require('../config/secret.js')());
            var user_token_id = decoded.user.id;

            if (user_id != user_token_id) {
                res.status(403);
                res.json({
                    "status": 403,
                    "message": "Not Authorized"
                });
                return;
            } else {
                next();
            }
        } catch (err) {
            res.status(500);
            res.json({
                "status": 500,
                "message": "Oops something went wrong",
                "error": err
            });
            return
        }
    } else {
        res.status(401);
        res.json({
            "status": 401,
            "message": "No user id provided."
        });
        return;
    }
};
