import React, { Component } from 'react'
// import { makeStyles } from "@material-ui/core/styles";

// import FacebookLogin from 'react-facebook-login'
// import GoogleLogin from 'react-google-login';
// import api from '../../services/api'
// import { login, getUser } from "../../services/auth";

// import {TiSocialFacebookCircular} from 'react-icons/ti';
// import styles from '../../assets/jss/material-kit-react/views/componentsSections/navbarsStyle'
// const useStyles = makeStyles(styles);
import {FacebookLoginButton} from './button'

export default class LoginFacebook extends Component {
  // state = {
  //   auth: false,
  //   login: '',
  //   picture: ''
  // }

  responseFacebook = (response) => {
    console.log(response);
  }

  responseGoogle = (response) => {
    console.log(response);
  }
   componentClicked =  () => {
    // await api.post(`/a/facebook`)
    window.open("https://api.couponfeed.co/auth/facebook", "_self");
    // window.open("http://localhost:3000/auth/facebook", "_self");
    // console.log("clicked")
  }
  render() {
    let facebookData;
    // this.state.authenticated ?
      // facebookData = (
      //   <div>
      //     Ola {this.state.authenticated}
      //   </div>
      // ) :
      facebookData = (<>
        {/* <FacebookLogin
          textButton="Login com Facebook"
          appId="307286726964664"
          autoLoad={true}
          fields="name,email"
          // icon={<TiSocialFacebookCircular />}
          render={renderProps => (
            <button onClick={renderProps.onClick} 
            style={{width:'100%'}}
            >This is my custom Facebook button</button>
          )}
          onClick={this.componentClicked}
          callback={this.responseFacebook} /> */}
          <ul>
            <FacebookLoginButton/>
          <li onClick={this.componentClicked}>Login</li>
          </ul>
        {/* <GoogleLogin
          clientId="696384323916-spmu7mjsuge1a55dh2v65dtke3jgvjb6.apps.googleusercontent.com"
          buttonText="Login com Google"
          style={{width: "50%"}} 
          onSuccess={this.componentClicked}
          onFailure={this.responseGoogle}
          cookiePolicy={'single_host_origin'}
        /> */}
        </>
      )
    return (
      <div>
        {facebookData}
      </div>
    )
  }
}
