let cmdhistory = []
let cmdhistoryindex = 0

let terminal = document.querySelector('#terminal')
let line = terminal.children[terminal.children.length - 1]

let input =  document.createElement('input')
input.id = 'terminal-input'
input.type = 'text'
input.autocomplete = 'off'
input.setAttribute('autocorrect', 'off')
input.autocapitalize = 'off'
input.spellcheck = 'off'
input.onkeyup = key => {
  if (key.keyCode === 13) {
    runcmd(input.value)
    input.value = ''
  } else if (key.keyCode === 38) {
    if (cmdhistory[cmdhistoryindex - 1] != undefined) {
      input.value = cmdhistory[cmdhistoryindex - 1]
      cmdhistoryindex--
    }
  } else if (key.keyCode === 40) {
    if (cmdhistory[cmdhistoryindex + 1] != undefined) {
      input.value = cmdhistory[cmdhistoryindex + 1]
      cmdhistoryindex++
    } else {
      input.value = ''
      cmdhistoryindex = cmdhistory.length
    }
  }
}
line.appendChild(input)

let output = data => {
  line = document.createElement('div')
  line.className = 'line'
  line.innerHTML = data
  terminal.appendChild(line)
}

let cmdparser = cmd => {
  let cmds = cmd.replace(/\s+/g, ' ').trim().split(/;|&&/)
  for (cmd in cmds) {
    let args = cmds[cmd].trim().split(' ')
    console.log(args[0])
    switch (args[0]) {
      case 'clear':
        terminal.innerHTML = ''
        break;
      case 'help':
        output('<span>help - Show this help</span>')
        break;
      case '':
        break;
      default:
        output('<span>' + args[0] + ': command not found</span>')
    }
  }
}

let runcmd = cmd => {
  // Remove input and add text to line
  document.getElementById('terminal-input').remove()
  let text = document.createElement('span')
  text.className = 'in'
  text.innerText = cmd
  line.appendChild(text)

  // Handle Commands
  cmdparser(cmd)

  // Add new line and input
  line = document.createElement('div')
  line.className = 'line'
  line.innerHTML = '<span class="prompt">fire@null<span>:</span><span>~</span><span>$</span></span>'
  line.appendChild(input)
  terminal.appendChild(line)
  input.focus()
  terminal.scrollTop = terminal.scrollHeight
  cmdhistory.push(cmd)
  cmdhistoryindex = cmdhistory.length
}

terminal.onclick = () => input.focus()

input.focus()