import {ShouldFetch,APIgetFetch} from 'utils/asyncHelper';
import {URL_CLASSE_LIST,URL_CLASS}from 'lib/apiUrlconst';
import {API_LIST_STUDYCLASS} from './actionTypes';



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
