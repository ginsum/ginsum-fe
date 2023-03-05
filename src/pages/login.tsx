import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import useAuth from '../hooks/useAuth';
import { userInfoState } from '../recoil/atom';
import { RHFIdRules, RHFPasswordRules } from '../utilities/reactHookForm';
import PageHeader from '../components/PageHeader';
import InputForm from '../components/InputForm';

const LoginPage: NextPage = () => {
  const { name } = useRecoilValue(userInfoState);
  const router = useRouter();

  useEffect(() => {
    if (name) {
      router.push('/');
    }
  }, [name]);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: 'onBlur' });

  const { login } = useAuth();

  const onSubmit = (data: FieldValues) => {
    login(data);
  };

  return (
    <>
      <PageHeader isLoginPage />
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding: 0 20px 40px;
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
