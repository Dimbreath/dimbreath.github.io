// Sorry, me no web developer. Please don't hit me. :()

$(document).ready(function() {
    // Am I a certified developer now?
    // How do I do this pls help
    // var url = window.location.href.split('/');
    // var ship_name = url[url.length - 1];
    // console.log(`Ship is ${ship_name}`);

    var ship_quotes = $.getJSON('test.json', function(ship_data) {
        var last_element = document.getElementById('base');

        document.getElementById('navbar-title').innerHTML = ship_data['name'];

        for(var skin in ship_data.skins) {
            var skin_object = ship_data.skins[skin];

            var table = document.createElement('table');
            table.classList.add('table', 'table-striped', 'table-dark');

            var thead_1 = document.createElement('thead');
    
            var skin_name_header = document.createElement('th');
            skin_name_header.colSpan = 3;

            thead_1.appendChild(skin_name_header).appendChild(document.createTextNode(skin_object['name']));

            table.appendChild(thead_1);

            var thead_2 = document.createElement('thead');

            thead_2.appendChild(document.createElement('th')).appendChild(document.createTextNode('Voice'));
            thead_2.appendChild(document.createElement('th')).appendChild(document.createTextNode('Key'));
            thead_2.appendChild(document.createElement('th')).appendChild(document.createTextNode('Quote'));

            table.appendChild(thead_2);

            for(var quote in skin_object['quotes']) {
                var quote_object = skin_object['quotes'][quote]

                var row = table.insertRow();

                if(quote_object['voice']) {
                    var audio_element = document.createElement('audio');

                    audio_element.id = quote_object['voice'].split('.')[0];
                    audio_element.src = 'voices/' + quote_object['voice'];
                    audio_element.controls = false;
                    audio_element.type = 'audio/wav';
                    audio_element.onended = function() { AudioFinished(this); };

                    var audio_player = document.createElement('span');

                    audio_player.id = quote_object['voice'].split('.')[0] + '-button';
                    audio_player.title = 'Play';
                    audio_player.innerText = '▶';
                    audio_player.onclick = function() { ToggleAudio(this); };

                    var audio_cell = row.insertCell();

                    audio_cell.appendChild(audio_element);
                    audio_cell.appendChild(audio_player);
                } else {
                    row.insertCell().appendChild(document.createTextNode('✕'));
                }

                row.insertCell().appendChild(document.createTextNode(quote_object['name']));
                row.insertCell().appendChild(document.createTextNode(quote_object['quote']));
            }

            last_element.appendChild(table);
        }
    });
});

var current_audio_player = null;

function ToggleAudio(element) {
    if(current_audio_player) {
        var player_id = element.id.split('-')[0];

        if(player_id == current_audio_player.id) {
            current_audio_player.pause();

            var current_button = document.getElementById(current_audio_player.id + '-button');

            current_button.title = 'Play';
            current_button.innerHTML = '▶';

            current_audio_player = null;

            return;
        }
    }

    if(current_audio_player && !current_audio_player.paused) {
        current_audio_player.pause();

        var current_button = document.getElementById(current_audio_player.id + '-button');

        current_button.title = 'Play';
        current_button.innerHTML = '▶';

        current_audio_player = null;
    }

    var audio_player = document.getElementById(element.id.split('-')[0]);

    audio_player.play();

    current_audio_player = audio_player;

    element.title = 'Pause';
    element.innerHTML = '❚❚';
};

function AudioFinished(element) {
    var button = document.getElementById(element.id + '-button');

    button.title = 'Play';
    button.innerHTML = '▶';

    current_audio_player = null;
};