/**
 * 12306-cli 查询函数
 *
 * Author: zhangyang <mailto:px.zhangyang@gmail.com>
 */
const request = require('request');
const chalk = require('chalk');
const columnify = require('columnify');
const stationsArr = require('./stations').split('@');


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

const printGrayData = function (item, val) {
  if (item.canWebBuy === 'Y') {
    return val;
  }
  return chalk.gray(val);
}

const printDataItem = function (item) {
  return {
    transCode: printGrayData(item, item.station_train_code),
    fromStation: printGrayData(item, item.from_station_name),
    toStation: printGrayData(item, item.to_station_name),
    startTime: item.controlled_train_flag === '0' ? printGrayData(item, item.start_time) : chalk.gray('--'),
    arriveTime: item.controlled_train_flag === '0' ? printGrayData(item, item.arrive_time) : chalk.gray('--'),
    lishi: item.controlled_train_flag === '0' ? printGrayData(item, item.lishi) : chalk.gray('--'),
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

const request12306 = function doReq12306(frm, to, queryDate, options) {
  // https://kyfw.12306.cn/otn/lcxxcx/query?purpose_codes=ADULT&queryDate=2016-09-14&from_station=HGH&to_station=XCH
  const url = `https://kyfw.12306.cn/otn/lcxxcx/query?purpose_codes=${options.purposeCode}&queryDate=${queryDate}&from_station=${frm}&to_station=${to}`;
  request(url, function(err, resp, body) {
    try {
      if (!err && resp.statusCode === 200) {
        const columnConfig = {};
        Object.keys(headers).forEach(k => {
          columnConfig[k] = { headingTransform };
        });

        const data = [];
        body = JSON.parse(body);
        if (body.data.datas) {
          body.data.datas.forEach(item => {
            if (options.highway) {
              if (
                item.station_train_code.indexOf('D') === 0 ||
                item.station_train_code.indexOf('G') === 0 ||
                item.station_train_code.indexOf('C') === 0
              ) {
                data.push(printDataItem(item));
              }
            } else {
              data.push(printDataItem(item));
            }
          });
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


const requestStationCode = function doReqStations(stationKey) {
  var arr;
  for (var i = 1, l = stationsArr.length ; i < l ; i++){
    arr = stationsArr[i].split('|');
    if (arr.indexOf(stationKey) > -1) {
      return [arr[1], arr[2]];
    }
  }
  return null;
};


const query = function doQuery(frm, to, at, options) {
  const frmCode = requestStationCode(frm);
  const toCode = requestStationCode(to);
  if (!frmCode || !toCode) {
    console.log(chalk.red('车站输入错误'));
  } else {
    console.log(chalk.bold(`${at} 从 ${frmCode[0]} 到 ${toCode[0]} \n`));
    if (options.highway) {
      console.log(chalk.bold('查询条件：只看高铁/动车 \n'));
    }
    request12306(frmCode[1], toCode[1], at, options);
  }
};


module.exports = query;
