export function EmailFilter() {
  return (
    <form className="email-filter-form">
      <label htmlFor="search">
        <input id="search" name="text" placeholder="search" type="text" />
      </label>

      <label htmlFor="email-isRead-select">Email Status</label>

      <select name="isRead" id="email-isRead-select">
        <option value={null}>All Emails</option>
        <option value={false}>Un Read Emails</option>
        <option value={true}>Read Emails</option>
      </select>
    </form>
  );
}
