import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import PageHeader from '../components/PageHeader';

const HomePage: NextPage = () => {
  const router = useRouter();
  const { page } = router.query;

  return (
    <>
      <PageHeader />
      <Container>
        <ProductList />
        <Pagination />
      </Container>
    </>
  );
};

export default HomePage;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
