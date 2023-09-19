export function TodoFilter({ name, setName, hide, setHide }) {
  return (
    <div className="filter-form">
      <div className="filter-form-group">
        <label htmlFor="name">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="name"
        />
      </div>
      <label>
        <input
          checked={hide}
          onChange={(e) => setHide(e.target.checked)}
          type="checkbox"
        />
        Hide Completed
      </label>
    </div>
  )
}
