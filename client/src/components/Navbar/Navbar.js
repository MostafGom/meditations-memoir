import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode'
import { Link, useHistory, useLocation } from 'react-router-dom'
import logo2 from '../../images/logo.jpg';
import logo1 from '../../images/logo1.jpg';
import useStyles from './styles';

function Navbar() {
  const classes = useStyles()

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const history = useHistory()
  const dispatch = useDispatch()
  const location = useLocation()



  const logout = () => {
    dispatch({ type: "LOGOUT" })
    history.push('/')
    setUser(null)
  }
  useEffect(() => {
    const token = user?.token
    if (token) {
      const decodedToken = decode(token)
      if (decodedToken.exp * 1000 < new Date().getTime()) logout()
    }
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <div className={classes.brandContainer} >

        <Link to='/' className={classes.brandContainer}>

          <img
            src={logo1} alt="icon"
            height='60px'
          />
          <img className={classes.image}
            src={logo2} alt="meditations"
            height='60'
          />

        </Link>

      </div>

      <Toolbar className={classes.toolbase}>
        {user ? (
          <div className={classes.profile}>
            <Link to={`/posts/profile/${user.result._id}`} style={{ display: 'flex', textDecoration: 'none', color: 'inherit' }} >
              <Avatar
                className={classes.purple}
                alt={user.result.name}
                src={user.result.yrl} >{user.result.name.charAt(0)}</Avatar>

              <Typography className={classes.userName}
                variant='h6'
              >{user.result.name}</Typography>
            </Link>
            <Button variant='contained'
              className={classes.logout}
              color='secondary' onClick={logout} >Log out</Button>
          </div>
        ) : (
          <Button variant='contained'
            component={Link} to='/auth'
            color='primary' >Log in</Button>

        )
        }
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
