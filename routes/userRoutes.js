import express from 'express'
const router = express.Router();

import { getUser,addtask } from '../controllers/userController.js';

router.get('/',getUser);
router.post('/add',addtask);

export default router;