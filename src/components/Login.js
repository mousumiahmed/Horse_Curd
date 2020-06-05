import React from 'react';
import axios from "axios";
import {Redirect} from 'react-router-dom';

export default class Login extends React.Component {
    constructor() {
      super();
      this.state = {
        fields: {},
        errors: {},
        login:false
      }

      this.handleChange = this.handleChange.bind(this);
      this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

    };

    handleChange(e) {
      let fields = this.state.fields;
      fields[e.target.name] = e.target.value;
      this.setState({
        fields
      });
    }

    submituserRegistrationForm(e) {
      //console.log(this.validateForm());
      e.preventDefault();
      if (this.validateForm()) {
          //console.log(this.state);
          this.setState({fields:this.state.fields});
         // console.log(this.state.fields);
         axios({
            method: "post",
            url: `http://dev.api.staller.show/v1/users/login`,
            data: this.state.fields
          })
            .then(response => {
                console.log(response)
             //console.log(response.data.data.access_token);
              if (response.data.data.access_token) {
                  localStorage.setItem("token", response.data.data.access_token )
                this.setState({ login:true });
              } else {
                //alert(response.data.message);
              }
            })
            .catch(err => alert(err));
        }
      }

    

    validateForm() {
      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

      if (!fields["email"]) {
        formIsValid = false;
        errors["email"] = "*Please enter your email-ID.";
      }

      if (typeof fields["email"] !== "undefined") {
        //regular expression for email validation
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(fields["email"])) {
          formIsValid = false;
          errors["email"] = "*Please enter valid email-ID.";
        }
      }

      if (!fields["password"]) {
        formIsValid = false;
        errors["password"] = "*Please enter your password.";
      }

      this.setState({
        errors: errors
      });
      return formIsValid;
    }



  render() {

      if(this.state.login){
          return <Redirect to="/dashboard"/>
      }

    return (
          <div id="main-registration-container">
            <h2 style={{textAlign:"center",marginTop:"50px"}}>Pls Login !!!</h2>
          <div id="register">
              <div><i class="fa fa-user icon"></i></div>
              <form  onSubmit= {this.submituserRegistrationForm} >
              <label>Email ID:</label>
              <input type="text" name="email" placeholder="Enter Email" value={this.state.fields.email} onChange={this.handleChange}  />
              <div className="errorMsg">{this.state.errors.email}</div>
              <label>Password</label>
              <input type="password" name="password" placeholder="password in Sha512 hash" value={this.state.fields.password} onChange={this.handleChange} />
              <div className="errorMsg">{this.state.errors.password}</div>
              <input type="submit" className="button"  value="Login"/>
              </form>
          </div>
        </div>

      );
  }
}