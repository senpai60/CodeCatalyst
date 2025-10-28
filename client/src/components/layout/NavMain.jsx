import { FaUser } from "react-icons/fa";
import { BsGearFill } from "react-icons/bs";
import { BsList } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { AiFillHome } from "react-icons/ai";
import { useGSAP } from "@gsap/react";
import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import gsap from "gsap";
import RightSectionTop from "./RightSectionTop";
import RightSectionBot from "./RightSectionBot";

const navMainLinks = [
  { to: "/", text: <AiFillHome /> },
  { to: "/settings", text: <BsGearFill /> },
  { to: "/profile", text: <FaUser /> },
];

function NavMain() {
  const [leftVisible, setLeftVisible] = useState(false);
  const rightSectionRef = useRef(null);

  useGSAP(() => {
    if (!rightSectionRef.current) return;
    if (leftVisible) {
      gsap.to(rightSectionRef.current, {
        left: "0%",
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(rightSectionRef.current, {
        left: "-105%",
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [leftVisible]);

  useGSAP(() => {
    if (rightSectionRef.current) {
      gsap.set(rightSectionRef.current, { left: "-105%" });
    }
  }, []);

  // Close mobile menu when a link is clicked
  const handleLinkClick = () => {
    setLeftVisible(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="big-nav w-full px-5 md:py-1 flex items-center justify-between rounded-2xl">
        <div className="logo">
          <h1>
            Code <span className="text-orange-600">Catalyst</span>
          </h1>
        </div>
        <div className="nav-links hidden md:hidden lg:flex items-center gap-4">
          {navMainLinks.map((link, linkIndex) => (
            <NavLink
              key={linkIndex}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center justify-center w-12 h-12 rounded-xl transition-colors duration-200 ease-in-out text-2xl
                  ${isActive ? "text-orange-600 bg-zinc-900" : "text-gray-400 hover:text-orange-600"}`
              }
              style={{ transition: "color 0.3s, background 0.3s" }}
            >
              {link.text}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="w-full lg:hidden flex justify-between px-5 py-2">
        <div className="nav-icon cursor-pointer">
          <BsList size={24} onClick={() => setLeftVisible(true)} />
        </div>
        <div className="nav-links flex items-center gap-2 capitalize">
          {navMainLinks.map((link, linkIndex) => (
            <div key={linkIndex} className="relative flex items-center group">
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `px-2 py-2 relative z-20 transition-colors duration-200 ease-in-out text-2xl
                  ${isActive ? "text-orange-600" : "group-hover:text-zinc-950"}`
                }
              >
                {link.text}
              </NavLink>
              <span className="absolute left-0 bottom-0 h-0 w-full bg-orange-600 rounded group-hover:h-full transition-all duration-300 ease-in-out z-10 pointer-events-none" />
            </div>
          ))}
        </div>
      </nav>

      {/* Mobile Sidebar Menu */}
      <div 
        ref={rightSectionRef}
        className="right-section-mobile w-full h-screen fixed bg-zinc-950 top-0 flex flex-col"
        style={{ zIndex: 999 }}
      >
        <CgClose
          className="absolute right-4 top-4 text-orange-600 cursor-pointer hover:text-orange-500 transition-colors"
          size={30}
          onClick={() => setLeftVisible(false)}
        />
        {/* Mobile Menu Links (unchanged - keep as previous version if you use one) */}
        <div className="right-main flex-1 w-full flex flex-col gap-2">
          <RightSectionTop />
          <RightSectionBot />
        </div>
      </div>
    </>
  );
}

export default NavMain;
