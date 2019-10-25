import express from 'express';
import { usersSignUp, usersSignIn, allUsers } from '../controllers/user';
import signUpValidator from '../middleware/signUpValidator';
import signinValidator from '../middleware/signInValidator';
import checkAuth from '../middleware/checkAuth';
import checkAdmin from '../middleware/checkAdmin';

const router = express.Router();
router.post('/auth/signup', signUpValidator, usersSignUp);
router.post('/auth/signIn', signinValidator, usersSignIn);
router.get('/users', checkAuth, checkAdmin, allUsers);

export default router;
