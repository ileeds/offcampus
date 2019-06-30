import constants from "../constants/actionTypes";

var initialState = {
  loading: true,
  registration: false
};

export default (state = initialState, action) => {
  var updated = Object.assign({}, state);

  switch (action.type) {
    case constants.REGISTRATION_LANDING:
      updated["registration"] = action.landed;
      updated["loading"] = false;
      return updated;

    default:
      return state;
  }
};
