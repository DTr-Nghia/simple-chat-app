import React from "react"
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import Login from "./component/Login"
import SignUp from "./component/Signup"
import ForgotPassword from "./component/Forgot-password"
import Chat from "./component/Chat"
import { AuthProvider } from './context/Auth_context';
function App() {
  return (
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/chat" component={Chat}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/forgotpassword" component={ForgotPassword}/>
            <Route path="/" component={Login}/>
          </Switch>
        </AuthProvider>
      </Router>
  );
}

export default App;
