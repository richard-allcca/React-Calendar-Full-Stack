import React from "react";

const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-primary mb-4">
      <span className="navbar-brand">Richard</span>

      <button className="btn btn-outline-danger">
        <i className="fas fa-sign-out-alt"></i>
        <span> Salir</span>
      </button>
    </div>
  );
};

export default Navbar;
