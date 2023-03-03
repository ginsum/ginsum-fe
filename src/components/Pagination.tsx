import React, { useState } from 'react';
import styled from 'styled-components';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

type PaginationProps = {
  totalCount: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const Pagination = ({ totalCount, currentPage, setCurrentPage }: PaginationProps) => {
  const [pageRange, setPageRange] = useState<number[]>([1, 2, 3, 4, 5]); // 처음에 5페이지 안될때

  const totalPage = Math.ceil(totalCount / 5);

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

  return (
    <Container>
      <Button disabled={currentPage - 5 <= 0} onClick={onClickPrevious}>
        <VscChevronLeft />
      </Button>
      <PageWrapper>
        {pageRange.map((page) => (
          <Page
            key={page}
            selected={page === currentPage}
            // disabled={page === 1}
            onClick={() => onClickPageNumber(page)}
          >
            {page}
          </Page>
        ))}
      </PageWrapper>
      <Button disabled={currentPage / 5 >= totalPage / 5} onClick={onClickNext}>
        <VscChevronRight />
      </Button>
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 40px;
  margin-left: -20px;
`;

const Button = styled.button`
  &:disabled {
    color: #e2e2ea;
    cursor: default;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  margin: 0 16px;
`;

type PageType = {
  selected: boolean;
};

const Page = styled.button<PageType>`
  padding: 4px 6px;
  background-color: ${({ selected }) => (selected ? '#000' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  font-size: 20px;

  & + & {
    margin-left: 4px;
  }

  &:disabled {
    cursor: default;
  }
`;
