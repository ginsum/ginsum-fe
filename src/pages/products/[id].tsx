import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import PageHeader from '../../components/PageHeader';
import { getProductInfo } from '../../fetch';
import { Product } from '../../types/product';

const ProductDetailPage: NextPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();
  const { id = '1' } = router.query;

  const fetchProductInfo = async () => {
    const { product } = await getProductInfo(id as string);

    setProduct(product);
  };

  useEffect(() => {
    fetchProductInfo();
  }, []);

  return (
    <>
      <PageHeader />
      <Thumbnail src={product?.thumbnail ? product.thumbnail : '/defaultThumbnail.jpg'} />
      <ProductInfoWrapper>
        <Name>{product?.name}</Name>
        <Price>{product?.price?.toLocaleString()}원</Price>
      </ProductInfoWrapper>
    </>
  );
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
