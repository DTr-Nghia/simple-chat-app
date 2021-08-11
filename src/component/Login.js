import React, {useRef} from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from "react-router-dom"
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {MdLockOutline} from 'react-icons/md'
import Typography from '@material-ui/core/Typography';
import { makeStyles} from '@material-ui/core/styles';
import {FcGoogle} from 'react-icons/fc'
import mintbcg from '../mint-bcg.jpg'
import { useAuth } from '../context/Auth_context';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${mintbcg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    fontSize:'1.5rem',
    margin: theme.spacing(1),
    backgroundColor: "#25CC97",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    borderRadius: '20px',
  },
}));

export default function Login() {
  const {loginWithGoogle,login} = useAuth()
  const emailRef = useRef()
  const passwordRef = useRef()
  const classes = useStyles();


  const handleSubmit = async (e) => {
      e.preventDefault();
      await login(emailRef.current.value,passwordRef.current.value)

  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square >
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <MdLockOutline />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email-login"
              autoComplete="email"
              autoFocus
              color="secondary"
              inputRef={emailRef}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password-login"
              autoComplete="current-password"
              color="secondary"
              inputRef={passwordRef}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              startIcon={<FcGoogle/>}
              onClick={loginWithGoogle}
            >
              Sign In With Google
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forgotpassword" className="link">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" className="link">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
