
import React,{PropTypes} from 'react';
import Griddle from 'griddle-react';
import _ from 'underscore';
import GriddlePager from './GriddlePager';
import LinkComponent from './griddleLinkComponent';// just for export purpose
import Spinner from 'react-spin';

export const COLLECTION_FETCH='COLLECTION_FETCH';
export const COLLECTION_SORT='COLLECTION_SORT';
export const COLLECTION_SET_PAGE='COLLECTION_SET_PAGE';
export const COLLECTION_FILTER='COLLECTION_FILTER';
export const COLLECTION_SETPAGE_SIZE='COLLECTION_SETPAGE_SIZE';


var SchGridView = React.createClass({

    componentDidMount: function(){
        this.props.collectionMgr(COLLECTION_FETCH);
    /* this.getExternalData();
     //TODO: find a way for selecting
    // servicesChannels('services').on('getdata',this.go.bind(this))
     this.props.dispatch()*/
    },
    componentWillReceiveProps:function(nextProps){
        //console.log(nextProps);

    },
    getExternalData: function(stateInfo=null){
        this.props.dispatch()
        $.when(this.props.collection.fetch())
       .done(function(response){

           let collection=this.props.collection;
           console.log('maxPage'+response.last_page);
           let state={
               results: response.data,
               currentPage: response.current_page - 1,
               maxPages: response.last_page,
               externalResultsPerPage: response.per_page,
               externalSortColumn: 'id',
               externalSortAscending: null
           };
           if (stateInfo!==undefined)
           {
               _.extend(state,stateInfo);
           }
           this.setState(state);


        }.bind(this));
  },
  externalSetPage: function(index){
    var index = index + 1;
    this.props.collectionMgr(COLLECTION_SET_PAGE,{currentPage:index},this.props);

    /*
    var col=this.props.collection;
    console.log([col.state.firstPage,col.state.currentPage,col.state.totalPages]);
    this.props.collection.getPage(index);
    this.getExternalData();*/
  },
  changeSort: function(sort, sortAscending){
    this.props.collectionMgr(COLLECTION_SORT,{sorkey:sort,direction:sortAscending});
    /*
    var order;
    if (this.props.collection.state.order === 1) {
      order = -1
    } else {
      order = 1
    }
    var sortKey = sort;
    this.props.collection.setSorting(sortKey, order);
    this.getExternalData({externalSortAscending:sortAscending,
                        externalSortColumn:sort});*/
  },
  setFilter: _.debounce(function(filter){
     console.log('dffdf')
    this.props.collectionMgr(COLLECTION_FILTER,{query:filter})
  /*  this.props.collection.state.query = filter;
    this.props.collection.getPage(1);
    this.getExternalData();*/
  },800),
  setPageSize: function(size){
    this.props.collectionMgr(COLLECTION_SETPAGE_SIZE,{pageSize:size})
/*
    let col=this.props.collection;
    this.props.collection.setPageSize(size);
    this.getExternalData();*/
  },



  getcolums:function(){

    return this.props.columns;
  },

  getcolumsMeta:function(){

    let meta=[];

    /*if (this.props.multiselect)
    {
      meta.push({
                columnName: 'selected',
                cssClassName: 'selected',
                visible: false,
                displayName: '',
                customComponent: SelectedComponent
            })
    }*/

    _.extend(meta,this.props.columnMetadata);
    return meta;
  },

  go:function(){

    return this.ref.SchGrid.getSelectedRowIds();
  },
    render: function(){

        var multiselectProps={};
        console.log(this.props.collectionOptions);
        if (this.props.collectionOptions.multiselect)
        {
            console.log(this.props.selectedIds);
            multiselectProps={
                isMultipleSelection:true,
                selectedRowIds:this.state.selectedIds,
                rowSelection:'multiple'
            };
        }

        let {collectionOptions}=this.props;
        //console.log(collectionOptions);



        return (<div className="table-responsive">

      <Griddle ref='SchGrid' useExternal={true} externalSetPage={this.externalSetPage}
         externalChangeSort={this.changeSort}
          externalSetFilter={this.setFilter}
          externalSetPageSize={this.setPageSize}

          externalMaxPage={collectionOptions.totalPages}
          externalCurrentPage={collectionOptions.currentPage}
         externalSortColumn={collectionOptions.sortKey}
         externalSortAscending={this.props.SortAscending==-1}

          results={this.props.results}
          resultsPerPage={this.props.pageSize}

         useGriddleStyles={false}
         showFilter={this.props.showFilter}
         showSettings={this.props.showSettings}
         uniqueIdentifier={this.props.uniqueID ? this.props.UniqueID : 'id'}


          tableClassName="table table-striped table-hover table-bordered table-condensed"
          columnMetadata={this.getcolumsMeta()}

         useCustomPagerComponent="true"
         customPagerComponent={GriddlePager}

         {...multiselectProps}
         {...this.props}




          columns={this.getcolums()}/>

     </div>);
    }
 });

SchGridView.propTypes = {
    collectionMgr: PropTypes.func.isRequired,
    multiselect:PropTypes.bool.isRequired,
    collectionOptions:PropTypes.object.isRequired,
    isFetching:PropTypes.bool
};



export default SchGridView;
export {LinkComponent};
