import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./LoginForm.css";
import api from "../../api/axios";

import {
    loginSchema,
    registerSchema,
} from "../zodSchemas/auth.zodSchema";
type LoginField = "userName" | "password";

type RegisterField =
    | "userName"
    | "email"
    | "tel"
    | "password"
    | "dateOfBirth"
    | "sex";
export default function LoginForm() {
    const [isRegister, setIsRegister] = useState(false);
    const [errors, setErrors] = useState<
        Partial<Record<LoginField, string>>
    >({});
    const [registerErrors, setRegisterErrors] = useState<
        Partial<Record<RegisterField, string>>
    >({});
    const [serverError, setServerError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const showRegistration = () => {
        setIsRegister(true);
        setErrors({});
        setRegisterErrors({});
        setServerError("");
    };

    const showLogin = () => {
        setIsRegister(false);
        setErrors({});
        setRegisterErrors({});
        setServerError("");
    };
    const handleLogin = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        // Prevent another submission while a request is running.
        if (isSubmitting) return;
        const form = event.currentTarget;
        const data = new FormData(form);
        const result = loginSchema.safeParse({
            userName: data.get("userName"),
            password: data.get("password"),
        });
        if (!result.success) {
            const fieldErrors: Partial<
                Record<LoginField, string>
            > = {};

            for (const issue of result.error.issues) {
                const field = issue.path[0];

                if (
                    (field === "userName" || field === "password") &&
                    !fieldErrors[field]
                ) {
                    fieldErrors[field] = issue.message;
                }
            }

            setErrors(fieldErrors);
            return;
        }
        setErrors({});
        setRegisterErrors({});
        setServerError("");

        setIsSubmitting(true);

        try {
            await api.post("/auth/login", result.data);
            form.reset();
            navigate("/profile");

        } catch (error: unknown) {
            console.error("Login failed:", error);

            setServerError(
                "Login failed. Please check your credentials and try again."
            );

        } finally {
            setIsSubmitting(false);
        }
    };


    const handleRegister = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (isSubmitting) return;

        const form = event.currentTarget;

        const data = new FormData(form);

        // Validate all registration fields.
        const result = registerSchema.safeParse({
            userName: data.get("userName"),
            email: data.get("email"),
            tel: data.get("tel"),
            password: data.get("password"),
            dateOfBirth: data.get("dateOfBirth"),
            sex: data.get("sex"),
        });
        if (!result.success) {
            const fieldErrors: Partial<
                Record<RegisterField, string>
            > = {};

            for (const issue of result.error.issues) {
                const field = issue.path[0];

                switch (field) {
                    case "userName":
                    case "email":
                    case "tel":
                    case "password":
                    case "dateOfBirth":
                    case "sex":
                        if (!fieldErrors[field]) {
                            fieldErrors[field] = issue.message;
                        }
                        break;
                }
            }

            setRegisterErrors(fieldErrors);
            return;
        }

        // Clear previous errors.
        setRegisterErrors({});
        setErrors({});
        setServerError("");

        setIsSubmitting(true);

        try {
            await api.post("/auth/register", result.data);
            form.reset();
            showLogin();
        } catch (error: unknown) {
            console.error("Registration failed:", error);

            setServerError(
                "Registration failed. Please check your information and try again."
            );

        } finally {
            setIsSubmitting(false);
        }
    };

    const containerStyle: React.CSSProperties = isRegister
        ? { width: 950, height: 650 }
        : { width: 850, height: 600 };
    return (
        <>
            <link
                href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
                rel="stylesheet"
            />

            <div
                className={`login-container ${isRegister ? "active" : ""
                    }`}
                style={containerStyle}
            >
                <form
                    onSubmit={handleLogin}
                    className="formBody"
                >
                    <h1>Login</h1>
                    <div className="inputBox-container">
                        <input
                            type="text"
                            className="inputBox"
                            name="userName"
                            placeholder="User Name"
                            autoComplete="username"
                            required
                            aria-invalid={Boolean(errors.userName)}
                            aria-describedby={
                                errors.userName
                                    ? "login-username-error"
                                    : undefined
                            }
                        />

                        <i className="bx bxs-user" />
                    </div>

                    {errors.userName && (
                        <p
                            id="login-username-error"
                            role="alert"
                            className="text-red-600 text-sm"
                        >
                            {errors.userName}
                        </p>
                    )}

                    <div className="inputBox-container">
                        <input
                            type="password"
                            className="inputBox"
                            name="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            required
                            aria-invalid={Boolean(errors.password)}
                            aria-describedby={
                                errors.password
                                    ? "login-password-error"
                                    : undefined
                            }
                        />

                        <i className="bx bxs-lock-alt" />
                    </div>

                    {errors.password && (
                        <p
                            id="login-password-error"
                            role="alert"
                            className="text-red-600 text-sm"
                        >
                            {errors.password}
                        </p>
                    )}


                    {/* Server error */}

                    {serverError && !isRegister && (
                        <p
                            role="alert"
                            className="text-red-600 text-sm"
                        >
                            {serverError}
                        </p>
                    )}


                    <div className="forgot-link">
                        <Link to="#">
                            Forgot Password?
                        </Link>
                    </div>


                    {/* Submit */}

                    <button
                        type="submit"
                        className="formSubmit-btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Logging in..." : "Login"}
                    </button>


                    <p>or Login with social platform</p>

                    <div className="socialIcons-conatainer">
                        <Link to="#" aria-label="Facebook">
                            <i className="bx bxl-facebook-circle" />
                        </Link>

                        <Link to="#" aria-label="Google">
                            <i className="bx bxl-google" />
                        </Link>

                        <Link to="#" aria-label="Twitter">
                            <i className="bx bxl-twitter" />
                        </Link>

                        <Link to="#" aria-label="GitHub">
                            <i className="bx bxl-github" />
                        </Link>
                    </div>


                    <button
                        type="button"
                        className="toddle"
                        onClick={showRegistration}
                    >
                        Don't have an account?
                    </button>

                </form>


                {/* ================================= */}
                {/* REGISTRATION FORM                 */}
                {/* ================================= */}

                <form
                    onSubmit={handleRegister}
                    className="registionform"
                    id="registionform"
                >
                    <h1>Register</h1>


                    {/* Username */}

                    <div className="inputBox-container">
                        <input
                            type="text"
                            className="inputBox"
                            name="userName"
                            placeholder="User Name"
                            autoComplete="username"
                            required
                            aria-invalid={Boolean(
                                registerErrors.userName
                            )}
                            aria-describedby={
                                registerErrors.userName
                                    ? "register-username-error"
                                    : undefined
                            }
                        />

                        <i className="bx bxs-user" />
                    </div>

                    {registerErrors.userName && (
                        <p
                            id="register-username-error"
                            role="alert"
                            className="text-red-600 text-sm"
                        >
                            {registerErrors.userName}
                        </p>
                    )}


                    {/* Email */}

                    <div className="inputBox-container">
                        <input
                            type="email"
                            className="inputBox"
                            name="email"
                            placeholder="Email"
                            autoComplete="email"
                            required
                            aria-invalid={Boolean(
                                registerErrors.email
                            )}
                            aria-describedby={
                                registerErrors.email
                                    ? "register-email-error"
                                    : undefined
                            }
                        />

                        <i className="bx bxl-gmail" />
                    </div>

                    {registerErrors.email && (
                        <p
                            id="register-email-error"
                            role="alert"
                            className="text-red-600 text-sm"
                        >
                            {registerErrors.email}
                        </p>
                    )}


                    {/* Telephone */}

                    <div className="inputBox-container">
                        <input
                            type="tel"
                            className="inputBox"
                            name="tel"
                            placeholder="Tel"
                            autoComplete="tel"
                            maxLength={20}
                            required
                            aria-invalid={Boolean(
                                registerErrors.tel
                            )}
                            aria-describedby={
                                registerErrors.tel
                                    ? "register-tel-error"
                                    : undefined
                            }
                        />

                        <i className="bx bx-phone" />
                    </div>

                    {registerErrors.tel && (
                        <p
                            id="register-tel-error"
                            role="alert"
                            className="text-red-600 text-sm"
                        >
                            {registerErrors.tel}
                        </p>
                    )}


                    {/* Password */}

                    <div className="inputBox-container">
                        <input
                            type="password"
                            className="inputBox"
                            name="password"
                            placeholder="Password"
                            autoComplete="new-password"
                            required
                            aria-invalid={Boolean(
                                registerErrors.password
                            )}
                            aria-describedby={
                                registerErrors.password
                                    ? "register-password-error"
                                    : undefined
                            }
                        />

                        <i className="bx bxs-lock-alt" />
                    </div>

                    {registerErrors.password && (
                        <p
                            id="register-password-error"
                            role="alert"
                            className="text-red-600 text-sm"
                        >
                            {registerErrors.password}
                        </p>
                    )}

                    {/* Date of birth and sex */}

                    <div className="DateAndSex">

                        <input
                            type="date"
                            className="date-box"
                            name="dateOfBirth"
                            required
                            aria-label="Date of birth"
                            aria-invalid={Boolean(
                                registerErrors.dateOfBirth
                            )}
                        />

                        <div className="sex-Container">

                            <label className="sex">
                                Male

                                <input
                                    type="radio"
                                    name="sex"
                                    className="sex"
                                    value="M"
                                    required
                                    aria-invalid={Boolean(
                                        registerErrors.sex
                                    )}
                                />
                            </label>

                            <label className="sex">
                                Female

                                <input
                                    type="radio"
                                    name="sex"
                                    className="sex"
                                    value="F"
                                    required
                                    aria-invalid={Boolean(
                                        registerErrors.sex
                                    )}
                                />
                            </label>

                            <label className="sex">
                                Others

                                <input
                                    type="radio"
                                    name="sex"
                                    className="sex"
                                    value="O"
                                    required
                                    defaultChecked
                                    aria-invalid={Boolean(
                                        registerErrors.sex
                                    )}
                                />
                            </label>

                        </div>
                    </div>


                    {registerErrors.dateOfBirth && (
                        <p
                            role="alert"
                            className="text-red-600 text-sm"
                        >
                            {registerErrors.dateOfBirth}
                        </p>
                    )}

                    {registerErrors.sex && (
                        <p
                            role="alert"
                            className="text-red-600 text-sm"
                        >
                            {registerErrors.sex}
                        </p>
                    )}


                    {/* Server error */}

                    {serverError && isRegister && (
                        <p
                            role="alert"
                            className="text-red-600 text-sm"
                        >
                            {serverError}
                        </p>
                    )}


                    {/* Submit */}

                    <button
                        type="submit"
                        className="formSubmit-btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? "Registering..."
                            : "Register"}
                    </button>


                    <p>or Register with social platform</p>

                    <div className="socialIcons-conatainer">
                        <Link to="#" aria-label="Facebook">
                            <i className="bx bxl-facebook-circle" />
                        </Link>

                        <Link to="#" aria-label="Google">
                            <i className="bx bxl-google" />
                        </Link>

                        <Link to="#" aria-label="Twitter">
                            <i className="bx bxl-twitter" />
                        </Link>

                        <Link to="#" aria-label="GitHub">
                            <i className="bx bxl-github" />
                        </Link>
                    </div>


                    <button
                        type="button"
                        className="toddle"
                        onClick={showLogin}
                    >
                        Already have an account?
                    </button>

                </form>

            </div>
        </>
    );
}