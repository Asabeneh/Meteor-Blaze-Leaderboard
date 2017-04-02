import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import SimpleSchema from 'simpl-schema';
export const Players = new Mongo.Collection('players');


if(Meteor.isServer){

Meteor.publish('players',function(){
  return Players.find({});
})

}

//
// let now = new Date().getTime();
// console.log(now);
// let momentNow = moment(0);
// console.log(momentNow.fromNow('MMM Do, YYYY,h:mm A'))

Meteor.methods({
    'createPlayer': function(name,score){
    // check(playerNameVar, String);
    // check(playerValueVar, Number);

    var currentUserId = Meteor.userId();

    if(currentUserId){
      new SimpleSchema({
        name: {
          type: String,
          min: 2
        },
        score:{
          type:Number
        }
      }).validate({name,score});

        Players.insert({
        name,score,
        visible:true,
        createdBy:currentUserId,
        createdAt:moment().format('DD/MM/YYYY h:mm a'),
        moment:moment().fromNow()
        });

    }
    },
    'removePlayer':function(selectedPlayer){
    check(selectedPlayer, String);
    var currentUserId = Meteor.userId();
    if(currentUserId){
    Players.remove({_id:selectedPlayer,createdBy:currentUserId});
    }

    },
    'removeAllPlayer':function(){
    var currentUserId = Meteor.userId();
    if(currentUserId){
    Players.remove({});
    }
    },
    'updateScore': function(selectedPlayer, scoreValue){
    check(selectedPlayer, String);
    check(scoreValue, Number);
    var currentUserId = Meteor.userId();
    if(currentUserId){
    Players.update( { _id: selectedPlayer, createdBy: currentUserId },
    { $inc: {score: scoreValue} });
    }
  }

});
