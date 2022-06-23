import express from "express";

import {
  getBootcamps,
  getBootcampsInRadius,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  bootcampPhotoUpload,
} from "../controllers/bootcamp.controller";

import advancedResults from "../middleware/advancedResults";
import Bootcamp from "../models/Bootcamp";

import { isAuthorized, isLoggedIn } from "../middleware/auth";

// Include other resource routers
import courseRouter from "./course.routes";

const router = express.Router();

// Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(isLoggedIn, isAuthorized("publisher", "admin"), createBootcamp);

router
  .route("/:id/photo")
  .put(isLoggedIn, isAuthorized("publisher", "admin"), bootcampPhotoUpload);

router
  .route("/:id")
  .get(getBootcamp)
  .put(isLoggedIn, isAuthorized("publisher", "admin"), updateBootcamp)
  .delete(isLoggedIn, isAuthorized("publisher", "admin"), deleteBootcamp);

export default router;
