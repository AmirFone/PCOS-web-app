import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  NavbarToggler,
  NavItem,
  Container,
  Collapse,
  Button
} from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from '../../context/AuthContext';

// Import Logo
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";

const NavbarPage = (props) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser } = useAuth();
  const location = useLocation();

  const navItems = [
    { id: 1, idnm: "home", navheading: "Home", path: "/" },
    { id: 2, idnm: "features", navheading: "Features", path: "/#features" },
    // { id: 3, idnm: "success", navheading: "Success Stories", path: "/#success" },
    { id: 4, idnm: "resources", navheading: "PCOS Resources", path: "/#resources" },
    { id: 5, idnm: "contact", navheading: "Contact Us", path: "/#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggle = () => setIsOpenMenu(!isOpenMenu);

  const handleNavClick = (e, path) => {
    e.preventDefault();
    if (path.startsWith("/#")) {
      const element = document.getElementById(path.substring(2));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = path;
    }
  };

  return (
    <React.Fragment>
      <Navbar
        expand="lg"
        fixed="top"
        className={`${props.navClass} ${
          scrolled ? "navbar-scrolled" : ""
        } fixed-top navbar-custom sticky align-items-center`}
        id="navbar"
      >
        <Container>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link className="navbar-brand" to="/">
              <img
                src={props.imglight ? logolight : logodark}
                alt="logo"
                height="80"
              />
            </Link>
          </motion.div>
          <NavbarToggler onClick={toggle}>
            <span className="navbar-toggler-icon"></span>
          </NavbarToggler>
          <Collapse isOpen={isOpenMenu} navbar id="navbarCollapse">
            <Nav className="navbar-nav ms-auto" id="navbar-navlist">
              {navItems.map((item, key) => (
                <motion.div
                  key={key}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NavItem className={location.pathname === item.path ? "active" : ""}>
                    <Link to={item.path} className="nav-link" onClick={(e) => handleNavClick(e, item.path)}>
                      {item.navheading}
                    </Link>
                  </NavItem>
                </motion.div>
              ))}
            </Nav>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {currentUser ? (
                <Link to="/profile">
                  <Button color="primary" className="rounded-pill">
                    Profile
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button color="primary" className="rounded-pill">
                    Sign up
                  </Button>
                </Link>
              )}
            </motion.div>
          </Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
};

export default NavbarPage;