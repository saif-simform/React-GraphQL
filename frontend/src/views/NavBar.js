import React from "react";
import { NavLink } from "react-router-dom";
import { TOKEN_KEY, USER_KEY } from "../configs/constants";
import { useLocalStorage } from "../hooks/useLocalStorage";
const NavBar = () => {
  const [user, setUser] = useLocalStorage(USER_KEY, {})
  const [tokenInstance, setTokenInstance] = useLocalStorage(TOKEN_KEY, '')

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav w-100">
            <>
              <li>
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="/projects"
                >
                  Projects
                </NavLink>
              </li>
            </>
            <li className="nav-item ms-auto">
              <NavLink
                className="nav-link"
                to="/"
                onClick={() => {
                  user && setUser({})
                  tokenInstance && setTokenInstance('')
                }}
              >
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
