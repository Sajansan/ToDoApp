import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Todo, useTodo } from "@/hooks/use-todo";
import { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function TasksScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo } = useTodo();
  const [inputText, setInputText] = useState("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editText, setEditText] = useState("");

  const handleAdd = () => {
    if (inputText.trim()) {
      addTodo(inputText.trim());
      setInputText("");
    }
  };

  const startEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setEditText(todo.text);
  };

  const handleUpdate = () => {
    if (editingTodo && editText.trim()) {
      updateTodo(editingTodo.id, editText.trim());
      setEditingTodo(null);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>My Tasks</Text>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View
            style={[
              styles.todoItem,
              {
                backgroundColor: theme.background,
                borderBottomColor: theme.icon + "20",
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => toggleTodo(item.id)}
              style={styles.checkbox}
            >
              <IconSymbol
                name={
                  item.completed ? "checkmark.circle.fill" : "plus.circle.fill"
                }
                size={24}
                color={item.completed ? "#34A853" : theme.icon}
              />
            </TouchableOpacity>

            <View style={styles.textContainer}>
              <Text
                style={[
                  styles.todoText,
                  { color: theme.text },
                  item.completed && styles.completedText,
                ]}
              >
                {item.text}
              </Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                onPress={() => startEdit(item)}
                style={styles.actionButton}
              >
                <IconSymbol
                  name="square.and.pencil"
                  size={24}
                  color="#4285F4"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteTodo(item.id)}
                style={styles.actionButton}
              >
                <IconSymbol name="trash.fill" size={24} color="#EA4335" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <IconSymbol
              name="list.bullet"
              size={64}
              color={theme.icon + "40"}
            />
            <Text style={[styles.emptyText, { color: theme.icon }]}>
              No tasks yet
            </Text>
          </View>
        }
      />

      <View style={{ height: 100 }} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        style={styles.inputWrapper}
      >
        <View
          style={[
            styles.inputContainer,
            { backgroundColor: theme.cardBackground },
          ]}
        >
          <TextInput
            style={[styles.input, { color: theme.text }]}
            placeholder="Add a new task..."
            placeholderTextColor={theme.icon}
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleAdd}
          />
          <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
            <IconSymbol name="plus.circle.fill" size={28} color="#4285F4" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <Modal visible={!!editingTodo} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View
            style={[styles.modalContent, { backgroundColor: theme.background }]}
          >
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              Edit Task
            </Text>
            <TextInput
              style={[
                styles.modalInput,
                { color: theme.text, borderColor: theme.icon + "40" },
              ]}
              value={editText}
              onChangeText={setEditText}
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => setEditingTodo(null)}
                style={styles.modalButton}
              >
                <Text style={{ color: theme.icon }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleUpdate}
                style={[styles.modalButton, styles.saveButton]}
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  checkbox: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  todoText: {
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: "line-through",
    opacity: 0.5,
  },
  actions: {
    flexDirection: "row",
  },
  actionButton: {
    marginLeft: 15,
  },
  inputWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  addButton: {
    marginLeft: 10,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 100,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
  },
  modalInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginLeft: 10,
  },
  saveButton: {
    backgroundColor: "#4285F4",
  },
});
