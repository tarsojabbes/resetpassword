import { useState } from 'react';
import withAuth from './withAuth';
import { useUser } from './useUser';
import config from '../config';
import ReactCaptcha from "modern-react-captcha"

const sendRequest = (setResponse) => {
  config.auth().currentUser.getIdToken(true).then(function(token) {
    const helloUserUrl = "localhost:5000/reset_password"
    document.cookie = '__session=' + token + ';max-age=3600';
    console.log('Sending request to', helloUserUrl, 'with ID token in __session cookie.');
    let req = new XMLHttpRequest();
    req.onload = function() {
      console.log(req)
      setResponse(req.responseText);
    };
    req.onerror = function() {
      setResponse('There was an error');
    };
    req.open('GET', helloUserUrl, true);
    req.setRequestHeader('Authorization', 'Bearer ' + token);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send();
  });
}


const Private = () => {
  const { user, logout } = useUser()
  const [ response, setResponse ] = useState("")
  const [ disabled, setDisabled ] = useState(false)
  const [captchaMatch, setCaptchaMatch] = useState(false)

  return (
    <div >
    { user?.email && <>
      <div>{user.email}</div>
      <hr />
      <div>
      <ReactCaptcha
				charset='ulns'
				length={6}
				color='white'
				bgColor='black'
				reload={true}
				reloadText='Recarregar captcha'
				handleSuccess={() => setCaptchaMatch(true)}
				handleFailure={() => setCaptchaMatch(false)} />

          <button disabled={!captchaMatch} onClick={() => setCaptchaMatch(false) || sendRequest(setResponse)}>Resetar Senha LCC</button>
          <div>
            { response && <span>{response}</span>}
          </div>
      </div>
      <hr />
      <div>
          <button onClick={() => logout()}>Logout</button>
      </div>
    </>
    }
    </div>
  )
}

export default withAuth(Private);