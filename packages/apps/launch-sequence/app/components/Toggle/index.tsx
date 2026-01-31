import { ToggleProps } from "./Toggle.types";

export default function Toggle({
  checked,
  onChange,
  disabled = false,
  label,
}: ToggleProps) {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={handleClick}
        className={`
          w-8 h-4 rounded-full relative cursor-pointer border transition-all duration-200 p-0
          ${checked
            ? "bg-slate-700 border-primary/60 shadow-neon-cyan"
            : "bg-slate-800 border-slate-600"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <span
          className={`
            absolute top-[2px] w-[10px] h-[10px] rounded-full transition-all duration-200
            ${checked
              ? "right-[2px] bg-primary"
              : "left-[2px] bg-slate-500"
            }
          `}
        />
      </button>
      {label && (
        <span
          className={`
            font-display text-sm uppercase
            ${checked ? "text-primary" : "text-slate-400"}
          `}
        >
          {label}
        </span>
      )}
    </div>
  );
}
