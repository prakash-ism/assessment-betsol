import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import SignUp from "./SignUp/SignupPage";
import Dashboard from "./Dashboard/Dashboard";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/" component={SignUp} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
