import "../Assets/style/Navigation/Navigation.css";
export default function Navigation() {
  return (
    <div className="navigation-container py-3 px-5">
      <div className="d-flex justify-content-between">
        <div className="logo">
          <img alt="LOGO"></img>
        </div>
        <a href="/login" className="login-button">
          Log in
        </a>
      </div>
    </div>
  );
}
