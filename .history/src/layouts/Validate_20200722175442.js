import React, { Component } from 'react';

class Validate extends Component {
  state = {
    readyToRedirect: false,
    shop_id:''
  }
  
  async componentDidMount() {
    api.get('/auth/success')
    // fetch("https://api.couponfeed.co/auth/success", {
    //   // fetch("http://localhost:3000/login/success", {
    //   method: "GET",
    //   // credentials: "include",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Credentials": true
    //   }
    // })
      .then(response => {
        console.log(response)
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        // this.setState({
        // authenticated: true,
         // user: responseJson.data.login
        // });
        console.log(responseJson);
        const { name, id, tu } = responseJson.data.login;
        login(responseJson.data.token, name, id, tu);
        getUser() === 'customer' ? this.props.history.push("/customer") : this.props.history.push("/retail");
        // getUser() === 'customer' ? this.props.history.push("/customer") : this.props.history.push("/retail");
      })
      .catch(error => {
        this.setState({
          // authenticated: false,
          error: "Failed to authenticate user"
        });
      });
    }
    render() {
      if (!this.state.readyToRedirect){
          return <CircularProgress />
      }
      else{
        return <Redirect
            to={`/feed/${this.state.shop_id}`}
            />;
      }
      
    }
}

export default Validate;