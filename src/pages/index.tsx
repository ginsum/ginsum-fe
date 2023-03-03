import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import PageHeader from '../components/PageHeader';
import { Product } from '../types/product';
import { getProducts } from '../fetch';

const HomePage: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const router = useRouter();
  const { page } = router.query;

  const fetchProducts = async () => {
    const { products, totalCount } = await getProducts({ page: currentPage });

    setProducts(products);
    setTotalCount(totalCount);
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  return (
    <>
      <PageHeader />
      <Container>
        <ProductList products={products} />
        <Pagination
          totalCount={totalCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
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
