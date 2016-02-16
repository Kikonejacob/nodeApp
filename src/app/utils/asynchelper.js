import { get,post,del,put} from 'utils/http';
import {RESTAPI_RECEIVE,RESTAPI_REQUEST} from 'lib/common/actionTypes';



function AsyncActionCreator(actionType,status,options){
    return { ...options,
             type:actionType,
             status:status
    };


}

export function ShouldFetch(data) {
    if (!data) {
        return true;
    } else if (data.isFetching) {
        return false;
    } else {
        return true; //data.didInvalidate;
    }
}
export  function APIgetFetch(url,actionType,subdata) {
    return dispatch => {
        dispatch(AsyncActionCreator(actionType,RESTAPI_REQUEST,subdata));
        return get(url)
          //.then(req => req.json())
          .then(json => {
              let params={...subdata,
                              data:json.data,
                              receivedAt:Date.now()
                            };
              return dispatch(AsyncActionCreator(actionType,RESTAPI_RECEIVE,params));
          });

    };
}


export  function APIpostFetch(url,actionType,subdata) {
    return dispatch => {
        dispatch(AsyncActionCreator(actionType,RESTAPI_REQUEST,subdata));
        console.log(subdata);
        return post(url,{params:subdata})
          //.then(req => req.json())
          .catch(()=>{
              alert('error in api communication');
          })
          .then(json => {
              let params={...subdata,
                              response:json.data,
                              savedAt:Date.now()
                            };
              return dispatch(AsyncActionCreator(actionType,RESTAPI_RECEIVE,params));
          });

    };
}

export  function APIputFetch(url,actionType,subdata) {
    return dispatch => {
        dispatch(AsyncActionCreator(actionType,RESTAPI_REQUEST,subdata));
        console.log(url);
        return put(url,{params:subdata})
          //.then(req => req.json())
          .then(json => {
              let params={...subdata,
                              response:json.data,
                              savedAt:Date.now()
                            };
              //console.log(params);
              return dispatch(AsyncActionCreator(actionType,RESTAPI_RECEIVE,params));
          });

    };
}

export  function APIdeleteFetch(url,actionType,subdata) {
    return dispatch => {
        dispatch(AsyncActionCreator(actionType,RESTAPI_REQUEST,subdata));
        return del(url,{params:subdata})
          .catch(()=>{
              alert('error in api communication :'+url);
          })
          //.then(req => req.json())
          .then(()=> {

              return dispatch(AsyncActionCreator(actionType,RESTAPI_RECEIVE,subdata));
          });

    };
}
/*
export  function APIgetFetch(url,subdata,requestfunc,sucessfunc,errorfunc) {
    return dispatch => {
        dispatch(requestfunc(subdata));
        return get(url)
          //.then(req => req.json())
          .then(json => dispatch(sucessfunc(subdata, json)));
    };
}

export  function APIdeleteFetch(url,subdata,requestfunc,sucessfunc,errorfunc) {
    return dispatch => {
        dispatch(requestfunc(subdata));
        return delete(url)
          //.then(req => req.json())
          .then(json => dispatch(sucessfunc(subdata, json)));
    };
}





export  function APIpost(url,params,requestfunc,sucessfunc,errorfunc) {
    return dispatch => {
        dispatch(requestfunc(params));
        return post(url,{params:params})
          //.then(req => req.json())
          .then(json => dispatch(sucessfunc(params, json)));
    };
}*/
