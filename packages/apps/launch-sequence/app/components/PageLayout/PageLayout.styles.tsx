import styled from "styled-components";

export const LayoutWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background: ${({ theme }) => theme.effects.gradient.background};
  color: ${({ theme }) => theme.colors.typography.secondary};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  overflow: hidden;
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const BackgroundGlow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
  opacity: 0.1;
`;

export const GlowOrb = styled.div<{
  $color: string;
  $size: string;
  $position: { top?: string; bottom?: string; left?: string; right?: string };
  $blur: string;
}>`
  position: absolute;
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  background: ${({ $color }) => $color};
  border-radius: 50%;
  filter: blur(${({ $blur }) => $blur});
  ${({ $position }) =>
    Object.entries($position)
      .map(([key, value]) => `${key}: ${value};`)
      .join(" ")}
`;
