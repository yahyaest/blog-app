"use server";

import { cookies } from "next/headers";
import { decodeFromBase64, encodeToBase64, objectDeepEqual } from ".";

export async function getCookiesSession() {
  "use server";
  try {
    const session = cookies().get("session")?.value;
    if (session) {
      return decodeFromBase64(session);
    }
    return null;
  } catch (error) {
    console.error("Failed to get cookies:", error);
    return null;
  }
}

export async function setCookiesSession(payload: Object) {
  "use server";
  try {
    let session = cookies().get("session")?.value;

    if (!session || !objectDeepEqual(payload, decodeFromBase64(session))) {
      const encodedPayload = encodeToBase64(payload);
      cookies().set("session", encodedPayload || "", {
        // httpOnly: true,
        // secure: true,
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "strict",
        path: "/",
      });
    }
  } catch (error) {
    console.error("Failed to set cookies:", error);
  }
}
