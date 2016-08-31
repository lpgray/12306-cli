/**
 * 12306-cli 查询函数
 *
 * Author: zhangyang <mailto:px.zhangyang@gmail.com>
 */
const request = require('request');
const chalk = require('chalk');
const columnify = require('columnify');

const headingTransform = function(heading) {
  return chalk.bold.yellow(`${chalk.bold.yellow(headers[heading])}\n${chalk.bold.yellow('------')}`);
};

const headers = {
  transCode: '车次',
  fromStation: '出发站',
  toStation: '到达站',
  startTime: '出发时',
  arriveTime: '到达时',
  lishi: '历时',
  swzNum: '商务座',
  ydzNum: '一等座',
  edzNum: '二等座',
  rwNum: '软卧',
  ywNum: '硬卧',
  yzNum: '硬座',
  wzNum: '无座',
  qtNum: '其它',
  remark: '备注'
};

const printDataAttr = function (num) {
  if (num === '无' || num === '--' || num === '*') {
    return chalk.gray(num);
  }
  return num;
}

const printDataItem = function (item) {
  return {
    transCode: item.station_train_code,
    fromStation: item.from_station_name,
    toStation: item.to_station_name,
    startTime: item.controlled_train_flag === '0' ? item.start_time : chalk.gray('--'),
    arriveTime: item.controlled_train_flag === '0' ? item.arrive_time : chalk.gray('--'),
    lishi: item.controlled_train_flag === '0' ? item.lishi : chalk.gray('--'),
    swzNum: printDataAttr(item.swz_num),
    ydzNum: printDataAttr(item.zy_num),
    edzNum: printDataAttr(item.ze_num),
    rwNum: printDataAttr(item.rw_num),
    ywNum: printDataAttr(item.yw_num),
    yzNum: printDataAttr(item.yz_num),
    wzNum: printDataAttr(item.wz_num),
    qtNum: printDataAttr(item.qt_num),
    remark: item.controlled_train_flag === '1' ? chalk.gray(item.controlled_train_message) : ''
  };
};

const request12306 = function doReq12306(frm, to, queryDate, purposeCode) {
  if (!purposeCode) purposeCode = 'ADULT';
  // https://kyfw.12306.cn/otn/lcxxcx/query?purpose_codes=ADULT&queryDate=2016-09-14&from_station=HGH&to_station=XCH
  const url = `https://kyfw.12306.cn/otn/lcxxcx/query?purpose_codes=${purposeCode}&queryDate=${queryDate}&from_station=HGH&to_station=XCH`;
  const options = {
    url,
    headers: {
      'User-Agent': 'request'
    }
  };
  console.log(chalk.bold(`执行查询：从 ${frm} 到 ${to}, 日期：${queryDate}...\n`));
  request(options, function(err, resp, body) {
    try {
      if (!err && resp.statusCode === 200) {
        const columnConfig = {};
        Object.keys(headers).forEach(k => {
          columnConfig[k] = { headingTransform };
        });

        const data = [];
        body = JSON.parse(body);
        if (body.data.datas) {
          body.data.datas.forEach(item => data.push(printDataItem(item)));
          console.log(columnify(data, {
            columnSplitter: chalk.gray(' | '),
            config: columnConfig
          }) + '\n');
        } else {
          console.log(chalk.bgGreen('没有查到结果'));
        }
      } else {
        console.log(chalk.bgRed(err));
      }
    } catch (e) {
      console.log(chalk.bgRed(e));
    }
  });
};


const query = function doQuery(frm, to, at) {
  request12306(frm, to, at);
};


module.exports = query;
