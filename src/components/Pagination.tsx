import React from 'react';
import styled from 'styled-components';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

import usePagination from '../hooks/usePagination';

type PaginationProps = {
  totalCount: number;
  page: number;
};

const Pagination = ({ totalCount, page }: PaginationProps) => {
  const { currentPage, pageRange, totalPage, onClickPrevious, onClickNext, onClickPageNumber } =
    usePagination({
      totalCount,
      page,
    });

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
            disabled={page === currentPage}
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
