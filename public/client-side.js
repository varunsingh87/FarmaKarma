document.querySelector('button').onclick = e => {
  fetch('/dreams?chemicals=' + e.target.innerHTML).then(response => {
    console.log(response);
  })
};