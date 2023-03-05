import styled from 'styled-components';

import PageHeader from '../components/PageHeader';

const NotFound = () => {
  return (
    <>
      <PageHeader />
      <Container>존해하지 않는 페이지입니다.</Container>
    </>
  );
};

export default NotFound;

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 500px;
`;
