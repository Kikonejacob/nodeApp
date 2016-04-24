import React,{Component,PropTypes} from 'react';
import Panel from 'components/panel/panel.jsx';
import List from 'components/list/List';
import InlineList from 'components/InlineList/InlineList';
import { connect } from 'react-redux';
import ProgressDialog from 'components/ProgressDialog/progressDialog';
import {URL_STUDENT,URL_STUDENTS} from 'lib/apiUrlconst';


class Form extends Component{

    render(){
        if (this.props.isFetching)
            return (<ProgressDialog> Please wait ....</ProgressDialog>);
        else
        {
            let {tuition,enrollment,data}=this.props;
            let studentId=data.id;
            let tuitionUrl='./#students/:id/tuitions/:key';

            return(
            	<div className="col-lg-12">

        	    	<Panel title='Basics' configLink={String('#/students/:id/edit').replace('id',studentId)}>
        	    			<div>

        				    	<p>Name: <span>{data.fristName+' '+data.lastName}</span></p>
        				    	<p>contact: <span>{data.email}</span></p>
        				    </div>
        			</Panel>

        			<Panel title="Enrollments">
        	  			<InlineList data={enrollment.items} captionField='name'
                                  keyField='id' linkUrl='./#classes/:key/' />


        			</Panel>


        	  		<Panel title="Tuitions">
        	  			<List data={tuition.items}  captionField='fee_code'
                                keyField='fee_code' tuitionUrl={feeUrl.replace(':id',studentId)}  />

        			</Panel>

            	  </div>);
        }


    }



}

Form.propTypes = {
    data: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
    classes:PropTypes.object.isRequired,
    fees:PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const { levels,activeContainer } = state;
    const {
        isFetching,
        lastUpdated,
        data,
        classes,
        fees
        } = levels[activeContainer.levelId] || {
            isFetching: false,
            classes:{},
            fees:{},
            subjects:{},
            data:{},
        };
    return {
        data,
        classes,
        fees,
        isFetching,
        lastUpdated
    };
}
export default connect(mapStateToProps)(Form);
