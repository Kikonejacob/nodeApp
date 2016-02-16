import React from 'react';


var LinkComponent = React.createClass({
    render: function(){
        let key=this.props.metadata.linkKey;
        //console.log(key);
        key=(key==undefined)?'id':key;
        let url =this.props.metadata.partialLink + this.props.rowData[key] + '/';
        return <a href={url}>{this.props.data}</a>
    }
});

export default LinkComponent;