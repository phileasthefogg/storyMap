import { TMarker } from "../types";

type TPlace = TMarker | null;

export type TOnboardingAction =
  | { type: "SET_PLACE_DETAIL"; payload: TPlace }
  | { type: "UPDATE_PLACES"; payload: TMarker[] };

export interface IPlaceReducerState {
  places: TMarker[];
  placeDetail: TPlace;
}

const initialState = {
  places: [],
  placeDetail: null,
};

const onboardingReducer = (
  state: IPlaceReducerState = initialState,
  action: TOnboardingAction
) => {
  switch (action.type) {
    case "SET_PLACE_DETAIL":
      return { ...state, placeDetail: action.payload };
    case "UPDATE_PLACES":
      return { ...state, places: action.payload };
    default:
      return state;
  }
};

export default onboardingReducer;
