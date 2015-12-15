# 13-to-1
A code mod to upgrade your React-Router from v0.13 to v1. This uses babel internals to apply code changes.

 - parsing - [babylon](https://github.com/babel/babel/tree/master/packages/babylon)
 - AST traversal/mod - [babel-traverse](https://github.com/babel/babel/tree/master/packages/babel-traverse) & [babel-types](https://github.com/babel/babel/tree/master/packages/babel-types)
 - code generation - [babel-generator](https://github.com/babel/babel/tree/master/packages/babel-generator)

### Install

`mkdir -p 13-to-1 && git clone https://github.com/jazlalli/13-to-1.git ./13-to-1`

`npm install`

### Usage

ATM `¯\_(ツ)_/¯`

I'll work this out in due course.

### Contributing

Each of the v0.13 -> v1 API changes, [listed here](https://github.com/rackt/react-router/releases/tag/v1.0.0), are implemented in a dedicated file in `./visitors`. The corresponding tests are in `./test/fixtures`.

To run existing test suite

`npm test`

If you wish to add to or improve this tool, add a failing test case, and ideally, the code that implements that test case.

Thank you!
