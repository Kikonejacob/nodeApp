import React,{Component,PropTypes} from 'react';
import Panel from 'components/panel/panel';
import List from 'components/list/List';
import InlineList from 'components/InlineList/InlineList';
import { connect } from 'react-redux';
import ProgressDialog from 'components/ProgressDialog/progressDialog';


class Form extends Component{

    render(){
        if (this.props.isFetching)
            return (<ProgressDialog> Please wait ....</ProgressDialog>);
        else
        {
            let {fees,data}=this.props;
            let levelId=data.id;
            let feeUrl='./#studylevels/:id/fees/:key';

            return(
            	<div className="col-lg-12">

        	    	<Panel title={data.name} refLink={String('/levels/:id/edit').replace(':id',levelId)}>
        	    			<div>

        				    	<p>Name: <span>{data.name}</span></p>
        				    	<p>Description: <span>{data.description}</span></p>
                                <p>Level: <span>{data.level}</span></p>
        				    </div>
        			</Panel>


        	  		<Panel title="Fees and tuitions">
        	  			<List data={fees.items}  captionField='fee_code'
                                keyField='fee_code' linkUrl={feeUrl.replace(':id',levelId)}  />

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
    fees:PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const { levels,activeContainer } = state;
    const {
        isFetching,
        lastUpdated,
        data,
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
        fees,
        isFetching,
        lastUpdated
    };
}
export default connect(mapStateToProps)(Form);
