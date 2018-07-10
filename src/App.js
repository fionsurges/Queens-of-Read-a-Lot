import React, { Component } from 'react'
import Header from './components/Header'
import Books from './components/Books'
import Reviews from './components/Reviews'
import './App.css'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className='App'>
      <Header />
      <main>
        <Books />
        <Reviews />
      </main>
      </div>
    )
  }
}

export default App
