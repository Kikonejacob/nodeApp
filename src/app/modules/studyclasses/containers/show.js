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
import {changeTitle} from 'lib/common/UIActions'


class Form extends Component{

    handleActions(e,action){

        if (this.props.onAction){
            this.props.onAction(action);
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
            const {fees,data,buttons}=this.props;
            let levelId=data.id;
            let feeUrl='./#studylevels/:id/fees/:key';
            let FooterRender,FeesRender='';

            if (buttons){
                let i=0;
                FooterRender= (<div>
                    {buttons.map((button)=>{
                        return (<Button link='#'
                                 onLinkAction={this.HandleActions.bind(this)}
                                 action={button.action}
                                 key={`button.${i++}`}
                                >
                                  {button.caption}
                                </Button>);
                    })}
                 </div>);
            }



            if (fees.items)
            {
                FeesRender=(<Panel title="Fees and tuitions">
                            <List data={fees.items}  captionField='fee_code'
                                    keyField='fee_code' linkUrl={feeUrl.replace(':id',levelId)}  />

                        </Panel>);
            }
            return(
            	<div className="col-lg-12">

        	    	<Panel title={data.name} refLink={String('/studyclasses/:id/edit').replace(':id',levelId)}>
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
