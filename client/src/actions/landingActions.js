import actionTypes from "../constants/actionTypes";
import localStorageKeys from "../constants/localStorageKeys";

function registrationLanded(landed) {
  return { type: actionTypes.REGISTRATION_LANDING, landed: landed };
}

export function registrationLanding() {
  const landed = localStorage.getItem(localStorageKeys.REGISTRATION_LANDING);
  return registrationLanded(landed);
}
