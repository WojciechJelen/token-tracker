import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    primary: string;
    accentSecondary: string;
    accent: string;
    text: string;
    background: string;
    tableHeaderBackground: string;
    tableHeaderText: string;
    warning: string;
  }
}
