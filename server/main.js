
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
// import './../imports/startup/simple-schema-configuration';
// import {Players} from './.../imports/api/players';
import '../imports/api/players.js';

Meteor.startup(() => {

let now = new Date().getTime();
console.log(now);
let momentNow = moment(0);
console.log(momentNow.fromNow('MMM Do, YYYY,h:mm A'))


});
