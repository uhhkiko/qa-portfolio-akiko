// terminal.js — interactive console showcase (bash + rails console + real curl)
// ─────────────────────────────────────────────────────────────────────────
// SCAFFOLDED (front-end plumbing — provided for you, not QA work):
//   input capture · command history (↑/↓) · autoscroll · prompt rendering ·
//   bash⇄rails mode switching · command registry · assertion display helper.
//
// TODO(you) — the command BEHAVIORS are the QA/SDET showcase, so they're
//   yours to build (coached). Search this file for "TODO(you)". Worked
//   examples: see `help` and `whoami` for the pattern every handler follows.
// ─────────────────────────────────────────────────────────────────────────

const term = document.getElementById('terminal');

if (term) {
  const output   = term.querySelector('.terminal-output');
  const input    = term.querySelector('.terminal-input');
  const promptEl = term.querySelector('.terminal-prompt');
  const titleEl  = term.querySelector('.terminal-title');

  // ---- state ----
  const history = [];
  let historyIndex = -1;
  let mode = 'bash'; // 'bash' | 'rails'

  const PROMPTS = { bash: 'akiko@portfolio:~$', rails: 'irb(main):001:0>' };
  const TITLES  = { bash: 'bash — qa-portfolio', rails: 'rails console — qa-portfolio' };

  // ---- rendering (plumbing) ----
  function print(text = '', className = '') {
    const line = document.createElement('div');
    line.className = ('terminal-line ' + className).trim();
    line.textContent = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
    return line;
  }

  // SCAFFOLDED display helper: you decide WHAT to assert; this just draws the
  // ✓/✗ lines. Pass an array of { label, pass, detail? }.
  function renderAssertions(assertions = []) {
    assertions.forEach(a => {
      const mark = a.pass ? '✓' : '✗';
      const detail = a.detail ? '  (' + a.detail + ')' : '';
      print(mark + ' ' + a.label + detail, a.pass ? 'assert-pass' : 'assert-fail');
    });
  }

  function setMode(next) {
    mode = next;
    promptEl.textContent = PROMPTS[mode];
    if (titleEl) titleEl.textContent = TITLES[mode];
  }

  // ctx is handed to every command handler so handlers never touch the DOM
  // directly — they just print. Keeps your command code about behavior, not plumbing.
  const ctx = {
    print,
    renderAssertions,
    setMode,
    get mode() { return mode; },
  };

  // ---- command registry ----
  // Add a bash command by adding a key here: name -> async (args, ctx) => {}
  // `args` is the tokens after the command name. Use ctx.print(...) for output.
  const bashCommands = {

    // WORKED EXAMPLE #1 — the simplest handler. Copy this shape.
    whoami(args, ctx) {
      ctx.print('Akiko Watson · QA Engineer · Since 2022');
    },

    // TODO(you) — list the "files" in your resume filesystem.
    // Hint: decide what a visitor should see (skills/, experience.txt, contact.txt,
    // projects/ ...). Print them. Keep it playful. This is simulated — that's fine,
    // it's an easter egg. Later, `cat <file>` should read whatever you list here.
    ls(args, ctx) {
      const files = ['skills.txt', 'experience.txt', 'contact.txt'];
      files.forEach(file => {
        ctx.print(file);
      });
    },

    // TODO(you) — print the "contents" of a file from args[0].
    // Hint: a lookup object { 'contact.txt': '...', 'skills.txt': '...' } and a
    // guard for "no such file". What should `cat contact.txt` reveal?
    cat(args, ctx) {
      const contents = {
        'contact.txt': 'akikowatson@gmail.com',
        'skills.txt': 'Playwright · pytest · ...',
        'experience.txt': '4+ years'
      };
      const body = contents[args[0]];
      if (!body){
        ctx.print('cat: '+ args[0] + ': No such file exists');
        return
      }
      ctx.print(body);
    },

    // TODO(you) — your Experience section is already styled as a changelog with
    // v3.0.0 / v2.0.0 / v1.0.0 version tags. Make `git log` render those as commits.
    // Hint: only respond to `git log` (check args[0] === 'log'); otherwise print a
    // git-ish "unknown subcommand". Match the vibe of a real `git log --oneline`.
    git(args, ctx) {
      if (args[0] !== 'log') {
        ctx.print('git: ' + args[0] + ' is not a command')
        return
      }
      const commits = [
        { hash: 'c3b2d4f',     tag: 'v4.0.0', msg: 'QA Engineer (CALLRAIL)' },
        { hash: 'a1b2c3d',     tag: 'v3.0.0', msg: 'QA Engineer II (CALENDLY)' },
        { hash: 'a2b3c4d',     tag: 'v2.0.0', msg: 'QA Engineer I (CALENDLY)' },
        { hash: 'b1c2d3f',     tag: 'v1.0.0', msg: 'QA Apprentice (CALENDLY)' },
      ];
      commits.forEach(commit => {
        ctx.print(`${commit.hash} (tag: ${commit.tag}) ${commit.msg}`);
      });
    },

    async curl(args, ctx) {
       if (!args[0]) {
        ctx.print('usage: curl <url>' + ' HINT: https://jsonplaceholder.typicode.com/todos/1')
        return
      }
      const start = performance.now();
      let res;
      try {
        res = await fetch(args[0]);
      } catch {
        ctx.print('TODO(you): network or CORS failure message');
        return;
      }
      const body = await res.json();
      const elapsed = performance.now() - start;
      ctx.print(`${res.status} ${res.statusText} ${elapsed.toFixed(0)}ms`);
      const assertions = [
        { label: 'status is 200', pass: res.status === 200 },
        { label: 'speed is less than 1000 ms', pass: elapsed < 1000 },
        { label: 'userId is a number', pass: typeof body.userId === 'number' },  
        { label: 'id is a number', pass: typeof body.id === 'number' },  
        { label: 'completed is a boolean', pass: typeof body.completed === 'boolean' },  
        { label: 'title is a string', pass: typeof body.title === 'string' },  
      ];
      ctx.renderAssertions(assertions);
    },
  };

  // Rails-console mode. In real life you'd type ActiveRecord queries here.
  // TODO(you) — make `rails c` feel real. Decide on a couple of "models"
  // (Candidate? Skill? Bug?) and respond to a few queries in ActiveRecord style,
  // e.g.  Candidate.find_by(available: true)  =>  #<Candidate ...>
  // Hint: this is simulated — match the input string(s) you care about and print
  // an inspect-style response. Show you know the idioms (find_by, where, .first,
  // .count). Anything you don't recognize → a friendly NoMethodError-ish message.
  function runRails(raw, ctx) {
    ctx.print("(rails) not built yet — this one's yours. Type `exit` to leave.", 'terminal-muted');
  }

  // WORKED EXAMPLE #2 — a command that reads state (the current mode) and lists
  // what's available. Update the lists as you build commands out.
  function help(args, ctx) {
    if (ctx.mode === 'rails') {
      ctx.print('rails console — try an ActiveRecord query, or `exit` to return to bash.');
      return;
    }
    ctx.print('Available commands:');
    ctx.print('  whoami            who you are looking at ');
    ctx.print('  ls                list resume files ');
    ctx.print('  cat <file>        read a resume file ');
    ctx.print('  git log           experience as commits ');
    ctx.print('  curl <url>        real API request + tests ');
    ctx.print('  rails c           drop into a rails console ');
    ctx.print('  clear             clear the screen');
  }

  // ---- dispatch (plumbing) ----
  async function dispatch(raw) {
    const [name, ...args] = raw.split(/\s+/);

    // global commands (work in any mode)
    if (name === 'clear') { output.innerHTML = ''; return; }
    if (name === 'help')  { return help(args, ctx); }

    if (mode === 'bash') {
      if (raw === 'rails c' || raw === 'rails console') {
        setMode('rails');
        print('Loading portfolio environment (Rails 7.1)...');
        print("Type an ActiveRecord query, or `exit` to return.", 'terminal-muted');
        return;
      }
      const cmd = bashCommands[name];
      if (cmd) return cmd(args, ctx);
      return print('command not found: ' + name + "   (try 'help')", 'terminal-muted');
    }

    if (mode === 'rails') {
      if (name === 'exit' || name === 'quit') { setMode('bash'); return; }
      return runRails(raw, ctx);
    }
  }

  // ---- input handling: submit + history (plumbing) ----
  input.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
      const raw = input.value.trim();
      input.value = '';
      if (!raw) return;
      history.push(raw);
      historyIndex = history.length;
      print(PROMPTS[mode] + ' ' + raw, 'terminal-echo');
      try {
        await dispatch(raw);
      } catch (err) {
        print('terminal error: ' + err.message, 'assert-fail');
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) input.value = history[--historyIndex];
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        input.value = history[++historyIndex];
      } else {
        historyIndex = history.length;
        input.value = '';
      }
    }
  });

  // click anywhere in the terminal to focus the input
  term.addEventListener('click', () => input.focus());

  // greeting
  print('qa-portfolio console — type `help` to get started.', 'terminal-muted');
}
