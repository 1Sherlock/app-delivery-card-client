/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

import PerfectScrollbar from "perfect-scrollbar";
import {Link, Route, Switch, useLocation} from "react-router-dom";

import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import {TOKEN_NAME} from "../tools/constants";

var ps;

function Dashboard(props) {
  const mainPanel = React.useRef();
  const location = useLocation();
  // let time;
  React.useEffect(() => {
    // clearTimeout(time);
    // time = setTimeout(() => {
    //   if (window.location.pathname !== "/login") {
    //     window.location.href = "/login";
    //   }
    // }, 5000)
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    if (localStorage.getItem(TOKEN_NAME)){
      mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }, [location]);

  return (
    localStorage.getItem(TOKEN_NAME) ?

        <div className="wrapper">
          <Sidebar
              {...props}
              routes={routes}
              bgColor="black"
              activeColor="info"
          />
          <div className="main-panel" ref={mainPanel}>
            <DemoNavbar {...props} />
            <Switch>
              {routes.map((prop, key) => {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
              })}
            </Switch>
          </div>
        </div>
        :
        <div className="text-center py-5">
      <h3>404 Not Found</h3>
          <Link to="/login">Go Login</Link>
        </div>
  )

}

export default Dashboard;
