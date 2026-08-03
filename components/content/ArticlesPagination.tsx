"use client";

type ArticlesPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function ArticlesPagination({
  page,
  totalPages,
  onPageChange,
}: ArticlesPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className="articles-pagination" aria-label="Articles pagination">
      <button
        type="button"
        className="articles-pagination__control"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </button>

      <ul className="articles-pagination__pages">
        {pages.map((pageNumber) => (
          <li key={pageNumber}>
            <button
              type="button"
              className={`articles-pagination__page${pageNumber === page ? " articles-pagination__page--active" : ""}`}
              aria-current={pageNumber === page ? "page" : undefined}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="articles-pagination__control"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </nav>
  );
}
