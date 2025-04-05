import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";

const PORT = "/dev/ttyUSB0"; // Change this based on your system (e.g., COM3 for Windows)
const BAUD_RATE = 9600;

const port = new SerialPort({ path: PORT, baudRate: BAUD_RATE });
const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

// Function to send SMS
export const sendSMS = async (phoneNumber: string, message: string) => {
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
};

// Listen for incoming messages
parser.on("data", (data) => {
  console.log("Received from SIM800C:", data);
});
