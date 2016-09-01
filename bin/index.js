#!/usr/bin/env node

/**
 * 12306-cli index.js
 *
 * Author: zhangyang <mailto:px.zhangyang@gmail.com>
 */
const commander = require('commander');
const pkgInfo = require('../package.json');
const queryFunc = require('../lib/query');
const commandParser = function(afterParseFunc) {
  return function(frm, to, at) {
    afterParseFunc.call(this, frm, to, at, {
      highway: this.gaotie,
      purposeCode: 'ADULT'
    });
  }
};
const program = commander.version(pkgInfo.version);


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // http://stackoverflow.com/questions/20433287/node-js-request-cert-has-expired


program
  .command('query <from> <to> <time>')
  .alias('q')
  .description('查询指令')
  .action(commandParser(queryFunc))
  .option('-G, --gaotie', '只看高铁/动车');


program
  .parse(process.argv);
