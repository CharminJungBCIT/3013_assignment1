import React from "react";
import { TAssignment } from "../../types/types";
import styles from "./assignments.module.css";
import { Assignment } from "../Assignment";

interface AssignmentsProps {
  assignmentList: TAssignment[];
  setAssignmentList: React.Dispatch<React.SetStateAction<TAssignment[]>>;
}

export const Assignments: React.FC<AssignmentsProps> = ({ assignmentList, setAssignmentList }) => {
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
    <div className={styles.assignments}>
      <div className={styles.header}>
        <p>Created Assignments: {createdAssignmentsCount}</p>
        <p className={styles.textPurple}>Completed Assignments: {completedAssignmentsCount} of {createdAssignmentsCount}</p>
        <span> 1 of 1</span>
      </div>
    
      <ul className={styles.List}>
        {assignmentList.map((assignment, index) => (
          <Assignment
            key={assignment.id}
            assignment={assignment}
            setAssignmentList={setAssignmentList} 
            toggleComplete={toggleComplete}
            index={index}
          />
        ))}
      </ul>
    </div>
  );
};
