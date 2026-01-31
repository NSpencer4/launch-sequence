import { StatusBarProps } from "./StatusBar.types";
import {
  StyledStatusBar,
  StatusItem,
  StatusDot,
  StatusText,
  StatusIcon,
} from "./StatusBar.styles";

export default function StatusBar({
  syncStatus = "operational",
  showKeyboardShortcuts = true,
}: StatusBarProps) {
  const statusLabels = {
    operational: "Live Sync Status: OPERATIONAL",
    syncing: "Live Sync Status: SYNCING",
    error: "Live Sync Status: ERROR",
  };

  return (
    <StyledStatusBar>
      <StatusItem>
        <StatusDot $status={syncStatus} />
        <StatusText>{statusLabels[syncStatus]}</StatusText>
      </StatusItem>

      {showKeyboardShortcuts && (
        <StatusItem>
          <StatusIcon>info</StatusIcon>
          <StatusText>Keyboard Shortcuts Active</StatusText>
        </StatusItem>
      )}
    </StyledStatusBar>
  );
}
