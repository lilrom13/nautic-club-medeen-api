var jwt = require('jwt-simple');

module.exports = function(req, res, next) {
    var token = req.headers['x-access-token'];

    if (token) {
        try {
            var decoded = jwt.decode(token, require('../config/secret.js')());
            var user = decoded.user;

            if (decoded.exp <= Date.now()) {
              res.status(400);
              res.json({
                "status": 400,
                "message": "Token Expired"
              });
              return;
            }

            if (req.url.indexOf('admin') >= 0) {
                if (user.role == 'admin') {
                    next();
                } else {
                    res.status(403);
                    res.json({
                        "status": 403,
                        "message": "Not Authorized"
                    });
                    return;
                }
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
            "message": "No Token provided."
          });
          return;
    }
};
