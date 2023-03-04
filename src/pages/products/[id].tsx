import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import router from 'next/router';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import PageHeader from '../../components/PageHeader';
import { getProductInfo } from '../../fetch';

type ProductDetailPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const ProductDetailPage: NextPage = ({ product }: ProductDetailPageProps) => {
  useEffect(() => {
    if (!product) {
      router.push('/404');
    }
  }, []);

  return (
    <>
      <PageHeader />
      {product && (
        <>
          <Thumbnail src={product?.thumbnail ? product?.thumbnail : '/defaultThumbnail.jpg'} />
          <ProductInfoWrapper>
            <Name>{product?.name}</Name>
            <Price>{product?.price?.toLocaleString()}원</Price>
          </ProductInfoWrapper>
        </>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { id } = context.query;
    const { product } = await getProductInfo(id as string);

    return {
      props: { product },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
    };
  }
};

export default ProductDetailPage;

const Thumbnail = styled.img`
  width: 100%;
  height: 420px;
`;

const ProductInfoWrapper = styled.main`
  margin-top: 20px;
  padding: 0 20px;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Price = styled.div`
  font-size: 18px;
  margin-top: 8px;
`;
