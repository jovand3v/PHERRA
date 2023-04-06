import { useState } from "react";
import s from "./AdminLogin.module.scss";
import UserIcon from "@public/assets/icons/user.svg";
import EyeOpenIcon from "@public/assets/icons/eye-open.svg";
import EyeClosedIcon from "@public/assets/icons/eye-closed.svg";

const AdminLogin = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

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
            <input className={s.input} placeholder="Your name" />
          </label>
          <label className={s.label}>
            <span className={s.labelName}>PASSWORD</span>
            <div className={s.passwordInputWrapper}>
              <input className={s.input} type={isPasswordShown ? "text" : "password"} placeholder="Your password" />
              {isPasswordShown ? (
                <EyeOpenIcon className={s.eyeIcon} onClick={() => setIsPasswordShown(false)} />
              ) : (
                <EyeClosedIcon className={s.eyeIcon} onClick={() => setIsPasswordShown(true)} />
              )}
            </div>
          </label>
          <button className={s.button}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
