const { Router } = require('express');
const router = Router();
const authorize = require('../controller/authControl');
const { requireAuth } = require('../middleware/authMiddleware');

router.get('/login', authorize.getLogin)
router.post('/login', authorize.postLogin)

router.get('/register', authorize.getRegister)
router.post('/register', authorize.postRegister)

router.get('/', authorize.getMain)

router.get('/logout', authorize.getLogout)

module.exports = router;
