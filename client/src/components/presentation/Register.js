import React, { Component } from "react";
import { compose } from "redux";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { submitRegister } from "../../actions/authActions";
import renderTextField from "../render/textField";

const theme = createMuiTheme();
const styles = {
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
};

class Register extends Component {
  register = formProps => {
    this.props.submitRegister(formProps);
  };

  render() {
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form
            onSubmit={this.props.handleSubmit(this.register)}
            className={classes.form}
            noValidate
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field
                  name="firstName"
                  label="First Name"
                  autoComplete="fname"
                  autoFocus
                  component={renderTextField}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="lastName"
                  label="Last Name"
                  autoComplete="lname"
                  component={renderTextField}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="email"
                  label="Email Address"
                  autoComplete="email"
                  component={renderTextField}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="password"
                  label="Password"
                  autoComplete="current-password"
                  component={renderTextField}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <div onClick={() => this.props.handleClick()}>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </div>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default compose(
  connect(
    mapStateToProps,
    { submitRegister }
  ),
  reduxForm({ form: "register" })
)(withStyles(styles)(Register));
