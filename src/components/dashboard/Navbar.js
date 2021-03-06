import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import '../../assets/css/splash.css';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { fetchWallet } from '../../functions/wallet';
import Logo from '../../assets/images/logo.jpeg'
import {getUser} from '../../functions/auth';
import {Logout} from '@mui/icons-material';
import { Button } from '@mui/material';

export default function Navbar() {
  const [account,setAccount] = React.useState({})
  const [user,setUser] = React.useState({})
  React.useEffect(()=>{
    async function fetch(){
      let wallet = await fetchWallet()
      setAccount(wallet)
      let userJSON = await getUser()
      setUser(userJSON.user)
    }
    fetch()
  },[])
  const logout = ()=>{
     localStorage.clear()
     window.location.href="/"
  }
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor:"#222",height:"4rem"}} >
        <Toolbar variant="dense">
        <Stack direction="row" spacing={1}>
          <Avatar style={{marginTop:"10px"}} alt="Remy Sharp" src={Logo} />
          <Typography style={{marginTop:"15px"}} variant="h6" color="inherit" component="div">VMS</Typography>
        </Stack>
        <Stack style={{marginLeft:'37rem',marginTop:'12px '}} direction="row" spacing={2} >
        <Typography>{user.name}</Typography>
        <Typography>({account.account}) </Typography>
        <Button title={"logout"} size="small" onClick={logout} style={{color:"#fff",marginTop:"-3px"}}><Logout /></Button>
        </Stack>
        </Toolbar> 
      </AppBar>
    </Box>
    </>
  );
}

