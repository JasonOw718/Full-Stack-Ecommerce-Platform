import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp, FiRefreshCw, FiSearch } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";

function Filter({categories}) {


  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [sortOrder, setsortOrder] = useState("asc");
  const [select, setSelect] = useState("all");

  useEffect(() => {
    const keywordVal = params.get("keyword") || "";
    const sortOrderVal = params.get("sortOrder") || "";
    const category = params.get("category") || "";

    setKeyword(keywordVal);
    setsortOrder(sortOrderVal);
    setSelect(category);
  }, [searchParams]);

  useEffect(() => {
    const id = setTimeout(() => {
      if (keyword !== "") params.set("keyword", keyword);
      else params.delete("keyword");
      navigate(`?${params.toString()}`);
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  }, [keyword]);

  return (
    <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4">
      {/* SEARCH BAR */}
      <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
        <input
          type="text"
          placeholder="Search Products"
          value={keyword}
          onChange={({ target: { value } }) => {
            setKeyword(value);
          }}
          className="border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
        />
        <FiSearch className="absolute left-3 text-slate-800 size={20}" />
      </div>

      {/* CATEGORY SELECTION */}
      <div className="flex sm:flex-row flex-col gap-4 items-center">
        <FormControl
          className="text-slate-800 border-slate-700"
          variant="outlined"
          size="small"
        >
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            label="Category"
            value={select}
            onChange={(e) => {
              const { value } = e.target;
              if (value === "all") params.delete("category");
              else params.set("category", e.target.value);
              navigate(`?${params.toString()}`);
            }}
            className="min-w-[120px] text-slate-800 border-slate-700"
          >
            <MenuItem value="all">All</MenuItem>
            {categories.map((item) => (
              <MenuItem key={item.categoryId} value={item.categoryName}>
                {item.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* SORT BUTTON & CLEAR FILTER */}
        <Tooltip title="Sorted by price: asc">
          <Button
            variant="contained"
            onClick={() => {
              const sortOrderVal = sortOrder === "asc" ? "dsc" : "asc";
              params.set("sortOrder", sortOrderVal);
              navigate(`?${params.toString()}`);
            }}
            color="primary"
            className="flex items-center gap-2 h-10"
          >
            Sort By
            {sortOrder === "asc" ? (
              <FiArrowUp size={20} />
            ) : (
              <FiArrowDown size={20} />
            )}
          </Button>
        </Tooltip>
        <button
          className="flex items-center gap-2 bg-rose-900 text-white cursor-pointer px-3 py-2 rounded-md transition duration-300 ease-in shadow-md focus:outline-none"
          onClick={() => {
            navigate({ pathname: window.location.pathname });
          }}
        >
          <FiRefreshCw className="font-semibold" size={16} />
          <span className="font-semibold">Clear Filter</span>
        </button>
      </div>
    </div>
  );
}

export default Filter;
