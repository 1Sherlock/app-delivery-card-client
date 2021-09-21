import React, {Component} from 'react';
import Pagination from "reactstrap/es/Pagination";
import PaginationItem from "reactstrap/es/PaginationItem";
import PaginationLink from "reactstrap/es/PaginationLink";

class PaginationComponent extends Component {
  range(n) {
    return Array.apply(null, Array(n)).map(function (_, i) {
      return i;
    });
  }

  generatePagination(currentPage, totalPages) {

    // First we move out the configurations. That way, they don't mingle with the logic.
    var initialChunkPadding = 1;
    var middleChunkPadding = 2;
    var endingChunkPadding = 1;
    var gapValue = '...';

    // Instead of a loop, we use range. It's much cleaner and we don't have tracking variables
    // at the cost of generating an array.
    return this.range(totalPages).reduce(function (pagination, index) {

      // Then we determine what the current page is based on some comparisons
      var page = index + 1;
      var isInitialChunk = page <= 1 + initialChunkPadding;
      var isMiddleChunk = page >= currentPage - middleChunkPadding && page <= currentPage + middleChunkPadding;
      var isEndingChunk = page >= totalPages - endingChunkPadding;
      var hasNoGap = pagination[pagination.length - 1] !== gapValue;

      // Then based on the determinations, we determine what value gets pushed into the array.
      // It can either be the page, a '...', or a blank array (which doesn't change anything with concat)
      var valueToAdd = isInitialChunk || isMiddleChunk || isEndingChunk ? page : hasNoGap ? gapValue : [];

      return pagination.concat(valueToAdd);
    }, []);
  }

  render() {
    const {totalPages, path, getPageData, currentPage} = this.props;
    return (
      <Pagination className={'d-block mx-auto'}>
        {this.generatePagination(currentPage, totalPages).map((item, index) =>
          <PaginationItem
            active={item - 1 === currentPage || item === '...'}
            disabled={item - 1 === currentPage || item === '...'}
            onClick={() => {
              if (item - 1 !== currentPage && item !== '...')
                getPageData({page: item - 1, path})
            }}
            key={item}>
            <PaginationLink>
              {item}
            </PaginationLink>
          </PaginationItem>)}
      </Pagination>
    );
  }
}

export default PaginationComponent;
