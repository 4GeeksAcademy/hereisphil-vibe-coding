import SessionView from "./components/SessionView";
import StartButton from "./components/StartButton";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-4">AutoPomo</h1>
        <section className="mb-4">
          <TaskInput />
          <TaskList />
        </section>
        <section className="mb-4">
          <StartButton />
        </section>
        <section>
          <SessionView />
        </section>
      </div>
    </div>
  );
}

export default App;
