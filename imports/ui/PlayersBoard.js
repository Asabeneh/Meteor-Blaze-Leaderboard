import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './PlayersBoard.html';
import {Players } from '../api/players';

Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('players');
});

Template.leaderboard.helpers({
  player: function(){
    var currentUserId = Meteor.userId();
    return Players.find({createdBy:currentUserId},{sort:{score:-1,name:1}});
  },
  count:function(){
    return Players.find().count();
  },
  'selectedClass':function(){
    var playerId = this._id;
    var selectedPlayer = Session.get('selectedPlayer');
    if(playerId == selectedPlayer){
      return "selected";
    }
  },

  'selectedPlayer':function(){
    var selectedPlayer = Session.get('selectedPlayer');
    return Players.findOne({_id:selectedPlayer});

  }
});

Template.leaderboard.events({
  'click .player':function(){
    var playerId = this._id;
    //console.log("You have clicked a player element");
    Session.set('selectedPlayer', playerId);

    //console.log(selectedPlayer);
    //console.log(playerId);
  },
  'click .increment':function(){
    var selectedPlayer = Session.get('selectedPlayer');
    Meteor.call('updateScore', selectedPlayer, 5);
    //Players.update({_id:selectedPlayer},{$inc:{score:5}});

  },
  'click .add__button':function(){
    var selectedPlayer = Session.get('selectedPlayer');
    Meteor.call('updateScore', selectedPlayer, 1);
  },
  'click .decrement':function(){
    var selectedPlayer = Session.get('selectedPlayer');
    Meteor.call('updateScore', selectedPlayer, -5);
    //Players.update({_id:selectedPlayer}, {$inc:{score:-5}});
  },
  'click .minus__button':function(){
    var selectedPlayer = Session.get('selectedPlayer');
    Meteor.call('updateScore', selectedPlayer, -1);
    //Players.update({_id:selectedPlayer}, {$inc:{score:-5}});
  },
  'click .remove,.delete__button':function(){
    var selectedPlayer = Session.get('selectedPlayer');
    if(confirm(`Are you sure you like to Delete?`)){
    // Players.remove({_id:selectedPlayer});
    // $("." + selectedPlayer).hide('slow',function(){
      Meteor.call('removePlayer',selectedPlayer);
  //  });

  }
},
  'click .removeAll':function(){
    if(confirm("Are you sure you like to delete all players?")){

    Meteor.call('removeAllPlayer');
    }
}

  });
