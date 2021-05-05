import React from "react";
import { Picker } from "@react-native-picker/picker";
import styled from "styled-components";
import { View as TView, Text as TText } from "../Themed";

interface IDropdown {
  options: string[];
  label: string;
  onChange?: (...event: any[]) => void;
  value?: string;
}

const Wrapper = styled(TView)`
  border-width: 0.5px;
  height: ${({ theme }) => theme.layout.height / 16}px;
`;
const Label = styled(TText)`
  color: grey;
  font-size: 10px;
`;

export const Dropdown = ({ options, label, value, onChange }: IDropdown) => {
  return (
    <Wrapper>
      {/* {value ? null : <Label>{label}</Label>} */}
      <Picker
        selectedValue={value}
        onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
        style={{ height: "100%" }}
      >
        {options.map((opt, i) => (
          <Picker.Item key={`picker-item-${opt}`} label={opt} value={opt} />
        ))}
      </Picker>
    </Wrapper>
  );
};

export default Dropdown;
