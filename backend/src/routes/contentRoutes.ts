import { Router } from "express";
import { createContent, getContent, deleteContent, editContent } from "../controllers/contentController";
import { userMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/", userMiddleware, createContent);
router.get("/", userMiddleware, getContent);
router.delete("/", userMiddleware, deleteContent);
router.put("/", userMiddleware, editContent);

export default router;
