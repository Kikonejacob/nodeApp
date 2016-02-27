import {ShouldFetch,APIgetFetch,APIdeleteFetch,APIpostFetch,APIputFetch} from 'utils/asyncHelper';
import {URL_LEVEL_FEE,URL_LEVEL_FEES}from 'lib/apiUrlconst';
import {API_SAVE_LEVEL_FEE,API_GET_LEVEL_FEE,API_CREATE_LEVEL_FEE
        ,API_DEL_LEVEL_FEE,API_DEL_LEVEL_FEES,GRID_COLLECT_LEVEL_FEE,CHANGE_STATE,GRID_CONF_LEVEL_FEE} from './actionTypes.js';

import {fetchCollection,getCollectionParams} from './gridActionsHelpers.js';
import * as _ from 'underscore';




export function fetchLevelfeeGrid(levelId){

    return (dispatch, getState) => {
        let state=getState().levelfeesGrid;
        console.log(state);
        let url=URL_LEVEL_FEES.replace(':id',levelId);
        console.log(url);
        let params=getCollectionParams(url,state.collectionOptions);
        params.url=url;

        console.log(params);
        if (ShouldFetch(state)) {
            return dispatch(APIgetFetch(url,GRID_COLLECT_LEVEL_FEE,params));
        }

    };

}

export function refreshLevelfeeGridOptions(options){
    return { type:GRID_CONF_LEVEL_FEE,options}
}

export function refreshLevelfeeGrid(collectionOptions){

    return (dispatch, getState) => {
        console.log('refreshinnnnnn')
        let state=getState().levelfeesGrid;
        let changeAction={type:GRID_COLLECT_LEVEL_FEE,
                             status:CHANGE_STATE,
                             ...collectionOptions}

        if (!state.collectionOptions.url)
        {
            console.log(collectionOptions)
            return dispatch(changeAction)

        }
        else {
            dispatch(changeAction);
        }

        let url=state.collectionOptions.url;
        let NewcollectionOptions={...state.collectionOptions,...collectionOptions}
        console.log(NewcollectionOptions);
        let params=getCollectionParams(url,NewcollectionOptions);
        //console.log(params);
        if (ShouldFetch(state)) {
            return dispatch(APIgetFetch(url,GRID_COLLECT_LEVEL_FEE,{},params));
        }

    };

}

/*
level fees
 */
export function levelfeeGet(feecode) {
    return (dispatch, getState) => {
        let state=getState();
        const data = state.levelsfees[feecode]?state.levelsfees[feecode]:[];
        let url=URL_LEVEL_FEE;
        url=url.replace(':id',feecode);
        if (ShouldFetch(data, feecode)) {
            return dispatch(APIgetFetch(url,API_GET_LEVEL_FEE,{feecode}));
        }
    };
}

export function levelfeeSave(levelId,data){
    return (dispatch) => {
        let url=String(URL_LEVEL_FEE).replace(':id',levelId);
        return dispatch(APIputFetch(url,API_SAVE_LEVEL_FEE,{levelId,...data}));
    };

};
export function levelfeeCreate(data){
    return (dispatch) => {
        let url=URL_LEVEL_FEE;
        return dispatch(APIpostFetch(url,API_CREATE_LEVEL_FEE,{levelId:-1,...data}));
    };

};

export function levelfeesDelete(codes){
    return (dispatch) => {
        let url=URL_LEVEL_FEE;
        return dispatch(APIdeleteFetch(url,API_DEL_LEVEL_FEE,{...codes}));
    };

};

export function levelfeeDelete(codes){
    return (dispatch) => {
        let url=URL_LEVEL_FEE;
        return dispatch(APIdeleteFetch(url,API_DEL_LEVEL_FEES,{...codes}));
    };

};
