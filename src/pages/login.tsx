import Link from 'next/link';
import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';
import { FieldValues, useForm } from 'react-hook-form';

import InputForm from '../components/InputForm';
import { RHFIdRules, RHFPasswordRules } from '../utilities/reactHookForm';

const LoginPage: NextPage = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: 'onChange' });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <>
      <Header>
        <Link href='/'>
          <Title>HAUS</Title>
        </Link>
        <Link href='/login'>
          <p>login</p>
        </Link>
      </Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputForm
          type='text'
          label='아이디'
          errorText={errors.id?.message}
          {...register('id', RHFIdRules)}
        />
        <InputForm
          type='password'
          label='비밀번호'
          errorText={errors.password?.message}
          {...register('password', RHFPasswordRules)}
        />

        <LoginButton type='submit' disabled={!isValid}>
          로그인
        </LoginButton>
      </Form>
    </>
  );
};

export default LoginPage;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding: 0 20px 40px;
`;

const TextInput = styled.input`
  border: 1px solid #000;
`;

const LoginButton = styled.button`
  margin-top: 40px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;

  &:disabled {
    background-color: #e2e2ea;
  }
`;
