import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import "assets/scss/new.scss";

import AdminLayout from "layouts/Admin.js";
import Login from "./views/Login";
import {ToastContainer} from "react-toastify";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/admin" render={(props) => <AdminLayout {...props} />}/>
                <Route path="/login" component={Login}/>
                <Redirect to="/login"/>
            </Switch>

            <ToastContainer/>

        </BrowserRouter>
    );
}

export default App;
