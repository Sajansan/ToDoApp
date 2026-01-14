import { useTheme } from "@/constants/ThemeContext";

export function useColorScheme() {
  const { colorScheme } = useTheme();
  return colorScheme;
}
