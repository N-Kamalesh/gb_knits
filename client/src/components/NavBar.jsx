/* eslint-disable react/prop-types */
import { Link, useLocation, useNavigate } from "react-router-dom";
import bike1 from "../assets/textilelogo.png";

import "./NavBar.css";

function NavBar({ ITEMS }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname.includes("admin");
  const token = sessionStorage.getItem("token");
  function handleLogout() {
    sessionStorage.removeItem("token");
    navigate("/");
  }

  return (
    <>
      {!isAdmin && (
        <div className="nav-bar-container">
          <div className="nav-bar">
            <div>
              <img src={bike1} alt="Bike Showroom" className="showroom-image" />
            </div>
            <div className="showroom-name">GB KNITS</div>
            <div className="nav-items-left">
              {ITEMS.map((item, index) =>
                ["profile", "track"].includes(item.text) ? (
                  token ? (
                    <Link
                      to={item.path}
                      key={index}
                      className="nav-item no-underline hover:no-underline"
                    >
                      {item.text}
                    </Link>
                  ) : null
                ) : (
                  <Link
                    to={item.path}
                    key={index}
                    className="nav-item no-underline hover:no-underline"
                  >
                    {item.text}
                  </Link>
                ),
              )}
              {!token && (
                <Link
                  to={"/login"}
                  key={"login"}
                  className="nav-item no-underline hover:no-underline"
                >
                  Login
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;
