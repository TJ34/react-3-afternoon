import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor(){
    super();

    this.state = {
      searchInput: ''
    }
  }

  changeSearch = (e) => {
    this.setState({searchInput: e})
  }

  searchingPosts = () => {
    const {searchInput} = this.state;
    const {searchPosts, mount} = this.props;

    searchPosts(searchInput);
    this.setState({searchInput: ''})
  }

  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input placeholder="Search Your Feed" 
                 onChange={(e) => this.changeSearch(e.target.value)}
                 value = {this.state.searchInput}/>

          <SearchIcon id="Search__icon" onClick={() => this.searchingPosts()}/>
        </div>
        
      </section>
    )
  }
}