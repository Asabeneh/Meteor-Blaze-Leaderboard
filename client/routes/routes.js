//
// Router.route('/', {
//     name: 'home',
//     template: 'home'
// });
// Router.route('/login',{
//   name:'login',
//   template:'login'
// });
// Router.route('/signup',{
//   name:'signup',
//   template:'singup'
// });
//
//
//
// Router.configure({
//     layoutTemplate: 'main'
// });

FlowRouter.route('/',{
  name:'home',
  action(){
    BlazeLayout.render('HomeLayout');
  }
});

FlowRouter.route('/test',{
  name:'home',
  action(){
    BlazeLayout.render('MainLayout',{main:'Test'});
  }
});
