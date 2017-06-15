var express = require('express');
var router = express.Router();

var auth = require('./auth.js');
var user = require('./users.js');
var status = require('./status.js');

var owner = require('../middlewares/ownerRequest');

/*
 * Routes that can be accessed by any one
 */
router.put('/login', auth.login);
router.put('/user', user.create);
router.get('/', status.getApiStatus);

/*
 * Routes that can be accessed only by authenticated users
 */
router.get('/api/v1/users/:id', user.getOne);
router.post('/api/v1/users/:id', owner, user.updateOne);
router.delete('/api/v1/users/:id', owner, user.deleteOne);


/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.get('/api/v1/admin/users', user.getAll);
router.delete('/api/v1/admin/users/:id', user.deleteOne);


module.exports = router;
