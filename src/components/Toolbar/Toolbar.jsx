import s from "./Toolbar.module.css";

export function Toolbar({ search, onSearch, sortAlpha, onToggleSort }) {
  return (
    <div className={s.toolbar}>
      <input
        className={s.search}
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search..."
      />
      <button
        className={`${s.sortButton} ${sortAlpha ? s.active : ""}`}
        type="button"
        onClick={onToggleSort}
      >
        {sortAlpha ? "A→Z: ON" : "A→Z: OFF"}
      </button>
    </div>
  );
}
