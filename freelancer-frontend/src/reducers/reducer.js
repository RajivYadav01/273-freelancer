import cookie from 'react-cookies';

const initialState = {
    token : null,
    id : null,
    error : false,
    project : ''
}

const reducer = (state = initialState, action) => {
    if(action.type === 'SUCCESS'){
        return{
            token: 'new token value',
            id : action.payload.data    
        }
        
    }

    if(action.type === 'ERROR'){
        return{
            error : 'error msg'
        }
    }

    if(action.type === 'LOGIN_SUCCESS'){
        //console.log("ID Value : "+action.payload.data.id);
        console.log("Action : ",action.payload.data);
        if(action.payload.data !== null){
            return{
                id : cookie.load('cookie'),
                error : false
            }
        }
        else{
            return{
                id : null,
                error : true
            }
        }
        
    }

    if(action.type === 'SHOW_PROJ'){
        console.log("SHOW PROJ",action.payload);
        return{
            project : action.payload
        }
    }

    if(action.type === 'FETCH_FORM') {
        return {
            token:null
        }
    }

    return state;
}

export default reducer;