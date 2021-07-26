import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import "assets/scss/new.scss";

import AdminLayout from "layouts/Admin.js";
function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Redirect to="/admin/dashboard" />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
