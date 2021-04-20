import React, { useState, useContext } from 'react'
import { FormGroup, TextField, Button } from '@material-ui/core'
import {
  createThing,
  addStringNoLocale,
  addDatetime,
  addUrl
} from '@inrupt/solid-client'
import BlogContext from '../context/blogContext'

/* 
 * AddPost component provides a simple form and internal state for the user
 * to add a new post
 */
const AddPost = () => {
  const blogContext = useContext(BlogContext)
  const [ postTitle, setPostTitle ] = useState('')
  const [ postText, setPostText ] = useState('')
  const [ postKeywords, setPostKeywords ] = useState('')

  /* handle state change for title textfield */
  const handleChange = e => {
    setPostTitle(e.target.value)
  }

  /* handle state change for keywords textfield */
  const handleKeywords = e => {
    setPostKeywords(e.target.value)
  }

  /* handle state change for post textarea */
  const updateText = e => {
    setPostText(e.target.value)
  }

  /* create new thing, add user input, and call our blog context */
  const handleSubmit = async e => {
    e.preventDefault()
    let ps = createThing()
    ps = addUrl(ps, "https://www.w3.org/1999/02/22-rdf-syntax-ns#type", "https://schema.org/blogPost")
    ps = addStringNoLocale(ps, "https://schema.org/text", postText)
    ps = addDatetime(ps, "https://schema.org/dateCreated", new Date())
    ps = addStringNoLocale(ps, "https://schema.org/keywords", postKeywords)
    ps = addStringNoLocale(ps, "https://schema.org/headline", postTitle)
    ps = addUrl(ps, "https://schema.org/image", "https://source.unsplash.com/random?sig=" + Math.floor(Math.random() * 1000))
    blogContext.updateBlogDataset(ps)
  }

  return (
    <div className="post">
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <TextField id="postTitle" label="Title" variant="outlined" value={postTitle} onChange={handleChange} />
          <br></br>
          <TextField id="keywords" label="Keywords" variant="outlined" value={postKeywords} onChange={handleKeywords} />
          <br></br>
          <TextField
            id="postText"
            label="Blog Post"
            multiline
            rows={10}
            placeholder="Type here..."
            variant="outlined"
            value={postText}
            onChange={updateText}
          />
          <br></br>
          <Button type="submit" variant="contained" color="primary">POST</Button>
        </FormGroup>
      </form>
    </div>
  )
}

export default AddPost