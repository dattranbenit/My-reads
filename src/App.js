import React from 'react'
// import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import Search from './pages/search'
import List from './pages/list'

class BooksApp extends React.Component {
	state = {}

	render() {
		return (<div className="app">
			<Route exact path="/search" render={() => (
				<Search />
			)} />
			<Route exact path="/" render={() => (
				<List />
			)} />
		</div>)
	}
}

export default BooksApp
