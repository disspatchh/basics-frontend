import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../components/pages/SignIn/SignIn";
import SignUp from "../components/pages/SignUp/SignUp";
import styles from "./App.module.css";
import Header from "./Header/Header";
import People from "./pages/People/People";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile/Profile";

function App() {
  const token = useSelector((state) => state.users.token);
  return token ? (
    <div className={styles.app}>
      <Header />
      <Routes>
        <Route path="/" element={<People />} />
        <Route path="/signin" element={<Navigate to="/" replace />} />
        <Route path="/signup" element={<Navigate to="/" replace />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  ) : (
    <div className={styles.app}>
      <Header />
      <Routes>
        <Route path="/" element={<People />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
