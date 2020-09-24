import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {BrowserRouter as Router} from 'react-router-dom'

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

// http://127.0.0.1:8000/signin - post
// {
//     "username": "dima",
//     "email": "dima@gmail.com",
//     "password": "pbkdf2_sha256$216000$AsBgxf4iQgxw$UMWoyYarcoxnWYVGaipwTiPUxNn/Ibin8U1YH04ikO0=",
//     "profile": {
//     "phone": "+380677010309"
// }
// }

// http://127.0.0.1:8000/token - post
// {
//     "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYwMTA0NDY2NSwianRpIjoiMzZiMzUzYmE2NGI0NDgwYWFhMTI0MDRjMjRhMzFhOWIiLCJ1c2VyX2lkIjo2fQ.ifTIGIXArvfRe6TEbgcOILLdotOHLoyJWqcW3s-ie9k",
//     "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjAwOTU4NTY1LCJqdGkiOiJlN2Y4ZDVjMGNhYjg0Y2MxOTA5NzVjZTgwODc0ODQ1NyIsInVzZXJfaWQiOjZ9.hnTOZcOGVP_axhvDOx46hkRBpur2Hupj7cH9Tn2aU_c"
// }
