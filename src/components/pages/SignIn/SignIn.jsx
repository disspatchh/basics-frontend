import React, { useState } from "react";
import styles from "./SignIn.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../../../reduxToolkit/usersSlice";

function SignIn(props) {
  const dispatch = useDispatch();

  const [login, setLogin] = useState("");
  const handleLoginInput = (e) => setLogin(e.target.value);

  const [password, setPassword] = useState("");
  const handlePasswordInput = (e) => setPassword(e.target.value);

  const handleClickSignIn = () => {
    dispatch(signIn({ login, password }));
  };

  return (
    <div className={styles.signInPage}>
      <div className={styles.form}>
        <div className={styles.logo}>
          BASICS.<span>TECH</span>
        </div>
        <div className={styles.title}>Вход</div>
        <div className={styles.inputs}>
          <input
            type="text"
            value={login}
            onChange={handleLoginInput}
            placeholder="Введите E-mail..."
          />
          <input
            type="password"
            value={password}
            onChange={handlePasswordInput}
            placeholder="Введите пароль..."
          />
        </div>
        <button
          className={styles.signInButton}
          disabled={!(login && password) && "disabled"}
          onClick={handleClickSignIn}
        >
          Войти
        </button>
        <Link to="/signup">
          <button className={styles.signUpButton}>Зарегистрироваться</button>
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
