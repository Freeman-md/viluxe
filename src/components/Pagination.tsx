import React from 'react';

type PaginationProps = {
    currentPage?: number,
    totalPages?: number,
    onPageChange?: (page: number) => {}
}

const Pagination: React.FC<PaginationProps> = ({ currentPage = 1, totalPages = 3, onPageChange = (page: number) => { } }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    const getPageRange = () => {
        if (totalPages <= 7) {
            return pageNumbers;
        }

        const rangeStart = Math.max(currentPage - 3, 1);
        const rangeEnd = Math.min(currentPage + 3, totalPages);

        if (currentPage <= 3) {
            return [...pageNumbers.slice(0, 5), '...', totalPages];
        }

        if (currentPage >= totalPages - 3) {
            return [1, '...', ...pageNumbers.slice(totalPages - 5, totalPages)];
        }

        return [1, '...', ...pageNumbers.slice(rangeStart - 1, rangeEnd), '...', totalPages];
    };

    return (
        <nav className="flex items-center justify-center mt-4">
            <ul className="flex">
                <li
                    className={`px-3 py-1 cursor-pointer ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-primary'
                        }`}
                    onClick={() => {
                        if (currentPage > 1) {
                            onPageChange(currentPage - 1);
                        }
                    }}
                >
                    Previous
                </li>
                {getPageRange().map((pageItem, index) => (
                    <li
                        key={index}
                        className={`px-3 py-1 cursor-pointer ${pageItem === currentPage ? 'bg-primary text-white' : 'text-primary'
                            }`}
                        onClick={() => {
                            if (typeof pageItem === 'number') {
                                onPageChange(pageItem);
                            }
                        }}
                    >
                        {pageItem}
                    </li>
                ))}
                <li
                    className={`px-3 py-1 cursor-pointer ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-primary'
                        }`}
                    onClick={() => {
                        if (currentPage < totalPages) {
                            onPageChange(currentPage + 1);
                        }
                    }}
                >
                    Next</li>
            </ul>
        </nav>
    );
}

export default Pagination;
