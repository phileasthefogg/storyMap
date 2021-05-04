import { combineReducers } from "redux";
// import userReducer, { ICurrentUserReducerState } from "./userReducer";
import placeReducer, { IPlaceReducerState } from "./placeReducer";

export interface IStore {
  // currentUser: ICurrentUserReducerState;
  place: IPlaceReducerState;
}

const rootReducer = combineReducers({
  // currentUser: userReducer,
  place: placeReducer,
});

// export const currentUserSelector = (state: IStore) => state.currentUser;
export const placeSelector = (state: IStore) => state.place;

export default rootReducer;
