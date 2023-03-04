import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getProducts } from '../fetch';
import { Product } from '../types/product';

const usePagination = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [pageRange, setPageRange] = useState<number[]>([1, 2, 3, 4, 5]); // 처음에 5페이지 안될때

  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const { products, totalCount } = await getProducts({ page: currentPage });

      setTotalCount(totalCount);
      setProducts(products);
    } catch (error) {
      router.push('/404');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const totalPage = Math.ceil(totalCount / 10);

  const onClickPrevious = () => {
    const startNum = pageRange[0] - 5;
    const arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push(startNum + i);
    }
    setPageRange(arr);
    setCurrentPage(pageRange[0] - 1);
  };

  const onClickNext = () => {
    const startNum = pageRange[0] + 5;
    const arr = [];
    for (let i = 0; i < 5; i++) {
      if (startNum + i <= totalPage) {
        arr.push(startNum + i);
      }
    }
    setPageRange(arr);
    setCurrentPage(startNum);
  };

  const onClickPageNumber = (page: number) => {
    setCurrentPage(page);
  };

  return {
    products,
    currentPage,
    totalCount,
    pageRange,
    totalPage,
    onClickPrevious,
    onClickNext,
    onClickPageNumber,
  };
};

export default usePagination;
