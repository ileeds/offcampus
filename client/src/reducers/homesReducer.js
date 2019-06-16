import constants from '../constants/actionTypes'

var initialState = {
  homes: [],
  home: {},
  homeLoading: true
}

export default(state = initialState, action) => {

  var updated = Object.assign({}, state)

  switch (action.type) {

    case constants.HOMES_RECEIVED:
      updated['homes'] = action.homes
      return updated

    case constants.HOME_RECEIVED:
      updated['home'] = action.home
      updated['homeLoading'] = false;
      return updated

    case constants.HOME_LOADING:
      updated['homeLoading'] = true;
      return updated

    default:
      return state
  }
}
