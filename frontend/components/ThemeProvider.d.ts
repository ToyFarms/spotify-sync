/// <reference types="react" />
type Theme = "dark" | "light" | "system";
type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};
export default function ThemeProvider({ children, defaultTheme, storageKey, ...props }: {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
}): import("react/jsx-runtime").JSX.Element;
export declare function useTheme(): ThemeProviderState;
export {};
