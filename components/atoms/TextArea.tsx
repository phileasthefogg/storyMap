import React, { forwardRef } from "react";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
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
  multiline?: boolean;
  numberOfLines?: number;
}

const Wrapper = styled(TView)<{ height: string; width: string }>`
  border-width: 0.5px;
  height: ${({ theme, height }) =>
    height ? height : theme.layout.height / 12 + "px"};
  position: relative;
`;
const LabelWrapper = styled(TView)`
  background-color: white;
  position: absolute;
  top: -8px;
  left: 2%;
  padding-horizontal: 1%;
`;
const Label = styled(TText)`
  color: grey;
  font-size: 10px;
  align-self: center;
`;
const TInput = styled(AutoGrowingTextInput)`
  margin-vertical: 1%;
  padding-horizontal: 2%;
  height: 100%;
`;

const TextArea = forwardRef(
  (
    {
      label,
      value,
      onChange,
      error,
      onFocus,
      placeholder,
      width = "100%",
      height,
      dirty,
      ...props
    }: IInput,
    ref?
  ) => {
    return (
      <Wrapper height={height} width={width}>
        <LabelWrapper>
          <Label>{label}</Label>
        </LabelWrapper>
        <TInput
          ref={ref}
          onFocus={onFocus}
          onChangeText={onChange}
          maxHeight={40}
          maxLines={8}
          minHeight={40}
          {...props}
        ></TInput>
      </Wrapper>
    );
  }
);
export default TextArea;
