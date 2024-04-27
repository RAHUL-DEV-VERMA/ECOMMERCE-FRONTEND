import { useState } from "react";
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

interface PropsType {
  user: User | null;
}

const Header = ({ user }: PropsType) => {
  const [isOpen, setIsopen] = useState<boolean>(false);

  const logoutHandler = async() => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully");
      setIsopen(false)
    } catch (error) {
      toast.error("Sign Out Fail")
    }
  };

  return (
    <nav className="header">
      <Link onClick={() => setIsopen(false)} to={"/"}>
        HOME
      </Link>
      <Link onClick={() => setIsopen(false)} to={"/search"}>
        <FaSearch />
      </Link>
      <Link onClick={() => setIsopen(false)} to={"/cart"}>
        <FaShoppingBag />
      </Link>

      {user?._id ? (
        <>
          <button onClick={() => setIsopen((prev) => !prev)}>
            <FaUser />
          </button>
          <dialog open={isOpen}>
            <div>
              {user.role === "admin" && (
                <Link onClick={() => setIsopen(false)} to="/admin/dashboard">
                  Admin
                </Link>
              )}

              <Link onClick={() => setIsopen(false)} to="/orders">
                Orders{" "}
              </Link>
              <button onClick={logoutHandler}>
                <FaSignOutAlt />
              </button>
            </div>
          </dialog>
        </>
      ) : (
        <Link to={"/login"}>
          <FaSignInAlt />
        </Link>
      )}
    </nav>
  );
};

export default Header;

