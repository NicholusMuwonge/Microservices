import React from "react";
import axios from "axios";

class CreateTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      descriptionerror: false,
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
    const description = document.getElementById("description");
    if (3 > description.value > 12) {
      this.setState({ descriptionerror: true });
    } else {
      this.setState({ loading: true });
      axios
        .post(
          "http://127.0.0.1:5000/create_task",
          {
            description: this.state.description
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
          }
        )
        .then(response => {
          this.setState({
            data: response.data
          });
          this.props.history.push("/");
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">Create task</div>
          <form
            className="login-form "
            onSubmit={e => this.handleSubmit(e)}
            action="post"
          >
            <input
              type="text"
              id="description"
              className="fadeIn second "
              name="description"
              placeholder="description"
              onChange={e => this.handleChange(e)}
              value={this.state.description}
              minlength="3"
              required="required"
            />
            <p
              style={{
                display: this.state.descriptionerror ? "show" : "none",
                color: "red"
              }}
            >
              wrong format
            </p>

            <input
              type="submit"
              className="fadeIn fourth"
              onClick={e => this.handleSubmit(e)}
              value="Create task"
            />
          </form>
          <p>
            Dont feel like creating a task now? <a href="/">Cancle</a>
          </p>
        </div>
      </div>
    );
  }
}

export default CreateTask;
