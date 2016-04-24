import {activeContainer} from './common/reducers';
import levels from 'modules/studylevels/lib/reducers';
import classes from 'modules/studyclasses/lib/reducers.js';
import levelfees from 'modules/levelfees/lib/reducers.js';
import schGrids from './grid/reducers';
import students from 'modules/students/lib/reducers';

export default {
    activeContainer,
    ...levels,
    ...classes,
    ...levelfees,
    ...schGrids,
    students,


};
