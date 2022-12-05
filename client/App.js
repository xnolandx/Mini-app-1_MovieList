import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useContext } from "react";

function App() {
// State Variables
const [movieData, setMovieData] = useState([]);
const [searchTerm, setSearchTerm] = useState([]);
const [filteredData, setFilteredData] = useState([]);
const [addTerm, setAddTerm] = useState('');
const [refresh, setRefresh] = useState(false);


//fetch movie data
useEffect(() => {
  const fetchData = async () => {
    try{
      const response = await fetch("http://localhost:8081/movies")
      const data = await response.json()
      setMovieData(data)
      setFilteredData(data)
    } catch (e) {
      console.log(e)
    }
  }
  fetchData()
}, [refresh])

//Search Bar Functionality

  // Sets the "Search Term" on change of the search text box (default is "")
    const handleSearch = (event) => {
    setSearchTerm(event.target.value)
    } 

  //Filters the data without having to select a "Search By" Category
    useEffect(() => {
      let searchArray = [];
        movieData.forEach((movie) => {
          let movieDataString = JSON.stringify(movie.title)
          if (movieDataString.toLowerCase().includes(searchTerm.toLowerCase())) {
            searchArray.push(movie)
          }
          setFilteredData(searchArray)
        })
    }, [searchTerm])

  // ADD MOVIE
  // Set Add Title
  const handleAdd = (event) => {
    setAddTerm(event.target.value)
  } 
  //Add movie handler
  const addSubmit = (event) => {
    if (addTerm.length !== 0){
      fetch('http://localhost:8081/movies', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "title": `${addTerm}` })
        })
        .then(response => response.json())
        .then(response => console.log(JSON.stringify(response)))
        alert(`"${addTerm}" was successfully added to the movies database.`)
    } else {
      alert('You must enter a Movie Title before adding.')
    }
  }

  // DELETE MOVIE
  // Set Delete Title
  const handleDelete = (event) => {
    let id = event.target.id
    let title = event.target.title
      fetch('http://localhost:8081/movies', {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "id": `${id}` })
        })
        .then(response => response.json())
        .then(response => console.log(JSON.stringify(response)))
        alert(`"${title}" was successfully deleted from the movies database.`)
        
  } 


  return (
    <div className="movies-container">
      <h3>Movies: </h3>

{/* Toggle (user added movies) */}
      Show User Added Movies Only
      <label className="switch">
        <input type="checkbox" 
        onClick={(event) => {console.log(event)}}
        />
        <span className="slider round"></span>
      </label>

{/* Search Bar */}
      <div className="mainsearch">
          <input 
              className="text-search-bar" 
              type='text' 
              placeholder="Search Movies" 
              onChange={(event) => {handleSearch(event)}}
              value={searchTerm}
          />     
      </div>
{/* Movie Title Display */}
       {
        searchTerm.length > 0 && filteredData.length === 0
        ? <div>No Matching Resutls</div>
        : filteredData.map((movie, index) => {
          return (
          <div className='movie-containers' key={index}>

            <div className="movie-titles">
              {movie.title} 
               

              <button className="delete-movie-button" id={movie.id} title={movie.title} onClick={event => {
                handleDelete(event)
                setRefresh(!refresh)
              }}> Delete </button>   

            </div> 
            
          </div>
          )
        })
       }

{/* Add Movie */}
      <div className="add-movie-container">
          <input 
              className="add-movie-text-bar" 
              type='text' 
              placeholder="Add Movie" 
              onChange={(event) => {handleAdd(event)}}
              value={addTerm}
          />     
          <button className="add-movie-button" onClick={event => {
            addSubmit(event)
            setAddTerm('')
            setRefresh(!refresh)
          }}> Add Movie</button>
      </div>



    </div>
  );
}



export default App;
