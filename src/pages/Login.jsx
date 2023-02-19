import { useState } from "react";
import httpConfig from "../http-common";
import { USER_ROUTES } from "../config/routes";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    httpConfig({
      method: "post",
      url: USER_ROUTES.LOGIN,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        email: username,
        password: password,
      }),
    })
      .then((data) => {
        const accountType = data.data.accountType;

        switch (accountType) {
          case "admin":
            navigate("/admin/dashboard");
            break;
          case "user":
            navigate("/dashboard");
            break;
          default:
            toast.error("Unknown role");
        }
      })
      .catch((err) => {
        const apierror = err.response.data.message;
        toast.error(apierror ? apierror : err.message);
      });
  };

  return (
    <>
      <div class="login-text">
        <div class="logo">
          <span>
            <i class="fab fa-speakap"></i>
          </span>
        </div>
        <h1>Sign In</h1>
        <p>It's not long before you embark on this journey! </p>

        <div class="input-box">
          <span class="label">E-mail</span>
          <div class=" flex-r input">
            <input
              placeholder="name@abc.com"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />

            <i class="fas fa-at"></i>
          </div>
        </div>

        <div class="input-box">
          <span class="label">Password</span>
          <div class="flex-r input">
            <input
              type="password"
              placeholder="8+ (a, A, 1, #)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i class="fas fa-lock"></i>
          </div>
        </div>

        <button onClick={handleLogin} class="btn">
          {" "}
          Log In
        </button>
      </div>
    </>
  );
};

export default Login;
