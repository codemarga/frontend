interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    setCurrentPage: (page: number) => void;
  }
  
  export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalItems,
    itemsPerPage,
    setCurrentPage,
  }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    const handlePageChange = (page: number) => {
      if (page > 0 && page <= totalPages) {
        setCurrentPage(page);
      }
    };
  
    return (
      <div className="flex justify-center items-center space-x-2 py-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{`${currentPage} / ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };