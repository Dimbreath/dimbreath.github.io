$(document).ready(function(){var e="quotes/"+new URLSearchParams(window.location.search).get("ship")+".json";$.getJSON(e,function(e){var t=document.getElementById("base");for(var n in document.getElementById("navbar-title").innerHTML=e.name,e.skins){var d=e.skins[n],a=document.createElement("table");a.classList.add("table","table-striped","table-dark");var i=document.createElement("thead"),r=document.createElement("th");r.colSpan=3,i.appendChild(r).appendChild(document.createTextNode(d.name)),a.appendChild(i);var l=document.createElement("thead");for(var o in l.appendChild(document.createElement("th")).appendChild(document.createTextNode("Voice")),l.appendChild(document.createElement("th")).appendChild(document.createTextNode("Key")),l.appendChild(document.createElement("th")).appendChild(document.createTextNode("Quote")),a.appendChild(l),d.quotes){var u=d.quotes[o],c=a.insertRow();if(u.voice){var p=document.createElement("audio");p.id=u.voice.split(".")[0],p.src="voices/cv-"+e.id+"/"+u.voice,p.controls=!1,p.type="audio/wav",p.onended=function(){AudioFinished(this)};var m=document.createElement("span");m.id=u.voice.split(".")[0]+"-button",m.title="Play",m.innerText="▶",m.onclick=function(){ToggleAudio(this)};var s=c.insertCell();s.appendChild(p),s.appendChild(m)}else c.insertCell().appendChild(document.createTextNode("✕"));c.insertCell().appendChild(document.createTextNode(u.name)),c.insertCell().appendChild(document.createTextNode(u.quote))}t.appendChild(a)}})});var current_audio_player=null;function ToggleAudio(e){var t;if(current_audio_player&&e.id.split("-")[0]==current_audio_player.id)return current_audio_player.pause(),(t=document.getElementById(current_audio_player.id+"-button")).title="Play",t.innerHTML="▶",void(current_audio_player=null);current_audio_player&&!current_audio_player.paused&&(current_audio_player.pause(),(t=document.getElementById(current_audio_player.id+"-button")).title="Play",t.innerHTML="▶",current_audio_player=null);var n=document.getElementById(e.id.split("-")[0]);n.play(),current_audio_player=n,e.title="Pause",e.innerHTML="❚❚"}function AudioFinished(e){var t=document.getElementById(e.id+"-button");t.title="Play",t.innerHTML="▶",current_audio_player=null}