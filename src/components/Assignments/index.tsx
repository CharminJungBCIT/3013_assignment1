import React, { useState } from "react";
import { TAssignment } from "../../types/types";
import styles from "./assignments.module.css";

interface AssignmentsProps {
  assignmentList: TAssignment[];
  setAssignmentList: React.Dispatch<React.SetStateAction<TAssignment[]>>;
}

export const Assignments: React.FC<AssignmentsProps> = ({ assignmentList, setAssignmentList }) => {
  const [newAssignment, setNewAssignment] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAssignment(e.target.value);
  };

  const addAssignment = () => {
    if (newAssignment.trim() === "") return;

    const newAssignmentObj: TAssignment = {
      id: Date.now(),
      title: newAssignment,
      completed: false,
    };

    setAssignmentList([...assignmentList, newAssignmentObj]);
    setNewAssignment("");
  };

  const toggleComplete = (id: number) => {
    setAssignmentList(
      assignmentList.map((assignment) =>
        assignment.id === id ? { ...assignment, completed: !assignment.completed } : assignment
      )
    );
  };

  const createdAssignmentsCount = assignmentList.length;
  const completedAssignmentsCount = assignmentList.filter(assignment => assignment.completed).length;

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={newAssignment}
        onChange={handleInputChange}
        placeholder="Enter assignment"
        className={styles.inputField}
      />
      <button onClick={addAssignment} className={styles.button}>Create</button>
      <div>
        <p>Created Assignments: {createdAssignmentsCount}</p>
        <p className={styles.textPurple}>Completed Assignments: {completedAssignmentsCount} of {createdAssignmentsCount}</p>
        <span> 1 of 1</span>
      </div>
      <ul className={styles.List}>
        {assignmentList.map((assignment) => (
          <li
            key={assignment.id}
            className={`${styles.assignmentItem} ${assignment.completed ? styles.completed : ""}`}
            onClick={() => toggleComplete(assignment.id)}
          >
            {assignment.title}
          </li>
        ))}
      </ul>
    </div>
  );
};