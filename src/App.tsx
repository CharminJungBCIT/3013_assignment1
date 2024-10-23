import { Header } from "./components/Header";
import { Assignments } from "./components/Assignments";
import { useState } from "react";
import { TAssignment } from "./types/types";

function App() {
  const [assignmentList, setAssignmentList] = useState<TAssignment[]>([]);

  return (
    <>
      <Header setAssignmentList={setAssignmentList} />
      <Assignments assignmentList={assignmentList} setAssignmentList={setAssignmentList} />
    </>
  );
}

export default App;