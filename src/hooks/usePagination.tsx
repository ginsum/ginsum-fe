import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type UsePaginationProps = {
  totalCount: number;
  page: number;
};

const usePagination = ({ totalCount, page }: UsePaginationProps) => {
  const [pageRange, setPageRange] = useState<number[]>([1, 2, 3, 4, 5]); // 처음에 5페이지 안될때
  const [currentPage, setCurrentPage] = useState<number>(page);

  const router = useRouter();

  const getPageRange = (page: number) => {
    const reminderFive = page % 5;
    const startNum = reminderFive ? page - (page % 5) + 1 : page - 4;
    const arr = [];
    for (let i = 0; i < 5; i++) {
      if (startNum + i <= totalPage) {
        arr.push(startNum + i);
      }
    }
    setPageRange(arr);
  };

  useEffect(() => {
    if (page <= totalCount) {
      setCurrentPage(page);
      getPageRange(page);
    } else {
      router.push('/404');
    }
  }, [page]);

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
    currentPage,
    pageRange,
    totalPage,
    onClickPrevious,
    onClickNext,
    onClickPageNumber,
  };
};

export default usePagination;
