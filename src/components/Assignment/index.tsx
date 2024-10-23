import React, { useState } from "react";
import styles from "./assignment.module.css";
import { TbTrash } from "react-icons/tb";
import { TAssignment } from "../../types/types";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

type Props = {
  assignment: TAssignment;
  setAssignmentList: React.Dispatch<React.SetStateAction<TAssignment[]>>;
  toggleComplete: (id: number) => void;
  index: number;
};

export function Assignment({ assignment, setAssignmentList, toggleComplete, index }: Props) {
  const [dueDate, setDueDate] = useState<Date | undefined>(assignment.dueDate);

  const handleDelete = () => {
    setAssignmentList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCompletionToggle = () => {
    toggleComplete(assignment.id);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setDueDate(date);
    setAssignmentList((prev) =>
      prev.map((item) =>
        item.id === assignment.id ? { ...item, dueDate: date } : item
      )
    );
  };

  const calculateDaysLeft = () => {
    if (!dueDate) return "";
    const today = new Date();
    const timeDiff = dueDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff < 0) return "Due: Now"; // Past due
    if (daysDiff === 1) return "Tomorrow"; // One day left
    return `${daysDiff} days left`; // More than one day left
  };

  const daysLeft = calculateDaysLeft();
  const bubbleStyle = daysLeft === "Tomorrow"
    ? styles.dueSoon
    : daysLeft === "Due: Now"
    ? styles.dueNow
    : styles.dueDays;

  return (
    <div className={`${styles.assignment} ${assignment.completed ? styles.completed : ""}`}>
      <button className={styles.checkContainer} onClick={handleCompletionToggle}>
        {assignment.completed ? (
          <div className={`${styles.checkmark} ${styles.completed}`}>✔</div>
        ) : (
          <div className={`${styles.circle}`} />
        )}
      </button>

      <p className={assignment.completed ? styles.textCompleted : ""}>{assignment.title}</p>

      <div className={styles.dueDateContainer}>
        <DayPicker onDayClick={handleDateSelect} selected={dueDate} />
        <span className={`${styles.dueDateBubble} ${bubbleStyle}`}>
          {daysLeft}
        </span>
      </div>

      <button className={styles.deleteButton} onClick={handleDelete}>
        <TbTrash size={20} />
      </button>
    </div>
  );
}
