import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { FieldValues } from 'react-hook-form';
import Cookies from 'universal-cookie';

import { userLogin } from '../fetch';
import { userInfoState } from '../recoil/atom';

const useAuth = () => {
  const setUserInfo = useSetRecoilState(userInfoState);

  const router = useRouter();
  const cookies = new Cookies();

  const login = async (data: FieldValues) => {
    const { id, password } = data;
    const { accessToken, user } = await userLogin({ id, password });

    setUserInfo(user);
    cookies.set('accessToken', accessToken);
    router.push('/');
  };

  const logout = () => {
    setUserInfo({ id: '', name: '' });
    cookies.remove('accessToken');
    router.push('/');
  };
  return { login, logout };
};

export default useAuth;
