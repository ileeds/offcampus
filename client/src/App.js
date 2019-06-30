import React, { Component } from "react";
import "./App.css";
import { Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./stores/store";
import Welcome from "./components/layouts/Welcome";
import About from "./components/layouts/About";
import Layout from "./components/layouts/Layout";
import HomeDetailedContainer from "./components/containers/HomeDetailedContainer";
import PostHomeFormContainer from "./components/containers/PostHomeFormContainer";
import AuthenticationContainer from "./components/containers/AuthenticationContainer";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Route exact path="/" component={Welcome} />
            <Route path="/about" component={About} />
            <Route path="/homes/:id" component={HomeDetailedContainer} />
            <Route path="/submit" component={PostHomeFormContainer} />
            <Route path="/user" component={AuthenticationContainer} />
          </Layout>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
