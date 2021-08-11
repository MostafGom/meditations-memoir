import { FETCH_ALL, UPDATE, CREATE, DELETE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_POST } from '../constants/actionTypes'

import * as api from '../api'

export const getPosts = (page) => async (dispatch) => {

  try {
    dispatch({ type: START_LOADING })

    const { data } = await api.fetchPosts(page)

    dispatch({ type: FETCH_ALL, payload: data })

    dispatch({ type: END_LOADING })

  } catch (error) {
    console.log(error.message);
  }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })

    const { data: { data } } = await api.fetchPostBySearch(searchQuery)
    dispatch({ type: FETCH_BY_SEARCH, payload: data })

    dispatch({ type: END_LOADING })

  } catch (error) {
    console.log(error);
  }
}


export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPost(id);

    dispatch({ type: FETCH_POST, payload: { post: data } });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, history) => async (dispatch) => {

  try {
    dispatch({ type: START_LOADING })

    const { data } = await api.createPost(post)
    history.push(`/posts/${data._id}`)
    dispatch({ type: CREATE, payload: data })
    dispatch({ type: END_LOADING })

  } catch (error) {
    console.log(error);
  }
}

export const updatePost = (Id, post) => async (dispatch) => {

  try {
    const { data } = await api.updatePost(Id, post)

    dispatch({ type: UPDATE, payload: data })

  } catch (error) {
    console.log(error);
  }
}

export const deletePost = (Id) => async (dispatch) => {

  try {
    await api.deletePost(Id)
    dispatch({ type: DELETE, payload: Id })

  } catch (error) {
    console.log(error);
  }
}


export const likePost = (Id) => async (dispatch) => {

  try {
    const { data } = await api.likePost(Id)

    dispatch({ type: UPDATE, payload: data })

  } catch (error) {
    console.log(error);
  }
}