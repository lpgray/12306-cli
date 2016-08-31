const commander = require('commander');
const pkgInfo = require('./package.json');
const queryFunc = require('./lib/query');
const commandParser = function(afterParseFunc) {
  return function(frm, to, at) {
    afterParseFunc.call(this, frm, to, at);
  }
};
const program = commander.version(pkgInfo.version);


program
  .command('query <from> <to> <time>')
  .alias('q')
  .description('查询指令')
  .action(commandParser(queryFunc))
  // .option('-f, --from', '出发地')
  // .option('-d, --destination', '目的地')
  // .option('-a, --at', '具体日期');


program
  .parse(process.argv);


console.log(`\n\n12306 command line tools v.${pkgInfo.version}`);
