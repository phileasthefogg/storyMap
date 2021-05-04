/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  "Story Map": undefined;
  Library: undefined;
};

export type TabOneParamList = {
  Map: undefined;
  Detail: undefined;
};

export type TabTwoParamList = {
  Library: undefined;
  Detail: undefined;
};

export type TMarker = {
  title: string;
  id: number;
  coordinate: { latitude: number; longitude: number };
  subtitle?: string;
  category?: "Food" | "History" | "Culture" | "Parks";
  description: string;
  imgUrl?: string;
};

type AlertType = "info" | "warn" | "error" | "success";

export type DropdownType = {
  alertWithType: (type: AlertType, title: string, message: string) => void;
};

export class DropDownHolder {
  static dropDown: DropdownType;

  static setDropDown(dropDown: DropdownType) {
    this.dropDown = dropDown;
  }

  static alert(type: AlertType, title: string, message: string) {
    this.dropDown.alertWithType(type, title, message);
  }
}
