import React from 'react';
import { TAssignment } from '../../types/types';
import styles from './assignment.module.css';

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

  return (
    <div>
      <header className={styles.header}>
        <div>
          <p>Created Assignments</p>
          <span>{assignmentList.length}</span>
        </div>

        <div>
          <p className={styles.textPurple}>Completed Assignments</p>
          <span>{assignmentList.filter((a) => a.completed).length} of {assignmentList.length}</span>
        </div>
      </header>
      <ul>
        {assignmentList.map((assignment) => (
          <li key={assignment.id} className={assignment.completed ? styles.completedText : ''}>
            <span>{assignment.title}</span>
            <button onClick={() => toggleComplete(assignment.id)}>
              {assignment.completed ? 'Undo' : 'Complete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};