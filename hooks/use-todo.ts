import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

const STORAGE_KEY = "@todo_app_tasks";

export function useTodo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (e) {
      console.error("Failed to load todos", e);
    } finally {
      setLoading(false);
    }
  };

  const saveTodos = async (newTodos: Todo[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
      setTodos(newTodos);
    } catch (e) {
      console.error("Failed to save todos", e);
    }
  };

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    saveTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos(newTodos);
  };

  const deleteTodo = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    saveTodos(newTodos);
  };

  const updateTodo = (id: string, text: string) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text } : todo
    );
    saveTodos(newTodos);
  };

  return {
    todos,
    loading,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
  };
}
