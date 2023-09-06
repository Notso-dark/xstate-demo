import { LockClosedIcon } from "@heroicons/react/24/solid";
import { Field, Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";

import { Redirect } from "@/components/Redirect";
import { useAuth } from "@/context/authentication/Authentication";

import Head from "next/head";

type Values = {
  login: string;
  password: string;
};

export default function Index() {
  const { login: loginFn, isLoggedIn } = useAuth();
  if (isLoggedIn) return <Redirect to="/app" />;

  const getValidationSchema = () =>
    yup.object().shape({
      login: yup.string().required("Login is required"),
      password: yup.string().required("Password is required"),
    });
  const initialValues = { login: "", password: "" };

  const handleLogin = async ({ login, password }: Values) => {
    try {
      const { user } = await (
        await fetch("/api/login", {
          method: "POST",
          body: JSON.stringify({ login, password }),
        })
      ).json();
      if (user) {
        loginFn({ auth: { user } });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Head>
        <title>Login - Backoffice</title>
      </Head>
      <div className="flex flex-wrap items-center justify-center min-h-screen px-4 py-12 bg-blue-200 sm:px-6 lg:px-8">
        <div className="flex-auto w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-3xl font-bold text-center text-blue-900">
              {"Login"}
            </h2>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={getValidationSchema}
            onSubmit={handleLogin}
          >
            {({ values, isSubmitting }) => (
              <Form className="mt-8 space-y-6" action="#" method="POST">
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                  <div>
                    <label htmlFor="login" className="sr-only">
                      {"Login"}
                    </label>
                    <Field
                      id="login"
                      name="login"
                      type="text"
                      autoComplete="email"
                      required
                      className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none bg-blue-50 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder={"admin"}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      {"Password"}
                    </label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none bg-blue-50 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder={"azertyuiop"}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    disabled={isSubmitting}
                  >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <LockClosedIcon
                        className={[
                          "w-5 h-5 text-blue-500 group-hover:text-blue-400",
                          isSubmitting && "animate-ping",
                        ].join(" ")}
                        aria-hidden="true"
                      />
                    </span>
                    {"Submit"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
