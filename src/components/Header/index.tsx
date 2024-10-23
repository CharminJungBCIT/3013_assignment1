import styles from "./header.module.css";
import { uppercase } from "../../helpers/stringHelpers";
import React, { useState } from "react";
import { TAssignment } from "../../types/types";
import { AiOutlinePlusCircle } from "react-icons/ai";

type Props = {
  setAssignmentList: React.Dispatch<React.SetStateAction<TAssignment[]>>;
};

export function Header({ setAssignmentList }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && dueDate.trim()) {
      setAssignmentList((prev) => [...prev, { id: Date.now(), title: inputValue, completed: false, dueDate }]);
      setInputValue("");
      setDueDate("");
    }
  };

  return (
    <header className={styles.header}>
      <h1>{uppercase("bcit")} Assignment Tracker</h1>
      <form className={styles.newAssignmentForm} onSubmit={handleSubmit}>
        <input
          placeholder="Add a new assignment"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <input
          placeholder="Due date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button type="submit" disabled={!inputValue.trim() || !dueDate.trim()}>
          Create <AiOutlinePlusCircle size={20} />
        </button>
      </form>
    </header>
  );
}