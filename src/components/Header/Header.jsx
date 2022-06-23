import React, { useState } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../reduxToolkit/usersSlice";
import { motion } from "framer-motion";

function Header(props) {
  const [scroll, setScroll] = useState(false);
  window.onscroll = function () {
    if (window.scrollY > 0) {
      setScroll(true);
    }
    if (window.scrollY < 1) {
      setScroll(false);
    }
  };
  const dispatch = useDispatch();

  const token = useSelector((state) => state.users.token);
  const users = useSelector((state) => state.users.users);
  const currentUserId = useSelector((state) => state.users.currentUserId);

  return (
    <header className={scroll ? styles.scrolled : ""}>
      <div className={styles.header}>
        {/* лого */}
        <Link to="/">
          <motion.div
            initial={{
              x: -1000,
            }}
            animate={{
              x: 0,
            }}
            transition={{
              delay: 0,
              duration: 0.3,
            }}
            className={scroll ? `${styles.logo} ${styles.scrolledLogo}` : styles.logo}
          >
            BASICS.<span>TECH</span>
          </motion.div>
        </Link>

        <div className={styles.navBlock}>
          {/* блок с аватаркой и именем текущего пользователя */}
          {token &&
            users.map((user) => {
              if (user._id === currentUserId) {
                return (
                  <Link key={user._id} to="/profile">
                    <div className={styles.userProfile}>
                      <div className={styles.avatar}>
                        <img src={`http://localhost:3030/${user.image}`} alt="avatar" />
                      </div>
                      <div className={scroll ? `${styles.userName} ${styles.scrolledName}` : styles.userName}>{user.name}</div>
                    </div>
                  </Link>
                );
              }
              return false;
            })}

          {/* кнопки "вход" и "выход" по условию наличия токена */}
          {token ? (
            <button
              className={scroll ? `${styles.logOutBtn} ${styles.scrolledBtn}` : styles.logOutBtn}
              onClick={() => dispatch(logOut())}
            >
              Выход
            </button>
          ) : (
            <Link to={"/signin"}>
              <button className={scroll ? `${styles.signInBtn} ${styles.scrolledBtn}` : styles.signInBtn}>Вход</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
