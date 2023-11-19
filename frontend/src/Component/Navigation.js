import "../Assets/style/Navigation/Navigation.css";
import { useAuthContext } from "../Hook/Login/useAuthContext";
export default function Navigation() {
  const { token } = useAuthContext();
  return (
    <div className="navigation-container py-3 px-5">
      <div className="d-flex justify-content-between">
        <div className="logo">
          <img alt="LOGO"></img>
        </div>
        {token ? (
          <div>Profile</div>
        ) : (
          <a href="/login" className="login-button">
            Log in
          </a>
        )}
      </div>
    </div>
  );
}
