export type HeaderProps = {
  stats?: HeaderStats;
  environment?: string;
  environments?: string[];
  onEnvironmentChange?: (env: string) => void;
  onCreateFlag?: () => void;
};

export type HeaderStats = {
  totalFlags: number;
  activeFlags: number;
};
