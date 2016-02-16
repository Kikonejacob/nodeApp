import React,{Component,PropTypes}  from 'react';
import   FormView, {btSaveCancel} from 'components/FormView/form-view';
import * as schema from './form.studylevel.schema.json' ;
import { connect } from 'react-redux';



export default class Form extends Component{



render(){


    return(<div> <FormView formButtons={btSaveCancel} schema={schema}
                     data={this.props.data} {...this.props} />
           </div>);



}



}


Form.propTypes = {
    data: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
    onSubmitForm:PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    const { levels,activeContainer } = state;
    const {
          data,
          lastUpdated,
          isFetching
          } = levels[activeContainer.levelId]|| {
              isFetching: false,
              data:{},
          };
    return {
        data,
        isFetching,
        lastUpdated
    };
}
export default connect(mapStateToProps)(Form);
