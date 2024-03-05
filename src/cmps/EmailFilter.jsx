import { useEffect, useState } from "react";
import { svg } from "../assets/svg.jsx";

export function EmailFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

  useEffect(() => {
    onSetFilter(filterByToEdit);
  }, [filterByToEdit]);

  function handleChange(ev) {
    let { name: field, value, type } = ev.target;

    value = type === "select-one" ? convertToBoolean(value) : value;
    setFilterByToEdit((prevFilter) => {
      return {
        ...prevFilter,
        [field]: value,
      };
    });
  }

  function onSubmitFilter(ev) {
    ev.preventDefault();
    onSetFilter(filterByToEdit);
  }

  // Q - cr
  function convertToBoolean(value) {
    var boolianVal = value === "null" ? null : value === "true";
    return boolianVal;
  }

  return (
    <form className="email-filter-form" onSubmit={onSubmitFilter}>
      <label htmlFor="search">
        <span className="icon-btn" data-tooltip="search">
          {svg.searchIcon}
        </span>
        <input
          id="search"
          name="text"
          placeholder="Search mail"
          type="text"
          value={filterByToEdit.text}
          onChange={handleChange}
        />
        <span className="icon-btn" data-tooltip="Show search options">
          {svg.advancedSearchIcon}
        </span>
      </label>

      <label htmlFor="email-isRead-select">Email Status</label>

      <select
        id="email-isRead-select"
        name="isRead"
        value={filterByToEdit.isRead ?? "null"}
        onChange={handleChange}
      >
        <option value="null">All Emails</option>
        <option value="false">Un Read Emails</option>
        <option value="true">Read Emails</option>
      </select>
      <button>filter</button>
    </form>
  );
}
