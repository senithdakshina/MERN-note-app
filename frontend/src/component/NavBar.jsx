import { PlusIcon, LogOutIcon } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // redirect user to login page
  };

  return (
    <header className="bg-base-300">
      <div className="mx-auto max-w-7xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
            NoteSync
          </h1>

          <div className="flex items-center gap-4">
            {user && (
              <>
                <Link
                  to="/create"
                  className="btn btn-primary flex items-center gap-2"
                >
                  <PlusIcon className="h-5 w-5" />
                  <span>New Note</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="btn bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md flex items-center justify-center gap-2 transition-all duration-200"
                >
                  <LogOutIcon className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            )}

            {!user && (
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
