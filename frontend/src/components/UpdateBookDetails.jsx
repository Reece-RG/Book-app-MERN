import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

class UpdateBookDetails extends Component { //use of class component as had difficulties using functional component to modify received data in inputs
  constructor(props){
    super(props);
    this.state = { //initialising object properties
      title: "",
      isbn: "",
      author: "",
      description: "",
      publishedDate: "",
      publisher: ""
    };
  }

  componentDidMount(){
    axios
    .get("http://localhost:8000/api/books/"+ window.location.href.split("/").[4]) //received data via get request
    .then(res => {
      this.setState({ //using data from first slice
        title: res.data[0].title,
        isbn: res.data[0].isbn,
        author: res.data[0].author,
        description: res.data[0].description,
        publishedDate: res.data[0].publishedDate,
        publisher: res.data[0].publisher
      })
    })
    .catch(err => {
      console.log("Error from UpdateBookInfo");
    });
  };

  onChange = event => {
    this.setState({[event.target.name]: event.target.value}); //set targeted input to current value
  };

  onSubmit = event => {
    event.preventDefault();
    const data = { //defining data package to be sent
      title: this.state.title,
      isbn: this.state.isbn,
      author: this.state.author,
      description: this.state.description,
      publishedDate: this.state.publishedDate,
      publisher: this.state.publisher
    };
    axios
      .put("http://localhost:8000/api/books/" + window.location.href.split("/").[4], data) //HTTP request to amend current book
      .then(function(res){
        window.location = "/"; //redirect to homepage
      })
      .catch(err => {
        console.log("Error in UpdateBookInfo!");
      })
  };

  render() {
    return (
      <div className="UpdateBookInfo">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Show Book List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Book</h1>
              <p className="lead text-center">
                  Update Book's Info
              </p>
            </div>
          </div>

          <div className="col-md-8 m-auto">
          <form noValidate onSubmit={this.onSubmit}>
            <div className='form-group'>
              <label htmlFor="title">Title</label>
              <input
                type='text'
                placeholder='Title of the Book'
                name='title'
                className='form-control'
                value={this.state.title}
                onChange={this.onChange}
              />
            </div>
            <br />

            <div className='form-group'>
            <label htmlFor="isbn">ISBN</label>
              <input
                type='text'
                placeholder='ISBN'
                name='isbn'
                className='form-control'
                value={this.state.isbn}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="author">Author</label>
              <input
                type='text'
                placeholder='Author'
                name='author'
                className='form-control'
                value={this.state.author}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="description">Description</label>
              <input
                type='text'
                placeholder='Describe this book'
                name='description'
                className='form-control'
                value={this.state.description}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="published_date">Published Date</label>
              <input
                type='date'
                placeholder='published_date'
                name='published_date'
                className='form-control'
                value={this.state.publishedDate}
                onChange={this.onChange}
              />
            </div>
            <div className='form-group'>
            <label htmlFor="publisher">Publisher</label>
              <input
                type='text'
                placeholder='Publisher of this Book'
                name='publisher'
                className='form-control'
                value={this.state.publisher}
                onChange={this.onChange}
              />
            </div>

            <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update Book</button>
            </form>
          </div>

        </div>
      </div>
    );
  };
};

export default UpdateBookDetails;
