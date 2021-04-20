import React, { useState, useContext } from 'react'
import { Grid, FormGroup, TextField, Button } from '@material-ui/core'
import { getThingAll, getUrl } from '@inrupt/solid-client'
import FriendPostCard from './FriendPostCard'
import Loading from './layout/Loading'
import BlogContext from '../context/blogContext'

/*
 * SearchPosts component renders a simple form to accept
 * search input and a mapping of <FriendPostCard> components
 * if friendDataset var from context isn't null. 
 */
const SearchPosts = () => {
  const blogContext = useContext(BlogContext)
  const [ searchText, setSearchText ] = useState('')

  // update searchText state
  const handleChange = e => {
    setSearchText(e.target.value)
  }

  // calls searchBlogs from context and passes searchText state var
  const searchUser = () => {
    blogContext.searchBlogs(searchText)
  }

  return (
    <div className="post">
      <FormGroup>
        <TextField 
          id="searchString" 
          label="Search" 
          variant="outlined" 
          value={searchText} 
          onChange={handleChange} 
        />
        <br></br>
        <Button variant="contained" color="primary" onClick={searchUser}>Search</Button>
      </FormGroup>
      { blogContext.loading && <Loading/> }
      { blogContext.friendDataset && (
        <div>
          <br></br><br></br>
          <h3>Results</h3>
          <Grid
            container
            spacing={2}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            { getThingAll(blogContext.friendDataset).map((post, index) => getUrl(post, "https://www.w3.org/1999/02/22-rdf-syntax-ns#type") === "https://schema.org/blogPost" && (
              <FriendPostCard key={index} index={index} post={post} />
            ))}
          </Grid>
        </div>
      )}
    </div>
  )
}

export default SearchPosts