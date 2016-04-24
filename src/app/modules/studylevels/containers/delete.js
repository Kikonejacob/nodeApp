import GridView from 'components/gridFormView/gridFormView';
import React,{PropTypes} from 'react';
import Header from 'components/ModuleHeaderView/ModuleHeaderView';
import Button from 'components/LinkComponent/LinkButtonView';
import { connect } from 'react-redux';
import {updateSelectedIds} from 'lib/common/actions.js';


const BT_DELETE_SELECTED='Delete selected';



var columns=['id','name','description','created'];

var columnsMetaData=[{
      'columnName': "name",
      'order': 2,
	    'locked': false,
	    'visible': true,
	    'displayName': "Name",
	    'partialLink':'#studylevels/',
	  },
	  {
	    "columnName": "description",
	    "order": 3,
	    "locked": false,
	    "visible": true,
	    "displayName": "Description "
	  },
	  {
	    "columnName": "created",
	    "order": 4,
	    "locked": false,
	    "visible": true,
	    "displayName": "Created"
	  }

	];



export default class View extends React.Component{

getdata(){

    return this.deletegrid.refs.go();
}

handleRowClick(gridRow,event){
/*
	console.log(this.refs.deletegrid.refs.delphi.state);

	let SelectedIds=gridRow.props.multipleSelectionSettings.getSelectedRowIds();
	console.log(gridRow.props);
/*
	if (gridRow.props.multipleSelectionSettings.getIsRowChecked(gridRow.)==false){
		 SelectedIds={...SelectedIds,gridRow.props.}
	}*/
/*	console.log(SelectedIds)




	this.props.dispatch(updateSelectedIds(SelectedIds));
*/

}

handleActions(e,action){
    let selectedRowIds=this.refs.deletegrid.refs.SchGrid.state.selectedRowIds;
    console.log(selectedRowIds);

    if (this.props.onAction!=null)
		{
        this.props.onAction(action,selectedRowIds);
    };
}

render(){


    let {title,description}=this.props;

    return(<div>
             

             <Header title= {title} description={description}>
             <Button link='#' onLinkAction={this.handleActions.bind(this)} action='delete'>{BT_DELETE_SELECTED}</Button>

             </Header>
		     <GridView ref='deletegrid' {...this.props} columns={columns}
		             columnMetadata={columnsMetaData}  onRowClick={this.handleRowClick.bind(this)}/>


			</div>);

};

}
View.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    collection: PropTypes.object.isRequired,
    onAction:PropTypes.func.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
	}
;


export default connect()(View);
