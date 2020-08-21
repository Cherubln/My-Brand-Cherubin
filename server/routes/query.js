import { Router } from "express";
import Query from "../models/query";
const router = Router();
import queryValidator from "../middleware/queryValidator";
import verifyToken from "../middleware/verifyToken";
import queriesController from "../controllers/queriesController";

router.get("/queries", verifyToken, queriesController.getAllQueries);

router.get("/queries/:id", verifyToken, queriesController.getSingleQuery);

router.post("/queries", queryValidator, queriesController.createQuery);

router.delete("/queries/:id", verifyToken, queriesController.deleteQuery);

export default router;
