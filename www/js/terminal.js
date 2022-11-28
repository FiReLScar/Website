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

let outputsafe = data => {
  line = document.createElement('div')
  line.className = 'line'
  let txt = document.createElement('span')
  txt.innerText = data
  line.appendChild(txt)
  terminal.appendChild(line)
}

let cmdparser = cmd => {
  // Remove whitespace and split by ; and &&
  let cmds = cmd.replace(/\s+/g, ' ').trim().split(/;|&&/)
  for (cmd in cmds) {
    // Split into arguments
    let args = cmds[cmd].trim().split(' ')
    
    switch (args[0]) {
      case 'clear':
        terminal.innerHTML = ''
        break
      case 'ls':
        if (args[1] == '-l') {
          output('<div><a href="https://github.com/N11Software/Link">https://github.com/N11Software/Link</a>\
          <br><a href="https://github.com/N11Software/Hydra">https://github.com/N11Software/Hydra</a>\
          <br><a href="https://github.com/N11Software/kaos">https://github.com/N11Software/kaos</a>\
          <br><a href="https://github.com/N11Software">https://github.com/N11Software/N11</a>\
          <br><a href="https://github.com/N11Software/NullClient">https://github.com/N11Software/NullClient</a>\
          <br><a href="https://github.com/N11Software/neon">https://github.com/N11Software/neon</a>\
          <br><a href="https://github.com/N11Software/Nuclear">https://github.com/N11Software/Nuclear</a></div>')
        } else {
          output('<div><a href="https://github.com/N11Software/Link">Link</a>\
          &nbsp;<a href="https://github.com/N11Software/Hydra">Hydra</a>\
          &nbsp;<a href="https://github.com/N11Software/kaos">kaos</a>\
          &nbsp;<a href="https://github.com/N11Software">N11</a>\
          &nbsp;<a href="https://github.com/N11Software/NullClient">NullClient</a>\
          &nbsp;<a href="https://github.com/N11Software/neon">neon</a>\
          &nbsp;<a href="https://github.com/N11Software/Nuclear">Nuclear</a></div>')
        }
        break
      case 'help':
        if (args[1] == '-d' && args[2] != undefined) {
          if (args[2] == 'help') output('<span>help - Display information about builtin commands.</span>')
          else if (args[2] == 'echo') output('<span>echo - Write arguments to the standard output.</span>')
          else if (args[2] == 'ls') output('<span>ls - Output a list of projects.</span>')
          else outputsafe('bash: help: no help topics match `'+args[2]+'`.  Try `help help`.')
        } else if (args[1] == '-m') {
          output('<span>help: man is disabled</span>')
        } else if (args[1] == '-s' && args[2] != undefined) {
          if (args[2] == 'help') output('<span>help: help [-dms] [pattern ...]</span>')
          else if (args[2] == 'echo') output('<span>echo: echo [-neE] [arg ...]</span>')
          else if (args[2] == 'ls') output('<span>ls: ls [-l]</span>')
          else outputsafe('bash: help: no help topics match `'+args[2]+'`.  Try `help help`.')
        } else if (args[1] == "help") {
          output('<span>help: help [-dms] [pattern ...]</span>')
          output('<span>&nbsp;&nbsp;&nbsp;&nbsp;Display information about builtin commands.</span>')
          output('<span><br>&nbsp;&nbsp;&nbsp;&nbsp;Displays brief summaries of builtin commands. If PATTERN is specified, gives detailed help on all commands matching PATTERN, otherwise the list of help topics is printed.</span>')
          output('<span><br>&nbsp;&nbsp;&nbsp;&nbsp;Options:</span>')
          output('<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-d&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;output short description for each topic</span>')
          output('<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-m&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;display usage in pseudo-manpage format</span>')
          output('<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-s&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;output only a short usage synopsis for each topic matching PATTERN</span>')
          output('<span><br>&nbsp;&nbsp;&nbsp;&nbsp;Arguments:</span>')
          output('<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PATTERN&nbsp;&nbsp;&nbsp;Pattern specifying a help topic</span>')
          output('<span><br>&nbsp;&nbsp;&nbsp;&nbsp;Exit Status:</span>')
          output('<span>&nbsp;&nbsp;&nbsp;&nbsp;Return success unless PATTERN is not found or an invalid option is given.</span>')
        } else if (args[1] == "echo") {
          output('<span>echo: echo [-eE] [arg ...]</span>')
          output('<span>&nbsp;&nbsp;&nbsp;&nbsp;Write arguments to the standard output.</span>')
          output('<span><br>&nbsp;&nbsp;&nbsp;&nbsp;Display the ARGs, separated by a single space character and followed by a newline, on the standard output.</span>')
          output('<span><br>&nbsp;&nbsp;&nbsp;&nbsp;Options:</span>')
          output('<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-e&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enable interpretation of the following backslash escapes</span>')
          output('<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-E&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;explicitly suppress interpretation of backslash escapes</span>')
          output('<span><br>&nbsp;&nbsp;&nbsp;&nbsp;`echo` interprets the following backslash-escaped characters:</span>')
          output('<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;new line</span>')
          output('<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\t&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;horizontal tab</span>')
          output('<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;backslash</span>')
          output('<span><br>&nbsp;&nbsp;&nbsp;&nbsp;Exit Status:</span>')
          output('<span>&nbsp;&nbsp;&nbsp;&nbsp;Return success unless a write error occurs.</span>')
        } else if (args[1] == "ls") {
          output('<span>ls: ls [-l]</span>')
          output('<span>&nbsp;&nbsp;&nbsp;&nbsp;List projects.</span>')
          output('<span><br>&nbsp;&nbsp;&nbsp;&nbsp;Outputs a list of projects as hyperlinks.</span>')
          output('<span><br>&nbsp;&nbsp;&nbsp;&nbsp;Options:</span>')
          output('<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-l&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;replace the project names with their respective links</span>')
          output('<span><br>&nbsp;&nbsp;&nbsp;&nbsp;Exit Status:</span>')
          output('<span>&nbsp;&nbsp;&nbsp;&nbsp;Return success unless an invalid option is given.</span>')
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
        outputsafe(args[0] + ': command not found')
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