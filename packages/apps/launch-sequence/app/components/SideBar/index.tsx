import { SideBarProps, NavItemConfig } from "./SideBar.types";

const navItems: NavItemConfig[] = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard", href: "/" },
  { id: "flag-explorer", label: "Flags Index", icon: "list_alt", href: "/flags" },
  { id: "applications", label: "Applications", icon: "apps", href: "/applications" },
  { id: "experiments", label: "Experiments", icon: "science", href: "/experiments" },
  { id: "audit-logs", label: "Audit Logs", icon: "history_edu", href: "/audit-logs" },
];

export default function SideBar({ activeItem = "dashboard" }: SideBarProps) {
  return (
    <aside className="w-64 border-r border-slate-700 bg-background-dark/50 backdrop-blur-md flex flex-col p-6">
      {/* Logo Section */}
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 bg-primary/20 border border-primary/40 flex items-center justify-center rounded-sm text-primary">
          <span className="material-symbols-outlined text-[24px]">layers</span>
        </div>
        <h1 className="font-display text-2xl tracking-tighter text-slate-200">
          LAUNCH<span className="text-primary">SEQUENCE</span>
        </h1>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={`
              flex items-center gap-4 px-4 py-3 rounded no-underline transition-all duration-200 border-l-2
              ${activeItem === item.id
                ? "text-primary bg-primary/10 border-l-primary"
                : "text-slate-400 border-l-transparent hover:text-primary hover:bg-primary/5"
              }
            `}
          >
            <span className="material-symbols-outlined text-[20px]">
              {item.icon}
            </span>
            <span className="font-display text-base tracking-widest uppercase">
              {item.label}
            </span>
          </a>
        ))}
      </nav>

      {/* User Section */}
      <div className="mt-auto pt-6 border-t border-slate-700">
        <div className="flex items-center gap-3 p-2 bg-slate-900/50 rounded-sm">
          <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center border border-primary/30 text-primary">
            <span className="material-symbols-outlined text-[14px]">person</span>
          </div>
          <div className="overflow-hidden">
            <p className="font-display text-sm uppercase tracking-widest text-slate-400">
              Operator
            </p>
            <p className="text-base font-semibold text-slate-200 whitespace-nowrap overflow-hidden text-ellipsis">
              ADMIN_0X92A
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
