"use client";

import { AUTH_API } from "@/apiConfig";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";

const Register: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formInputError, setFormInputError] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      phone: e.target.phone.value,
    };
    try {
      const response: any = await fetch(AUTH_API.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoading(false);
        // setError(response.message);
        throw new Error(data.message);
      }
      setLoading(false);
      window.location.href = "/login";
    } catch (error: any) {
      setLoading(false);
      setError(error?.message || "Registration failed. Please try again.");
    }
  };
  const handleInvalid = (event: any) => {
    event.preventDefault();

    // setErrorMessage("The ID must be consisted of 10 numbers");
    if (event.target.validity.tooShort) {
      event.target.setCustomValidity("ID must be at least 10 characters long");
    } else if (event.target.validity.tooLong) {
      event.target.setCustomValidity("ID must be at most 10 characters long");
    }

    setErrorMessage(event.target.validationMessage);
  };

  const handleInput = () => {
    setErrorMessage("");
  };

  return (
    <div className="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8">
      <h1 className="text-4xl text-center my-10 font-bold">Register Account</h1>
      <form
        className="flex flex-col justify-center items-center md:w-4/6 w-full gap-4 mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">
              Name
            </span>
            <input
              name="name"
              className="border-2 rounded-md p-2 shadow focus:ring-0 focus:ring-sky-400 focus:outline-none focus:border-sky-400 w-full"
              type="text"
              placeholder="Name"
              required
              onInvalid={(e: any) =>
                setFormInputError({
                  ...formInputError,
                  name: e.target.validationMessage,
                })
              }
              onInput={(e: any) =>
                setFormInputError({
                  ...formInputError,
                  name: "",
                })
              }
            />
            <span style={{ color: "red" }} className="block">
              {formInputError.name}
            </span>
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">
              Email
            </span>
            <input
              name="email"
              className="border-2 rounded-md p-2 shadow focus:ring-0 focus:ring-sky-400 focus:outline-none focus:border-sky-400 w-full"
              type="email"
              placeholder="Email"
              required
              onInvalid={(e: any) => {
                // e.target.setCustomValidity("The Email must be Valid");
                setFormInputError({
                  ...formInputError,
                  email: e.target.validationMessage,
                });
              }}
              onInput={(e: any) =>
                setFormInputError({
                  ...formInputError,
                  email: "",
                })
              }
            />
            <span style={{ color: "red" }} className="block">
              {formInputError.email}
            </span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">
              Phone
            </span>
            <input
              name="phone"
              className="border-2 rounded-md p-2 shadow focus:ring-0 focus:ring-sky-400 focus:outline-none focus:border-sky-400 w-full"
              type="text"
              placeholder="Phone number"
              required
              maxLength={10}
              minLength={10}
              onInvalid={(e: any) => {
                if (e.target.validity.tooShort) {
                  e.target.setCustomValidity(
                    "Phone number must be at least 10 characters long"
                  );
                } else if (e.target.validity.tooLong) {
                  e.target.setCustomValidity(
                    "Phone number must be at most 10 characters long"
                  );
                }
                setFormInputError({
                  ...formInputError,
                  phone: e.target.validationMessage,
                });
              }}
              onInput={(e: any) =>
                setFormInputError({
                  ...formInputError,
                  phone: "",
                })
              }
            />
            <span style={{ color: "red" }} className="block">
              {formInputError.phone}
            </span>
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-slate-700">
              Password
            </span>
            <input
              name="password"
              className="border-2 rounded-md p-2 shadow focus:ring-0 focus:ring-sky-400 focus:outline-none focus:border-sky-400 w-full"
              type="password"
              placeholder="Password"
              required
              minLength={8}
              onInvalid={(e: any) => {
                if (e.target.validity.tooShort) {
                  e.target.setCustomValidity(
                    "Password must be at least 8 characters"
                  );
                }
                setFormInputError({
                  ...formInputError,
                  password: e.target.validationMessage,
                });
              }}
              onInput={(e: any) =>
                setFormInputError({
                  ...formInputError,
                  password: "",
                })
              }
            />
            <span style={{ color: "red" }} className="block">
              {formInputError.password}
            </span>
          </label>
          {/* <label className="block">
            <span className="block text-sm font-medium text-slate-700">
              Another Phone Number
            </span>
            <input
              name="anotherPhone"
              className="border-2 rounded-md p-2 shadow focus:ring-0 focus:ring-sky-400 focus:outline-none focus:border-sky-400 w-full"
              type="text"
              placeholder="Another phone number"
            />
          </label> */}
        </div>

        <div className="flex items-start w-full">
          <p>
            Already have an account?
            <Link href="/login" className="underline text-slate-700">
              {" "}
              Login
            </Link>
          </p>
        </div>
        <button
          className="bg-sky-600 text-white text-lg py-2 px-16 rounded-md font-bold my-5"
          type="submit"
        >
          {loading ? "Loading..." : "Register"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
