var clientID = '?client_id=ogmse70zfkd7p2wqvrfln8hiot5qls';
var streams = ['Sing_sing', 'ESL_CSGO', 'ESL_SC2', 'OgamingSC2', 'FreeCodeCamp', 'Minecraft', 'Brunofin', 'adobe', 'xvu1tur3x', 'teamtalima'];

var channelURL = 'https://www.twitch.tv/';
var obj = {};
var respObj;

streams.forEach(function(stream) {
    $.getJSON("https://api.twitch.tv/kraken/streams/" + stream + clientID, function(data) {
        respObj = data.stream;
        streaming = (data.stream === null) ? false : true;
        if (streaming) {
            obj.status = 'online';
            obj.logo = respObj.channel.logo;
            obj.message = respObj.channel.status.substring(0, 30) + '...';
            obj.url = channelURL + data.stream.channel.display_name;
            obj.game = respObj.game;
            obj.viewers = respObj.viewers;
            obj.followers = respObj.channel.followers;

        } else if (streaming === undefined) {
            obj.status = "inactive";

        } else {
            obj.status = 'offline';
            obj.logo = 'https://s3-us-west-2.amazonaws.com/web-design-ext-production/p/Glitch_474x356.png';
            obj.message = '  ----- ';
            obj.url = "https://www.twitch.tv/" + stream;
            obj.game = '  ----- ';
            obj.viewers = '  ----- ';
            obj.followers = '  ----- ';
        }
        displayResults(stream, obj);

    });
});

function displayResults(channel, channelData) {
    var $div = $('<div>', {
        id: channel,
        class: channelData.status + " stream"
    });
    var channelStatus;
    $('#response-area').append($div);
    var str =
        '<img src="' + channelData.logo + '">' + '</img>' + '<br>' +
        '<p><a href="' + channelData.url + '"target="_blank" class="channel-name">' + channel + '</a>' + '<br>' + '<span class="badge">' + channelData.status + '</span>' + '<br>' + '<i class="fa fa-gamepad" title="Game">' + " : " + '<span>' + channelData.game + '</span>' + '</i>' + '<br>' + '<i class="fa fa-comment-o" title="Status Message">' + " : " + '<span class="status-message">' + channelData.message + '</span>' + '</i>' + '<br>' + '<i class="fa fa-eye" title="Viewers">' + " : " + channelData.viewers + '</i>' + '<br>' + '<i class="fa fa-users" title="Followers">' + " : " + channelData.followers + '</i>' + '<br>' + '</p>';
    $(str).appendTo('#' + channel);
}

$("#all").click(function() {
    $(".online").show();
    $(".offline").show();
});

$("#online").click(function() {
    $(".online").show();
    $(".offline").hide();
});

$("#offline").click(function() {
    $(".online").hide();
    $(".offline").show();
});