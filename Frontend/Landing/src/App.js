import React, { Component, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import routes from "./routes";
import { AuthProvider } from './context/AuthContext';

import Navbar from "./component/Navbar/NavBar";
import Footer from "./component/Footer/Footer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navClass: "navbar-light",
      imglight: false
    };
  }

  render() {
    return (
      <React.Fragment>
        <AuthProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Navbar 
              navClass={this.state.navClass}
              imglight={this.state.imglight}
            />
            <Routes>
              {routes.map((route, idx) => (
                <Route path={route.path} element={route.component} key={idx} />
              ))}
            </Routes>
            <Footer />
          </Suspense>
        </AuthProvider>
      </React.Fragment>
    );
  }
}

export default App;