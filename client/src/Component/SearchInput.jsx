import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";

function SearchInput() {
  const [search, setSearch] = useState("");
  return (
    <div className="flex-1 h-10 relative">
      <input
        className="w-full h-full border border-lightText rounded-full outline-none pl-4 pr-10 text-primary  focus-visible:border-blue-600"
        type="text"
        placeholder="Search your product here"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      {!search ? (
        <CiSearch className="absolute right-4 top-2.5 text-xl" />
      ) : (
        <IoCloseOutline className="absolute right-4 top-2.5 text-xl" />
      )}
    </div>
  );
}

export default SearchInput;
