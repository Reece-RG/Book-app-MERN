import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

function ShowBookDetails(){

  const [thisBook, setThisBook] = useState({ //hook into thisBook object, specifying properties
    title: "",
    isbn: "",
    author: "",
    description: "",
    publishedDate: "",
    publisher: ""
  });

  const url = window.location.href;
  const id = url.split('/')[4]; //recuperate id section of url address

useEffect(function(){
 axios
  .get("http://localhost:8000/api/books/" + id) //get request
  .then(function(res){
      setThisBook(res.data[0]); //import data from first slice in array
    })
  .catch(function(err) {
      console.log("Error in ShowBookDetails!");
    })
  });

  function deleteBook () {
    axios
      .delete("http://localhost:8000/api/books/" + id) //delete request
      .then(function(res){
      window.location = "/"; //redirect to homepage
    })
      .catch(function(err) {
      console.log("Error in ShowBookDetails!");
    })
  };

  let BookItem =
  <div>
      <table className="table table-hover table-dark">
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Title</td>
            <td>{thisBook.title}</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Author</td>
            <td>{ thisBook.author }</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>ISBN</td>
            <td>{ thisBook.isbn }</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Publisher</td>
            <td>{ thisBook.publisher }</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Published Date</td>
            <td>{ thisBook.publishedDate }</td>
          </tr>
          <tr>
            <th scope="row">6</th>
            <td>Description</td>
            <td>{ thisBook.description }</td>
          </tr>
        </tbody>
      </table>
    </div>

    return (
      <div className="ShowBookDetails">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <br /> <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Show Book List
              </Link>
            </div>
            <br />
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Book's Record</h1>
              <p className="lead text-center">
                  View Book's Info
              </p>
              <hr /> <br />
            </div>
          </div>
          <div>
            { BookItem }
          </div>

          <div className="row">
            <div className="col-md-6">
              <Link to={"/edit-book/" + id} className="btn btn-outline-success btn-lg btn-block">Edit Book</Link><br />
              </div>
            <div className="col-md-6">
              <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={deleteBook}>Delete Book</button><br />
            </div>
              <br />
            </div>

          </div>
        </div>
    );
}

export default ShowBookDetails;
