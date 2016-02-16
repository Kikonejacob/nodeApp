import {activeContainer} from './common/reducers';
import levels from 'modules/studylevels/lib/reducers';
import classes from 'modules/studyclasses/lib/reducers.js';

export default {
   activeContainer,
   ...levels,
   ...classes


}
