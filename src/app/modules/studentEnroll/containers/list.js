/**
 * list grid:
 * react container for displaying a grid list of level fees:
 * schema: [fee_code,amount]
 * (c) 2016 kikone kiswendida
 */

import GridView,{LinkComponent,COLLECTION_SORT,COLLECTION_FETCH,
                 COLLECTION_FILTER,COLLECTION_SET_PAGE,
                 COLLECTION_SETPAGE_SIZE} from 'components/gridFormView/reduxgridFormView';
import {refreshGrid} from 'lib/grid/actions';
import React from 'react';
import Header from 'components/ModuleHeaderView/ModuleHeaderView';
import Button from 'components/LinkComponent/LinkButtonView';

const BT_DELETE_SELECTED='Delete selected';
const BT_CANCEL='Cancel';

import { connect } from 'react-redux';


const columns=['classId','payment_plan'];

const columnsMetaData=[
    {
        'columnName': "classId",
        'order': 1,
        'locked': false,
        'visible': true,
        'displayName': "Classe",
        'partialLink':'#studylevels/:id/fees/',
        'linkKey':'fee_code',
        'customComponent': LinkComponent,
    },
    {
        "columnName": "payment_plan",
        "order": 2,
        "locked": false,
        "visible": true,
        "displayName": "Payment plan"
    }
];

class List extends React.Component{
    collectionMgr(cmd,options){
        switch (cmd) {
        case COLLECTION_FETCH:
        case COLLECTION_SORT:
        case COLLECTION_FILTER:
        case COLLECTION_SET_PAGE:
        case COLLECTION_SETPAGE_SIZE:
            this.props.dispatch(refreshGrid(options,this.props.gridName));
            break;
        default:

        }
    }
    handleActions(e,action){
        let selectedRowIds=this.refs.gridlist.refs.SchGrid.state.selectedRowIds;
        console.log(selectedRowIds);

        if (this.props.onAction!=null)
        {
            this.props.onAction(action,selectedRowIds,this.props.dispatch);
        };
    }

    render(){
        let {title,description,onAction}=this.props;
        let header;
        //console.log(this.props.multiselect);
        if (!this.props.multiselect)
        {
            header=(<Header title= {title} description={description}>
                       <Button link='#studylevels/create' action='new'>Add new level</Button>
                       <Button link='#' onLinkAction={this.handleActions.bind(this)}
                                 action='multiselect'>Select</Button>
            </Header>);
        }
        else {
            header= (<Header title= {title} description={description}>
             <Button link='#' onLinkAction={this.handleActions.bind(this)} action='delete'>{BT_DELETE_SELECTED}</Button>
             <Button link='#' onLinkAction={this.handleActions.bind(this)} action='cancel_multiselect'>{BT_CANCEL}</Button>

             </Header>);
        }
        columnsMetaData[0].partialLink=columnsMetaData[0].partialLink.replace(':id',this.props.urlgroup);

        return(<div>
                 {header}
                 <GridView ref='gridlist' {...this.props} columns={columns} columnMetadata={columnsMetaData}
                      collectionMgr={this.collectionMgr.bind(this)  } multiselect={this.props.multiselect}/>
          </div>);

    };

}

function mapStateToProps(state) {
    const { schGrids} = state;
    const levelfeesGrid=schGrids['level.fees.grid'];

    const {results,multiselect,
           showFilter,showSettings}=levelfeesGrid;
    return {
        multiselect,
        results,showFilter,showSettings
    };
}
export default connect(mapStateToProps)(List);
