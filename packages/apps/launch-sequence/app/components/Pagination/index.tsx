import { PaginationProps } from "./Pagination.types";
import {
  StyledPagination,
  PageInfo,
  NavButton,
  NavIcon,
} from "./Pagination.styles";

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <StyledPagination>
      <span>Rows per page: {itemsPerPage}</span>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <NavButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <NavIcon>chevron_left</NavIcon>
        </NavButton>
        <PageInfo>
          {startItem} - {endItem} of {totalItems.toLocaleString()}
        </PageInfo>
        <NavButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          <NavIcon>chevron_right</NavIcon>
        </NavButton>
      </div>
    </StyledPagination>
  );
}
