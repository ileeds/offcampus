import React, { Component } from "react";
import HomeDetailed from "../presentation/HomeDetailed";
import { connect } from "react-redux";
import { fetchHome } from "../../actions/homeActions";

class HomeDetailedContainer extends Component {
  componentDidMount() {
    this.props.dispatch(fetchHome(this.props.match.params.id));
  }

  render() {
    return (
      <div>
        <h2>Home</h2>
        <ul>
          {!this.props.homeLoading ? (
            <HomeDetailed data={this.props.home} />
          ) : (
            <div>Loading</div>
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { home: state.homes.home, homeLoading: state.homes.homeLoading };
};

export default connect(mapStateToProps)(HomeDetailedContainer);
