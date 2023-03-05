import { ReactNode, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';

import { getUerInfo } from '../fetch';
import { userInfoState } from '../recoil/atom';

type AuthGardProps = {
  children: ReactNode;
};

const AuthGard = ({ children }: AuthGardProps) => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const { id } = userInfo;

  const cookies = new Cookies();
  const accessToken = cookies.get('accessToken');

  const checkLogin = async () => {
    if (id) {
      return;
    }
    // 새로 고침 시 토큰 확인 후 로그인 유지
    if (accessToken) {
      const { user }: { user: { id: string } } = jwtDecode(accessToken);
      const { user: userInfo } = await getUerInfo(user.id);

      setUserInfo(userInfo);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return <>{children}</>;
};

export default AuthGard;
