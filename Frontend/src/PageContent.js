import React, { Fragment } from "react";
import axios from "axios";

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  get_tasks = () => {
    axios
      .get("http://127.0.0.1:5000/get_tasks", {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
      })
      .then(res => {
        this.setState({
          data: res.data
        });
        return res.data
        // console.log(res.data, "some data");
      }).catch(
          err=> err
      )
  };

  componentDidMount(){
      this.get_tasks()
  }

  render() {
    console.log(this.state.data, "some data");
    return (
      <Fragment>
        <table className="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Description</th>
              <th scope="col">State</th>
              <th scope="col">Created by</th>
            </tr>
          </thead>
          <tbody>
              {this.state.data.map(item =>(

                  <tr key={item.id}>
                  <input type="checkbox"/>
                  <td>{item.description}</td>
                  <td>{item.state}</td>
                  <td>{item.user}</td>
                </tr>
              ))
            
            }
          </tbody>
        </table>
      </Fragment>
    );
  }
}

export default Content;
