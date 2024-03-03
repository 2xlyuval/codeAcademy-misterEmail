import { useEffect, useState } from "react";

export function EmailFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

  //Q - this is workink but i dont understand why
  useEffect(() => {
    onSetFilter(filterByToEdit);
  }, [filterByToEdit]);

  function handleChange(ev) {
    let { name: field, value, type } = ev.target;

    value = type === "select-one" ? convertToBoolian(value) : value;
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
  function convertToBoolian(value) {
    var boolianVal = value === "undefined" ? undefined : value === "true";
    return boolianVal;
  }

  return (
    <form className="email-filter-form" onSubmit={onSubmitFilter}>
      <label htmlFor="search">
        <input
          id="search"
          name="text"
          placeholder="search"
          type="text"
          value={filterByToEdit.text}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="email-isRead-select">Email Status</label>

      <select
        id="email-isRead-select"
        name="isRead"
        value={filterByToEdit.isRead}
        onChange={handleChange}
      >
        <option value="undefined">All Emails</option>
        <option value="false">Un Read Emails</option>
        <option value="true">Read Emails</option>
      </select>
      <button>filter</button>
    </form>
  );
}
