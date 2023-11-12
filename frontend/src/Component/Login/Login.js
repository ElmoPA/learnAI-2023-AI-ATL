import "../../Assets/style/Login/Login.css";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuthContext } from "../../Hook/Login/useAuthContext";
export default function Login() {
  const { dispatch } = useAuthContext();
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      dispatch({ type: "LOGIN", payload: tokenResponse.access_token });
      localStorage.setItem(
        "token",
        JSON.stringify({ token: tokenResponse.access_token })
      );
      console.log(tokenResponse);
    },

    onError: () => console.log("fail"),
  });
  return (
    <div className="login-container py-2">
      <div className="d-flex justify-content-center">
        <div className="login-box col-lg-4 col-md-12 col-sm-12">
          <h2 className="mb-4 ">Login</h2>
          <form className=" d-flex flex-column mb-2">
            <label className="mb-2 ">Email</label>
            <input type="email" className="mb-3 login-input"></input>
            <label className="mb-2 ">Password</label>
            <input type="password" className=" mb-3 login-input"></input>
            <button className="login-page-button">Log in</button>
          </form>
          <p className="d-flex justify-content-center mb-2">or</p>

          <button
            className="google-login-button d-flex align-items-center justify-content-center w-100 mb-5"
            onClick={() => login()}
          >
            <img
              style={{ marginRight: "5px" }}
              width="20px"
              src={require("../../Assets/picture/Google_logo.png")}
            />
            <p className="mb-0 login-text">Google</p>
          </button>

          <div className="text-end no-account">
            <p>
              Don't have an account? <a href="/signup">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
