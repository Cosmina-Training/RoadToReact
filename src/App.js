import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
    },
    {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
    },
  ];

//isSearched accepts as argument the query looked for 
// and then 
// function isSearched(query) {
//   return function (item) {
//     return !query || item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
//   }
// }

// ES6 Syntactic Sugar 
const isSearched = (query) => (item) => !query || item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1

class App extends Component {
//creating your internal component state 
//  Internal Component state allows you to store, modify and delete properties of your components;
//  Creating a class constructor where i set the initial internal component state; 
  constructor (props) {
    //it is mandatory to use super
    super(props); 
      // this.state = {
      //   list: list
      // }; 
    //ES6 SUgar --- we can use a shorthand to initialize properties in a Object - since the property and the variable has the same name

    this.state = {
      list,
      //define the initial state for the query
      query: '',
    }; 
    //the callback function is bound to the internal static component
    //binding and defining the method
    this.onSearch = this.onSearch.bind(this); 

  }

  //creating the function that gives me access to the input field
  onSearch(event) {
    //using this.setState to manipulate the internal component state
    this.setState({ query: event.target.value}); 
  }

  render() {
    //in react applications you will strictly  follow an unidirectional data flow; 
   //declare a constant and set its value equal to this.state.query
   // in order to retrieve the query property from the internal component and set it as value in the input field; 
   const query = this.state.query; 
    return ( 
    <div className="App col-xs-8 col-md-4">
     <form>
      <div className="input-group mb-3">
          <input type="text" value={query} className="form-control" onChange={this.onSearch}/>
          <div className="input-group-append">
            <span className="input-group-text" id="basic-addon2">Search</span>
          </div>
      </div>
      </form>  
        <ul className="list-group list-group-flush">
      {/* filter the list in order to see if the word match with what is already existnet in the internal static component */}
        { this.state.list.filter(isSearched(query)).map(function(item, key){
          return (
          <div className="card" key={item.objectID}>
            <div className="card-header">
              <li className="list-group-item">
                <span><a href={item.url}>{item.title.toUpperCase()}</a></span>
              </li>
            </div>
            <div className="card-body">  
            <blockquote className="blockquote mb-0">
              <li className="list-group-item">
                <span>Author/s: {item.author}</span>
              </li>
              <li className="list-group-item">
                <span>Comments: {item.num_comments}</span>
              </li>
              <li className="list-group-item">
                <span>Points: {item.points}</span>
              </li>
              </blockquote>
            </div>  
          </div>
          ); 
      })}
      </ul>
  </div>
   ); 
  }
}

export default App;
