import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useTheme } from "@/constants/ThemeContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const { themeMode, setThemeMode } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: theme.icon + "20" }]}>
          <IconSymbol name="house.fill" size={40} color={theme.tint} />
        </View>
        <Text style={[styles.name, { color: theme.text }]}>User Name</Text>
        <Text style={[styles.email, { color: theme.icon }]}>
          user@example.com
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.icon }]}>
          Appearance
        </Text>

        <TouchableOpacity
          style={[styles.option, { borderBottomColor: theme.icon + "20" }]}
          onPress={() => setThemeMode("light")}
        >
          <Text style={[styles.optionLabel, { color: theme.text }]}>
            Light Mode
          </Text>
          {themeMode === "light" && (
            <IconSymbol
              name="checkmark.circle.fill"
              size={20}
              color={theme.tint}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, { borderBottomColor: theme.icon + "20" }]}
          onPress={() => setThemeMode("dark")}
        >
          <Text style={[styles.optionLabel, { color: theme.text }]}>
            Dark Mode
          </Text>
          {themeMode === "dark" && (
            <IconSymbol
              name="checkmark.circle.fill"
              size={20}
              color={theme.tint}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => setThemeMode("system")}
        >
          <Text style={[styles.optionLabel, { color: theme.text }]}>
            System Default
          </Text>
          {themeMode === "system" && (
            <IconSymbol
              name="checkmark.circle.fill"
              size={20}
              color={theme.tint}
            />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.icon }]}>
          Account
        </Text>
        <TouchableOpacity style={styles.option}>
          <Text style={[styles.optionLabel, { color: theme.text }]}>
            Edit Profile
          </Text>
          <IconSymbol name="chevron.right" size={20} color={theme.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.dangerOption}>
          <Text style={styles.dangerText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    alignItems: "center",
    padding: 20,
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
  },
  email: {
    fontSize: 14,
    marginTop: 5,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 10,
    letterSpacing: 1,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  optionLabel: {
    fontSize: 16,
  },
  dangerOption: {
    marginTop: 20,
    paddingVertical: 15,
    alignItems: "center",
  },
  dangerText: {
    color: "#EA4335",
    fontSize: 16,
    fontWeight: "600",
  },
});
