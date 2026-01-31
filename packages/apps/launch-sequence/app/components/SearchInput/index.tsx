import { SearchInputProps } from "./SearchInput.types";

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
}: SearchInputProps) {
  return (
    <div className="relative flex-1">
      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
        search
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full bg-slate-900/50 border border-slate-700 rounded
          py-2.5 pl-10 pr-4
          font-display text-base tracking-widest text-slate-200
          transition-all duration-200
          placeholder:text-slate-500
          focus:outline-none focus:border-primary
        "
      />
    </div>
  );
}
