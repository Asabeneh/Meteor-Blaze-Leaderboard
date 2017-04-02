console.log("Hello Meteor!");

PlayersList = new Mongo.Collection('players');
//UserAccounts = new Mongo.Collection('users');

console.log(PlayersList);
//PlayersList.findOne() gives the first data
//PlayersList.find(); gives all the data;
// PlayersList.find().count() count the total number of the data
// PlayersList.insert({key:value}) insert data
// PlayersList.remove({key:value})
//PlayersList.update({name:'Tim'},{set:{name:'Asabeneh'}});
//PlayersList.find({ name: "David" }).fetch();

Students = new Mongo.Collection('students');
BlogPosts = new Mongo.Collection('blogs');
if(Meteor.isClient){
	Meteor.subscribe('thePlayers');

	//Account config
		Accounts.ui.config({

  passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});


	// this code only run on the client
	console.log("Hello Client!");
	Template.leaderboard.helpers({
		player: function(){
			var currentUserId = Meteor.userId();

			return PlayersList.find({createdBy:currentUserId},{sort:{score:-1,name:1}});
		},
		count:function(){
			return PlayersList.find().count();
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
			return PlayersList.findOne({_id:selectedPlayer});

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
			//PlayersList.update({_id:selectedPlayer},{$inc:{score:5}});



		},
		'click .decrement':function(){
			var selectedPlayer = Session.get('selectedPlayer');
			Meteor.call('updateScore', selectedPlayer, -5);
			//PlayersList.update({_id:selectedPlayer}, {$inc:{score:-5}});
		},
		'click .remove':function(){
			var selectedPlayer = Session.get('selectedPlayer');
			if(confirm("Are you sure you like to Delete?")){
			PlayersList.remove({_id:selectedPlayer});
			Meteor.call('removePlayer',selectedPlayer);
			}

			/*  $("." + selectedPlayer).hide('slow',function(){
					PlayersList.remove({_id:selectedPlayer});
			});
			 */


		},
		dblclick:function(){
			console.log("You have double clicked ");

		},
		focus:function(){
			console.log("You have focused");

		},
		blur:function(){
			console.log("You have blurred");
		},
		mouseover:function(){
			console.log("You have mouseover");

		},
		change:function(){
			console.log("You have changed a lot");

		}

	});
	Template.addPlayerForm.events({

		'submit form':function(event){
			event.preventDefault();

			var playerNameVar = event.target.playerName.value;
			var playerValueVar = parseInt(event.target.playerValue.value);
			var currentUserId = Meteor.userId();

			Meteor.call('createPlayer',playerNameVar,playerValueVar);
			event.target.playerName.value = "";
			event.target.playerValue.value = "";


		}

	});
	Template.userProfile.events({
		'click .userButton':function(){

			Meteor.call('userList');
		}


	});


}
if(Meteor.isServer){
	Meteor.publish('thePlayers', function(){
    var currentUserId = this.userId;
    return PlayersList.find({ createdBy: currentUserId });
});


}


Meteor.methods({
    'createPlayer': function(playerNameVar,playerValueVar){
		check(playerNameVar, String);
	check(playerValueVar, Number);
        console.log('This is methods call');
		var currentUserId = Meteor.userId();
		if(currentUserId){
		PlayersList.insert({
			name:playerNameVar,
			score:playerValueVar,
			createdBy:currentUserId
		});
		}
    },
	'removePlayer':function(selectedPlayer){
	check(selectedPlayer, String);
	var currentUserId = Meteor.userId();
	if(currentUserId){
	PlayersList.remove({_id:selectedPlayer,createdBy:currentUserId});
	}

	},
	'updateScore': function(selectedPlayer, scoreValue){
    check(selectedPlayer, String);
    check(scoreValue, Number);
    var currentUserId = Meteor.userId();
    if(currentUserId){
        PlayersList.update( { _id: selectedPlayer, createdBy: currentUserId },
                            { $inc: {score: scoreValue} });
    }
	}
});
