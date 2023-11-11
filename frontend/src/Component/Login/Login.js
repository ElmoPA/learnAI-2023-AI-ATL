import "../../Assets/style/Login/Login.css";
import { GoogleLogin } from "@react-oauth/google";
export default function Login() {
  return (
    <div className="login-container py-2">
      <div className="row">
        <div className="col-8"></div>
        <div className="login-box col-lg-3 col-md-12 col-sm-12">
          <h2 className="mb-4 ">Login</h2>
          <form className=" d-flex flex-column mb-2">
            <label className="mb-2 ">Email</label>
            <input type="email" className="mb-3 login-input"></input>
            <label className="mb-2 ">Password</label>
            <input type="password" className=" mb-3 login-input"></input>
            <button className="login-page-button ">Log in</button>
          </form>
          <p className="d-flex justify-content-center mb-2">or</p>
          <div className="d-flex align-items-stretch">
            <GoogleLogin
              className="google-login-button"
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log("Login failed");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
