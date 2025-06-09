import { Router } from "express";
import { toggleShare, getShareStatus, getSharedBrain } from "../controllers/brainController";
import { userMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/share", userMiddleware, toggleShare);
router.get("/share", userMiddleware, getShareStatus);
router.get("/:shareLink", getSharedBrain);

export default router;
