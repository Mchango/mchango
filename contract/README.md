# Mchango Contract

Welcome to mchango contract code base, this is the heart of Mchango an, automated smart contract that enables decentralized savings (RSAC)

## Authors

- [@3ill](https://www.github.com/3ill)
- [@nvsblmike](https://www.github.com/nvsblmike)

## Contributing

Contributions are always welcome!

Please adhere to this project's `code of conduct`.

## Tech Stack

**Server:** `Solidity`, `Javascript`, `Ethers.js`

## Run Locally

Clone the project

```bash
  git clone https://github.com/Mchango/mchango.git
```

Go to the project directory

```bash
  cd contract
```

Install dependencies

```bash
  npm install
```

Compile contract

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Mchango.s.sol:DeployMchango --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
