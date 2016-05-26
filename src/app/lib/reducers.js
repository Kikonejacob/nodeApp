import {activeContainer} from './common/reducers';
import levels from 'modules/studylevels/lib/reducers';
import classes from 'modules/studyclasses/lib/reducers.js';
import levelfees from 'modules/levelfees/lib/reducers.js';
import schGrids from './grid/reducers';
import collections from './collections/reducers';
import students from 'modules/students/lib/reducers';
import studentTuitions from 'modules/studentTuition/lib/reducers';

export default {
    activeContainer,
    ...levels,
    ...classes,
    ...levelfees,
    ...schGrids,
    collections,
    students,
    studentTuitions,

};
