import { LockClosedIcon } from "@heroicons/react/24/solid";
import React from "react";

import { NetworkError } from "@/components/Error";
import { Redirect } from "@/components/Redirect";
import { useAuth } from "@/context/authentication/Authentication";
import { fetcher } from "@/libs/fetcher";
import Head from "next/head";
import useSWR from "swr";
import { ProfileDTO } from "../api/profile";

export default function Index() {
  const { data, error } = useSWR<ProfileDTO>("/api/profile", fetcher);

  const { isLoggedIn, logout } = useAuth();
  if (!isLoggedIn) return <Redirect to="/" />;

  return (
    <>
      <Head>
        <title>App - Backoffice</title>
      </Head>
      <div className="flex flex-wrap items-center justify-center min-h-screen px-4 py-12 bg-blue-200 sm:px-6 lg:px-8">
        <div className="flex-auto w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-3xl font-bold text-center text-blue-900">
              {"Hello " + data?.user?.name}
            </h2>
          </div>
          <button
            type="submit"
            className="group relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={async () => {
              await fetch("/api/logout");
              logout();
            }}
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon
                className={[
                  "w-5 h-5 text-blue-500 group-hover:text-blue-400",
                ].join(" ")}
                aria-hidden="true"
              />
            </span>
            Logout
          </button>
        </div>
        {error && (
          <div className="flex-auto w-full space-y-8">
            <NetworkError error={error} />
          </div>
        )}
      </div>
    </>
  );
}
