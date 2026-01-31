import { PageLayoutProps } from "./PageLayout.types";
import {
  LayoutWrapper,
  MainContent,
  BackgroundGlow,
  GlowOrb,
} from "./PageLayout.styles";
import SideBar from "../SideBar";
import { useTheme } from "styled-components";
import { LaunchSequenceTheme } from "../../providers/LaunchSequenceThemeProvider/LaunchSequenceThemeProvider.types";

export default function PageLayout({
  children,
  activeNavItem = "dashboard",
}: PageLayoutProps) {
  const theme = useTheme() as LaunchSequenceTheme;

  return (
    <LayoutWrapper>
      <SideBar activeItem={activeNavItem} />
      <MainContent>{children}</MainContent>
      <BackgroundGlow>
        <GlowOrb
          $color={theme.colors.brand.primary}
          $size="50%"
          $position={{ top: "-10%", right: "-10%" }}
          $blur="150px"
        />
        <GlowOrb
          $color={theme.colors.brand.tertiary}
          $size="40%"
          $position={{ bottom: "-10%", left: "-10%" }}
          $blur="120px"
        />
      </BackgroundGlow>
    </LayoutWrapper>
  );
}
