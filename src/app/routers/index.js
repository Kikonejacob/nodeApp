/* router manager


very important: for the router to route,

this is very important if you running

 start() {
      Backbone.history.start({pushState: false,root:"/app/"});  // change '/app/'
    }

*/



import Backbone from'backbone';
import Radio from 'backbone.radio';
import controllers from  '../controllers/controllers.js';
import _ from 'underscore';
import debug from 'utils/debug';
import {injectAsyncReducers} from 'services/globalstore';






var AppRouter=Backbone.Router.extend ({

    routes:{
        '':'students#index',
        'home':'home',
        'students':'students#index',
        'students/:id/show':'students#show',
        'students/:id/edit':"students#edit",
        'students/admissions/add':'students#create',
        'schoolinfo':'schoolinfo#show',
        'studylevels':'studylevels#index',
        'studylevels/:id/':'studylevels#show',
        'studylevels/:id/$edit':'studylevels#edit',
        'studylevels/$create':'studylevels#create',
        'studylevels/$delete':'studylevels#delete',
        'studylevels/:id/classes':'studyclasses#index',
        'classes':'studyclasses#index',
        'classes/:id/':'studyclasses#show',
        'classes/create':'studyclasses#create',
        'subjects':'subjects#index',
        'subjects/:id/':'subjects#show',
        'subjects/create':'subjects#create',
        'feeheads':'feeheads#index',
        'feeheads/:id/':'feeheads#show',
        'feeheads/create':'feeheads#create',
        'studylevels/:id/fees':'levelfees#index',
        'studylevels/:id/fees_multiselect':'levelfees#select',
        'levelfees/:id':'levelfees#show',

    },

    initialize:function (options) {
        console.log('executing router');
        this.currentController=null;
        this.channel=Radio.channel('services');
        this.channel.on('routeBack',this.back.bind(this));
        //console.log(options);
        this.store=options.store;


        this.routesHit = 0;
         //keep count of number of routes handled by your application
        Backbone.history.on('route', function() { this.routesHit++; }, this);

         // this.route('', 'students#index');
    },

    back: function() {
        console.log('d back');
        if(this.routesHit > 1) {
            //more than one route hit -> user did not land to current page directly
            window.history.back();
        } else {
            //othe,rwise go to the home page. Use replaceState if available so
            //the navigation doesn't create an extra history entry
            this.navigate('app/', {trigger:true, replace:true});
        }
    },

    execute:function(callback, args, name) {

        var controllerInfo=name.split('#');

        var controller=_.propertyOf(controllers)(controllerInfo[0]);
        //debug.log(name+'_router name');

        // if (this.currentController!=undefined)  this.currentController.destroy;
        let options=Object.assign({},{store:this.store});

        this.currentController= new controller(options);

        if (this.currentController.reducers){
            let reducers=this.currentController.reducers;
            injectAsyncReducers(this.store, this.currentController.name, reducers);
        }

        this.currentController[controllerInfo[1]](args);

     /* if _isfunction(callback){


      }*/




      //if (callback) callback.apply(this, args);
    },

    configureChannel:function(){

        this.channel.on('regRoute',this.regRoute.bind(this));
    },

    start:function() {
        console.log('starting routing');
        Backbone.history.start({pushState: false,root:'/app/'});
    },

    regRoute:function(route,name,func){

        this.route(route,name,func);
    }

});

var router=null;

function CreateAppRouter(options){

    router=new AppRouter(options);

    return router;


};


export default CreateAppRouter ;
