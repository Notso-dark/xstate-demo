import { USER } from "@/libs/constants";
import type { NextApiRequest, NextApiResponse } from "next";
import { isLoggedin } from "./login";

export type ProfileDTO = {
  user: typeof USER;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProfileDTO>
) {
  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }
  if (!isLoggedin(req, res)) {
    res.status(401).end();
    return;
  }
  res.status(200).json({ user: USER });
  return;
}
