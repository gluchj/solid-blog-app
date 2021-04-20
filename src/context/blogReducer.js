/* eslint-disable import/no-anonymous-default-export */
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

/*********************************************************
 * blogReducer accepts dispatch actions from the BlogState
 * component and performs state actions accordingly
 *********************************************************/

export default (state, action) => {
  switch(action.type) {
    case GET_BLOG_DATASET:
      return {
        ...state,
        blogDataset: action.payload,
      }
    case UPDATE_BLOG_DATASET:
      return {
        ...state,
        blogDataset: action.payload,
      }
    case SEARCH_BLOGS:
      return {
        ...state,
        friendDataset: action.payload,
      }
    case SET_FRIEND:
      return {
        ...state,
        friendId: action.payload,
      }
    case CLEAR_FRIEND:
      return {
        ...state,
        friendId: action.payload,
        friendDataset: action.payload
      }
    case POST_COMMENT:
      return {
        state
      }
    case GET_COMMENTS:
        return {
          ...state,
          comments: action.payload,
        }
      case SET_LOADING:
        return {
          ...state,
          loading: action.payload
        }
    default:
      return state
  }
}