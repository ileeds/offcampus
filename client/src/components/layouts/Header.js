import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const classes = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  title: {
    flexGrow: 1
  }
}));

class Header extends Component {
  handleCallToRouter = path => {
    this.props.history.push(path);
  };

  render() {
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              OffCampus
            </Typography>
            <Tabs
              value={this.props.history.location.pathname}
              onChange={(e, val) => this.handleCallToRouter(val)}
            >
              <Tab value="/" label="Home" />
              <Tab value="/about" label="About" />
              <Tab
                value="/user"
                label={this.props.loggedIn ? "Profile" : "Get Started"}
              />
            </Tabs>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { loggedIn: state.auth.loggedIn };
};

export default withRouter(connect(mapStateToProps)(Header));
