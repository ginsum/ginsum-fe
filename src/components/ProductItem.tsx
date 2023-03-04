import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

import { Product } from '../types/product';

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product: { name, thumbnail, price, id } }: ProductItemProps) => (
  <Link href={`/products/${id}`}>
    <Container>
      <Image
        src={thumbnail ? thumbnail : '/defaultThumbnail.jpg'}
        width={180}
        height={180}
        alt={name}
        blurDataURL='/blur.jpg'
        placeholder='blur'
      />
      <Name>{name}</Name>
      <Price>{price.toLocaleString()}</Price>
    </Container>
  </Link>
);

export default ProductItem;

const Container = styled.a`
  width: 180px;
  margin-left: 20px;
  margin-top: 20px;
`;

const Name = styled.div`
  margin-top: 8px;
  font-size: 16px;
`;

const Price = styled.div`
  margin-top: 4px;
`;
