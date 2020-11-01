import React, { useState, useEffect } from "react";

import api from './services/api'
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(()=>{
    api.get('repositories')
      .then(response => {
        console.log(response.data)
        setRepositories(response.data)
      })
  }, [])

  async function handleAddRepository() {
    const repository = {
      title: `Repository ${Date.now()}`,
      url: "http://www.meurepo.com",
      techs: [
        "Node", "Express"
      ],
      likes: 5
    }

    const response = await api.post('repositories', repository)

    setRepositories([...repositories, response.data])

  }
  

  async function handleRemoveRepository(id) {
    try {
      api.delete(`repositories/${id}`)
      setRepositories(repositories.filter(rep => rep.id !== id))
    } catch (error) {
      console.error(error)      
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>(
          <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
