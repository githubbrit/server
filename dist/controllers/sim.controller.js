"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSMSCommand = void 0;
const twilio_1 = __importDefault(require("twilio"));
const accountSid = "ACc04a50e91dcc82ff0c4fecc12e7f99a2";
const authToken = "c8ddb33920dfe9f8455a9f0ec66aa826";
const twilioPhone = "+14127852971";
const client = (0, twilio_1.default)(accountSid, authToken);
const sendSMSCommand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { simNumber, command } = req.body;
    try {
        const message = yield client.messages.create({
            body: command,
            from: twilioPhone,
            to: simNumber,
        });
        res.json({ message: "Command sent", sid: message.sid });
    }
    catch (err) {
        console.error("SMS error:", err.message);
        res.status(500).json({ error: err.message });
    }
});
exports.sendSMSCommand = sendSMSCommand;
