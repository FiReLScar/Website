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
  // Remove whitespace and split by ; and &&
  let cmds = cmd.replace(/\s+/g, ' ').trim().split(/;|&&/)
  for (cmd in cmds) {
    // Split into arguments
    let args = cmds[cmd].trim().split(' ')
    console.log(args)

    switch (args[0]) {
      case 'clear':
        terminal.innerHTML = ''
        break
      case 'help':
        if (args[1] == '-d' && args[2] != undefined) {
          if (args[2] == 'help') output('<span>help - Display information about builtin commands.</span>')
          else if (args[2] == 'echo') output('<span>echo - Write arguments to the standard output.</span>')
          else output('<span>bash: help: no help topics match `'+args[2]+'`.  Try `help help`.</span>')
        } else if (args[1] == '-m') {
          output('<span>help: man is disabled</span>')
        } else if (args[1] == '-s' && args[2] != undefined) {
          if (args[2] == 'help') output('<span>help: help [-dms] [pattern ...]</span>')
          else if (args[2] == 'echo') output('<span>echo: echo [-neE] [arg ...]</span>')
          else output('<span>bash: help: no help topics match `'+args[2]+'`.  Try `help help`.</span>')
        } else {
          output('<span>FiRe, version 1.0-release (web)</span>')
          output('<span>These shell commands are defined internally. Type `help` to see this list.</span>')
          output('<span>Type `help name` to find out more about the function `name`.</span>')
          output('<span><br>&nbsp;echo [-neE] [arg ...]</span>')
          output('<span>&nbsp;help [-dms] [pattern ...]</span>')
        }
        break
      case 'echo':
        let res = ''
        let allowEscape = false
        for (let x = 1; x < args.length; x++) {
          if (args[x][0] == '-') {
            for (let i = 1; i < args[x].length; i++) {
              if (args[x][i] == 'e') allowEscape = true
              else if (args[x][i] == 'E') allowEscape = false
            }
          } else {
            console.log(args[x])
            if (allowEscape) {
              for (let i = 0; i < args[x].length; i++) {
                if (args[x][i] == '\\') {
                  if (args[x][i+1] == 'n') res += '<br>'
                  else if (args[x][i+1] == 't') res += '&nbsp;&nbsp;&nbsp;&nbsp;'
                  else if (args[x][i+1] == '\\') res += '\\'
                  else res += args[x][i+1]
                  i++
                } else {
                  res += args[x][i]
                }
              }
            } else res += args[x] + ' '
          }
        }
        line = document.createElement('div')
        line.className = 'line'
        let txt = document.createElement('span')
        txt.innerText = res
        line.appendChild(txt)
        terminal.appendChild(line)
        break
      case '':
        break
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
  if (cmdhistory.length > 10) {
    cmdhistory = []
    cmdhistoryindex = 0
  }
  cmdhistory.push(cmd)
  cmdhistoryindex = cmdhistory.length
}

terminal.onclick = () => input.focus()

input.focus()