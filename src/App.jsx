import { useState, useEffect } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Input from "@mui/material/Input";

function App() {
  const [tasks, setTasks] = useState([])
  const [text, setText] = useState("")
  const [editIndex, setEditIndex] = useState(-1)
  const [updatedText, setUpdatedText] = useState("")
  const [successAlert, setSuccessAlert] = useState(false)
  const [errorAlert, setErrorAlert] = useState(false)
  const [updateAlert, setUpdateAlert] = useState(false)

  useEffect(() => {
    let successTimeout, errorTimeout, updateTimeout;

    if (successAlert) {
      successTimeout = setTimeout(() => {
        setSuccessAlert(false);
      }, 3000);
    }

    if (errorAlert) {
      errorTimeout = setTimeout(() => {
        setErrorAlert(false);
      }, 3000);
    }
    if (updateAlert) {
      errorTimeout = setTimeout(() => {
        setUpdateAlert(false);
      }, 3000);
    }

    return () => {
      clearTimeout(successTimeout);
      clearTimeout(errorTimeout);
      clearTimeout(updateTimeout);
    };
  }, [successAlert, errorAlert,updateAlert]);

  const handleSubmit = () => {
    if (text.trim() !== "") {
      setTasks([...tasks, { text: text, isEditing: false }]);
      setText("");
      setSuccessAlert(true);
    }
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
    setErrorAlert(true);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setUpdatedText(tasks[index].text);
  };

  const handleSaveEdit = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = updatedText;
    updatedTasks[index].isEditing = false;
    setTasks(updatedTasks);
    setEditIndex(-1);
    setUpdateAlert(true)
  };

  return (
    <div className="bg-[#e0e7ff] min-h-[100vh]">
      <div className="h-[5vh]">
        {successAlert && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert
              icon={<FaCheck fontSize="inherit" />}
              variant="filled"
              severity="info"
              onClose={() => {
                setSuccessAlert(false);
              }}>
              Task Added
            </Alert>
          </Stack>
        )}

        {errorAlert && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert
              icon={<RxCross1 fontSize="inherit" />}
              variant="filled"
              severity="error"
              onClose={() => {
                setErrorAlert(false);
              }}>
              Task Deleted
            </Alert>
          </Stack>
        )}

        {updateAlert && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert
              icon={<RxUpdate fontSize="inherit" />}
              variant="filled"
              severity="success"
              onClose={() => {
                setErrorAlert(false);
              }}>
              Task Updated
            </Alert>
          </Stack>
        )}
      </div>
      <h1 className="text-4xl text-center py-[1rem] text-[#374151] font-bold">
        Todo App
      </h1>
      <div className="relative mt-[4rem] mx-[1rem] lg:mx-auto lg:max-w-[35rem]">
        <Input
          type="text"
          sx={{
            fontWeight: "700",
            letterSpacing: "2px",
            color: "#475569",
            borderRadius: "8px",
          }}
          className="p-[1rem] bg-[#f0f9ff]"
          fullWidth
          required={true}
          value={text}
          placeholder="Enter Your Task"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <div
          onClick={handleSubmit}
          className="absolute top-0 right-0 bottom-0 flex items-center justify-center border-2 rounded border-[#22d3ee] cursor-pointer w-[4.4rem] ps-[1rem] pe-[2rem] h-[2rem]  me-[1rem] mt-[0.9rem]">
          <FaArrowRightLong size={26} color="#22d3ee" />
        </div>
      </div>

      <div className="tasks mt-[5rem]">
        {tasks.map((task, index) => (
          <div
            key={index}
            className={`${
              index % 2 === 0 ?  "bg-[#86efac]": "bg-[#f7fee7]"
            } mt-[1rem] lg:mx-10 mx-1 rounded-lg`}>
            <div className="flex justify-between py-[1.5rem] mx-[1rem] lg:mx-[3rem]">
              {editIndex === index ? (
                <Input
                  type="text"
                  className="border-2 w-1/2 bg-[#e2e8f0]"
                  sx={{ fontWeight: "700", paddingLeft: "9px" }}
                  value={updatedText}
                  onChange={(e) => setUpdatedText(e.target.value)}
                />
              ) : (
                <p className="text-slate-600 tracking-wider font-bold">
                  {task.text}
                </p>
              )}
              <div className="flex gap-[0.9rem] lg:gap-[1.3rem]">
                {editIndex === index ? (
                  <FaCheck
                    size={window.innerWidth > 768 ? 40 : 34}
                    className="cursor-pointer hover:bg-[#8b5cf6]"
                    style={{
                      backgroundColor: "#c4b5fd",
                      padding: "8px",
                      borderRadius: "10px",
                    }}
                    onClick={() => handleSaveEdit(index)}
                  />
                ) : (
                  <MdEdit
                    size={window.innerWidth > 768 ? 40 : 34}
                    className="cursor-pointer hover:bg-[#8b5cf6]"
                    style={{
                      backgroundColor: "#c4b5fd",
                      padding: "8px",
                      borderRadius: "10px",
                    }}
                    onClick={() => handleEdit(index)}
                  />
                )}
                <MdDelete
                  size={window.innerWidth > 768 ? 40 : 34}
                  className="cursor-pointer hover:bg-[#ec4899]"
                  onClick={() => handleDelete(index)}
                  style={{
                    backgroundColor: "#be123c",
                    padding: "8px",
                    borderRadius: "10px",
                    color: "white",
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
