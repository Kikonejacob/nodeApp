/**
 *  REDUX REDUCER FOR STUDENT ENROLLMENTS
 *  (C) 2016 Kiswendsida  Kikone
 */

import {LIST_STUDENT_TUITIONS,API_GET_ENROLL,API_SET_ENROLL,API_DEL_ENROLL
      ,REST_DEL_STUDENTS,REST_NEW_STUDENT} from './actionTypes.js';
import {RESTAPI_REQUEST} from 'lib/common/actionTypes';
import {merge} from 'utils/stateHelper';


export default function studentEnrollments(state={},action)
{
    let isFetching=false;
    let data,extra={};
    switch(action.type){
    case API_GET_ENROLL:
        isFetching=(action.status==RESTAPI_REQUEST);
        data=action.data;
        if (isFetching){
            extra={lastUpdated:action.receivedAt};
        };
        return merge(state)(action.enrollId,{
            isFetching,
            data,
            ...extra,
            didInvalidate: false,
        });
        break;
    case API_SET_ENROLL:
    case API_SET_ENROLL:
        isFetching=(action.status==RESTAPI_REQUEST);
        data=(isFetching)? {}: action.data;
        extra=(isFetching)?{} : {lastSave:action.savedAt};
        return merge(state)(action.enrollId,{
            isFetching,
            didInvalidate: false,
        });
        break;
    default:
        return state;
    }
}
