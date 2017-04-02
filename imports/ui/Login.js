import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Link } from 'react-router';


export default class Login extends React.Component {

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
    Meteor.loginWithPassword({email},password, (err)=>{
      if(err){
        this.setState({error:'Unable to loging.Check email and password'});
      }
      else{
        this.setState({error:''});
      }
    })


  }
  render(){
    return (
<div className = "boxed-view">
    <div className = "boxed-view__box">
      <h1> Short Lnk Login</h1>
      <p>{this.state.count} </p>
      {this.state.error? <p> {this.state.error}</p> : undefined}

      <form className = "boxed-view__form" onSubmit = {this.onSubmit.bind(this)}>
        <input type = "email" ref = "email" name = "email" placeholder = "E-mail"/>
        <input type = "password" ref = "password" name = "password" placeholder = "Password"/>
        <button className ="button"> Login</button>
      </form>
      <Link to = "/signup">Need an account?</Link>
    </div>
</div>

);
  }
}
