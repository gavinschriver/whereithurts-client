import React from "react";
import Button from "./Button";
import TextInput from "./TextInput";

const SearchBar = ({
  label,
  onSearch,
  onClear,
  value,
  onChange,
  active,
  ...props
}) => {
  return (
    <div className={`searchbar ${active ? `activefield` : ""}`}>
      <div className="searchbar__label">{label}</div>
      <div className="row">
        <div className="searchbar__control">
          <TextInput value={value} onChange={onChange} {...props} />
        </div>
        <div className="searchbar__buttons">
          <Button onClick={onSearch}>Search</Button>
          <Button onClick={onClear}>Clear</Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
