import React from "react";
import { useSelector } from "react-redux";
import styles from "./Profile.module.css";
import avatar from "../../../assets/avatar.jpg";

function Profile(props) {
  const currentUserId = useSelector((state) => state.users.currentUserId);
  const currentUser = useSelector((state) =>
    state.users.users.find((user) => user._id === currentUserId)
  );

  return (
    <div className={styles.profileBlock}>
      <div className={styles.userBlock}>
        
      </div>
    </div>
  );
}

export default Profile;
