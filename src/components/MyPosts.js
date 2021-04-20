import React, { useEffect, useContext } from 'react'
import { Grid } from '@material-ui/core'
import { getThingAll, getUrl } from '@inrupt/solid-client'
import PostCard from './PostCard'
import Loading from './layout/Loading'
import BlogContext from '../context/blogContext'

/*
 * MyPosts component renders a mapping of <PostCard> components
 * to display each post contained in context's blogDataset var.
 * It is the default component navigated to after login
 */
const MyPosts = () => {
  const blogContext = useContext(BlogContext)

  /* call getBlogDatast() from context to retrieve user blog posts */
  useEffect(() => {
    blogContext.getBlogDataset()
    //eslint-disable-next-line
  }, [])

  if(blogContext.loading)
    return <Loading/>
  if(getThingAll(blogContext.blogDataset).filter(thing => getUrl(thing, "https://www.w3.org/1999/02/22-rdf-syntax-ns#type") === "https://schema.org/blogPost").length === 0)
    return <p>You have no posts yet</p>
  return (
    <div className="myposts">
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        { getThingAll(blogContext.blogDataset).map((post, index) => getUrl(post, "https://www.w3.org/1999/02/22-rdf-syntax-ns#type") === "https://schema.org/blogPost" && (
         <PostCard key={index} index={index} post={post} />
        ))}
      </Grid>
    </div>
  )
}

export default MyPosts