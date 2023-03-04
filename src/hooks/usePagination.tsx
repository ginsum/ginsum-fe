import { useRouter } from 'next/router';
import React, { useState } from 'react';

type UsePaginationProps = {
  totalCount: number;
};

const usePagination = ({ totalCount }: UsePaginationProps) => {
  const [pageRange, setPageRange] = useState<number[]>([1, 2, 3, 4, 5]); // 처음에 5페이지 안될때

  const router = useRouter();

  const totalPage = Math.ceil(totalCount / 10);

  const onClickPrevious = () => {
    const startNum = pageRange[0] - 5;
    const arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push(startNum + i);
    }
    setPageRange(arr);

    router.push(`/?page=${pageRange[0] - 1}`);
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

    router.push(`/?page=${startNum}`);
  };

  const onClickPageNumber = (page: number) => {
    router.push(`/?page=${page}`);
  };

  return {
    pageRange,
    totalPage,
    onClickPrevious,
    onClickNext,
    onClickPageNumber,
  };
};

export default usePagination;
