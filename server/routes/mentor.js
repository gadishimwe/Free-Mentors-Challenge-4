import express from 'express';
import {
  userChangeToMentor, allMentors, specificMentor, removeMentor,
} from '../controllers/mentor';
import checkAuth from '../middleware/checkAuth';
import checkAdmin from '../middleware/checkAdmin';
import userToMentorValidator from '../middleware/userToMentorValidator';
import specificMentorExist from '../middleware/specificMentorExist';
import removeMentorValidator from '../middleware/removeMentorValidator';

const router = express.Router();

router.patch('/user/:userId', [checkAuth, checkAdmin, userToMentorValidator], userChangeToMentor);
router.get('/mentors', checkAuth, allMentors);
router.get('/mentors/:userId', [checkAuth, specificMentorExist], specificMentor);
router.patch('/mentors/:userId', [checkAuth, checkAdmin, removeMentorValidator], removeMentor);

export default router;
