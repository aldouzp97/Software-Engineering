function startQuizOne() {
  window.location.href = "/startQuizOne";
}

// Reset and automatic reset
function reset() {
  window.location.href = "/";
  console.log("reset");
}

var inactivityTime = function() {
  var time;
  window.onload = resetTimer;
  // DOM Events
  document.onmousemove = resetTimer;
  document.onkeypress = resetTimer;

  function logout() {
    alert("Due to inactivity the quiz will now be restarted");
    window.location.href = "/";
  }

  function resetTimer() {
    clearTimeout(time);
    time = setTimeout(logout, 300000);
    // 1000 milliseconds = 1 second
  }
}

window.addEventListener('load', function() {
  //console.log('All assets loaded')
  inactivityTime();
});
