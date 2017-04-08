FlowRouter.route('/',{
  name:'home',
  action(){

    BlazeLayout.render('HomeLayout');
  }
});
FlowRouter.route('/posts',{
  name:'posts',
  action(){

    BlazeLayout.render('MainLayout',{name:"Posts"});
  }
});
FlowRouter.route('/messages',{
  name:'messages',
  action(){

    BlazeLayout.render('MainLayout',{name:"Messages"});
  }
});
FlowRouter.route('/chat-room',{
  name:'chat-room',
  action(){

    BlazeLayout.render('MainLayout',{name:"ChatRoom"});
  }
});
FlowRouter.route('/friends',{
  name:'friends',
  action(){

    BlazeLayout.render('MainLayout',{name:"Friends"});
  }
});
