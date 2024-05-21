import express from 'express'
import {getAllReviews, createReview, deleteReview} from '../Controllers/reviewController.js'
import { authentication, restict } from '../auth/verifyToken.js';

const router = express.Router({mergeParams: true});

router
    .route("/")
    .get(getAllReviews)
    .post(authentication, restict(["patient"]), createReview);	

router.delete("/:id", authentication, restict(['admin']), deleteReview)


export default router