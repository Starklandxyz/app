# Starkland

### Steps to Execute

Clone repository
`git clone https://github.com/stzb/game --recursive`

- Build contracts

- Build Frontend

Subsequently, clone this project and execute the following commands in the terminal:

```console
yarn

yarn dev
```

### contracts

## DEV

instal dojo toolchain with `dojoup -v nightly`

go contracts folder

1. terminal_1
`katana --disable-fee`
2. terminal_2, comment world_address
`sozo build && sozo migrate name --test`
3. terminal_3 uncomment world_address
`touch indexer.db`
`torii -d indexer.db`

To avoid redeploying contracts, you can save the Katana state by using the following command.
`katana --disable-fee --load-state ./dump-state.bin --dump-state ./dump-state.bin`

4. generate component
`yarn components`

5. generate sql indexer
`yarn codegen`