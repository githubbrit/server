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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSMS = void 0;
const serialport_1 = require("serialport");
const parser_readline_1 = require("@serialport/parser-readline");
const PORT = "/dev/ttyUSB0"; // Change this based on your system (e.g., COM3 for Windows)
const BAUD_RATE = 9600;
const port = new serialport_1.SerialPort({ path: PORT, baudRate: BAUD_RATE });
const parser = port.pipe(new parser_readline_1.ReadlineParser({ delimiter: "\r\n" }));
// Function to send SMS
const sendSMS = (phoneNumber, message) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        port.write(`AT+CMGF=1\r`); // Set SMS mode
        setTimeout(() => {
            port.write(`AT+CMGS="${phoneNumber}"\r`);
            setTimeout(() => {
                port.write(message + "\x1A"); // Send message
                resolve("SMS sent successfully!");
            }, 1000);
        }, 1000);
    });
});
exports.sendSMS = sendSMS;
// Listen for incoming messages
parser.on("data", (data) => {
    console.log("Received from SIM800C:", data);
});
