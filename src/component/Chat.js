import React,{useEffect,useRef,useState} from 'react'
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import {useAuth} from "../context/Auth_context"
import {GoSignOut} from 'react-icons/go'
import {useHistory} from 'react-router-dom'
import { ChatEngine } from 'react-chat-engine';
import axios from 'axios'

const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  }));
export default function Chat() {
    const classes = useStyles()
    const didMountRef = useRef(false)
    const {logout,user} = useAuth()
    const history = useHistory()
    const [loading,setLoading]= useState(true)
    const handleLogout = async () => {
            await logout();
            history.push('/')
    }
    const getFile = async (url) => {
        const response = await fetch(url) 
        const data = await response.blob()
        return new File([data],'userPhoto.jpg',{type: 'image/jpeg'})
    }
    useEffect(() => {
        if(!didMountRef.current){
            didMountRef.current = true
        }
        if(!user || user===null){
            history.push('/')
            return;
        }
        axios.get('https://api.chatengine.io/users/me',{
            headers: {
                "Project-ID":process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID,
                "User-Name":user.email,
                "User-Secret":user.uid,
            }
        })
        .then(() => {
            setLoading(false)
        })
        .catch(()=> {
            let formdata = new FormData();
            formdata.append('email',user.email)
            formdata.append('username',user.email)
            formdata.append('secret',user.uid)
            if(user.photoURL){
                getFile(user.photoURL)
                    .then((avatar) => {
                        formdata.append('avatar',avatar,avatar.name)
                        axios.post('https://api.chatengine.io/users/',
                            formdata,
                           { headers:{"private-key":process.env.REACT_APP_CHAT_ENGINE_PROJECT_KEY}}
                        )
                        .then(() => {
                            setLoading(false)
                        })
                        .catch((error)=> {
                            console.log('error',error.response)
                        })
                    })
            }else{
                getFile("https://gravatar.com/avatar/79d31660696a4af412ba3b1c7c2c0cc8?s=400&d=robohash&r=r")
                .then((avatar) => {
                    formdata.append('avatar',avatar,avatar.name)
                    axios.post('https://api.chatengine.io/users/',
                        formdata,
                       { headers:{"private-key":process.env.REACT_APP_CHAT_ENGINE_PROJECT_KEY}}
                    )
                    .then(() => {
                        setLoading(false)
                    })
                    .catch((error)=> {
                        console.log('error',error.response)
                    })
                })
            }
        })
    },[user,history])
    if (!user || loading) return <div className="dashed-loading"/>
    return (
        <div style={{ fontFamily: 'Roboto' }}>
            <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                MintChat
                </Typography>
                <IconButton 
                    onClick={handleLogout}
                ><GoSignOut/></IconButton>
            </Toolbar>
            </AppBar>
            <ChatEngine
                height='91.5vh'
                projectID={process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID}
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    )
}
