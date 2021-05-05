import { combineReducers } from "redux";
// import userReducer, { ICurrentUserReducerState } from "./userReducer";
import placeReducer, { IPlaceReducerState } from "./placeReducer";
import mapReducer, { IMapReducerState } from "./mapReducer";

export interface IStore {
  // currentUser: ICurrentUserReducerState;
  place: IPlaceReducerState;
  map: IMapReducerState;
}

const rootReducer = combineReducers({
  // currentUser: userReducer,
  place: placeReducer,
  map: mapReducer,
});

// export const currentUserSelector = (state: IStore) => state.currentUser;
export const placeSelector = (state: IStore) => state.place;
export const mapSelector = (state: IStore) => state.map;

export default rootReducer;
