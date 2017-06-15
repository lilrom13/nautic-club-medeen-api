var User = require('../models/users.js');
var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(10);

var users = {

    getAll: function(req, res) {
      User.find({}, function(err, users) {
          if (err) {
            res.status(500).send(
                {
                    "status": 500,
                    "message": "Oops something went wrong",
                    "error": err
                }
            )
          } else {
              var userArray = [];

              users.forEach(function (user) {
                  userArray.push(user.toJSON());
              });
            res.send({status: 200, data: userArray});
          }
      });
  },

    getOne: function(req, res) {
    var userId = req.params.id;
    if (userId) {
        if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(404).send(
                {
                    "status": 404,
                    "message": "No user found.",
                }
            )
        } else {
            User.findById(userId, function(err, user) {
                if (err) {
                    res.status(500).send(
                        {
                            "status": 500,
                            "message": "Oops something went wrong",
                            "error": err
                        }
                    )
                } else {
                    if (user) {
                        res.send({status: 200, data: user.toJSON()});
                    } else {
                        res.status(404).send(
                            {
                                "status": 404,
                                "message": "No user found.",
                            }
                        )
                    }
                }
            });
        }
    } else {
        res.status(404).send(
            {
                "status": 400,
                "message": "No user id provided.",
            }
        )
    }
  },

    updateOne: function (req, res) {
        var user_id = req.params.id;

        var firstName =  req.body.firstName;
        var lastName =  req.body.lastName;
        var email =  req.body.email;

        if (firstName, lastName, email) {
            if (user_id) {
                if (user_id.match(/^[0-9a-fA-F]{24}$/)) {
                    User.findOneAndUpdate({_id: user_id}, { $set:
                        {
                            firstName: firstName,
                            lastName: lastName,
                            email: email
                        }
                    }, {new: true}, function (err, user) {
                        if (err) {
                            res.status(500);
                            res.json({
                                "status": 500,
                                "message": "Oops something went wrong",
                                "error": err
                            });
                        } else {
                            if (user) {
                                res.send(
                                    {
                                        status: 200,
                                        message: "User has been updated.",
                                        data: user.toJSON()
                                    }
                                );
                            } else {
                                res.status(404);
                                res.json({
                                    "status": 404,
                                    "message": "User not found."
                                });
                            }
                        }
                    });
                } else {
                    res.status(401);
                    res.json({
                        "status": 401,
                        "message": "Invalid user id."
                    });
                }
            } else {
                res.status(401);
                res.json({
                    "status": 401,
                    "message": "No user id provided."
                });
            }
        } else {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid parameters."
            });
        }
    },

    create: function(req, res) {
    var body = req.body;

    var _firstName = body.firstName;
    var _lastName = body.firstName;
    var _email = body.email;
    var _password = body.password;

    if (_firstName && _lastName && _email && _password) {

      var hash = bcrypt.hashSync(_password, salt);

      var newUser = new User({
        firstName: _firstName,
        lastName: _lastName,
        email: _email,
        password: hash
      });

      newUser.save(function(err) {
        if (err) {
          if (err.code == 11000) {
            res.status(409);
            res.json({
              "status": 409,
              "message": "A user with this email already exists."
            });
          }
        } else {
          res.status(200);
          res.json({
            "status": 200,
            "message": "User saved successfully."
          });
        }
      });
    } else {
      res.status(422);
      res.json({
        "status": 422,
        "message": "Missing parameter."
      });
    }
  },

    deleteOne: function (req, res) {
        var user_id = req.params.id;
      User.findOneAndRemove({_id: user_id}, function (err, user) {
          
      })
    }

};

module.exports = users;
