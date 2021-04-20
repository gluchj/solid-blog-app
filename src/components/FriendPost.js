import React, { useEffect, useState, useContext } from 'react'
import { Typography, FormGroup, TextField, Button, Backdrop, CircularProgress } from '@material-ui/core'
import { getStringNoLocale, getUrlAll } from '@inrupt/solid-client'
import { Link } from 'react-router-dom'
import BlogContext from '../context/blogContext'
import Comment from './Comment'
import Loading from './layout/Loading'

/*
 * FriendPost component displays a blog article passed via props
 * and the associated comments via the blogContext. Accepts text
 * input for user to submit new comment as well 
 */
const FriendPost = props => {
  const blogContext = useContext(BlogContext)
  const [ blogPost, setBlogPost ] = useState()
  const [ comment, setComment ] = useState('')

  /* set blogPost state variable obtained from props and get comments from context*/
  useEffect(() => {
    setBlogPost(props.location.post)
    if(blogPost)
      blogContext.getComments(getUrlAll(blogPost, "https://schema.org/Comment"))
  //eslint-disable-next-line
  }, [blogPost])

  // update comment state variable
  const handleChange = e => {
    setComment(e.target.value)
  }

  // pass new comment to blog context and clear field
  const postComment = () => {
    blogContext.postComment(comment, blogPost, blogContext.friendId)
    setComment('')
    blogContext.getComments(getUrlAll(blogPost, "https://schema.org/Comment"))
    props.history.push('/friend_post/' + props.match.params.id)
  }

  /* display loading when waiting for data, else display post*/
  if(!blogPost)
    return <Loading/>
  return (
    <div className="post">
      {blogContext.loading && (
        <Backdrop open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
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

      <FormGroup>
        <TextField 
          id="searchString" 
          label="Comment" 
          variant="outlined" 
          value={comment} 
          onChange={handleChange} 
        />
        <br></br>
        <Button variant="contained" color="primary" onClick={postComment}>Post</Button>
      </FormGroup>
      <br></br>
      <Button component={Link} to='/search_posts' size="small" color="primary">
        Back
      </Button>
    </div>
  )
}

export default FriendPost