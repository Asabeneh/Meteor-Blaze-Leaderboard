import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './AddPlayer.html';

Template.addPlayerForm.events({
  'submit form':function(event){
    event.preventDefault();

    var playerNameVar = event.target.playerName.value;
    var playerValueVar = event.target.playerValue.value;
    if(playerValueVar === ''){
      playerValueVar = 0;
    }else{
       playerValueVar = parseInt(event.target.playerValue.value);
    }

    var currentUserId = Meteor.userId();
    Meteor.call('createPlayer',playerNameVar,playerValueVar);
    event.target.playerName.value = "";
    event.target.playerValue.value = "";
  }
});
