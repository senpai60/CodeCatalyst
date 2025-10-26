import React from "react";

const navMainLinks = [
  { href: "#features", text: "features" },
  { href: "#help", text: "help" },
  { href: "#reviews", text: "reviews" },
  { href: "#get-started", text: "get started" },
];

function NavMain() {
  return (
    <>
    <nav className="big-nav w-full px-5 py-2 bg-zinc-900 flex items-center justify-between rounded-2xl">
      <div className="logo">
        <h1>
          Code <span className="text-orange-600">⓿_⓿ </span>Catalyst{" "}
        </h1>
      </div>
      <div className="nav-links hidden md:hidden lg:flex items-center gap-10 capitalize">
        {navMainLinks.map((link, linkIndex) => (
          <div
            key={linkIndex}
            className="relative flex items-center group"
          >
            <a
              className="px-3 py-2 relative z-20 transition-colors duration-200 ease-in-out group-hover:text-zinc-950"
              href={link.href}
            >
              {link.text}
            </a>
            <span className="absolute left-0 bottom-0 h-0 w-full bg-orange-600 rounded group-hover:h-full transition-all duration-300 ease-in-out z-10 pointer-events-none" />
          </div>
        ))}
      </div>
    </nav>

    <nav className="w-full lg:hidden">
        <div className="logo">
        <h1>
          Code <span className="text-orange-600">⓿_⓿ </span>Catalyst{" "}
        </h1>
      </div>
    </nav>
    </>
  );
}

export default NavMain;
