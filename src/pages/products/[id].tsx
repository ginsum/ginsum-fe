import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import router from 'next/router';
import Image from 'next/image';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import { getProductInfo } from '../../fetch';
import PageHeader from '../../components/PageHeader';

type ProductDetailPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const ProductDetailPage: NextPage = ({ product }: ProductDetailPageProps) => {
  useEffect(() => {
    if (!product) {
      router.push('/404');
    }
  }, []);

  const { thumbnail, name, price } = product;

  return (
    <>
      <PageHeader />
      {product && (
        <>
          <Image
            src={thumbnail ? thumbnail : '/defaultThumbnail.jpg'}
            width={420}
            height={420}
            alt={name}
            blurDataURL='/blur.jpg'
            placeholder='blur'
          />
          <ProductInfoWrapper>
            <Name>{name}</Name>
            <Price>{price?.toLocaleString('ko-kr')}원</Price>
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
