export type TMapAction =
  | { type: "SET_FOCUS_IND"; payload: number }
  | { type: "SET_LIST_VISIBILITY"; payload: boolean }
  | { type: "SET_LIST_EXPAND"; payload: boolean };

export interface IMapReducerState {
  focusIndex: number;
  listVisible: boolean;
  listExpanded: boolean;
}

const initialState = {
  focusIndex: 0,
  listVisible: true,
  listExpanded: false,
};

const mapReducer = (
  state: IMapReducerState = initialState,
  action: TMapAction
) => {
  switch (action.type) {
    case "SET_FOCUS_IND":
      return { ...state, focusIndex: action.payload };
    case "SET_LIST_VISIBILITY":
      return { ...state, listVisible: action.payload };
    case "SET_LIST_EXPAND":
      return { ...state, listExpanded: action.payload };
    default:
      return state;
  }
};

export default mapReducer;
