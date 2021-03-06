import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './Header'
import HomePage from './HomePage'
import FolderPage from './FolderPage'
import NotePage from './NotePage'
import NotFoundPage from './NotFoundPage'
// import STORE from './dummy-store';
// import NotefulContext from './NotefulContext';
import './App.css'

export default class App extends Component {
  // Set state here - Use this later when the app is ready 
  state = {
    notes: [],
    folders: []
  };

  // Get the data from the API and use setState to reset
  componentDidMount() {
    // Implement 2 fetch request to 2 endpoints 
    const folderURL = 'http://localhost:9090/folders'
    const noteURL = 'http://localhost:9090/notes'
    Promise.all([
      fetch(noteURL),
      fetch(folderURL),
    ])
    .then(([notesRes, foldersRes]) => {
      if (!notesRes.ok){
        // ?? WHAT IS HAPPENING IN HERE? 
        return notesRes.json().then(e => Promise.reject(e));
      }
      if (!foldersRes.ok){
        return foldersRes.json().then(e => Promise.reject(e));
      }
      return Promise.all([notesRes.json(), foldersRes.json()]);
    })
    .then(([notes, folders]) => {
      // console.log(`these are called notes but they are folders. Order matters?`, notes)
      // console.log(folders)
      this.setState({
        notes:notes, 
        folders:folders
      })
    })
    .catch(err => {
      console.log(`Handling the error here: ${err}`)
    })
  }

  // DELETE note request should make a request to /notes/<note-id> - likely needs headers
  deleteHandler = () => {
    //add the logic to delete 
    // If it's a note do one thing, if it's a note delete that
  }

  render() {
    console.log(this.state)
    // create value object from context here
    return (
      // Provider - Wrap everything 
      <div className='App'>
        <>
          <Header />
        </>
        <>
          <Switch>
            {/* Pass the props here as a component. Use a function that returns/renders a component */}
            {/* explicitly pass the props - off autopilot */}
            <Route exact path="/" component={routeProps => <HomePage routeProps={routeProps} store={this.state}/>} />
            <Route path='/folder/:id' component={routeProps => <FolderPage routeProps={routeProps} store={this.state} />} />
            <Route path='/note/:id' component={routeProps => <NotePage routeProps={routeProps} store={this.state} />}/>
            <Route component={NotFoundPage}/>
          </Switch>
        </>
      </div>
      // Provider
    )
  }
}

