import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';

class ShelfChanger extends React.Component {

    state = {
        shelfClassName: classNames({
            'book-shelf-changer': true,
        })
    }

    moveBook = (book, self) => {
        this.setState({
            shelfClassName: classNames({
                'book-shelf-changer': true,
                'loading': true,
                'is-visible': true
            })
        });

        this.props.onBookMove(book, self);
    }

    removeLoading(element) {
        element.setState({
            shelfClassName: classNames({
                'book-shelf-changer': true,
            })
        });
    }

    render() {

        return <div className={this.state.shelfClassName}>
            <select onMouseEnter={(e) => {
                e.target.click()
            }}
                onMouseLeave={(e) => {
                    e.target.click()
                }}
                value={this.props.shelf} onChange={(event) => {
                    this.moveBook(this.props.book, event.target.value);
                }}>
                <option value="none" disabled>Move to...</option>
                {
                    Object.keys(this.props.shelfs).map((shelfID) => {
                        return <option key={shelfID} value={shelfID}>{this.props.shelfs[shelfID].label}</option>
                    })
                }
                {
                    this.props.shelf !== 'none' && (
                        <option value="none">Remove from list</option>
                    )
                }
            </select>
        </div>
    }

}


ShelfChanger.propTypes = {
    shelf: PropTypes.string.isRequired,
    shelfs: PropTypes.object.isRequired,
    book: PropTypes.object.isRequired,
    onBookMove: PropTypes.func.isRequired
};

export default ShelfChanger