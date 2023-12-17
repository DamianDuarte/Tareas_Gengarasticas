import React, { useState, useRef } from "react";

type FormElement = React.FormEvent<HTMLFormElement>;

interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
    taskInput.current?.focus();
  };

  const addTask = (name: string) => {
    const newTastk: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTastk);
  };

  const toggleDoneTask = (i: number) => {
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  };

  const deleteTask = (i: number) => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
  };

  return (
    <div
      className="grid place-items-center h-screen w-screen"
      style={{
        backgroundImage: `url("https://files.cults3d.com/uploaders/16165612/illustration-file/d7ea2efe-a687-4e5c-bc0d-28f6cd5253e5/Christmas03.jpg")`,
      }}
    >
      <div className="grid place-items-center p-4 shadow-sm w-auto mt-4 bg-purple-400 rounded-lg">
        <div className="grid gap-5">
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (newTask.trim() !== "") {
                handleSubmit(e);
              }
            }}
          >
            <input
              className="border border-purple-600 rounded-lg p-4 outline-none ring-0"
              type="text"
              placeholder="Agrega tu tarea"
              autoFocus
              onChange={(e) => setNewTask(e.target.value)}
              value={newTask}
              ref={taskInput}
            />
            <button className="py-2 px-3 bg-purple-600 hover:bg-purple-800 text-white rounded-lg">
              Crear Tarea
            </button>
          </form>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {tasks.map((t: ITask, i: number) => {
          return (
            <div
              className="border-2 border-purple-950 mt-4 bg-white p-8 rounded-lg shadow-lg flex flex-col"
              key={i}
            >
              <h2
                className={`text-purple-800 text-lg font-semibold text-center ${
                  t.done ? "line-through" : ""
                }`}
              >
                {t.name}
              </h2>
              <div className="flex justify-between gap-4 items-center mt-4">
                <button
                  className={`p-0.5 rounded-lg ${
                    t.done ? "bg-green-100" : "bg-red-100"
                  } text-white`}
                  onClick={() => toggleDoneTask(i)}
                >
                  {t.done ? "✅" : "❌"}
                </button>
                <button
                  className="p-0.5 bg-gray-100 text-white rounded-lg"
                  onClick={() => deleteTask(i)}
                >
                  🗑
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
