import {API_LIST_TUITIONS} from './actionTypes.js';

import {APIgetFetch,ShouldFetch,APIpostFetch,APIputFetch,
        APIdeleteFetch} from 'utils/asyncHelper';
import {URL_STUDENT_TUITIONS,URL_STUDENTS} from 'lib/apiUrlconst';
import {fetchGridCollection} from 'lib/grid/actions';

export function listStudentTuitions(studentId){
    return (dispatch, getState) => {
        let state=getState();
        const data = state.studentTuitions[studentId]?state.studentTutions[studentId]:{};
        let url=URL_STUDENT_TUITIONS;
        url=url.replace(':id',studentId);
        console.log(url);
        if (ShouldFetch(data, studentId)) {
            return dispatch(APIgetFetch(url,API_LIST_TUITIONS,{studentId}));
        }
    };

}
