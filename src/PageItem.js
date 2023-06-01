import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';


function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div className="item-container" key={item.id}>
            <h3>{item.id}</h3>
          </div>
        ))}
    </>
  );
}

function PageItem({ itemsPerPage }) {// 5 item each page
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const forLength = async() => {
    const response = await fetch(
      `http://jsonplaceholder.typicode.com/posts`
    );
    const data = await response.json();
    console.log("Result:--:", data.length);
    setTotalItems(data.length);
  }
  forLength();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://jsonplaceholder.typicode.com/posts?_start=${itemOffset}&_limit=${itemsPerPage}`
      );

      const data = await response.json();
      setCurrentItems(data);
      // setTotalItems(itemLength.length);
    };

    fetchData();
  }, [itemOffset, itemsPerPage]);

  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <div className="pagination-container">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
    </>
  );
}

export default PageItem;
