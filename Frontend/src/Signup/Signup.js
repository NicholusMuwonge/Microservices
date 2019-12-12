import React from "react";
import axios from "axios";
import { Inputfields } from "../Login/Login";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
      password2: "",
      emailerror: false,
      passworderror: false,
      data: "",
      loading: false
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
    if (3 > this.state.password.length > 12) {
      this.setState({ passworderror: true });
    }
    this.setState({ loading: true });
    axios
      .post("http://127.0.0.1:5001/signup", {
        email: this.state.email,
        password: this.state.password,
        username: this.state.username
      })
      .then(() => {
        this.props.history.push("/login");
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">Todo App</div>
          <form className="login-form">
            <Inputfields
              type="text"
              id="username"
              className="fadeIn second"
              name="username"
              placeholder="username"
              onChange={e => this.handleChange(e)}
              value={this.state.username}
              required
            />
            <Inputfields
              type="text"
              id="email"
              className="fadeIn third"
              name="email"
              placeholder="email"
              onChange={e => this.handleChange(e)}
              value={this.state.email}
              required
            />
            <Inputfields
              type="password"
              id="password"
              className="fadeIn third"
              name="password"
              placeholder="password"
              onChange={e => this.handleChange(e)}
              value={this.state.password}
              required
            />
            <Inputfields
              type="password"
              id="password"
              className="fadeIn third"
              name="password"
              placeholder="confrim password"
              onChange={e => this.handleChange(e)}
              value={this.state.password2}
              required
            />
            <input
              type="submit"
              className="fadeIn fourth"
              onClick={e => this.handleSubmit(e)}
              value="Signup"
            />
            <p>
              Have an account <a href="/login">login</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
