import actionTypes from "../constants/actionTypes";
import localStorageKeys from "../constants/localStorageKeys";

function userLoggedIn(email) {
  return { type: actionTypes.USER_LOGGEDIN, email: email };
}

function userRegistered(email) {
  return { type: actionTypes.USER_REGISTERED, email: email };
}

function logout() {
  return { type: actionTypes.USER_LOGOUT };
}

export function submitLogin(data) {
  return dispatch => {
    return fetch(`/user/${data.email}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
      mode: "cors"
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        localStorage.setItem("email", data.data.email);
        localStorage.setItem("token", data.data.tokenID);

        dispatch(userLoggedIn(data.data.email));
      })
      .catch(e => console.log(e));
  };
}

export function submitRegister(data) {
  return dispatch => {
    return fetch("/user/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
      mode: "cors"
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        localStorage.setItem("email", data.data.email);
        localStorage.setItem("token", data.data.tokenID);
        localStorage.setItem(localStorageKeys.REGISTRATION_LANDING, true);

        dispatch(userRegistered(data.data.email));
      })
      .catch(e => console.log(e));
  };
}

export function logoutUser() {
  return dispatch => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    dispatch(logout());
  };
}
