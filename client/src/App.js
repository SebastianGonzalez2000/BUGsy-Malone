import "./App.css";
import { useState } from "react";
import Axios from "axios";
const PORT = 3500;

function App() {
  const [bugId, setBugId] = useState(0);
  const [devId, setDevId] = useState(0);
  const [description, setDescription] = useState("");

  const [bugList, setBugList] = useState([]);

  const [newDevId, setNewDevId] = useState(0);

  const handleCreateBug = () => {
    Axios.post(`http://localhost:${PORT}/bugs/modify_bugs`, {
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
    Axios.get(`http://localhost:${PORT}/bugs/modify_bugs`).then((res) => {
      setBugList(res.data);
    });
  };

  const handleUpdateDevId = (bugId) => {
    Axios.put(`http://localhost:${PORT}/bugs/modify_bugs`, {
      bugId: bugId,
      devId: newDevId,
    }).then((res) => {
      setBugList(
        bugList.map((val) => {
          return val.bugId === bugId
            ? {
                bugId: val.bugId,
                devId: newDevId,
                description: val.description,
              }
            : val;
        })
      );
    });
  };

  const handleDeleteBug = (bugId) => {
    Axios.delete(`http://localhost:${PORT}/bugs/modify_bugs/${bugId}`).then(
      (res) => {
        setBugList(
          bugList.filter((val) => {
            return val.bugId !== bugId;
          })
        );
      }
    );
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
                <div className="BugInfo">
                  <label>Bug ID:</label>
                  <h3>{val.bugId}</h3>
                  <label>Dev ID:</label>
                  <h3>{val.devId}</h3>
                  <label>Description:</label>
                  <p>{val.description}</p>
                </div>

                <div className="Updates">
                  <input
                    type="number"
                    onChange={(event) => {
                      setNewDevId(event.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      handleUpdateDevId(val.bugId);
                    }}
                  >
                    Update Dev Id
                  </button>
                  <button
                    onClick={() => {
                      handleDeleteBug(val.bugId);
                    }}
                  >
                    Delete Bug
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
