import React from 'react'
// import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import Search from './pages/search'
import List from './pages/list'
import { getAll, update } from './services/BooksApi'

class BooksApp extends React.Component {
	state = {
		shelfs: {
			currentlyReading: {
				label: 'Currently Reading'
			},
			wantToRead: {
				label: 'Want to Read'
			},
			read: {
				label: 'Read'
			}
		},
		books: [],
		search: {
			query: null,
			books: [],
		}
	}

	refreshBookList = () => {
		this.setState({
			books: []
		})

		getAll()
			.then((data) => {
				this.setState({
					books: data
				})
			})
	}

	onBookMove = (book, targetShelf) => {

		update(book, targetShelf)
			.then(() => this.refreshBookList())

	}

	onSearchUpdate = (query, books) => {
		let state = this.state;

		state.search = {
			query: query,
			books: books
		}

		this.setState(state);

	}

	componentDidMount() {
		this.refreshBookList()
	}


	render() {
		return (<div className="app">
			<Route exact path="/search" render={() => (
				<Search
					shelfs={this.state.shelfs}
					books={this.state.search.books}
					onBookMove={this.onBookMove}
					onSearchUpdate={this.onSearchUpdate} />
			)} />
			<Route exact path="/" render={() => (
				<List
					shelfs={this.state.shelfs}
					books={this.state.books}
					onBookMove={this.onBookMove} />
			)} />
		</div>)
	}
}

export default BooksApp
