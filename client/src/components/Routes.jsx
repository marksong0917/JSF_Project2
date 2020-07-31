import React from "react";
import { Route, Switch } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./sessions/Login";
import Logout from "./sessions/Logout";
import Datas from "./datas/Index";
import NewData from "./datas/New";
import EditData from "./datas/Edit";

function Routes({ user, setUser }) {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route
        exact
        path="/login"
        render={(RenderProps) => <Login {...RenderProps} setUser={setUser} />}
      />
      <Route
        exact
        path="/logout"
        render={(RenderProps) => <Login {...RenderProps} setUser={setUser} />}
      />
      <Route
        exact
        path="/datas"
        render={(RenderProps) => <Datas {...RenderProps} user={user} />}
      />
      <Route exact path="/datas/new" component={NewData} />
      <Route exact path="/datas/edit" component={EditData} />
    </Switch>
  );
}

export default Routes;
