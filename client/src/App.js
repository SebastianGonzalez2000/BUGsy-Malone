import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [bugId, setBugId] = useState(0);
  const [devId, setDevId] = useState(0);
  const [description, setDescription] = useState("");

  const [bugList, setBugList] = useState([]);

  const handleCreateBug = () => {
    const PORT = 3500;
    Axios.post(`http://localhost:${PORT}/create_bug`, {
      bugId: bugId,
      devId: devId,
      description: description,
    }).then((res) => {
      console.log(`Created Bug with bug ID: ${bugId}`);
      setBugList([
        ...bugList,
        { bugId: bugId, devId: devId, description: description },
      ]);
    });
  };

  const handleShowBugs = () => {
    const PORT = 3500;
    Axios.get(`http://localhost:${PORT}/get_bugs`).then((res) => {
      setBugList(res.data);
    });
  };

  return (
    <div className="App">
      <div className="DataInput">
        <label>Bug ID:</label>
        <input
          type="number"
          onChange={(event) => {
            setBugId(event.target.value);
          }}
        ></input>
        <br></br>
        <label>Developer ID:</label>
        <input
          type="number"
          onChange={(event) => {
            setDevId(event.target.value);
          }}
        ></input>
        <br></br>
        <label>Description:</label>
        <textarea
          className="Description"
          type="text"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        ></textarea>
        <br></br>
        <button className="CreateButton" onClick={handleCreateBug}>
          Create Bug
        </button>
        <button className="ShowBugs" onClick={handleShowBugs}>
          Show Existing Bugs
        </button>
        <div className="BugsWindow">
          {bugList.map((val, key) => {
            return (
              <div className="Bug" key={val.bugId}>
                <label>Bug ID:</label>
                <h3>{val.bugId}</h3>
                <label>Dev ID:</label>
                <h3>{val.devId}</h3>
                <label>Description:</label>
                <p>{val.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
