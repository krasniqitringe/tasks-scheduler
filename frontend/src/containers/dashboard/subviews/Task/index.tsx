import Board from "@/components/Board/Board";

export default function Task() {
  return (
    <div className="container task-wrapper">
      <div className="title-wrapper">
        <h3 className="title">🔥 Task</h3>
      </div>

      <div className="boards-wrapper">
        <Board title="Backlog" />
        <Board title="To Do" />
        <Board title="In Progress" />
        <Board title="Review" />
      </div>
    </div>
  );
}
