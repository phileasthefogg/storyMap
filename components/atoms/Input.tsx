import React from "react";
import { TextInput } from "react-native";
import styled from "styled-components";
import { Text as TText, View as TView } from "../Themed";

interface IInput {
  label?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<EventTarget>;
  error?: any;
  onFocus?: React.EventHandler<any>;
  placeholder?: string;
  width?: string;
  height?: string;
  ref?: any;
  dirty?: boolean;
}

const Wrapper = styled(TView)<{ height: string; width: string }>`
  border-width: 0.5px;
  height: ${({ theme, height }) =>
    height ? height : theme.layout.height / 12 + "px"};
`;
const Label = styled(TText)`
  color: grey;
  font-size: 10px;
`;

const Input = ({
  label,
  value,
  onChange,
  error,
  onFocus,
  placeholder,
  width = "100%",
  height,
  dirty,
}: IInput) => {
  return (
    <Wrapper height={height} width={width}>
      <Label>{label}</Label>
      <TextInput
        onFocus={onFocus}
        onChange={(e) => {
          console.log(e);
        }}
      ></TextInput>
    </Wrapper>
  );
};
export default Input;
