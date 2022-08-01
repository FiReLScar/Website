let terminal = document.querySelector('#terminal')
let line = terminal.children[terminal.children.length - 1]

let input =  document.createElement('input')
input.id = 'terminal-input'
input.type = 'text'
input.onkeyup = key => {
  if (key.keyCode === 13) {
    runcmd(input.value)
    input.value = ''
  }
}
line.appendChild(input)

let runcmd = cmd => {
  // Remove input and add text to line
  document.getElementById('terminal-input').remove()
  let text = document.createElement('span')
  text.innerText = cmd
  line.appendChild(text)

  // Handle Commands
  switch (cmd) {
    case 'clear':
      terminal.innerHTML = ''
      break;
  }

  // Add new line and input
  line = document.createElement('div')
  line.className = 'line'
  line.innerHTML = '<span class="prompt">fire@null<span>:</span><span>~</span><span>$</span></span>'
  line.appendChild(input)
  terminal.appendChild(line)
  input.focus()
  terminal.scrollTop = terminal.scrollHeight
}

terminal.onclick = () => input.focus()

input.focus()