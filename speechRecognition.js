window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
var recognition = new webkitSpeechRecognition();
recognition.lang = 'ja';
recognition.continuous = true;
recognition.interimResults = true;

let finalTranscript = '';

recognition.onresult = function (event) {
  let interimTranscript = '';
  for (let i = event.resultIndex; i < event.results.length; i++) {
    let transcript = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      transcript += "。\n";
      finalTranscript += transcript;
    } else {
      interimTranscript = transcript;
    }
  }
  document.getElementById("result_text").innerHTML = finalTranscript + interimTranscript;
}

function play() {
  const text = new SpeechSynthesisUtterance(result_text.value);
  speechSynthesis.speak(text);
  document.getElementById("play").disabled = true;
  document.getElementById("stop").disabled = false;
  document.getElementById("halt").disabled = false;
  document.getElementById("restart").disabled = true;
}

function stop() {
  speechSynthesis.cancel();
  document.getElementById("play").disabled = false;
  document.getElementById("stop").disabled = true;
  document.getElementById("halt").disabled = true;
  document.getElementById("restart").disabled = true;
}

function halt() {
  speechSynthesis.pause();
  document.getElementById("play").disabled = true;
  document.getElementById("halt").disabled = true;
  document.getElementById("restart").disabled = false;
  document.getElementById("stop").disabled = false;
}

function restart() {
  speechSynthesis.resume();
  document.getElementById("play").disabled = true;
  document.getElementById("restart").disabled = true;
  document.getElementById("stop").disabled = false;
  document.getElementById("halt").disabled = false;
}

function reset() {
  document.getElementById("result_text").innerHTML = "";
  finalTranscript = '';
  speechSynthesis.cancel();
  document.getElementById("play").disabled = true;
  document.getElementById("stop").disabled = true;
  document.getElementById("halt").disabled = true;
  document.getElementById("restart").disabled = true;
}

function recStart() {
  document.getElementById("blink").innerHTML = '<div id="blinkStart"><i class="material-icons">keyboard_voice</i><span>REC</span></div>';
  document.getElementById("reset").disabled = true;
  document.getElementById("play").disabled = true;
  document.getElementById("recStart").disabled = true;
}

function recStop() {
  document.getElementById("blinkStart").innerHTML = '<div id="blink"></div>';
  document.getElementById("reset").disabled = false;
  document.getElementById("play").disabled = false;
  document.getElementById("recStart").disabled = false;
}
