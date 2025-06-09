import { Router } from "express";
import { createContent, getContent, deleteContent } from "../controllers/contentController";
import { userMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/", userMiddleware, createContent);
router.get("/", userMiddleware, getContent);
router.delete("/", userMiddleware, deleteContent);

export default router;
