import React from 'react';
import {Link } from 'react-router';
import {Accounts } from 'meteor/accounts-base';

export default class SignUp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      error:''
    };
  }
  onSubmit(e){
    e.preventDefault();
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    if(password.length < 9){
      return this.setState({error:'Password must be more than 8 characters'})
    }

    Accounts.createUser({email: email, password: password}, (err)=>{
if(err){
  this.setState({error:err.reason});
}else{
  this.setState({error:''});
}
    });

  }
  render(){
    return (
<div class = "boxed-view">
      <div class = "boxed-view__box">
        <h1> Join Short Lnk</h1>

        <p>{this.state.count} </p>
{this.state.error? <p> {this.state.error}</p> : undefined}

        <form onSubmit = {this.onSubmit.bind(this)} noValidate>
          <input type = "email" ref = "email" name = "email" placeholder = "E-mail"/>
          <input type = "password" ref = "password" name = "password" placeholder = "Password"/>
          <button class = "button"> Create Account</button>
        </form>
        <Link to = "/">Have an account?</Link>
      </div>
</div>
    )
  }
}
