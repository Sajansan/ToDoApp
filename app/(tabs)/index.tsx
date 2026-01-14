import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useTodo } from "@/hooks/use-todo";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const { todos } = useTodo();

  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const pending = total - completed;
  const progress = total > 0 ? (completed / total) * 100 : 0;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: theme.text }]}>
          Welcome Back!
        </Text>
        <Text style={[styles.subtitle, { color: theme.icon }]}>
          Here's your productivity overview
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <StatCard
          title="Total"
          value={total}
          icon="list.bullet"
          color="#4285F4"
          theme={theme}
        />
        <StatCard
          title="Pending"
          value={pending}
          icon="paperplane.fill"
          color="#FBBC05"
          theme={theme}
        />
        <StatCard
          title="Done"
          value={completed}
          icon="checkmark.circle.fill"
          color="#34A853"
          theme={theme}
        />
      </View>

      <View
        style={[
          styles.progressCard,
          {
            backgroundColor: theme.cardBackground,
          },
        ]}
      >
        <View style={styles.progressHeader}>
          <Text style={[styles.progressTitle, { color: theme.text }]}>
            Daily Progress
          </Text>
          <Text style={[styles.progressPercentage, { color: "#34A853" }]}>
            {Math.round(progress)}%
          </Text>
        </View>
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${progress}%`, backgroundColor: "#34A853" },
            ]}
          />
        </View>
      </View>

      <View style={styles.recentHeader}>
        <Text style={[styles.recentTitle, { color: theme.text }]}>
          Recent Tasks
        </Text>
      </View>

      <View style={styles.recentList}>
        {todos.slice(0, 5).map((todo) => (
          <View
            key={todo.id}
            style={[
              styles.recentItem,
              { borderBottomColor: theme.icon + "20" },
            ]}
          >
            <IconSymbol
              name={
                todo.completed ? "checkmark.circle.fill" : "paperplane.fill"
              }
              size={18}
              color={todo.completed ? "#34A853" : theme.icon}
            />
            <Text
              numberOfLines={1}
              style={[
                styles.recentItemText,
                { color: theme.text },
                todo.completed && styles.completedText,
              ]}
            >
              {todo.text}
            </Text>
          </View>
        ))}
        {todos.length === 0 && (
          <Text style={[styles.emptyText, { color: theme.icon }]}>
            No tasks yet. Start by adding some!
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

function StatCard({ title, value, icon, color, theme }: any) {
  return (
    <View
      style={[
        styles.statCard,
        {
          backgroundColor: theme.cardBackground,
        },
      ]}
    >
      <IconSymbol name={icon} size={32} color={color} />
      <Text style={[styles.statValue, { color: theme.text }]}>{value}</Text>
      <Text style={[styles.statTitle, { color: theme.icon }]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 30,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    width: (width - 60) / 3,
    padding: 15,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 8,
  },
  statTitle: {
    fontSize: 12,
    marginTop: 2,
  },
  progressCard: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 30,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  progressPercentage: {
    fontSize: 18,
    fontWeight: "700",
  },
  progressBarBg: {
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 5,
  },
  recentHeader: {
    marginBottom: 15,
  },
  recentTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  recentList: {
    marginBottom: 40,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  recentItemText: {
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },
  completedText: {
    textDecorationLine: "line-through",
    opacity: 0.6,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
    fontStyle: "italic",
  },
});
