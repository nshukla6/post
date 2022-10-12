import React from 'react';
import { useSelector } from "react-redux";
import AddPostForm from '../components/AddPost';
import Counter from '../components/Counter';
import PostsList from '../components/PostList';


const Home = () => {
  const basket = useSelector(state => state.basket)
  return (
    <div>
      <h1>Home Page1</h1>
      {JSON.stringify(basket)}
      <AddPostForm />
      <PostsList />
    </div>
  )
}

export default Home
