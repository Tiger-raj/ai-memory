import { Router } from "express";
import { handleQuery } from "../controllers/queryController";
import { userMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/", userMiddleware, handleQuery);

export default router;
