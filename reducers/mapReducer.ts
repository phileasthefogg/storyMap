export type TMapAction =
  | { type: "SET_FOCUS_IND"; payload: number }
  | { type: "SET_LIST_VISIBILITY"; payload: boolean }
  | { type: "SET_LIST_EXPAND"; payload: boolean }
  | { type: "SET_FORM_VISIBILITY"; payload: boolean }
  | { type: "SET_EDIT_STATE"; payload: boolean };

export interface IMapReducerState {
  focusIndex: number;
  listVisible: boolean;
  listExpanded: boolean;
  formVisible: boolean;
  isEditing: boolean;
}

const initialState = {
  focusIndex: 0,
  listVisible: true,
  listExpanded: false,
  formVisible: false,
  isEditing: false,
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
    case "SET_FORM_VISIBILITY":
      return { ...state, formVisible: action.payload };
    case "SET_EDIT_STATE":
      return { ...state, isEditing: action.payload };
    default:
      return state;
  }
};

export default mapReducer;
