import GridView,{LinkComponent,COLLECTION_SORT,COLLECTION_FETCH,
                 COLLECTION_FILTER,COLLECTION_SET_PAGE,
                 COLLECTION_SETPAGE_SIZE} from 'components/gridFormView/reduxgridFormView';
import {refreshLevelfeeGrid} from '../lib/actions';
import React from 'react';
import Header from 'components/ModuleHeaderView/ModuleHeaderView';
import Button from 'components/LinkComponent/LinkButtonView';



import { connect } from 'react-redux';


var columns=['fee_code','amount'];

var columnsMetaData=[{
      'columnName': "fee_code",
      'order': 1,
      'locked': false,
      'visible': true,
      'displayName': "Code",
      'partialLink':'#levelfees/',
      'linkKey':'fee_code',
      'customComponent': LinkComponent
    },
    {
      "columnName": "amount",
      "order": 2,
      "locked": false,
      "visible": true,
      "displayName": "Amount "
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
        this.props.dispatch(refreshLevelfeeGrid(options));


        break;
    default:

    }


}

render(){


    let {title,description,onAction}=this.props;
    let header;

    if (!this.props.multiselect)
    {
        header=(<Header title= {title} description={description}>
                   <Button link='#studylevels/create' action='new'>Add new level</Button>
                   <Button link='#studylevels/delete' action='delete...'>Delete...</Button>
        </Header>);
    }
    else {
        header= (<Header title= {title} description={description}>
         <Button link='#' onLinkAction={this.handleActions.bind(this)} action='delete'>{BT_DELETE_SELECTED}</Button>

         </Header>);
    }

    return(<div>
             {header}
             <GridView {...this.props} columns={columns} columnMetadata={columnsMetaData}
                  collectionMgr={this.collectionMgr.bind(this) }/>
      </div>);

};

}

function mapStateToProps(state) {
    const { levelfeesGrid} = state;

    const {multiselect,results,
           showFilter,showSettings}=levelfeesGrid;
    return {
        multiselect,
        results,showFilter,showSettings
    };
}
export default connect(mapStateToProps)(List);
