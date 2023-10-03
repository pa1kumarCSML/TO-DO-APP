import React, { useEffect, useState } from 'react';
import './App.css'
import axios from 'axios';

function App() {
  const baseURL = 'http://localhost:5000/api/todo/';
  const [todoList, setTodoList] = useState([]);
  const [filterTodoList, setFilterTodoList] = useState([])
  const [activeTab, setActiveTab] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    // Clear input fields when closing the popup
    setTitle('');
    setDescription('');
  };


  const postData = () => {
    // POST request example
    const newPost = {
      title: title,
      description: description,
      status: true
    };

    axios
      .post(baseURL, newPost)
      .then((res) => {

        setTodoList(todoList => [...todoList, res.data]);
        //updateFilterData(activeTab);
        setTitle('');
        setDescription('');
        closePopup();
      })
      .catch((error) => {
        closePopup();
      });
  };

  const updateData = (id) => {
    // PUT request example (update an existing resource)

    const newPost = todoList.filter((post) => post._id === id);
    newPost[0].status = false;

    axios
      .put(baseURL + id, newPost[0])
      .then((res) => {
        setTodoList(todoList => todoList.map((todo) => {
          if (todo._id === id) {
            todo.status = false
          }
          return todo
        }));
        //updateFilterData(true);
      })
      .catch((err) => {
      });
  };

  const deleteData = (id) => {
    // DELETE request example (delete an existing resource)
    axios
      .delete(baseURL + id)
      .then(() => {
        // const updatedList = todoList.filter((post) => post._id !== id);
        setTodoList(todoList => todoList.filter((post) => post._id !== id));
        //updateFilterData(activeTab);
      })
      .catch((err) => {
      });
  };

  const getTodoList = () => {
    axios
      .get(baseURL)
      .then((res) => {
        setActiveTab(true);
        setTodoList(res.data);
      })
      .catch((error) => {
      });
  }

  const handleTabChange = (tab) => {
    closePopup();
    setActiveTab(tab);
    //updateFilterData(tab);
  };

  useEffect(() => {
    getTodoList();
  }, []);

  useEffect(() => {
    const updateFilterData = (tab) => {
      const filterTodoList = todoList.filter((item) => item.status === tab);
      setFilterTodoList(filterTodoList);
    }
    updateFilterData(activeTab);
  }, [activeTab, todoList]);

  return (
    <div>
      <div className='headerr'>
        <h1>TO-DO Tracker</h1>
      </div>

      <nav className="navbar">
        <button
          className={activeTab ? 'active' : ''}
          onClick={() => handleTabChange(true)}
        >
          Pending Tasks
        </button>
        <button
          className={activeTab === false ? 'active' : ''}
          onClick={() => handleTabChange(false)}
        >
          Completed Tasks
        </button>
      </nav>
      <div className="container">
        {
          // isLoading ? (
          //   <p>Loading...</p>
          // ) : error ? (
          //   <p>Error: {error.message}</p>
          // ) : (
          <>
            {activeTab && (
              <button className='add-task' onClick={openPopup}>Add Task</button>
            )}
            {showPopup && (
              <div className="popup">
                <label>Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title"
                />
                <label>Description:</label>
                <textarea className='txt-area'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description"
                />
                <button className='btn' onClick={postData}>Add</button>
                <button className='btn-red' onClick={closePopup}>Cancel</button>
              </div>
            )}
            <div className="card-list">
              {filterTodoList.map((item) => (
                <div className="card" key={item._id}>
                  <h3>Title: {item.title}</h3>
                  <p>Description: {item.description}</p>
                  {activeTab && (
                    <>
                      <button className='btn' onClick={() => updateData(item._id)}>Done</button>
                      <button className='btn-red' onClick={() => deleteData(item._id)}>Delete</button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </>
          //)
        }
      </div >
    </div >
  );
}

export default App;