import "styled-components";
import { LaunchSequenceTheme } from "./providers/LaunchSequenceThemeProvider/LaunchSequenceThemeProvider.types";

declare module "styled-components" {
  export interface DefaultTheme extends LaunchSequenceTheme {}
}
