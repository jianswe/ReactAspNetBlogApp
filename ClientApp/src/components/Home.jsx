import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Welcome to blogs manager</h1>
        <p>Use this manager to manage your blogs, by:</p>
        <ul>
          <li>Add a new blog</li>
          <li>Update a blog</li>
          <li>Delete a blog</li>
          <li>Show all blogs</li>
        </ul>
      </div>
    );
  }
}
