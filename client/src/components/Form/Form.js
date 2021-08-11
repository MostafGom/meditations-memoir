import React, { useState, useEffect } from 'react'
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts';
import { useHistory } from 'react-router-dom';


function Form({ currentId, setCurrentId }) {
  const [postData, setPostData] = useState({

    title: '',
    message: '',
    tags: [],
    selectedFile: '',
  })

  const post = useSelector(
    (state) => currentId
      ? state.posts.find((p) => p._id === currentId)
      : null
  )

  const user = JSON.parse(localStorage.getItem('profile'))

  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    if (post) setPostData(post)
  }, [post])


  const handleSubmit = (e) => {
    e.preventDefault()
    if (currentId) {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }))

    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history))

    }
    clear()
  }

  const clear = () => {
    setCurrentId(null)
    setPostData({

      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    })
  }


  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6} >
        <Typography variant='h6' align='center' >
          Please sign in to add your meditations and like other people's thoughts
        </Typography>
      </Paper>
    )
  }
  return (
    <Paper className={classes.paper}>
      <form autoComplete='off'
        noValidate
        className={`${classes.form} ${classes.form}`}
        onSubmit={handleSubmit}
      >

        <Typography variant='h6' >
          {currentId ? "editing..." : "Add a Meditation Memoir"}
        </Typography>

        {/* //creator
        <TextField name='creator' variant='outlined' label='Creator' fullWidth
          value={postData.creator}
          onChange={e => setPostData({ ...postData, creator: e.target.value })}
        ></TextField> */}

        {/* title */}
        <TextField name='title' variant='outlined' label='Title' fullWidth
          value={postData.title}
          onChange={e => setPostData({ ...postData, title: e.target.value })}
        ></TextField>

        {/* message */}
        <TextField name='message' variant='outlined' label='Message' fullWidth
          value={postData.message}
          onChange={e => setPostData({ ...postData, message: e.target.value })}
        ></TextField>

        {/* Tags */}
        <TextField name='tags' variant='outlined' label='Tags' fullWidth
          value={postData.tags}
          onChange={e => setPostData({ ...postData, tags: e.target.value.split(',') })}
        ></TextField >

        <div className={classes.fileInput}>
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
          >
          </FileBase>
        </div>

        <Button className={classes.buttonSubmit}
          variant='contained' color='primary'
          size='large' type='submit' fullWidth
        >
          Submit
        </Button>

        <Button
          variant='contained' color='secondary'
          size='small' type='submit' fullWidth
          onClick={clear}
        >
          Clear
        </Button>


      </form >
    </Paper >
  )
}

export default Form
