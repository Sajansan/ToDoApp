import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export function useTodo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();

    // Set up real-time subscription
    const subscription = supabase
      .channel("public:TodoList")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "TodoList" },
        () => {
          fetchTodos();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchTodos = async () => {
    try {
      const { data, error } = await supabase
        .from("TodoList")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        setTodos(
          data.map((item) => ({
            id: item.id.toString(),
            text: item.name,
            completed: item.isCompleted,
            createdAt: item.created_at,
          }))
        );
      }
    } catch (e) {
      console.error("Failed to fetch todos", e);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (text: string) => {
    try {
      const { error } = await supabase
        .from("TodoList")
        .insert([{ name: text, isCompleted: false }]);

      if (error) throw error;
      // fetchTodos will be called by subscription or manually if no real-time
    } catch (e) {
      console.error("Failed to add todo", e);
    }
  };

  const toggleTodo = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      const { error } = await supabase
        .from("TodoList")
        .update({ isCompleted: !todo.completed })
        .eq("id", parseInt(id));

      if (error) throw error;
    } catch (e) {
      console.error("Failed to toggle todo", e);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const { error } = await supabase
        .from("TodoList")
        .delete()
        .eq("id", parseInt(id));

      if (error) throw error;
    } catch (e) {
      console.error("Failed to delete todo", e);
    }
  };

  const updateTodo = async (id: string, text: string) => {
    try {
      const { error } = await supabase
        .from("TodoList")
        .update({ name: text })
        .eq("id", parseInt(id));

      if (error) throw error;
    } catch (e) {
      console.error("Failed to update todo", e);
    }
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
