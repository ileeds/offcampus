import React, { Component } from "react";
import HomesContainer from "../containers/HomesContainer";

class Welcome extends Component {
  render() {
    return (
      <div>
        <div>Welcome to OffCampus.com</div>
        <div>
          <HomesContainer />
        </div>
      </div>
    );
  }
}

export default Welcome;
