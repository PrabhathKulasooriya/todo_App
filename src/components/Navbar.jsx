import { Link, useLocation} from "react-router-dom";
import  { useState } from "react";
import { RiTodoLine } from "react-icons/ri";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiMenu } from "react-icons/fi";


function Navbar() {
  const [isShrunk, setIsShrunk] = useState(false);
  const location = useLocation();

  const toggleNavbar = () => {
    setIsShrunk((prevState) => !prevState);
  };

  return (
    <div className={`navbar ${isShrunk ? "shrunk" : ""}`}>
      <div className="header">
        {!isShrunk && <h3 className="menu-title">Menu</h3>}
        <button className="toggle-btn" onClick={toggleNavbar}>
          <FiMenu />
        </button>
      </div>

      <div className="links">
        <Link to="/" className={`link ${location.pathname === "/" ? "active" : ""}`}>
          {" "}
          <div className="link-content">
            <span className="icon">
              <RiTodoLine />
            </span>
            {!isShrunk && <span className="text">Tasks</span>}
          </div>
        </Link>

        <Link to="/completed" className={`link ${location.pathname== "/completed" ? "active" : ""}`}>
          <div className="link-content">
            <span className="icon">
              <IoMdCheckmarkCircleOutline />
            </span>
            {!isShrunk && <span className="text">Completed</span>}
          </div>
        </Link>

        <Link to="/deleted" className={`link ${location.pathname === "/deleted" ? "active" : ""}`}>
          <div className="link-content">
            <span className="icon">
              <RiDeleteBin6Line />
            </span>
            {!isShrunk && <span className="text">Deleted</span>}
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
