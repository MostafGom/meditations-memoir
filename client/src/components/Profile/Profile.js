import { CircularProgress, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchProfilePosts } from '../../api/index.js'
import Post from '../Posts/Post/Post'
import useStyles from './styles';
import { useHistory, useParams } from 'react-router-dom';


function Profile() {

  const classes = useStyles()
  const { isLoading } = useSelector((state) => state.posts)

  const { creator } = useParams()
  const [userPost, setUserPost] = useState([])

  // skipping axios index.js file for this
  // no need to dispatch action or have any data in redux for this
  const fetchfetch = async () => {
    try {
      const { data } = await fetchProfilePosts(creator)
      setUserPost(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchfetch()
  }, [creator])

  // console.log(userPost);

  return (
    isLoading ? <CircularProgress /> : (
      <Grid className={classes.mainContainer} container
        alignItems='stretch' spacing={3}
      >
        {userPost?.map(post => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={3} >
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    )

  )
}

export default Profile
