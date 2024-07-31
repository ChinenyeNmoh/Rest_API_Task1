import React from 'react'
import PostList from '../components/PostList'

const AllPosts = () => {
  return (
    <div>
        <PostList all={true}/>
    </div>
  )
}

export default AllPosts