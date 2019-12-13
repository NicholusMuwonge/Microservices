import React, { Fragment } from "react";
import axios from "axios";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      container: ""
    };
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:5001/users/", {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
      })
      .then(res => {
        this.setState({
          container: res.data
        });
      })
      .catch(err => err);
  }

 
  render() {
    return (
      <Fragment>
        <h2>Users</h2>
        {sessionStorage.getItem("token") !== null ? (
          this.state.container?
          <table className="table">
            <thead>
              <tr>
                <th scope="col" style={{marginLeft:"3px"}}>#</th>
                <th scope="col">id</th>
                <th scope="col">Username</th>
                
              </tr>
            </thead>
            <tbody>
              {Object.values(this.state.container).map((item) =>
                Object.values(item).map((el) => (
                  <tr id={el["id"]}>
                    <input type="checkbox" id={el["id"]}/>
                    <td>{el.id}</td>
                    <td>{el.username}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>:
          <h1 style={{marginLeft:"40%", marginTop:"20%"}}>Loading ....</h1>
        ) : (
          <p style={{marginLeft:"20%", marginTop:"20%"}}>Please Login</p>
        )}
      </Fragment>
    );
  }
}

export default User;
