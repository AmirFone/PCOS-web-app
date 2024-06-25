import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  NavbarToggler,
  NavItem,
  NavLink,
  Container,
  Collapse,
  Button
} from "reactstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
// Import Logo
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";

import ScrollspyNav from "./Scrollspy";

const NavbarPage = (props) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { id: 1, idnm: "home", navheading: "Home" },
    { id: 2, idnm: "features", navheading: "Features" },
    { id: 3, idnm: "success", navheading: "Success Stories" },
    { id: 4, idnm: "resources", navheading: "PCOS Resources" },
    { id: 5, idnm: "contact", navheading: "Contact Us" },
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

  let targetId = props.navItems.map((item) => item.idnm);

  return (
    <React.Fragment>
      <Navbar
        expand="lg"
        fixed={props.top === true ? "top" : ""}
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
                src={props.imglight === true ? logolight : logodark}
                alt="logo"
                height="80"
              />
            </Link>
          </motion.div>
          <NavbarToggler onClick={toggle}>
            <span className="navbar-toggler-icon"></span>
          </NavbarToggler>
          <Collapse isOpen={isOpenMenu} navbar id="navbarCollapse">
            <ScrollspyNav
              scrollTargetIds={targetId}
              scrollDuration="800"
              headerBackground="true"
              activeNavClass="active"
              className="navbar-collapse"
            >
              <Nav className="navbar-nav ms-auto" id="navbar-navlist">
                {props.navItems.map((item, key) => (
                  <motion.div
                    key={key}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <NavItem
                      className={item.navheading === "Home" ? "active" : ""}
                    >
                      <NavLink
                        className={item.navheading === "Home" ? "active" : ""}
                        href={"#" + item.idnm}
                      >
                        {item.navheading}
                      </NavLink>
                    </NavItem>
                  </motion.div>
                ))}
              </Nav>
            </ScrollspyNav>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button color="primary" className="rounded-pill">
                Sign up
              </Button>
            </motion.div>
            {/* <ul className="list-inline menu-social-icon mb-0 ps-3">
              {[
                { icon: FaFacebookF, link: "#" },
                { icon: FaTwitter, link: "#" },
                { icon: FaInstagram, link: "#" },
                { icon: FaLinkedinIn, link: "#" },
              ].map((social, index) => (
                <motion.li
                  key={index}
                  className="list-inline-item"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link to={social.link} className="menu-social-link">
                    <social.icon className="icon-xs" />
                  </Link>
                </motion.li>
              ))}
            </ul> */}
          </Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
};

export default NavbarPage;