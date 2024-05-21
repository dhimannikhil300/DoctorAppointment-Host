import express from 'express'
import { updateUser, deleteUser, getAllUser, getSingleUser, getUserProfile, getMyAppointments, getAllDoctor, updateDoctor } from "../Controllers/userController.js"; 
import { authentication, restict } from '../auth/verifyToken.js';

const router = express.Router()

router.get('/getAllDoctors', authentication, restict(['admin']), getAllDoctor)
router.get('/', authentication, restict(['admin']), getAllUser)
router.get('/:id', authentication, restict(['patient']), getSingleUser)
router.post('/updateDoctor', authentication, restict(['admin']), updateDoctor)
router.put('/:id',authentication, restict(['patient', 'admin']), updateUser)
router.delete('/:id',authentication, restict(['patient']), deleteUser)
router.get('/profile/me',authentication, restict(['patient', 'admin']), getUserProfile)
router.get('/appointments/my-appointments',authentication, restict(['patient']), getMyAppointments)

export default router