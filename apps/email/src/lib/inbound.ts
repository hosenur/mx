import { Inbound } from "@inboundemail/sdk";

export const inbound = new Inbound(process.env.INBOUND_API_KEY!);
