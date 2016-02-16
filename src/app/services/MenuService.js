import SchmenuBar from '../components/menu/schmenu.js';
import React from 'react';
import ChannelConnection from 'services/servicesChannels'
import ReactDOM from 'react-dom';



class MenuSvc {


  constructor(){
  	   this.channel=ChannelConnection('services');

	   ReactDOM.render(
	   React.createElement(SchmenuBar, null),
	   document.getElementById("menu-container"));
	   console.log('Rolling the  menu service');
  }

 }

 var MenuSerivce= new MenuSvc();

 export default MenuSerivce;