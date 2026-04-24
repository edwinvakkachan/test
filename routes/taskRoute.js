import express from 'express';
const router = express.Router();

import { getTasks,addTask,deleteTask } from '../controllers/taskcontrollers.js';

router.get("/",getTasks);
router.post('/add',addTask);
router.post('/delete/:id',deleteTask);

export default router;