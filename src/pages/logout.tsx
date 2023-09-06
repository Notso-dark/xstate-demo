import { Redirect } from "@/components/Redirect";
import { fetcher } from "@/libs/fetcher";
import { useEffect } from "react";
import useSWR, { useSWRConfig } from "swr";
import { LogoutDTO } from "./api/logout";

export default function Logout() {
  const { data } = useSWR<LogoutDTO>("/api/logout", fetcher);
  if (data?.status === "logged-out") return <Redirect to="/" />;

  return <div>Redirecting...</div>;
}
