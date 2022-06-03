import express from "express";
import auth from '../middlewares/auth.js'
const router = express.Router()

import {getTours,createTour,getTour, getTourByUser, deleteTourById, editTourById, getToursBySearch, getToursByTag, getRelatedTours, likeTour} from '../controllers/tour.js'

router.get('/',getTours)
router.get('/search',getToursBySearch)
router.post('/relatedTours',getRelatedTours)
router.get('/tag/:tag',getToursByTag)
router.get('/:id',getTour)
router.get('/userTours/:id',getTourByUser)
router.post('/',auth,createTour)
router.delete('/:id',auth,deleteTourById)
router.patch('/:id',auth,editTourById)
router.patch('/like/:id',auth,likeTour)

export default router;