import { Link, useNavigate } from "react-router"
import "./LoginForm.css"
import React, { useState } from "react"

type Login = {
    userName: string,
    password: string
    isItRegistration: boolean
}
type Register = Login & {
    tel: number
    sex: string,
    email: string,
    dateOfBirth: string,
}


export default function LoginForm() {
    const [isRegister, setIsRegister] = useState(false);
    const baseURL = "http://localhost:5000/api/";
    const navigate = useNavigate();
    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(event.currentTarget);
        const LogInUser: Login = {
            userName: data.get("userName") as string,
            password: data.get("password") as string,
            isItRegistration: false
        }
        try {
            const response = await fetch(`${baseURL}login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(LogInUser),
                credentials: 'include',
            });
            if (!response.ok) throw new Error("Login Failed");
            // const result = await response.json();
            form.reset();
            navigate("/profile");
        } catch (err) {
            if (err instanceof Error)
                console.error(err.message);
        }
    }
    const handleRegister = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const form = evt.currentTarget;
        const data = new FormData(evt.currentTarget);
        const newUser: Register = {
            userName: data.get("userName") as string,
            email: data.get("email") as string,
            tel: Number(data.get("tel")),
            password: data.get("password") as string,
            dateOfBirth: data.get("dateOfBirth") as string,
            sex: data.get("sex") as string,
            isItRegistration: true
        }
        console.log(newUser);
        try {
            const response = await fetch(`${baseURL}register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser),
                credentials: 'include',
            });
            form.reset();
            navigate("/profile");
            if (!response.ok) throw new Error("Registration Failed");
            const result = await response.json();
            console.log(result);
        } catch (err) {
            if (err instanceof Error)
                console.error(err.message);
        }

    }

    const containerStyle: React.CSSProperties = isRegister ? { width: 950, height: 650 } : { width: 850, height: 600 };

    return (
        <>
            <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
            <div className={`login-container ${isRegister ? "active" : ""}`}
                style={containerStyle}>
                <form onSubmit={handleLogin} className="formBody">
                    <h1>Login</h1>
                    <div className="inputBox-container">
                        <input type="text" className="inputBox" name="userName" placeholder="User Name" required />
                        <i className="bx bxs-user"></i>
                    </div>
                    <div className="inputBox-container">
                        <input type="password" className="inputBox" name="password" placeholder="Password" required />
                        <i className="bx bxs-lock-alt"></i>
                    </div>
                    <div className="forgot-link">
                        <Link to="#">Forgot Link</Link>
                    </div>
                    <button type="submit" className="formSubmit-btn" onClick={() => setIsRegister(false)}>Login</button>
                    <p>or Login with social platform</p>
                    <div className="socialIcons-conatainer">
                        <Link to="#"><i className="bx bxl-facebook-circle" /></Link>
                        <Link to="#"><i className="bx bxl-google" /></Link>
                        <Link to="#"><i className="bx bxl-twitter" /></Link>
                        <Link to="#"><i className="bx bxl-github" /></Link>
                    </div>
                    <button type="button" className="toddle" onClick={() => setIsRegister(true)} >
                        Don't have an account ?
                    </button>

                </form>

                <form onSubmit={handleRegister} className="registionform" id="registionform" >
                    <h1>Register</h1>
                    <div className="inputBox-container">
                        <input type="text" className="inputBox" name="userName" placeholder="User Name" required />
                        <i className="bx bxs-user"></i>
                    </div>
                    <div className="inputBox-container">
                        <input type="email" className="inputBox" name="email" placeholder="Email" required />
                        <i className="bx bxl-gmail" />
                    </div>
                    <div className="inputBox-container">
                        <input type="tel" className="inputBox" name="tel" placeholder="Tel" maxLength="15" required />
                        <i className="bx bx-phone" />
                    </div>
                    <div className="inputBox-container">
                        <input type="password" className="inputBox" name="password" placeholder="Password" required />
                        <i className="bx bxs-lock-alt"></i>
                    </div>
                    <div className="DateAndSex">
                        <input type="date" className="date-box" name="dateOfBirth" placeholder="Date of birth" required />
                        <div className="sex-Container" >
                            <label className="sex">Male <input type="radio" name="sex" className="sex" value="M" required /></label>
                            <label className="sex">Female <input type="radio" name="sex" className="sex" value="F" required /></label>
                            <label className="sex">Others <input type="radio" name="sex" className="sex" value="O" required defaultChecked /></label></div>
                    </div>
                    <button type="submit" className="formSubmit-btn" >Register</button>
                    <p>or Login with social platform</p>
                    <div className="socialIcons-conatainer">
                        <Link to="#"><i className="bx bxl-facebook-circle" /></Link>
                        <Link to="#"><i className="bx bxl-google" /></Link>
                        <Link to="#"><i className="bx bxl-twitter" /></Link>
                        <Link to="#"><i className="bx bxl-github" /></Link>
                    </div>
                    <button type="button" className="toddle" onClick={() => setIsRegister(false)}>
                        Already have an account
                    </button>
                </form>
            </div>
        </>
    )
}