"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sim_controller_1 = require("../controllers/sim.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/send-command", auth_middleware_1.authenticate, sim_controller_1.sendSMSCommand);
exports.default = router;
