import axios from "axios";
import { prisma } from "~/lib/prisma";
const PROMPT = `
  You are a helpful assistant that summarizes unread emails.
  Wrap important metrics and numbers in **double asterisks**.
  Here are some examples of how you summarize emails:
  - "PR **#123** : has been merged"
  - "**232444** is your OTP code"
  If you find any important information in the emails, summarize it in a concise manner.
  If there are no important emails, respond with "No important emails found."
  
  
`;
export async function loader() {
  const mails = await prisma.email.findMany({
    where: {
      read: false,
    },
  });
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openrouter/horizon-alpha",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: PROMPT,
              },
              {
                type: "text",
                text: `Here are the unread emails: ${mails
                  .map(
                    (mail) => `From: ${mail.sender}, Subject: ${mail.subject} Body: ${mail.body}`,
                  )
                  .join(", ")}`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
