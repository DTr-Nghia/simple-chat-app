import React,{useRef,useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import {MdLockOutline} from 'react-icons/md'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert'
import {useAuth} from '../context/Auth_context'



const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
      width  : '100%',
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem',

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

  export default function ForgotPassword() {
        const emailRef = useRef()
        const [error,setError] = useState('')
        const [succeeded,setSucceeded] = useState(false)
        const {resetEmail} = useAuth()
        const classes = useStyles();

        const handleSubmit = async (e) => {
            try {
                setError('')
                setSucceeded(true)
                await resetEmail(emailRef.current.value)
            } catch {
                setError('failed to reset password')
            }
        }
        return (
            <Container component="main" maxWidth="xs" className={classes.container}>
                <CssBaseline/>
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <MdLockOutline/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Recover your password
                    </Typography>
                    {succeeded?<Alert severity="success">Check your email</Alert>:null}
                    {error?<Alert severity="error">{error}</Alert>:null}
                    <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email_to_reset"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            color="secondary"
                            inputRef={emailRef}
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
                        Send
                    </Button>
                    <Grid container justifyContent="center">
                        <Grid item>
                        <Link to="/" className="link">
                            Go back to login
                        </Link>
                        </Grid>
                    </Grid>
                    </form>
                </Paper>
            </Container>
        )
  }