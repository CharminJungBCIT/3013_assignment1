import { Header } from "./components/Header";
import { Assignments } from "./components/Assignments";
import { useState } from "react";
import { TAssignment } from "./types/types";

function App() {
  const [assignmentList, setAssignmentList] = useState<TAssignment[]>([]);

  const addAssignment = (assignment: TAssignment) => {
    setAssignmentList([...assignmentList, assignment]);
  };

  return (
    <>
      <Header addAssignment={addAssignment} />
      <Assignments assignmentList={assignmentList} setAssignmentList={setAssignmentList} />
    </>
  );
}

export default App;