import {ShouldFetch,APIgetFetch} from 'utils/asyncHelper';
import {URL_CLASSE_LIST,URL_CLASS,URL_LEVEL_CLASSES}from 'lib/apiUrlconst';
import {API_LIST_STUDYCLASS} from './actionTypes';

import {fetchCollection,initCollection} from 'lib/collections/actions';




/*
    Study Classes  Access Actions
 */


export function getStudyClasses(levelId) {
    return (dispatch, getState) => {

        let state=getState();
        const data = state.studyclasses?state.studyclasses:{};
        let url=URL_CLASSE_LIST;
        url=url.replace(':id',levelId);
        if (ShouldFetch(data, levelId)) {
            return dispatch(APIgetFetch(url,API_LIST_STUDYCLASS,{levelId}));
        }

    };
}


/** List level classes
 * *
 * @param  {[type]} levelId [description]
 * @return {[type]}         [description]
 */
export function listLevelClasses(levelId,collectionName){
    return (dispatch) => {
        let url=URL_LEVEL_CLASSES;
        url=url.replace(':id',levelId);
        if (collectionName==undefined){
            collectionName='levels.${levelId}.classes';
        }
        dispatch(initCollection(collectionName,url));
        dispatch(fetchCollection(collectionName,url));
    };

}
