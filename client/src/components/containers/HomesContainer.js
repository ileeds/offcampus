import React, { Component } from "react";
import Home from "../presentation/Home";
import { connect } from "react-redux";
import { fetchHomes } from "../../actions/homeActions";

class HomesContainer extends Component {
  componentDidMount() {
    this.props.dispatch(fetchHomes());
  }

  render() {
    const homeItems = this.props.homes.map((home, i) => {
      return (
        <li key={i}>
          <Home data={home} />
        </li>
      );
    });
    return (
      <div>
        <h2>Available Homes</h2>
        <ul>
          {this.props.homes.length > 0 ? (
            <ul>{homeItems}</ul>
          ) : (
            <div>No homes currently available</div>
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { homes: state.homes.homes };
};

export default connect(mapStateToProps)(HomesContainer);
