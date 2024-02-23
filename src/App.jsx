import "./App.css";
import { useState,useEffect } from "react";
import axios from "axios";

function App() {
  const [book,setBook]=useState([]);
  const [query, setQuery] = useState("");
  
  const getBooklist=async ()=>{
    const response=await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}`
    )
    if (response.data.items && Array.isArray(response.data.items)) {
      setBook(response.data.items);
    };
  }

  useEffect(() => {
    getBooklist();
  }, [query]);

  return (
  <div className="App">
    <h1>Find a Book</h1>
    <div>
      <input value={query} onChange={(event)=>{
        setQuery(event.target.value);
        console.log(event.target.value)}}></input>
    </div>
    <ul>
      {book.map((item)=>{
        return(
          <li>{item.volumeInfo.title}</li>
        )
      })}
    </ul>
  </div>
  );
}

export default App;
