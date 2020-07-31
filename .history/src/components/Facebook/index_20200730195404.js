import React, { Component } from 'react'


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 300,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));

export default class LoginFacebook extends Component {
  // state = {
  //   auth: false,
  //   login: '',
  //   picture: ''
  // }

  
  render() {
    let facebookData;
    // this.state.authenticated ?
      // facebookData = (
      //   <div>
      //     Ola {this.state.authenticated}
      //   </div>
      // ) :
      facebookData = (<>
        {/* { */}
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
          callback={this.responseFacebook} />  */}
          {/* } */}
          <ul>
            {/* <FacebookLoginButton/> */}
          <li onClick={this.componentFacebookClicked}>Login com Facebook</li>
          <li onClick={this.componentGoogleClicked}>Login com Google</li>
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
