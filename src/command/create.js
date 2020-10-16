
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')

const preset = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../preset.json')))
console.log(preset)
const question = [
  {
    type: 'list',
    message: '请选择项目类型',
    choices: [
      "web pc",
      "web app"
    ],
    name: 'type'
  },
  {
    type: 'list',
    message: '请选择一个UI框架',
    choices: [
      'ElementUI',
      'IView',
      'AntdVue'
    ],
    name: 'ui',
    when (res) {
      return res.type === 'web pc'
    }
  },
  {
    type: 'list',
    message: '请选择一个UI框架',
    choices: [
      'vux',
      'mintui'
    ],
    name: 'ui',
    when (res) {
      return res.type === 'web app'
    }
  },
  {
    type: 'list',
    message: '请选择项目预设',
    choices: [
      "默认",
      ...Object.keys(preset),
      "自定义",
    ],
    name: 'preset'
  },
  {
    type: 'checkbox',
    message: '选择功能',
    default: ['Bable', 'CSS Pre-processors'],
    choices: [
      "Bable",
      "Vuex",
      "VueRouter",
      "CSS Pre-processors"
    ],
    when (res) {
      return res.preset === '自定义'
    },
    name: 'features'
  },
  {
    type: 'confirm',
    name: 'mode',
    message: '是否使用history路由',
    when (res) {
      return res.features.indexOf('VueRouter') !== -1
    }
  },
  {
    type: 'list',
    message: '选择要使用的css预处理器方式',
    name: 'cssPre',
    choices: [
      'less',
      'scss'
    ],
    when (res) {
      return res.features.indexOf('CSS Pre-processors') !== -1
    }
  },
  {
    type: 'confirm',
    name: 'save',
    message: '是否保存当前预设',
    default: false,
    when (res) {
      return res.preset === '自定义'
    }
  },
  {
    type: 'input',
    name: 'presetName',
    message: '输入当前预设名称',
    when (res) {
      return res.save
    }
  },
]

const create = function (name) {
  inquirer.prompt(question).then((answers) => {
    console.log(answers)
  })
}

module.exports = create
