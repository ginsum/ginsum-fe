import { ReactNode, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';

import { userInfoState } from '../recoil/atom';
import { getUerInfo } from '../fetch';

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
