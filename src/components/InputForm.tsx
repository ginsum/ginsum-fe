import { forwardRef } from 'react';
import { FieldError, Merge, FieldErrorsImpl } from 'react-hook-form';
import styled from 'styled-components';

type InputFormProps = {
  type: string;
  label: string;
  name: string;
  errorText?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
};

const InputForm = forwardRef(({ type, label, errorText, ...others }: InputFormProps, ref: any) => {
  return (
    <Container>
      <LabelText>{label}</LabelText>
      <Input type={type} ref={ref} color={!!errorText ? '#fdedee' : '#f7f7fe'} {...others} />
      {typeof errorText === 'string' && <ErrorText>{errorText}</ErrorText>}
    </Container>
  );
});
InputForm.displayName = 'Input';

export default InputForm;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const LabelText = styled.label`
  font-weight: 700;
  font-size: 13px;
  color: #6c6c7d;
`;

const Input = styled.input`
  margin-top: 8px;
  padding: 16px;
  background: ${(props) => props.color};
  border-radius: 12px;
`;

const ErrorText = styled.div`
  margin-top: 8px;
  font-weight: 400;
  font-size: 13px;
  color: #ed4e5c;
`;
