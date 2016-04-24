import {ShouldFetch,APIgetFetch,APIdeleteFetch,APIpostFetch,APIputFetch} from 'utils/asyncHelper';
import {URL_LEVEL_FEE,URL_LEVEL_FEES}from 'lib/apiUrlconst';
import {API_SAVE_LEVEL_FEE,API_GET_LEVEL_FEE,API_CREATE_LEVEL_FEE
        ,API_DEL_LEVEL_FEE,API_DEL_LEVEL_FEES,GRID_COLLECT_LEVEL_FEE,GRID_CONF_LEVEL_FEE} from './actionTypes.js';

import {fetchGridCollection} from 'lib/grid/actions';




/**
 * Intialize the grid component  that shows a list of level fees
 * @param  {[type]} levelId  [description]
 * @param  {[type]} gridName [description]
 * @return {[type]}          [description]
 */
export function initLevelfeeGrid(levelId,gridName){

    let url=URL_LEVEL_FEES.replace(':id',levelId);
    console.log(url);
    return fetchGridCollection(url,gridName);

}

/**
 * [levelfeeGet get information about level feed]
 * @param  {[integer]} levelId [description]
 * @param  {[string]} feecode [description]
 * @return {[void]}         [description]
 */
export function levelfeeGet(levelId,feecode) {
    return (dispatch, getState) => {
        let state=getState();
        const data = state.levelfees[feecode]?state.levelfees[feecode]:[];
        let url=URL_LEVEL_FEE;
        url=url.replace(':id',levelId).replace(':code',feecode);
        if (ShouldFetch(data, feecode)) {
            return dispatch(APIgetFetch(url,API_GET_LEVEL_FEE,{feecode}));
        }
    };
}
/**
 * [levelfeeSave save level fee in ]
 * @param  {integer} levelId [ the level id]
 * @param  {object} data    [ data to be saved]
 * @return {[void]}         [description]
 */
export function levelfeeSave(levelId,data){
    return (dispatch) => {
        let url=String(URL_LEVEL_FEE).replace(':id',levelId)
                .replace(':code',data.code);
        console.log(API_SAVE_LEVEL_FEE);
        return dispatch(APIputFetch(url,API_SAVE_LEVEL_FEE,{levelId,...data}));
    };

};
export function levelfeeCreate(levelId,data){
    return (dispatch) => {
        let url=URL_LEVEL_FEES;
        return dispatch(APIpostFetch(url,API_CREATE_LEVEL_FEE,{levelId:-1,...data}));
    };

};

export function levelfeesDelete(levelId,codes){
    return (dispatch) => {
        let url=URL_LEVEL_FEES;
        return dispatch(APIdeleteFetch(url,API_DEL_LEVEL_FEE,{...codes}));
    };

};

export function levelfeeDelete(codes){
    return (dispatch) => {
        let url=URL_LEVEL_FEE;
        return dispatch(APIdeleteFetch(url,API_DEL_LEVEL_FEES,{...codes}));
    };

};
