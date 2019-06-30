import React, { Component } from "react";
import { connect } from "react-redux";
import { postHome } from "../../actions/homeActions";
import { withRouter } from "react-router-dom";

class PostHomeFormContainer extends Component {
  constructor() {
    super();

    this.state = {
      submission: {}
    };
  }

  componentDidMount() {}

  updateForm(event) {
    let updatedForm = Object.assign({}, this.state.submission);

    updatedForm[event.target.id] = event.target.value;
    this.setState({ submission: updatedForm });
  }

  submitForm() {
    this.props.dispatch(postHome(this.state.submission));
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        Title
        <input
          onChange={this.updateForm.bind(this)}
          id="title"
          type="text"
          placeholder="Title"
        />
        <br />
        Address
        <input
          onChange={this.updateForm.bind(this)}
          id="address"
          type="text"
          placeholder="Address"
        />
        <br />
        Description
        <br />
        <textarea
          onChange={this.updateForm.bind(this)}
          id="description"
          type="text"
        />
        <br />
        <button onClick={this.submitForm.bind(this)}>Submit story</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default withRouter(connect(mapStateToProps)(PostHomeFormContainer));
