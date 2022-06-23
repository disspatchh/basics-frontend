import React from "react";
import styles from "./People.module.css";
import {  useSelector } from "react-redux";
import { motion } from "framer-motion";

function People(props) {
  const users = useSelector((state) => state.users.users);
  const currentUserId = useSelector((state) => state.users.currentUserId);

  const usersVariants = {
    visible: (i) => ({
      opacity: 1,
      transition: {
        delay: i * 0.4,
      },
    }),
    hidden: { opacity: 0 },
  };

  return (
    <div className={styles.peoplePage}>
      <div className={styles.usersList}>
        {users.map((user, index) => {
          if (user._id !== currentUserId) {
            return (
              <motion.div
                variants={usersVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                key={user._id}
                className={styles.userBlock}
              >
                <div className={styles.userAvatar}>
                  <img src={`http://localhost:3030/${user.image}`} alt="avatar" />
                </div>
                <div className={styles.userInfo}>
                  <div className={styles.userName}>{user.name}</div>
                  <div className={styles.userAge}>
                    {new Date().getFullYear() - user.date.split(".")[2]}{" "}
                    {(function () {
                      switch (
                        (new Date().getFullYear() - user.date.split(".")[2])
                          .toString()
                          .slice(-1)
                      ) {
                        case "0":
                          return "лет";
                        case "5":
                          return "лет";
                        case "6":
                          return "лет";
                        case "7":
                          return "лет";
                        case "8":
                          return "лет";
                        case "9":
                          return "лет";
                        case "1":
                          return "год";
                        case "2":
                          return "года";
                        case "3":
                          return "года";
                        case "4":
                          return "года";
                        default:
                          return null;
                      }
                    })()}
                  </div>
                </div>
              </motion.div>
            );
          }
          return false;
        })}
      </div>
    </div>
  );
}

export default People;
