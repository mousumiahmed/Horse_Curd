import React from 'react';
import Login from "./components/Login.js";
import Dashboard from "./components/Dashboard.js";
import Logout from "./components/Logout.js";
import Edit from "./components/Edit.js";
import BackButton from "./components/BackButton.js";
import './App.css';
import {Route,Link,Switch} from 'react-router-dom'




export default class App extends React.Component{
  constructor(props){
    super(props)
    this.state={

    }
  }
  render(){
    return(
      <div>
        <Link to="/"/>
      <Switch>
         <Route exact path="/" component={Login} />
         <Route path="/dashboard" component={Dashboard}/>
         <Route path="/logout" component={Logout}/> 
         <Route path="/back" component={BackButton}/>
         <Route path ={`/edit:id`} component = {Edit} />
      </Switch>
      </div>
    )
  }
}
