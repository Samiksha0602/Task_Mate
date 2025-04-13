import React, {
  useEffect,
  useState,
} from "react";
import Create from "./Create";
import axios from "axios";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import {
  BsCircleFill,
  BsFillCheckCircleFill,
  BsFillTrashFill,
  BsPencilFill,
} from "react-icons/bs";

function Home() {
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] =
    useState("");
  const [category, setCategory] = useState("");
  const [editingTask, setEditingTask] =
    useState(null);

  const fetchTasks = () => {
    axios
      .get("http://localhost:3001/get")
      .then((res) => setTodos(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleToggle = (id) => {
    axios
      .put(`http://localhost:3001/update/${id}`)
      .then(fetchTasks);
  };

  const handleDelete = (id) => {
    axios
      .delete(
        `http://localhost:3001/delete/${id}`
      )
      .then(fetchTasks);
  };

  const filteredTodos = todos.filter((todo) => {
    return (
      (todo.title
        .toLowerCase()
        .includes(searchQuery) ||
        todo.description
          .toLowerCase()
          .includes(searchQuery)) &&
      (category
        ? todo.category === category
        : true)
    );
  });

  return (
    <div className="home">
      <h2>📋 Task Manager</h2>
      <Create
        fetchTasks={fetchTasks}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
      />
      <div className="filter_bar">
        <SearchBar
          setSearchQuery={setSearchQuery}
        />
        <CategoryFilter
          setCategory={setCategory}
        />
      </div>
      {filteredTodos.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        filteredTodos.map((todo) => (
          <div className="task" key={todo._id}>
            <div
              className="checkbox"
              onClick={() =>
                handleToggle(todo._id)
              }
            >
              {todo.done ? (
                <BsFillCheckCircleFill className="icon" />
              ) : (
                <BsCircleFill className="icon" />
              )}
              <div>
                <p
                  className={
                    todo.done
                      ? "line_through"
                      : ""
                  }
                >
                  {todo.title}
                </p>
                <small>{todo.description}</small>
                <small>
                  Due:{" "}
                  {todo.dueDate?.slice(0, 10)} |
                  Category: {todo.category}
                </small>
              </div>
            </div>
            <div>
              <BsPencilFill
                className="icon edit"
                onClick={() =>
                  setEditingTask(todo)
                }
              />
              <BsFillTrashFill
                className="icon delete"
                onClick={() =>
                  handleDelete(todo._id)
                }
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
