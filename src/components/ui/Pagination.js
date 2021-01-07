import React from "react";
import Button from "./Button";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

//currently set up for 10 items per page only
const currentlyViewingItems = (pageNumber) => {
  let startNumber, endNumber;
  if (pageNumber === 1) {
    startNumber = 1;
  } else {
    startNumber = parseInt(pageNumber - 1 + "1");
  }
  endNumber = parseInt(pageNumber + "0");
  return [startNumber, endNumber];
};

const lastPage = (totalCount, itemsPerPage = 10) => {
  return Math.ceil(totalCount / itemsPerPage);
};

const Pagination = (props) => {
  const { page, totalCount, pageForward, pageBack } = props;

  const last_page = lastPage(totalCount);
  const [startNumber, endNumber] = currentlyViewingItems(page);

  return (
    <div className="pagination">
      <div className="pationation__label">
        Showing: {startNumber} - {endNumber}
      </div>
      <div className="pagination__controls">
        <div className="pagination__controls__backward">
          <Button disabled={page === 1} onClick={pageBack}>
            <MdNavigateBefore size="2em" />
          </Button>
        </div>
        <div className="pagination__controls__forward">
          <Button disabled={page === last_page} onClick={pageForward}>
            <MdNavigateNext size="2em" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
