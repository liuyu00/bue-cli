#! /usr/bin/env node

const program = require('commander')
const create = require('./command/create')

program
.command('create <name>')
.description('创建vue项目')
.action((name) => {
  create(name)
})


program.parse(process.argv)
