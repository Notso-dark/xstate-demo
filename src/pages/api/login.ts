import {
  AUTH_COOKIE_NAME,
  LOGIN,
  PASSWORD,
  SECRET_SIGNING_KEY,
  USER,
} from "@/libs/constants";
import { Guard } from "@/libs/guards";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

export type LoginDTO = {
  user: typeof USER;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginDTO>
) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  if (!req.body) {
    res.status(400).end();
    return;
  }

  const { login, password } = JSON.parse(req.body);

  if (
    Guard.isEmpty(login) ||
    Guard.isEmpty(password) ||
    !Guard.isString(login) ||
    !Guard.isString(password)
  ) {
    res.status(400).end();
    return;
  }
  if (login !== LOGIN || password !== PASSWORD) {
    res.status(401).end();
    return;
  }

  const response: LoginDTO = {
    user: USER,
  };

  const accessToken = jwt.sign(response, SECRET_SIGNING_KEY, {
    expiresIn: "1h",
  });
  const cookieValue = cookie.serialize(AUTH_COOKIE_NAME, accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  res.setHeader("Set-Cookie", cookieValue).status(200).json(response);
  return;
}

export function isLoggedin(req: NextApiRequest, res: NextApiResponse) {
  if (req.headers["cookie"] === undefined) return false;

  const cookieValue = cookie.parse(req.headers["cookie"]);
  const accessToken = cookieValue[AUTH_COOKIE_NAME];

  if (!accessToken) return false;
  if (!jwt.verify(accessToken, SECRET_SIGNING_KEY, { ignoreExpiration: false }))
    return false;

  return true;
}
