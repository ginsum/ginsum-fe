import { useRouter } from 'next/router';
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import PageHeader from '../components/PageHeader';
import { getProducts } from '../fetch';

type HomePageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const HomePage: NextPage = ({ products, totalCount }: HomePageProps) => {
  const router = useRouter();
  const { page = '1' } = router.query;
  return (
    <>
      <PageHeader />
      <Container>
        <ProductList products={products} />
        <Pagination totalCount={totalCount} currentPage={+page} />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { page = '1' } = context.query;
    const { products, totalCount } = await getProducts({ page: +page });

    return {
      props: { products, totalCount },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
    };
  }
};

export default HomePage;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
