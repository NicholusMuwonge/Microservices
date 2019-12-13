import React from "react";
import FlashMessage from "react-flash-message";
import axios from "axios";
import "./Login.css";

export const Inputfields = props => (
  <input
    type={props.type}
    id={props.id}
    className={props.className}
    name={props.name}
    placeholder={props.placeholder}
    onChange={props.onChange}
  />
);

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailerror: false,
      passworderror: false,
      data: "",
      loading:false
    };
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    // if (3 > this.state.password.length > 12) {
    //   this.setState({ passworderror: true });
    // }
    this.setState({loading:true})
    axios
      .post("http://127.0.0.1:5001/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response =>{
        sessionStorage.setItem('token', response.data.token)
        sessionStorage.setItem('username', response.data.username)
        sessionStorage.setItem('isLoggedIn', true)
        this.props.history.push('/')
        })
      .catch(
        err => console.log(err)
        );
  };

  render() {
    console.log(this.state.data,'its moi')
    return (
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">Todo App</div>
          <form className="login-form" onSubmit={e => this.handleSubmit(e)}>
            <input
              type="email"
              id="email"
              className="fadeIn second"
              name="email"
              placeholder="email"
              onChange={e => this.handleChange(e)}
              value={this.state.email}
              required
            />
            <p style={{display:"none", color:"red"}}>wrong format</p>
            <input
              type="password"
              id="password"
              className="fadeIn third"
              name="password"
              placeholder="password"
              onChange={e => this.handleChange(e)}
              value={this.state.password}
              required
            />
            <input type="submit" className="fadeIn fourth" onClick={e => this.handleSubmit(e)} value="Log In" />
          </form>
          <p>
            Have no account <a href="/signup">Signup</a>
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
