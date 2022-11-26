import { LockClosedIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import endpointsConfig from "../config/endpoints.config";
import AuthContext from "../context/auth.context";

enum UsernameState {
  FIRST_LOAD,
  INVALID,
  VALID,
  TAKEN,
  UNIQUE,
}

enum EmailState {
  FIRST_LOAD,
  INVALID,
  VALID,
  TAKEN,
  UNIQUE,
}

enum PasswordState {
  FIRST_LOAD,
  INVALID,
  VALID,
}

export default function Register() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const state = {
    username: UsernameState.FIRST_LOAD,
    email: EmailState.FIRST_LOAD,
    password: PasswordState.FIRST_LOAD,
  };
  const [validationStates, setValidationStates] = useState(
    new Map(Object.entries(state))
  );

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateUsername = (): boolean => {
    return /^[a-zA-Z0-9_]+$/.test(username);
  };

  const validateEmail = (): boolean => {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  };

  const validatePasswordAndConfirmPassword = (): boolean => {
    return (
      password != "" && confirmPassword != "" && password === confirmPassword
    );
  };

  const isUsernameUnique = async () => {
    if (validationStates.get("username") === UsernameState.VALID) {
      await axios
        .get(
          endpointsConfig.REST_SERVICE_BASE_URL +
            "/register/username/" +
            username
        )
        .then(() => {
          setValidationStates(
            validationStates.set("username", UsernameState.UNIQUE)
          );
        })
        .catch((error) => {
          if (error.response.status === 403) {
            validationStates.set("username", UsernameState.TAKEN);
          }
        })
        .finally(setErrorMessage);
    }
  };

  const isEmailUnique = async () => {
    if (validateEmail()) {
      await axios
        .get(endpointsConfig.REST_SERVICE_BASE_URL + "/register/email/" + email)
        .then(() => {
          setValidationStates(validationStates.set("email", EmailState.UNIQUE));
        })
        .catch((error) => {
          if (error.response.status === 403) {
            setValidationStates(
              validationStates.set("email", EmailState.TAKEN)
            );
          }
        })
        .finally(setErrorMessage);
    }
  };

  useEffect(() => {
    if (
      username === "" &&
      validationStates.get("username") === UsernameState.FIRST_LOAD
    )
      return;

    if (validateUsername())
      setValidationStates(
        validationStates.set("username", UsernameState.VALID)
      );
    else
      setValidationStates(
        validationStates.set("username", UsernameState.INVALID)
      );

    setErrorMessage();

    const timeout = setTimeout(() => {
      isUsernameUnique();
    }, 500);

    return () => clearTimeout(timeout);
  }, [username]);

  useEffect(() => {
    if (email === "" && validationStates.get("email") === EmailState.FIRST_LOAD)
      return;

    if (validateEmail())
      setValidationStates(validationStates.set("email", EmailState.VALID));
    else setValidationStates(validationStates.set("email", EmailState.INVALID));

    const timeout = setTimeout(() => {
      isEmailUnique();
    }, 500);

    setErrorMessage();

    return () => clearTimeout(timeout);
  }, [email]);

  useEffect(() => {
    if (
      password === "" &&
      confirmPassword === "" &&
      validationStates.get("password") === PasswordState.FIRST_LOAD
    )
      return;

    if (validatePasswordAndConfirmPassword())
      setValidationStates(
        validationStates.set("password", PasswordState.VALID)
      );
    else
      setValidationStates(
        validationStates.set("password", PasswordState.INVALID)
      );

    setErrorMessage();
  }, [password, confirmPassword]);

  const registerHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      validationStates.get("username") === UsernameState.UNIQUE &&
      validationStates.get("email") === EmailState.UNIQUE &&
      validationStates.get("password") === PasswordState.VALID
    ) {
      setIsLoading(true);

      await axios
        .post(endpointsConfig.REST_SERVICE_BASE_URL + "/register", {
          email,
          password,
          username,
          name,
        })
        .then((response) => {
          authCtx.login(response.data.accessToken, response.data.isAdmin);

          navigate("/");
        })
        .catch((error) => {
          if (error.response.status === 403) {
          }

          if (error.response.status === 500) {
            console.error("Internal server error.");
          }

          setIsLoading(false);
        });
    }
  };

  const setErrorMessage = () => {
    if (validationStates.get("username") === UsernameState.INVALID) {
      setMessage("Invalid username.");
      return;
    } else if (validationStates.get("username") === UsernameState.TAKEN) {
      setMessage("Username is already taken.");
      return;
    } else {
      setMessage("");
    }

    if (validationStates.get("email") === EmailState.INVALID) {
      setMessage("Invalid email.");
      return;
    } else if (validationStates.get("email") === EmailState.TAKEN) {
      setMessage("Email is already taken.");
      return;
    } else {
      setMessage("");
    }

    if (validationStates.get("password") === PasswordState.INVALID) {
      setMessage("Confirm password doesn't match password");
      return;
    } else {
      setMessage("");
    }
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="mt-24 text-center text-4xl font-extrabold tracking-wide text-indigo-700">
              Binotify Premium App
            </h1>
            <h2 className="mt-6 text-center text-xl font-bold tracking-tight text-gray-900">
              Sign up new account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <a
                onClick={() => navigate("/login")}
                className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
              >
                Sign in with your account
              </a>
            </p>
          </div>
          <form className="mt-8 space-y-2" onSubmit={registerHandler}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Confirm password
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Confirm password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full text-center text-red-500">
              {message || <br />}
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400 disabled:hover:bg-indigo-400 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      role="status"
                      className="inline w-5 h-5 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                ) : (
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                )}
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
