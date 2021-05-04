import React, { useState, useRef } from "react";
import { Picker } from "@react-native-picker/picker";
import styled from "styled-components";
import { View as TView, Text as TText } from "../Themed";

interface IDropdown {
  options: string[];
  label: string;
}

const Wrapper = styled(TView)`
  border-width: 0.5px;
  height: ${({ theme }) => theme.layout.height / 12}px;
`;
const Label = styled(TText)`
  color: grey;
  font-size: 10px;
`;

export const Dropdown = ({ options, label }: IDropdown) => {
  const selectRef = useRef(null);
  const [value, setValue] = useState("");
  return (
    <Wrapper>
      {/* {value ? null : <Label>{label}</Label>} */}
      <Picker
        selectedValue={value}
        onValueChange={(itemValue, itemIndex) => setValue(itemValue)}
        style={{ height: "100%" }}
      >
        {options.map((opt, i) => (
          <Picker.Item
            key={`picker-item-${opt}`}
            label={opt}
            value={opt}
            // style={{ height: "100%" }}
          />
        ))}
      </Picker>
    </Wrapper>
  );
};

export default Dropdown;
