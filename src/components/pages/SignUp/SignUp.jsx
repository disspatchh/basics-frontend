import React, { useState } from "react";
import styles from "./SignUp.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "../../../reduxToolkit/usersSlice";

function SignUp(props) {
  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const handlenameInput = (e) => setname(e.target.value);

  const [login, setLogin] = useState("");
  const handleLoginInput = (e) => setLogin(e.target.value);

  const [password, setPassword] = useState("");
  const handlePasswordInput = (e) => setPassword(e.target.value);

  const [day, setDay] = useState("01");
  const [month, setMonth] = useState("01");
  const [year, setYear] = useState("2022");
  const date = `${day}.${month}.${year}`;

  const [gender, setGender] = useState("male");
  const [file, setFile] = useState(null);

  // ТА САМАЯ ФУНКЦИЯ
  const handleClickSignUp = () => {
    dispatch(signUp({ name, login, password, date, gender, file}));
    console.log(file);
  };

  return (
    <div className={styles.signUpPage}>
      <div className={styles.form}>
        <div className={styles.logo}>
          BASICS.<span>TECH</span>
        </div>
        <div className={styles.title}>Регистрация</div>
        <div className={styles.inputs}>
          <input
            type="text"
            value={name}
            onChange={handlenameInput}
            placeholder="Введите имя..."
          />
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

          {/* блок настройки даты рождения */}
          <div className={styles.dateBlock}>
            {/* select день */}
            <select
              name="dateDay"
              id="dateDay"
              onChange={(e) => setDay(e.target.value)}
              style={{ width: "50px" }}
            >
              {(function () {
                const result = [];
                for (let i = 1; i <= 31; i++) {
                  result.push(
                    <option key={i} value={i}>
                      {i}
                    </option>
                  );
                }
                return result;
              })()}
            </select>
            {/* select месяц */}
            <select
              name="dateMonth"
              id="dateMonth"
              onChange={(e) => setMonth(e.target.value)}
              style={{ width: "120px" }}
            >
              <option value="01">Январь</option>
              <option value="02">Февраль</option>
              <option value="03">Март</option>
              <option value="04">Апрель</option>
              <option value="05">Май</option>
              <option value="06">Июнь</option>
              <option value="07">Июль</option>
              <option value="08">Август</option>
              <option value="09">Сентябрь</option>
              <option value="10">Октябрь</option>
              <option value="11">Ноябрь</option>
              <option value="12">Декабрь</option>
            </select>
            {/* select год */}
            <select
              name="dateYear"
              id="dateYear"
              size={1}
              onChange={(e) => setYear(e.target.value)}
            >
              {(function () {
                const result = [];
                for (let i = 2022; i >= 1970; i--) {
                  result.push(
                    <option key={i} value={i}>
                      {i}
                    </option>
                  );
                }
                return result;
              })()}
            </select>
          </div>

          {/* блок выбора пола */}
          <div className={styles.genderBlock}>
            <div className={styles.genderLabel}>Пол:</div>
            <input
              type="radio"
              name="gender"
              id="male"
              value="male"
              checked={gender === "male" && "checked"}
              onClick={(e) => setGender(e.target.value)}
            />
            <label htmlFor="male">Мужской</label>
            <input
              type="radio"
              name="gender"
              id="female"
              value="female"
              checked={gender === "female" && "checked"}
              onClick={(e) => setGender(e.target.value)}
            />
            <label htmlFor="female">Женский</label>
          </div>
              
          {/* загрузка аватарки */}
          <div className={styles.userAvatarUpload}>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </div>
        </div>
        {/* <Link to="/signin"> */}
          <button
            className={styles.signUpButton}
            // disabled={!(name && login && password) && "disabled"}
            onClick={handleClickSignUp}
          >
            Зарегистрироваться
          </button>
        {/* </Link> */}
        <Link to="/signin">
          <button className={styles.signInButton}>Войти</button>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
