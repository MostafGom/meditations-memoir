import React, { useState } from 'react'
import { Avatar, Typography, Paper, Container, Grid, Button } from '@material-ui/core'
import { GoogleLogin } from 'react-google-login'
import useStyles from './styles'
import Icon from './Icon'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { signin, signup } from '../../actions/auth'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

function SignUp() {
  // const clientId = process.env.REACT_APP_CLIENT_ID
  const classes = useStyles()
  const [showPassword, setShowPassword] = useState(false)
  const [isSignUp, setisSignUp] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const history = useHistory()
  const dispatch = useDispatch()

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

  const switchMode = () => setisSignUp((prevIsSignUp) => !prevIsSignUp)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSignUp) {
      dispatch(signup(formData, history))
    } else {
      dispatch(signin(formData, history))

    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const googleSuccess = async (res) => {
    console.log("success");
    const result = res?.profileObj
    const token = res?.tokenId

    try {
      dispatch({ type: "AUTH", data: { result, token } })
      history.push('/')
    } catch (error) {
      console.log(error);
    }
  }

  const googleFailure = (error) => {
    console.log(error);
    console.log('log in failed try again');
  }
  return (
    <Container component='main' maxWidth='xs' >
      <Paper className={classes.paper} elevation={3}  >
        <Avatar className={classes.avatar} >
          <LockOutlinedIcon />
        </Avatar>

        <Typography component='h1' variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit} >
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input name='firstName' label="First Name" handleChange={handleChange} autoFocus half />
                <Input name='lastName' label="Last Name" handleChange={handleChange} half />
              </>
            )}

            <Input name='email' label="Email Address" handleChange={handleChange} type='email' />

            <Input name='password' label="Password" handleChange={handleChange}
              type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            {isSignUp && <Input name='confirmPassword' label="Confirm Password" handleChange={handleChange}
              type='password' handleShowPassword={handleShowPassword} />
            }
          </Grid>

          <Button type="submit" fullWidth color="primary" variant='contained' className={classes.submit} >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>

          <GoogleLogin
            clientId='232049912177-cpbpts1ubequdq8pffiri7klooh3u1vl.apps.googleusercontent.com'
            render={renderProps => (
              <Button className={classes.googleButton} color='primary' fullWidth
                onClick={renderProps.onClick} disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant='contained'

              >
                Google Sign In
              </Button>
            )}
            cookiePolicy={'single_host_origin'}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
          />

          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp ? "Already have an account Sign In" : "Don't have an account Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default SignUp
