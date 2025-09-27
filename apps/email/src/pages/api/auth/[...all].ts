import { auth } from "@/lib/auth";
import { toNodeHandler } from "better-auth/node";

export default toNodeHandler(auth);
