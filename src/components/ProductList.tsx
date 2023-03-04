import styled from 'styled-components';

import usePagination from '../hooks/usePagination';
import ProductItem from './ProductItem';

const ProductList = () => {
  const { products } = usePagination();

  return (
    <Container>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </Container>
  );
};

export default ProductList;

const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  margin-left: -20px;
`;
