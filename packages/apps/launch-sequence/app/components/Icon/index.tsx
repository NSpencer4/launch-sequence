import { IconProps } from "./Icon.types";

const sizeClasses = {
  xs: "text-[14px]",
  sm: "text-[18px]",
  md: "text-[20px]",
  lg: "text-[24px]",
  xl: "text-[32px]",
};

export default function Icon({ name, size = "md", className = "" }: IconProps) {
  return (
    <span
      className={`material-symbols-outlined ${sizeClasses[size]} ${className}`}
    >
      {name}
    </span>
  );
}
