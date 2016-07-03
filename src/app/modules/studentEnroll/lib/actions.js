import {LIST_STUDENT_ENROLLMENT,API_DEL_ENROLL,API_ENROLL,API_GET_ENROLL} from './actionTypes.js';

import {APIgetFetch,ShouldFetch,APIpostFetch,APIputFetch,
        APIdeleteFetch} from 'utils/asyncHelper';
import {URL_STUDENT_ENROLLMENT,URL_STUDENT_ENROLLMENTS} from 'lib/apiUrlconst';
import {initCollection,fetchCollection} from 'lib/collections/actions';
import {initGrid} from 'lib/grid/actions';

/* Intialize the grid component  that shows a list of student enrollments
* @param  {string} gridName The name of grid
* @return {void}
*/
export function initStudentEnrollmentsGrid(gridName){

    return(dispatch)=>{
        let url=URL_STUDENT_ENROLLMENTS;
        dispatch(initGrid(url,gridName));
        return dispatch(fetchCollection(gridName,url));
    };

}

export function listStudentEnrollments(studentId,collectionName){
    return (dispatch) => {
        let url=URL_STUDENT_ENROLLMENTS;
        url=url.replace(':id',studentId);
        if (collectionName==undefined){
            collectionName='student.${studentId}.enrollments';
        }
        dispatch(initCollection(collectionName,url));
        dispatch(fetchCollection(collectionName,url));
    };

}
export function Enroll(studentId,classId,options){
    return (dispatch) => {
        let url=String(URL_STUDENT_ENROLLMENT).replace(':id',studentId);
        return dispatch(APIputFetch(url,API_ENROLL,{studentId,classId,...options}));
    };

}

export function getEnrollmentInfo(enrollId){
    return (dispatch, getState) => {
        let state=getState();
        const data = state.studentEnrollments[enrollId]?state.studentEnrollments[enrollId]:[];
        let url=String(URL_STUDENT_ENROLLMENT).replace(':id',enrollId);
        if (ShouldFetch(data, enrollId)) {
            return dispatch(APIgetFetch(url,API_GET_ENROLL,{enrollId}));
        }
    };
}
export function CancelEnrollment(enrollmentId){

}
