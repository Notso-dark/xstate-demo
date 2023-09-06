import { AUTH_COOKIE_NAME } from "@/libs/constants";
import cookie from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

export type LogoutDTO = { status: string };
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookieValue = cookie.serialize(AUTH_COOKIE_NAME, "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 0,
    expires: new Date(0),
    path: "/",
  });
  res
    .setHeader("Set-Cookie", cookieValue)
    .status(200)
    .json({ status: "logged-out" });
  return;
}
