import { FlagTableProps } from "./FlagTable.types";
import Toggle from "../Toggle";
import Tag from "../Tag";

export default function FlagTable({
  flags,
  selectedIds = [],
  onSelectFlag,
  onSelectAll,
  onToggleFlag,
  onFlagClick,
}: FlagTableProps) {
  const allSelected = flags.length > 0 && selectedIds.length === flags.length;

  return (
    <div className="flex-1 overflow-y-auto border border-primary/15 bg-card-dark-alt custom-scrollbar">
      <table className="w-full text-left border-collapse">
        <thead className="sticky top-0 bg-background-dark/90 backdrop-blur-sm z-10 border-b border-primary/20">
          <tr>
            <th className="w-12 px-6 py-4 font-display text-sm font-normal uppercase tracking-widest text-slate-400">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(e) => onSelectAll?.(e.target.checked)}
                className="appearance-none w-4 h-4 border border-slate-600 bg-transparent cursor-pointer transition-all duration-200 checked:bg-primary checked:border-primary focus:outline-none"
              />
            </th>
            <th className="px-6 py-4 font-display text-sm font-normal uppercase tracking-widest text-slate-400">
              Flag Name &amp; Key
            </th>
            <th className="px-6 py-4 font-display text-sm font-normal uppercase tracking-widest text-slate-400">
              Type
            </th>
            <th className="px-6 py-4 font-display text-sm font-normal uppercase tracking-widest text-slate-400">
              Environment Status
            </th>
            <th className="px-6 py-4 font-display text-sm font-normal uppercase tracking-widest text-slate-400">
              Tags
            </th>
            <th className="px-6 py-4 font-display text-sm font-normal uppercase tracking-widest text-slate-400 text-right">
              Last Modified
            </th>
          </tr>
        </thead>
        <tbody>
          {flags.map((flag) => (
            <tr
              key={flag.id}
              onClick={() => onFlagClick?.(flag)}
              className="border-b border-slate-800 cursor-pointer transition-colors duration-200 hover:bg-primary/5 group"
            >
              <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(flag.id)}
                  onChange={(e) => onSelectFlag?.(flag.id, e.target.checked)}
                  className="appearance-none w-4 h-4 border border-slate-600 bg-transparent cursor-pointer transition-all duration-200 checked:bg-primary checked:border-primary focus:outline-none group-hover:border-primary/50"
                />
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-slate-200 transition-colors duration-200 group-hover:text-primary">
                    {flag.name}
                  </span>
                  <span className="font-mono text-sm text-slate-400">
                    {flag.key}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <Tag label={flag.type} variant="type" />
              </td>
              <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                <Toggle
                  checked={flag.active}
                  onChange={(active) => onToggleFlag?.(flag.id, active)}
                  label={flag.active ? "Active" : "Inactive"}
                />
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-1 flex-wrap">
                  {flag.tags.map((tag) => (
                    <Tag key={tag} label={tag} />
                  ))}
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex flex-col items-end">
                  <span className="font-mono text-sm text-slate-400 uppercase tracking-tighter">
                    {flag.lastModified}
                  </span>
                </div>
              </td>
            </tr>
          ))}
          <tr>
            <td
              colSpan={6}
              className="px-6 py-8 text-center font-display text-sm text-slate-500 tracking-[0.5em] uppercase"
            >
              End of initial viewport - more flags available
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
