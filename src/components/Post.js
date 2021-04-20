import React, { useEffect, useState, useContext } from 'react'
import { Typography, Button } from '@material-ui/core'
import { getStringNoLocale, getUrlAll } from '@inrupt/solid-client'
import { Link } from 'react-router-dom'
import BlogContext from '../context/blogContext'
import Comment from './Comment'

/*
 * Post component renders a full blog post to view. It receives the
 * specific post object via props and uses the app's context to
 * retrieve any comment references contained in it.
 */
const Post = props => {
  const blogContext = useContext(BlogContext)  
  const [ blogPost, setBlogPost ] = useState()

  /* set blogPost state from props, call getComments from context */
  useEffect(() => {
    setBlogPost(props.location.post)
    if(blogPost)
      blogContext.getComments(getUrlAll(blogPost, "https://schema.org/Comment"))
  //eslint-disable-next-line
  }, [blogPost])

  if(!blogPost)
    return <p>Loading...</p>
  return (
    <div className="post">
      <Typography variant="h3" component="h2">
        {getStringNoLocale(blogPost, "https://schema.org/headline")}
      </Typography>
      <Typography gutterBottom variant="subtitle2" component="p">
        by {getStringNoLocale(blogPost, "http://www.w3.org/2006/vcard/ns#fn")}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        Keywords: {getStringNoLocale(blogPost, "https://schema.org/keywords")}
      </Typography>
      <br></br>
      <p>{getStringNoLocale(blogPost, "https://schema.org/text")}</p>
      
      <div className="comments">
        <Typography variant="h5" color="primary" component="h2" gutterBottom>
          Comments
        </Typography>
          {blogContext.comments ? 
            blogContext.comments.map((comment, index) =>
              <Comment key={index} comment={comment} />
            )
          : 
          <p>No Comments</p>
        }
      </div>
      <Button component={Link} to='/' size="small" color="primary">
        Back
      </Button>
    </div>
  )
}

export default Post