import jwt from "jsonwebtoken";
import type { CrystallizeSignature } from "@crystallize/js-api-client";
import { redirect } from "@remix-run/server-runtime";

export default (signatureJwt: string): CrystallizeSignature => {
  try {
    // Verify the signature ONLY if we are not in a Crystallize ENV
    // There is no other way to do multi-tenancy Apps otherwise
    return jwt.decode(signatureJwt) as CrystallizeSignature;
  } catch (expection: any) {
    console.log("Invalid Crystallize Signature: ", expection.message);
    throw redirect("/invalid");
  }
};
