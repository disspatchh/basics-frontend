import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeImage,
  changeName,
  changePassword,
} from "../../../reduxToolkit/usersSlice";
import styles from "./Profile.module.css";

function Profile(props) {
  const dispatch = useDispatch();

  const currentUserId = useSelector((state) => state.users.currentUserId);
  const users = useSelector((state) => state.users.users);
  const currentUser = users.find((user) => user._id === currentUserId);

  const [file, setFile] = useState(null);
  const [changingImage, setChangingImage] = useState(false);
  const uploadImage = () => {
    dispatch(changeImage({ image: file }));
  };

  const handleCancel = () => {
    setChangingImage(false);
    setFile(null);
  };

  const [changingName, setChangingName] = useState(false);
  const [inputName, setInputName] = useState(currentUser?.name);
  const handleChangeName = () => {
    setChangingName(false);
    dispatch(changeName({ name: inputName }));
  };

  const [changingPassword, setChangingPassword] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const handleChangePassword = () => {
    setChangingPassword(false);
    dispatch(changePassword({ password: inputPassword }));
  };

  const handleCancelChangePassword = () => {
    setChangingPassword(false);
    setInputPassword("");
  };

  if (users.length < 1) {
    return <div>Загрузка...</div>
  }

  return (
    <div className={styles.profileBlock}>
      <div className={styles.userBlock}>
        <div className={styles.avatarBlock}>
          <div className={styles.userAvatar}>
            <img
              src={`http://localhost:3030/${currentUser.image}`}
              alt="avatar"
            />
          </div>
          {/* загрузка аватарки */}
          <div className={styles.userAvatarUpload}>
            {changingImage && (
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            )}
          </div>
          <div className={styles.buttons}>
            <button
              className={styles.uploadBtn}
              onClick={
                changingImage ? uploadImage : (e) => setChangingImage(true)
              }
              disabled={changingImage && !file && "disabled"}
            >
              {changingImage ? "Сохранить" : "Изменить фото"}
            </button>
            {changingImage && (
              <button className={styles.cancelBtn} onClick={handleCancel}>
                Отменить
              </button>
            )}
          </div>
        </div>
        <div className={styles.userInfo}>
          <div className={styles.userName}>
            {changingName ? (
              <input
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
              />
            ) : (
              currentUser.name
            )}
            <button
              disabled={changingName && !inputName && "disabled"}
              className={styles.changeNameBtn}
              onClick={
                changingName ? handleChangeName : () => setChangingName(true)
              }
            >
              {changingName ? "Сохранить" : "Изменить"}
            </button>
          </div>
          <div className={styles.userEmail}>E-mail: {currentUser.email}</div>
          <div className={styles.userDate}>
            Дата рождения: {currentUser.date}
          </div>
          <div className={styles.userPassword}>
            <div className={styles.buttons}>
              <button
                disabled={changingPassword && !inputPassword && "disabled"}
                className={styles.changePasswordBtn}
                onClick={
                  changingPassword
                    ? handleChangePassword
                    : () => setChangingPassword(true)
                }
              >
                {changingPassword ? "Подвердить" : "Изменить пароль"}
              </button>
              {changingPassword && (
                <button
                  className={styles.cancelBtn}
                  onClick={handleCancelChangePassword}
                >
                  Отменить
                </button>
              )}
            </div>
            {changingPassword && (
              <input
                type="password"
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                placeholder="Введите новый пароль..."
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
