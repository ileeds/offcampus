import actionTypes from "../constants/actionTypes";

function homeReceived(home) {
  return { type: actionTypes.HOME_RECEIVED, home: home };
}

function homesReceived(homes) {
  return { type: actionTypes.HOMES_RECEIVED, homes: homes };
}

function homeLoading() {
  return { type: actionTypes.HOME_LOADING };
}

export function fetchHomes(fakeHomes) {
  return dispatch => {
    return fetch(`/homes`)
      .then(response => response.json())
      .then(data => dispatch(homesReceived(data.data)))
      .catch(e => console.log(e));
  };
}

export function fetchHome(id) {
  return dispatch => {
    dispatch(homeLoading());
    return fetch(`/homes/${id}`)
      .then(response => response.json())
      .then(data => dispatch(homeReceived(data.data)))
      .catch(e => console.log(e));
  };
}

export function postHome(data) {
  const token = localStorage.getItem("token") || null;

  return dispatch => {
    return fetch("/homes/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data),
      mode: "cors"
    }).catch(e => console.log(e));
  };
}
