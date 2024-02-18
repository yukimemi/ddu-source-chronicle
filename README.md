# ddu-source-chronicle

ddu-source-chronicle is a ddu source for [yukimemi/chronicle.vim](https://github.com/yukimemi/chronicle.vim).

# Requirements 

- [Deno - A modern runtime for JavaScript and TypeScript](https://deno.land/)
- [vim-denops/denops.vim: 🐜 An ecosystem of Vim/Neovim which allows developers to write cross-platform plugins in Deno](https://github.com/vim-denops/denops.vim)
- [Shougo/ddu.vim: Dark deno-powered UI framework for neovim/Vim8](https://github.com/Shougo/ddu.vim)
- [Shougo/ddu-kind-file: File kind for ddu.vim](https://github.com/Shougo/ddu-kind-file)
- [yukimemi/chronicle.vim: Denops Chronicle](https://github.com/yukimemi/chronicle.vim)
# Usage 

```vim
" default
call ddu#start({"sources": [{"name": "chronicle"}]})

" kind specific
call ddu#start({"sources": [{"name": "chronicle", "params": {"kind": "write"}}]})
```

# Params 

`ddu-source-chronicle-param-kind`            
source kind of [chronicle.vim](chronicle.vim)
Default is "read"
["read", "write"]

# License 

Licensed under MIT License.

Copyright (c) 2023 yukimemi

