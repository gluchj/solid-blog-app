import React, { useReducer } from 'react'
import BlogContext from './blogContext'
import BlogReducer from './blogReducer'
import {
  createSolidDataset,
  getSolidDataset,
  saveSolidDatasetAt,
  getThing,
  getThingAll,
  setThing,
  getUrlAll,
  getUrl,
  createThing,
  addStringNoLocale,
  addDatetime,
  addUrl,
  getStringNoLocale,
  getDatetime,
} from '@inrupt/solid-client'
import { useSession } from '@inrupt/solid-ui-react'
import {
  GET_BLOG_DATASET,
  UPDATE_BLOG_DATASET,
  SEARCH_BLOGS,
  POST_COMMENT,
  GET_COMMENTS,
  SET_FRIEND,
  CLEAR_FRIEND,
  SET_LOADING
} from './types'

/****************************************************************
 * BlogState component contains all state variables and fucntions
 * accessible to the app components via the useContext hook
 ****************************************************************/
const BlogState = props => {
  // initialize state
  const initialState = {
    blogDataset: null,
    containerURI: '',
    friendDataset: null,
    friendId: null,
    comments: null,
    loading: true
  }

  const { session } = useSession()
  const [ state, dispatch ] = useReducer(BlogReducer, initialState)

  // Get BlogDataset
  const getBlogDataset = async () => {
    setLoading(true)
    const profileDataset = await getSolidDataset(session.info.webId, { fetch: session.fetch })
    const profileThing = getThing(profileDataset, session.info.webId)
    const podsUrls = getUrlAll(profileThing, "http://www.w3.org/ns/pim/space#storage")
    const pod = podsUrls[0]
    /* return dataset if exists; else if 404 create new dataset and return */
    try {
    const postDataset = await getSolidDataset(pod + 'public/blog.ttl', { fetch: session.fetch })
    dispatch({ type: GET_BLOG_DATASET, payload: postDataset })
    } catch (error) {
      if (error.statusCode === 404) {
        const postDataset = await saveSolidDatasetAt(pod + 'public/blog.ttl', createSolidDataset(), { fetch: session.fetch })
        dispatch({ type: GET_BLOG_DATASET, payload: postDataset })
      }
    }
    setLoading(false)
  }

  // Update Dataset
  const updateBlogDataset = async updatedThing => {
    const profileDataset = await getSolidDataset(session.info.webId, { fetch: session.fetch })
    const profileThing = getThing(profileDataset, session.info.webId)
    const podsUrls = getUrlAll(profileThing, "http://www.w3.org/ns/pim/space#storage")
    const pod = podsUrls[0]
    let blogDataset = await getSolidDataset(pod + 'public/blog.ttl', { fetch: session.fetch })
    updatedThing = addStringNoLocale(updatedThing, "https://schema.org/author", session.info.webId)
    updatedThing = addStringNoLocale(updatedThing, "http://www.w3.org/2006/vcard/ns#fn", getStringNoLocale(profileThing, "http://www.w3.org/2006/vcard/ns#fn"))
    blogDataset = setThing(blogDataset, updatedThing)
    const updatedDataset = await saveSolidDatasetAt(pod+'public/blog.ttl', blogDataset, { fetch: session.fetch })
    dispatch({ type: UPDATE_BLOG_DATASET, payload: updatedDataset })
  }

  // Search for Blog posts by URI
  const searchBlogs = async searchId => {
    try {
      clearFriend()
      setLoading(true)
      const PostDataset = await getSolidDataset(searchId)
      const profile = getThing(PostDataset, searchId)
      const storage = getUrl(profile, 'http://www.w3.org/ns/pim/space#storage')
      const blogPosts = await getSolidDataset(storage + 'public/blog.ttl')
      dispatch({ type: SET_FRIEND, payload: searchId })
      dispatch({ type: SEARCH_BLOGS, payload: blogPosts })
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  // Clear friend ID and friend dataset
  const clearFriend = () => { 
    dispatch({ type: CLEAR_FRIEND, payload: null })
  }

  // Post Comment
  const postComment = async (comment, blogPost, friendId) => {
    setLoading(true)
    let newComment = ''
    try {
      /* save comment to the users pod with a reference to the original blog post */
      const myDataset = await getSolidDataset(session.info.webId, { fetch: session.fetch })
      const myProfile = getThing(myDataset, session.info.webId)
      const myStorage = getUrl(myProfile, 'http://www.w3.org/ns/pim/space#storage')
      let myBlogposts = await getSolidDataset(myStorage + 'public/blog.ttl', { fetch: session.fetch })
      let ps = createThing()
      ps = addUrl(ps, "https://www.w3.org/1990/02/22-rdf-syntax-ns#type", "https://schema.org/Comment")
      ps = addUrl(ps, "https://schema.org/author", session.info.webId)
      ps = addStringNoLocale(ps, "http://www.w3.org/2006/vcard/ns#fn", getStringNoLocale(myProfile, "http://www.w3.org/2006/vcard/ns#fn"))
      ps = addStringNoLocale(ps, "https://schema.org/text", comment)
      ps = addDatetime(ps, "https://schema.org/dateCreated", new Date())
      ps = addUrl(ps, "https://schema.org/blogPost", blogPost.internal_url)
      myBlogposts = setThing(myBlogposts, ps)
      let updatedDataset = await saveSolidDatasetAt(myStorage + 'public/blog.ttl', myBlogposts, { fetch: session.fetch })
      ps = getThingAll(updatedDataset)
      // below we assume new comment is the last one in the array
      newComment = ps[ps.length - 1]
    } catch (error) {
      console.error(error)
    }

    try {
      /* add comment reference to authors pod */
      const authorDataset = await getSolidDataset(friendId, { fetch: session.fetch })
      const authorProfile = getThing(authorDataset, friendId)
      const authorStorage = getUrl(authorProfile, 'http://www.w3.org/ns/pim/space#storage')
      let authorsBlog = await getSolidDataset(authorStorage + 'public/blog.ttl', { fetch: session.fetch })
      let post = getThing(authorsBlog, blogPost.internal_url)
      post = addUrl(post, "https://schema.org/Comment", newComment.internal_url)
      authorsBlog = setThing(authorsBlog, post)
      let updatedDataset = await saveSolidDatasetAt(authorStorage + 'public/blog.ttl', authorsBlog, { fetch: session.fetch })
    } catch (error) {
        console.error(error)
    }
    setLoading(false)
  }

  // Get Comments
  const getComments = async commentURLs => {
    let allComments = []
    for(let i = 0; i < commentURLs.length; i++) {
      let dataset = await getSolidDataset(commentURLs[i])
      let thing = getThing(dataset, commentURLs[i])
      let text = getStringNoLocale(thing, "https://schema.org/text")
      let author = getStringNoLocale(thing, "http://www.w3.org/2006/vcard/ns#fn")
      let created = getDatetime(thing, "https://schema.org/dateCreated")
      let comment = { author: author, text: text, created: created.toLocaleString() }
      allComments.push(comment)
    }
    dispatch({ type: GET_COMMENTS, payload: allComments })
  }

  // Set Loading
  const setLoading = bool => {
    dispatch({ type: SET_LOADING, payload: bool })
  }

  return (
    <BlogContext.Provider
      value={{
        blogDataset: state.blogDataset,
        containerURI: state.containerURI,
        friendDataset: state.friendDataset,
        friendId: state.friendId,
        comments: state.comments,
        loading: state.loading,
        getBlogDataset,
        updateBlogDataset,
        searchBlogs,
        clearFriend,
        postComment,
        getComments,
        setLoading
      }}
    >
      { props.children }
    </BlogContext.Provider>
  )
}

export default BlogState