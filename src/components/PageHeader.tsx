import Link from 'next/link';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { userInfoState } from '../recoil/atom';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 48px;
`;

const PageHeader = () => {
  const { name } = useRecoilValue(userInfoState);
  return (
    <Header>
      <Link href='/'>
        <Title>HAUS</Title>
      </Link>
      <Link href='/login'>
        <p>{name ? name : 'login'}</p>
      </Link>
    </Header>
  );
};

export default PageHeader;
