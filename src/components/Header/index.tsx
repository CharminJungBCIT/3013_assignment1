import React, { useState } from 'react';
import { TAssignment } from '../../types/types';

interface HeaderProps {
  addAssignment: (assignment: TAssignment) => void;
}

export const Header: React.FC<HeaderProps> = ({ addAssignment }) => {
  const [title, setTitle] = useState('');

  const handleAddAssignment = () => {
    const newAssignment: TAssignment = {
      id: Date.now(),
      title,
      completed: false,
    };
    addAssignment(newAssignment);
    setTitle('');
  };

  return (
    <header>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Assignment"
      />
      <button onClick={handleAddAssignment}>Add Assignment</button>
    </header>
  );
};