import { HeaderProps } from "./Header.types";
import Icon from "../Icon";

const defaultEnvironments = [
  "PRODUCTION_GLOBAL",
  "STAGING_US_EAST",
  "DEV_LOCAL",
];

export default function Header({
  stats = { totalFlags: 1248, activeFlags: 912 },
  environment = "PRODUCTION_GLOBAL",
  environments = defaultEnvironments,
  onEnvironmentChange,
  onCreateFlag,
}: HeaderProps) {
  return (
    <header className="h-20 border-b border-slate-700 px-8 flex items-center justify-between bg-background-dark/30 backdrop-blur-sm">
      {/* Stats Section */}
      <div className="flex items-center gap-12">
        {/* Total Flags */}
        <div className="flex flex-col">
          <span className="font-display text-sm uppercase tracking-widest text-slate-400">
            Total Flags
          </span>
          <span className="font-display text-2xl text-primary glow-text">
            {stats.totalFlags.toLocaleString()}
          </span>
        </div>

        {/* Active Flags */}
        <div className="flex flex-col">
          <span className="font-display text-sm uppercase tracking-widest text-slate-400">
            Active Flags
          </span>
          <span className="font-display text-2xl text-slate-200">
            {stats.activeFlags.toLocaleString()}
          </span>
        </div>

        {/* Environment Section */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-display text-sm uppercase tracking-widest text-slate-400">
              Environment
            </span>
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          </div>
          <select
            value={environment}
            onChange={(e) => onEnvironmentChange?.(e.target.value)}
            className="bg-transparent border-none text-primary font-display text-base p-0 cursor-pointer focus:outline-none [&>option]:bg-background-dark"
          >
            {environments.map((env) => (
              <option key={env} value={env}>
                {env}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-6">
        <button className="bg-transparent border-none p-2 cursor-pointer text-slate-400 transition-colors duration-200 hover:text-primary">
          <Icon name="settings" size="md" />
        </button>
        <button
          onClick={onCreateFlag}
          className="flex items-center gap-2 bg-secondary text-black border border-white/20 px-6 py-2.5 font-display text-base font-bold tracking-widest cursor-pointer transition-all duration-200 hover:shadow-neon-gold"
        >
          <Icon name="add_circle" size="sm" />
          CREATE NEW FLAG
        </button>
      </div>
    </header>
  );
}
