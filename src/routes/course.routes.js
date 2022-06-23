import express from "express";
import {
  addCourse,
  getCourse,
  getCourses,
  updateCourse,
  deleteCourse,
} from "../controllers/course.controller";

import { isAuthorized, isLoggedIn } from "../middleware/auth";

import advancedResults from "../middleware/advancedResults";
import Course from "../models/Course";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(
    advancedResults(Course, {
      path: "bootcamp",
      select: "name description",
    }),
    getCourses
  )
  .post(isLoggedIn, isAuthorized("publisher", "admin"), addCourse);

router
  .route("/:id")
  .get(getCourse)
  .put(isLoggedIn, isAuthorized("publisher", "admin"), updateCourse)
  .delete(isLoggedIn, isAuthorized("publisher", "admin"), deleteCourse);

export default router;
