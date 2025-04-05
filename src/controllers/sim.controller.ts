import { Request, Response } from "express";
import twilio from "twilio";

const accountSid = "ACc04a50e91dcc82ff0c4fecc12e7f99a2";
const authToken = "c8ddb33920dfe9f8455a9f0ec66aa826";
const twilioPhone = "+14127852971";

const client = twilio(accountSid, authToken);

export const sendSMSCommand = async (req: Request, res: Response) => {
  const { simNumber, command } = req.body;

  try {
    const message = await client.messages.create({
      body: command,
      from: twilioPhone,
      to: simNumber,
    });

    res.json({ message: "Command sent", sid: message.sid });
  } catch (err: any) {
    console.error("SMS error:", err.message);
    res.status(500).json({ error: err.message });
  }
};
