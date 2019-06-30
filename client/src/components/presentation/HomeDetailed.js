import React, { Component } from "react";
import PropTypes from "prop-types";

class HomeDetailed extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.data.title}</h2>
        <p>{this.props.data.description}</p>
      </div>
    );
  }
}

HomeDetailed.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })
};

export default HomeDetailed;
