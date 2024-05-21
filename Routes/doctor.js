import express from 'express'
import { updateDoctor, deleteDoctor, getAllDoctor, getSingleDoctor, getDoctorProfile } from "../Controllers/doctorController.js"; 
import { authentication, restict } from '../auth/verifyToken.js';
import reviewRouter from './review.js'

const router = express.Router()


//nested route
router.use('/:doctorId/reviews', reviewRouter)

router.get('/:id', getSingleDoctor)
router.get('/', getAllDoctor)
router.put('/:id', authentication, restict(['doctor']), updateDoctor)
router.delete('/:id', authentication, restict(['doctor']), deleteDoctor)
router.get('/profile/me', authentication, restict(["doctor"]), getDoctorProfile)

export default router