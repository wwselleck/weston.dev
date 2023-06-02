---
published: true
title: "Setting up Poetry w/ Nvim DAP"
---

I finally wanted to bite the bullet and get a proper debugging setup in Neovim, and for some reason I chose to start with Python, which is a language I'm by no means an expert on. Some low effort Googling took me to the [`nvim-dap`](https://github.com/mfussenegger/nvim-dap) plugin, which seems to be the most popular solution available.

I installed `debugpy` with
`pip install debugpy`
and then more or less copied the wiki config into a new `nvim-dap.lua` file in my `lua` vim runtime folder.

```lua
-- lua/nvim-dap.lua
local dap = require('dap')

dap.adapters.python = {
    type = "executable",
    command = "python",
    args = { '-m', 'debugpy.adapter' }
}

dap.configurations.python = {
    {
        type = 'python';
        request = 'launch';
        name = "Launch file";

        program = "${file}"
    }
}
```

I'm sure as hell not gonna type out `require"dap".toggle_breakpoint()` more than just this once, so now I need to set up some keybindings.

```lua
vim.keymap.set('n', '<leader>db', function() require"dap".toggle_breakpoint() end)
vim.keymap.set('n', '<leader>ds', function() require"dap".continue() end)
```

Now I can go into a file, run `,db` to set a breakpoint, and `,ds` to start a debug session and...nothing happens. Well that's not exactly true, there are some things going on in the gutter when I hit `,ds` to continue the session, but nothing is popping up.

I read through the `nvim-dap` docs a bit and can't figure out how to get anything to pop up automatically, but there is a command for toggling a REPL that looks promising.

```lua
vim.keymap.set('n', '<leader>dr', function() require"dap".repl.toggle() end)
```

And now after hitting `,dr`, I can see some output. Unfortunately, it wasn't successful output. I got an error along the lines of

`ModuleNotFoundError: No module named '[redacted]'`

Ah right, I set up my project using [`poetry`]() because...uh...well because a [blog post](https://cjolowicz.github.io/posts/hypermodern-python-01-setup/) told me to. I get the use of poetry and more or less how it works, but something I'm confused about is why

```
poetry run python src/redacted/main.py
```

works just fine and is able to find the `redacted` package just fine, whereas

```
python src/redacted/main.py
```

results in the aforementioned error. I want to know exactly why this is at some point soon, but for now I'll just accept that I need to go through `poetry` to run my project. And in that case, it seems like I'll need to update my `nvim-dap` config.

```
dap.adapters.python = {
    type = "executable",
    command = 'poetry',
    args = { 'run, 'python', '-m', 'debugpy.adapter' }
}
```

And that did the trick, I can open a REPL with `,dr`, set breakpoints with `,db` and start a debug session that shows in that REPL with `,ds`. I'm sure there's some conveniences I'm missing out on just due to lack of famliarity with a lot of these tools, but for now I'm happy with this.
