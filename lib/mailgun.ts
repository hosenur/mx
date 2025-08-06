import FormData from "form-data";
import Mailgun from "mailgun.js";
const mg = new Mailgun(FormData);
export const mailgun = mg.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || "key-yourkeyhere",
});
