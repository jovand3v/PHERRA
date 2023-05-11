import { useState } from "react";
import s from "./index.module.scss";
import UserIcon from "@public/assets/icons/user.svg";
import EyeOpenIcon from "@public/assets/icons/eye-open.svg";
import EyeClosedIcon from "@public/assets/icons/eye-closed.svg";
import Router from "next/router";

const Login = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [details, setDetails] = useState({ name: "", password: "" });

  const handleSubmit = async () => {
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(details),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.redirected) {
          Router.push("/admin/dashboard");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={s.main}>
      <h1 className={s.heading}>
        PHERRA <span className={s.headingAdmin}>ADMIN</span>
      </h1>
      <div className={s.loginContainer}>
        <UserIcon className={s.userIcon} />
        <form className={s.form}>
          <label className={s.label}>
            <span className={s.labelName}>NAME</span>
            <input
              className={s.input}
              placeholder="Your name"
              value={details.name}
              onChange={(e) => setDetails((d) => ({ ...d, name: e.target.value }))}
            />
          </label>
          <label className={s.label}>
            <span className={s.labelName}>PASSWORD</span>
            <div className={s.passwordInputWrapper}>
              <input
                className={s.input}
                type={isPasswordShown ? "text" : "password"}
                placeholder="Your password"
                value={details.password}
                onChange={(e) => setDetails((d) => ({ ...d, password: e.target.value }))}
              />
              {isPasswordShown ? (
                <EyeOpenIcon className={s.eyeIcon} onClick={() => setIsPasswordShown(false)} />
              ) : (
                <EyeClosedIcon className={s.eyeIcon} onClick={() => setIsPasswordShown(true)} />
              )}
            </div>
          </label>
          <button className={s.button} type="button" onClick={handleSubmit}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
