import { useEffect, useState } from "react"
import { svg } from "../assets/svg.jsx"
import { emailService } from "../services/email.service.js"

export function EmailFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
  const [displayForm, setDisplayForm] = useState(false)

  useEffect(() => {
    onSetFilter(filterByToEdit)
  }, [])

  function handleChange(ev) {
    let { name: field, value, type } = ev.target
    setFilterByToEdit((prevFilter) => {
      return {
        ...prevFilter,
        [field]: value,
      }
    })
  }

  function onSubmit(e) {
    e.preventDefault()
    onSetFilter(filterByToEdit)
    setDisplayForm(false)
  }

  function onClearFilter() {
    setFilterByToEdit(emailService.getDefaultFilter())
    onSetFilter(emailService.getDefaultFilter())
    setDisplayForm(false)
  }

  return (
    <div className="email-filter">
      <label htmlFor="search">
        <span className="icon-btn" data-tooltip="search">
          {svg.searchIcon}
        </span>
        <input
          id="search"
          name="hasStr"
          placeholder="Search mail"
          type="text"
          value={filterByToEdit.hasStr}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key == "Enter") onSetFilter(filterByToEdit)
          }}
        />
        <span
          onClick={() => setDisplayForm((prevDesplay) => !prevDesplay)}
          className="icon-btn"
          data-tooltip="Show search options"
        >
          {svg.advancedSearchIcon}
        </span>
      </label>
      <form
        className={`email-filter-form ${displayForm ? "show" : ""}`}
        onSubmit={onSubmit}
      >
        <div className="form-input">
          <label htmlFor="from">from</label>
          <input
            type="text"
            id="from"
            name="from"
            value={filterByToEdit.from}
            onChange={handleChange}
          />
        </div>
        <div className="form-input">
          <label htmlFor="subject">subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={filterByToEdit.subject}
            onChange={handleChange}
          />
        </div>
        <div className="form-input">
          <label htmlFor="hasSrt">Includes the words</label>
          <input
            type="text"
            id="hasSrt"
            name="hasSrt"
            value={filterByToEdit.hasStr}
            onChange={handleChange}
          />
        </div>
        <div className="form-input">
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
        </div>
        <div className="form-input">
          <label htmlFor="date">date</label>
          <input
            type="date"
            name="date"
            value={filterByToEdit.date}
            onChange={handleChange}
          />
        </div>
        <div className="form-actoins">
          <button type="button" onClick={onClearFilter}>
            clear filter
          </button>
          <button>filter</button>
        </div>
      </form>
    </div>
  )
}
