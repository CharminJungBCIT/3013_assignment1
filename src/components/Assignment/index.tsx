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

export function Assignment({ assignment, setAssignmentList, index }: Props) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [dueDate, setDueDate] = useState<Date | undefined>();

  const handleDelete = () => {
    setAssignmentList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCompletionToggle = () => {
    setIsCompleted((prev) => !prev);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setDueDate(date);
  };

  const calculateDaysLeft = () => {
    if (!dueDate) return "";
    const today = new Date();
    const timeDiff = dueDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff < 0) return "Due: Now";
    if (daysDiff === 1) return "Tomorrow";
    return `${daysDiff} days left`;
  };

  return (
    <div className={`${styles.assignment} ${isCompleted ? styles.completed : ""}`}>
      <button className={styles.checkContainer} onClick={handleCompletionToggle}>
        {isCompleted ? (
          <div className={`${styles.checkmark} ${styles.completed}`}>✔</div>
        ) : (
          <div className={`${styles.circle}`} />
        )}
      </button>

      <p className={isCompleted ? styles.textCompleted : ""}>{assignment.title}</p>

      <div className={styles.dueDateContainer}>
        <DayPicker onDayClick={handleDateSelect} selected={dueDate} />
        <span
          className={`${styles.dueDateBubble} ${
            calculateDaysLeft() === "Tomorrow" || calculateDaysLeft() === "Due: Now"
              ? styles.dueSoon
              : ""
          }`}
        >
          {calculateDaysLeft()}
        </span>
      </div>

      <button className={styles.deleteButton} onClick={handleDelete}>
        <TbTrash size={20} />
      </button>
    </div>
  );
}
