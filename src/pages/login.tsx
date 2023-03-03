import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';
import { FieldValues, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import Cookies from 'universal-cookie';

import InputForm from '../components/InputForm';
import { RHFIdRules, RHFPasswordRules } from '../utilities/reactHookForm';
import { login } from '../fetch';
import { userInfoState } from '../recoil/atom';
import PageHeader from '../components/PageHeader';

const LoginPage: NextPage = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: 'onBlur' });

  const router = useRouter();
  const setUserInfoState = useSetRecoilState(userInfoState);

  const onSubmit = async (data: FieldValues) => {
    const { id, password } = data;
    const { accessToken, user } = await login({ id, password });

    setUserInfoState(user);
    const cookies = new Cookies();
    cookies.set('accessToken', accessToken);
    router.push('/');
  };

  return (
    <>
      <PageHeader />
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
