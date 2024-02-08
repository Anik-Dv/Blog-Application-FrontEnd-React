import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Assets/nav_logo.jpg";

import { FaBars } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";

import { doLogout, getCurrentUser, isAuthenticate } from "../auth/auth";

const Header = () => {
  const [user, setUser] = useState(undefined);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  const [showNavber, setNavberShow] = useState(
    window.innerWidth > 800 ? true : false
  );

  const closeNavberHandler = () => {
    if (window.innerWidth < 800) {
      setNavberShow(false);
    } else {
      setNavberShow(true);
    }
  };
  /* check when component is loaded */
  useEffect(() => {
    let timerId = setInterval(()=> {
      setLogin(isAuthenticate());
      setUser(getCurrentUser());
    }, 2000);
    return ()=> {
      clearInterval(timerId);
    }
  }, []);

  // for logout user
  const logoutHandler = () => {
    doLogout(() => {
      setLogin(false);
      //setUser(undefined);
      navigate("/");
    });
  };

  return (
    <>
      <nav className="navber">
        <div className="container nav-container">
          <Link to="/" className="nav_logo" onClick={closeNavberHandler}>
            <img src={logo} alt="nav logo" />
          </Link>
          {showNavber && (
            <ul className="nav_menu">
              
              {login && (
                <>
                  <li>
                    <Link to="/" onClick={closeNavberHandler}>
                      Feed
                    </Link>
                  </li>
                  <li>
                    <Link to="/posts/categories"
                      onClick={closeNavberHandler}>
                      Category Posts
                    </Link>
                  </li>
                  <li>
                    <Link to="/user/create-post"
                      onClick={closeNavberHandler}>
                      Create Post
                    </Link>
                  </li>
                  <li>
                    <Link to={`/user/profile/${user.userid}`}
                      onClick={closeNavberHandler}>
                      Profile {user.name}
                    </Link>
                  </li>
                </>
              )}
              {!login && (
                <>
                <li>
                  <Link to="/" onClick={closeNavberHandler}>
                    Home
                  </Link>
                </li>
                <li>
                <Link to="/posts/categories"
                  onClick={closeNavberHandler}>
                  Category Posts
                </Link>
              </li>
              </>
              )}
              <li>
                <Link to="/authors" onClick={closeNavberHandler}>
                  See Users
                </Link>
              </li>
              
              {/* when user loggedin */}
              {login ? (
                <li>
                  <Link onClick={logoutHandler}>Logout</Link>
                </li> /* when user Not loggedin */
              ) : (
                <>
                  <li>
                    <Link to="/login" onClick={closeNavberHandler}>
                      SignIn
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" onClick={closeNavberHandler}>
                      SignUp
                    </Link>
                  </li>
                </>
              )}
            </ul>
          )}
          <button className="nav_toggle-btn" onClick={() => setNavberShow(!showNavber)}>
            {showNavber ? <IoIosCloseCircleOutline /> : <FaBars />}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;
