import styled from 'styled-components';

type InputFormProps = {
  type: string;
  label: string;
  errorText?: string;
};

const InputForm = ({ type, label, errorText }: InputFormProps) => {
  return (
    <Container>
      <LabelText>{label}</LabelText>
      <Input type={type} />
      <ErrorText>{errorText}</ErrorText>
    </Container>
  );
};

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
  background: #f7f7fe;
  border-radius: 12px;
`;

const ErrorText = styled.div`
  margin-top: 8px;
  font-weight: 400;
  font-size: 13px;
  color: #ed4e5c;
`;
