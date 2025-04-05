import { Router } from "express";
import { sendSMSCommand } from "../controllers/sim.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();
router.post("/send-command", authenticate, sendSMSCommand);
export default router;
