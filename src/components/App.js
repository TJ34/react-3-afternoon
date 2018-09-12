import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Post from './Post/Post';

import Header from './Header/Header';
import Compose from './Compose/Compose';



const Base_URL = "https://practiceapi.devmountain.com/api"

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get(`${Base_URL}/posts`).then(res => {
      this.setState({posts: res.data})
    })
  }

  updatePost(id,text) {
    axios.put(`${Base_URL}/posts?id=${id}`,{text}).then(res => {
      console.log('res:',res)
      this.setState({posts: res.data})
    })
  }

  deletePost(id) {
    axios.delete(`${Base_URL}/posts?id=${id}`).then(res => {
      this.setState({posts: res.data})
    })
  }

  createPost(text) {
    axios.post(`${Base_URL}/posts`, {text}).then(res => {
      this.setState({posts: res.data})
    })
  }

  searchPosts = (input) => {
    let foundPost = this.state.posts.filter((obj) => {
      return obj.text.includes(input)
    })
    this.setState({posts: foundPost})
  }

  render() {
    const { posts } = this.state;
    console.log(posts)

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFN={this.createPost} searchPosts={this.searchPosts}/>
          
          {posts.map(post=>(
            <Post 
              key-={post.id} 
              text={post.text} 
              date={post.date}
              updatePostFN={this.updatePost}
              id={post.id}
              deletePostFN={this.deletePost}
            />
          ))}

        </section>
      </div>
    );
  }
}

export default App;
