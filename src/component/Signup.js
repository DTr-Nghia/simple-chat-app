import React,{useRef,useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import {MdLockOutline} from 'react-icons/md'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import {useAuth} from '../context/Auth_context'
import Alert from '@material-ui/lab/Alert'
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem'
  },
  avatar: {
    fontSize:'1.5rem',
    margin: theme.spacing(1),
    backgroundColor: "#25CC97",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    borderRadius: '20px',
  },
}));

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error,setError] = useState('')
  const [succeeded,setSucceeded] = useState(false)
  const {signup} = useAuth()
  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
        if(passwordRef.current.value !== passwordConfirmRef.current.value ){
            return setError("Password do not match")
        }
        try{
            setError('')
            setSucceeded(true)
            await signup(emailRef.current.value,passwordRef.current.value,passwordConfirmRef.current.value)
        }catch{
            setError('failed to create an account')
        }
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <MdLockOutline />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {succeeded?<Alert severity="success">Sign up success</Alert>:null}
        {error?<Alert severity="error">{error}</Alert>:null}
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                color="secondary"
                inputRef={emailRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                color="secondary"
                inputRef={passwordRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password-confirm"
                label="Password Confirm"
                type="password"
                id="password-confirm"
                autoComplete="current-password"
                color="secondary"
                inputRef={passwordConfirmRef}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="secondary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link to="/" className="link">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}