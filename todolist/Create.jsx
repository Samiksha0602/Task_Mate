import React, {
  useState,
  useEffect,
} from "react";
import axios from "axios";

function Create({
  fetchTasks,
  editingTask,
  setEditingTask,
}) {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    category: "",
  });

  useEffect(() => {
    if (editingTask) {
      setTaskData(editingTask);
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const url = editingTask
      ? `http://localhost:3001/update/${editingTask._id}`
      : "http://localhost:3001/add";

    const method = editingTask
      ? axios.put
      : axios.post;

    method(url, taskData)
      .then(() => {
        fetchTasks();
        setTaskData({
          title: "",
          description: "",
          dueDate: "",
          category: "",
        });
        setEditingTask(null);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="create_form">
      <input
        name="title"
        placeholder="Title"
        value={taskData.title}
        onChange={handleChange}
      />
      <input
        name="description"
        placeholder="Description"
        value={taskData.description}
        onChange={handleChange}
      />
      <input
        name="dueDate"
        type="date"
        value={taskData.dueDate}
        onChange={handleChange}
      />
      <input
        name="category"
        placeholder="Category"
        value={taskData.category}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>
        {editingTask ? "Update" : "Add"}
      </button>
    </div>
  );
}

export default Create;
