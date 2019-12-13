import React, { Fragment } from "react";
import axios from "axios";

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      container: ""
    };
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:5000/get_tasks/", {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
      })
      .then(res => {
        this.setState({
          container: res.data
        });
        // return res.data;
      })
      .catch(err => err);
  }

 
  render() {
    return (
      <Fragment>
        <h2>Tasks</h2>
        {sessionStorage.getItem("token") !== null ? (
          this.state.container?
          <table className="table">
            <thead>
              <tr>
                <th scope="col" style={{marginLeft:"3px"}}>#</th>
                <th scope="col">id</th>
                <th scope="col">Description</th>
                <th scope="col">State</th>
                <th scope="col">Created by</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(this.state.container).map((item) =>
                Object.values(item).map((el) => (
                  <tr id={el["id"]}>
                    <input type="checkbox" id={el["id"]}/>
                    <td>{el.id}</td>
                    <td>{el.description}</td>
                    <td>{el.state}</td>
                    <td>{el.user}</td>
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

export default Content;
