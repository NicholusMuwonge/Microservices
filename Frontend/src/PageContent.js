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
      })
      .catch(err => err);
  }

 
  render() {
    return (
      <Fragment>
        
        {sessionStorage.getItem("token") !== null ? (
          this.state.container?
          <React.Fragment>
          <a className="btn btn-success" href="/create-task"> Add new Task</a><br/>
          <h2>Tasks</h2>
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
          </table>
          </React.Fragment>:
          <h1 style={{marginLeft:"40%", marginTop:"20%"}}>Loading ....</h1>
        ) : (
          <h3 style={{marginLeft:"40%", marginTop:"20%", color:"grey"}}>Welcome to the TodoApp</h3>
        )}
      </Fragment>
    );
  }
}

export default Content;
