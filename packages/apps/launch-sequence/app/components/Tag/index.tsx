import { TagProps } from "./Tag.types";

export default function Tag({
  label,
  variant = "default",
  environment,
}: TagProps) {
  const getVariantClasses = () => {
    if (variant === "environment" && environment) {
      const envClasses = {
        production: "bg-green-900/30 text-green-400 border border-green-700/50",
        staging: "bg-yellow-900/30 text-yellow-400 border border-yellow-700/50",
        development: "bg-blue-900/30 text-blue-400 border border-blue-700/50",
      };
      return envClasses[environment];
    }

    if (variant === "type") {
      return "bg-transparent text-slate-400 border border-slate-600";
    }

    return "bg-slate-700 text-slate-400 border-none";
  };

  return (
    <span
      className={`
        font-display text-xs uppercase px-1.5 py-0.5 rounded-sm
        ${getVariantClasses()}
      `}
    >
      {label}
    </span>
  );
}
