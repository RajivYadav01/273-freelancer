import axios, { post } from 'axios';
import cookie from 'react-cookies';

const url = "http://localhost:8900/";

export function fetchForm (data) {
    console.log("action data",data);
    var formData = new FormData(); 
    formData.append('userID', cookie.load('cookie'));
    formData.append('pname', data.pname);
    formData.append('textlg', data.textlg); 
    formData.append('skills', data.skills);
    if(data.fupl===undefined || data.fupl===null) {
        formData.append('fupl', null);
    }
    else {    
        formData.append('fupl', data.fupl.name);
    }
    formData.append('radiobtn', data.radiobtn);
    formData.append('drp1', data.drp1);
    formData.append('drp2', data.drp2);
    formData.append('newfile', data.fupl);
    formData.append('status', 'open');
    // Display the key/value pairs
    for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ', pair[1]); 
    }
    var headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data; charset=utf-8;');
    headers.append('Accept', 'application/json');
    const request = axios(url+"uploads", {
        method: 'post',
        headers: headers,
        data: formData
    });
    

    return {
        type: 'FETCH_FORM',
        payload: request
    };
}

export function signupAction (newData) {
    var headers = new Headers();
    headers.append('Accept', 'application/json');
    console.log("Data sent : ",newData);
    const request = axios('http://localhost:8900/signup/', {
        method: 'post',
        mode: 'no-cors',
        redirect: 'follow',
        withCredentials: true,
        headers: headers,
        data: JSON.stringify(newData)
    })
    // .then((response) => {
    //         dispatch({type: 'SUCCESS',payload : response})
    //         console.log(response);
    // })
    return {
        type: 'SUCCESS',
        payload: request
    };
}

export function signinAction (newData) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    console.log("Data sent : ",newData);
    const request = axios('http://localhost:8900/signin/', {
        method: 'post',
        mode: 'no-cors',
        redirect: 'follow',
        withCredentials: true,
        headers: headers,
        data: JSON.stringify(newData)
    })
    // .then((response) => {
    //         dispatch({type: 'SUCCESS',payload : response})
    //         console.log(response);
    // })
    return {
        type: 'LOGIN_SUCCESS',
        payload: request
    };
}

export function updateProfile(data, editing){
    console.log(data);
    const res=axios.post('http://localhost:8900/profile', data);
   
    return{
        type:'EDIT',
        payload: editing
    };
}

export function submitBid(data,pid){
    console.log(data);
    console.log(pid);
    const res=axios.post('http://localhost:8900/submitBid/'+pid, data);
   
    return{
    type:'TEMP',
    payload:''
    };
   }