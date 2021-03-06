import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link} from 'react-router-dom';
import {userLogin} from '../../functions/auth';
import Alert from '@mui/material/Alert';
import {setLocalDB} from '../../functions/localstore';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link   style={{textDecoration:'none',color:'#0009'}} to="/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
    palette:{
        dark:'#222'
    }  
});

export default function Login() {
  const [error,setError] = React.useState(false)
  const [errormessage,setErrorMessage] = React.useState('')
  const [loading,setLoading] = React.useState(false)
  const handleSubmit =async (event) => {
    event.preventDefault();
    setLoading(true)
    const data = new FormData(event.currentTarget);
    let body ={
      credential:data.get('cred'),
      password:data.get('password')
    }
    let response = await userLogin(body)
    if(response.error){
        setLoading(false)
        setError(true);
        setErrorMessage(response.message)
    }
    else{
      setLoading(false)
      setLocalDB('_usau',JSON.stringify(response))
      window.location.href ="/"
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        {
          loading?(
            <>
              <Backdrop
               sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loading}
            >
             < CircularProgress color="inherit" />
             </Backdrop>
            </>
          ):null
        }
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1}} style={{backgroundColor:'#222'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} validate={true} sx={{ mt: 1 }}>
          {
                error?
                (
                    <><Alert severity="error">{errormessage}</Alert></>
                ):null
          }
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address or Phone Number"
              name="cred"
              color='dark'
              autoComplete="off"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              color="dark"
              type="password"
              id="password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" style={{color:"#222"}} />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{backgroundColor:'#222'}}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>    
                <Link to="/reset-password"  style={{color:'#0009',fontSize:'0.9rem'}} >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link  to="/signup"  style={{color:'#0009',fontSize:'0.9rem'}} >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}