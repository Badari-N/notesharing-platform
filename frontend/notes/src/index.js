import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import MyTitle from './title';
import{BrowserRouter,Routes,Route} from "react-router-dom"
import MyLoginform from './loginform';
import MyRegister from './register';
import MyUser from './users';





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
               <Routes>
                       <Route
                        path='/'
                        element={<MyTitle/>}
                    
                       
                       
                       
                       />
                       <Route 
                        path="/login"
                        element={<MyLoginform/>}
                        />

                        <Route 
                        path='/register'
                        element={<MyRegister/>}/>

                        <Route
                        path="/users"
                        element={<MyUser/>}/>





               </Routes>



</BrowserRouter>

);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
