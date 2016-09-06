/**
 * STUDY CLASS INFORMATION Form
 *
 *
 */

import React,{Component,PropTypes} from 'react';
import Panel from 'components/panel/panel';
import List from 'components/list/List';
import InlineList from 'components/InlineList/InlineList';
import { connect } from 'react-redux';
import ProgressDialog from 'components/ProgressDialog/progressDialog';

import {DEFAULT_LEVELFEE_COLL_NAME} from 'modules/levelfees/lib/actions';
import Button from 'components/LinkComponent/LinkButtonView';
import {changeTitle} from 'lib/common/UIActions';
import ButtonGroup from 'components/ButtonsGroup/ButtonsGroup';

const LINK_CLASS_EDIT='#classes/:id/edit';
const LINK_LIST_LEVEL_FEES='./#studylevels/:id/fees';
const LINK_LEVEL_FEES='./#studylevels/:id/fees/:key';

const DEFAULT_BUTTONS=[
    {caption:'Delete',action:'delete'},
    {caption:'Edit',action:'edit'}
];
class Form extends Component{

    handleActions(e,action){

        if (this.props.onAction){
            return this.props.onAction(action);
        }
    }
    componentDidMount(){
        const {level,name}=this.props.data;
        //Change title according to class an level name
        this.props.dispatch(changeTitle(level.name+'::'+name));
    }
    render(){

        if (this.props.isFetching)
            return (<ProgressDialog> Please wait ....</ProgressDialog>);
        else
        {

            const {fees,data}=this.props;
            const buttons=(this.props.buttons)?this.props.buttons:DEFAULT_BUTTONS;
            let levelId=data.id;
            let feeUrl=LINK_LEVEL_FEES;
            let FeesRender='';
            let FooterRender=<ButtonGroup buttons={buttons} />;




            if (fees.items)
            {
                FeesRender=(<Panel title="Fees and tuitions"
                                   refLink={String(LINK_LIST_LEVEL_FEES).replace(':id',levelId)} >
                                <List data={fees.items}  captionField='fee_code'
                                    keyField='fee_code' linkUrl={feeUrl.replace(':id',levelId)}  />

                        </Panel>);
            }
            return(
            	<div className="col-lg-12">

        	    	<Panel title={data.name} refLink={String(LINK_CLASS_EDIT).replace(':id',levelId)}>
        	    			<div>

        				    	<p>Name: <span>{data.name}</span></p>
        				    	<p>Description: <span>{data.description}</span></p>
                                <p>Level: <span>{data.level.name}</span></p>
                                <p>room: <span>{data.room}</span></p>
        				    </div>
        			</Panel>
                    {FeesRender}

                    {FooterRender}

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

function mapStateToProps(state,ownProps) {
    const {classes,levels,activeContainer,collections } = state;
    const {classId}=activeContainer;

    const { isFetching,data} = classes[classId] || { isFetching: false,
                                                     data:{},
                                                    };

    /*const level=levels[data.levelId].data
    if (level==undefined) return {};*/
    let fees=collections[DEFAULT_LEVELFEE_COLL_NAME(data.levelId)];

    if (fees==undefined) fees={items:[]} ;
    return {data,
            fees,
            isFetching,
        /*level*/};
}
export default connect(mapStateToProps)(Form);
