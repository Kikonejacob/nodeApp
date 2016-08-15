import {updateActiveContainer,changeTitle,loadConnectedContainer} from 'lib/common/actions';

export default function UIController(store){
    this.dispatch=store.dispatch;
    this.store=store;
};

UIController.loadContainer=(Container,Info)=>{
    if (Info!='undefined') this.updateActiveContainer(Info);
    return this.dispatch(loadConnectedContainer(Container,this.store));
};
UIController.changeTitle=(title)=>{
    return this.dispatch(changeTitle(title));
};
UIController.updateActiveContainer=(info)=>{
    return this.dispatch(updateActiveContainer(info));

};
