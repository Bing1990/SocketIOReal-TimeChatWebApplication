    $(document).ready(function() {

     $( "#joinButton" ).click(function(username) {
      
      $("input#name").hide();

      $("#joinButton").hide();

  
      var username = $("#name").val();
      
      socket.emit('join',username);

      //alert(" Welcome " + username + "! Thank you for join the Chat. Let's Chat now!")

      });

    var socket = io();

    $('#thumbs_up').click(function (){

      var message = 'Goodjob! :)';
       
      socket.emit('chat message', message);

      $('#m').val('');
	  
	  return false;

    });

    $('#thumbs_down').click(function(){

      var message ='NotGood! :(';

      socket.emit('chat message', message);

      $('#m').val('');
	  
	   return false;

     });

    //create the button to get the review page

    $('#review').click(function(){

      location.href='/users/view'

    });

	 

$('form#text').submit(function(){

      var message =$('#m').val();

      socket.emit('chat message', message);


      $('#m').val('');

      return false;

    });

     socket.on('chat message', function(msg){

      $('#messages').append($('<li>').text(msg));
      $('#m').append($('<li>').text(msg));
    });

   });