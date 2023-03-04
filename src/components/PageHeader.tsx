import Link from 'next/link';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { userInfoState } from '../recoil/atom';
import useAuth from '../hooks/useAuth';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 48px;
`;

type PageHeaderProps = {
  isLoginPage?: boolean;
};

const PageHeader = ({ isLoginPage }: PageHeaderProps) => {
  const { name } = useRecoilValue(userInfoState);

  const { logout } = useAuth();

  return (
    <Header>
      <Link href='/'>
        <Title>HAUS</Title>
      </Link>
      {!isLoginPage &&
        (name ? (
          <div>
            <p>{name}</p>
            <button onClick={logout}>logout</button>
          </div>
        ) : (
          <Link href='/login'>
            <button>login</button>
          </Link>
        ))}
    </Header>
  );
};

export default PageHeader;
