import React, { useState, useEffect } from "react";
import styled from "styled-components";
import QuestionRow from "./QuestionRow";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

const Pagination = (props) => {
  const navigate = useNavigate();
  const { data } = props;
  const [currentItems, setCurrentItems] = useState([]); // 현재 창에 보여지는 아이템들
  const [pageCount, setPageCount] = useState(0); // 총 페이지 수
  const [itemOffset, setItemOffset] = useState(0); // 현재 창의 가장 첫번째 아이템의 인덱스
  const [itemsPerPage, setItemsPerPage] = useState(5); // 쿼리 파라미터 : size
  const [tab, setTab] = useState("curr");
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage; // 현재 창의 가장 마지막 아이템의 인덱스
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  // 왼쪽 버튼들을 누르면 실행되는 함수. 누른 버튼의 값에 따라 itemOffset 갱신
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setPageNum(event.selected + 1);
    setItemOffset(newOffset);
    updateOffset();
  };

  // 오른쪽 버튼들을 누르면 실행되는 함수
  const changeItemsPerPage = (e) => {
    setItemsPerPage(e);
    setTab(String(e));
    setItemOffset(0);
    setPageNum(1);
    updateOffset();
  };

  const updateOffset = () => {
    const queryString = `?size=${itemsPerPage}&page=${pageNum}`;
    navigate(`${queryString}`);
  };

  return (
    <>
      <QuestionsPagination>
        {currentItems.map((question) => (
          <QuestionRow
            key={question.questionId}
            id={question.questionId}
            title={question.title}
            body={question.body}
            createdAt={question.creationDate}
            author={question.member.name}
          />
        ))}
      </QuestionsPagination>

      <Row3>
        <PaginationLeft>
          <ReactPaginate
            previousLabel={"Prev"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-num"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-num"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-num"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-num"}
            activeClassName={"active"}
          ></ReactPaginate>
        </PaginationLeft>
        <PaginationRight>
          <div>
            <div
              className={`btn ${tab === "5" ? "active" : ""}`} // tab 값이 "5"이면 active 클래스를 추가
              onClick={() => {
                changeItemsPerPage(5);
              }}
            >
              5
            </div>

            <div
              className={`btn ${tab === "10" ? "active" : ""}`}
              onClick={() => {
                changeItemsPerPage(10);
              }}
            >
              10
            </div>
            <div
              className={`btn ${tab === "30" ? "active" : ""}`}
              onClick={() => {
                changeItemsPerPage(30);
              }}
            >
              30
            </div>
            <div className="perpage">per page</div>
          </div>
        </PaginationRight>
      </Row3>
    </>
  );
};
export default Pagination;

const QuestionsPagination = styled.div``;

const Row3 = styled.div`
  border-top: 1px solid #e3e6e8;
  padding: 4.7rem 0.7rem 3rem 1.6rem;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
`;
const PaginationLeft = styled.div`
  text-align: left;

  ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
  }

  li {
    height: 14px;
    border: 1px solid #d6d9dc;
    border-radius: 3px;
    margin: 0px 2px;
    padding: 4px 0px 6px 0px;
    &:hover {
      background-color: #d6d9dc;
      cursor: pointer;
    }
    &.active {
      background-color: #f48225;
      color: #ffffff;
      cursor: pointer;
      border: 1px solid #f48225;
    }
  }

  a {
    height: 14px;
    border-radius: 3px;
    margin: 0px -1px;
    padding: 4px 8px 5px 8px;
  }
`;

const PaginationRight = styled.div`
  text-align: right;
  div {
    display: flex;
  }

  .btn {
    height: 14px;
    border: 1px solid #d6d9dc;
    border-radius: 3px;
    margin: 0px 2px;
    padding: 4px 8px 6px 8px;
  }
  .btn:hover {
    background-color: #d6d9dc;
    cursor: pointer;
  }
  .btn.active {
    background-color: #f48225;
    color: #ffffff;
    cursor: pointer;
    border: 1px solid #f48225;
  }

  .perpage {
    padding: 4px;
    border: none;
    &:hover {
      background-color: #ffffff;
      cursor: default;
    }
  }
`;
