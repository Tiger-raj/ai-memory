import { Router } from "express";
import { toggleShare, getShareStatus, getSharedBrain } from "../controllers/brainController";
import { userMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Put specific routes before parameterized routes
router.post("/share", userMiddleware, toggleShare);
router.get("/share", userMiddleware, getShareStatus);

// Use a more specific parameter name and put it last
router.get("/shared/:hash", getSharedBrain);

export default router;
