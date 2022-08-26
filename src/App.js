import { Button } from 'antd';
import { Buffer } from 'buffer';
import encodeUtf8 from 'encode-utf8';
import React, { useEffect, useState } from 'react';
import './App.css';
import logo from './logo.svg';


function App() {
  
  const client_id = 'lf0BsZ1JIp6OlBeNDtr0FbKeT00zCTCtuDBZDHcc'
  const client_secret = '7bQxatF3UyV1yx4T5rVtHaPLfTqDli4hZgxye3OMra0WTh4b4F3FcrUTioM16AlcMuwYH4ifZRAvL05Tf9Z0O2h9GiI4f4usaltTyfxS3Dlfwqr31jBXkHBZpko5UowC'
  const redirect_uri = 'http://127.0.0.1:3000/'
  const uri = `https://gymkhana.iitb.ac.in/profiles/oauth/authorize/?client_id=${client_id}&response_type=code&scope=basic&redirect_uri=${redirect_uri}&state=some_state`

  const [isAuthenticated, setAuthenticated] = useState(false)
  const [authCode, setAuthCode] = useState(null)

  useEffect(() => {
    if (window.location.href.indexOf('code=') > -1) {
      setAuthenticated(true)
      const authCode = window.location.href.substring(
        window.location.href.lastIndexOf("code=") + 5, 
        window.location.href.lastIndexOf("&")
    );
      setAuthCode(authCode)
    }
  }, [])
  
  // useEffect(() => {
  //   getAuthToken()
  // },[authCode])

  const getAuthToken = () => {
    const uri = 'https://gymkhana.iitb.ac.in/profiles/oauth/token'
    const AUTHORIZATION_TOKEN = decodeURIComponent(escape(Buffer.from(encodeUtf8(client_id+':'+client_secret)).toString('base64')))
    console.log(authCode)
    fetch(uri, {
      method: 'POST',
      mode: 'no-cors',
      host: 'gymkhana.iitb.ac.in',
      headers: new Headers({
        'Authorization': 'Basic '+ AUTHORIZATION_TOKEN,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: `code=${authCode}&redirect_uri=${redirect_uri}&grant_type=authorization_code`
    }).then(res => res.json()).then(data => console.log(data))
  //   fetch('http://127.0.0.1:3001/',{
  //     method: 'POST',
  //     mode: 'no-cors',
  //     headers: new Headers({
  //       'Access-Control-Allow-Origin': "*",
  //       'Content-type': 'application/json'
  //     }),
  //     body: JSON.stringify({ code: authCode})
  //   }).then(res=>console.log(res))
  }

  // const getData = () => {
  //   const uri = 'http://gymkhana.iitb.ac.in/profiles/user/api/user/?fields=first_name,last_name'
  //   fetch(uri, {
  //     method: 'get',
  //     headers: new Headers({
  //       'Authorization': 'Bearer '+ authCode, 
  //       'Content-Type': 'application/json'
  //   }),
  //   })
  //     .then(res => res.json())
  //     .then(data => console.log(data))
  // }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button href={uri} >SSO Login</Button>
        <Button onClick={getAuthToken}>Get Info</Button>
        <h1>{isAuthenticated?"Authenticated":"Not Authenticated"}</h1>
      </header>
    </div>
  );
}

export default App;
