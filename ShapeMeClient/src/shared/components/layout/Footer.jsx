import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left p-0 m-0">
      <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
        © 2023 Shape Me:
        <Link
          className="text-neutral-800 dark:text-neutral-400"
          to={"/contactUs"}
        >
          <span> Contact Us</span>
        </Link>
      </div>
    </footer>
  )
}

export default Footer;
