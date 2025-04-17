import { Pagination } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

function Paginations({ pageNumber , totalPages = 0 }) {
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const navigate = useNavigate();

  const handlePageChange = (event, value) => {
    params.set("page", value);
    navigate(`?${params.toString()}`);
  };

  return (
    <Pagination
      count={totalPages}
      onChange={handlePageChange}
      defaultPage={1}
      siblingCount={0}
      boundaryCount={2}
      shape="rounded"
    />
  );
}

export default Paginations;
