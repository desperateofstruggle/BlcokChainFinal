const express = require('express');
const app = new express();
const port = 3000;
const cli = require('./cli');

const bodyParser = require('body-parser');

const fs = require('fs');
const path = require('path');
const utils = require('../api/common/utils');

const { Web3jService, ConsensusService, SystemConfigService } = require('../api');
const web3 = new Web3jService();
const { getAbi } = require('./interfaces/base');

const { ContractsDir, ContractsOutputDir } = require('./constant');

const companies = [
  {
    name: "bank",
    address: "0xfbd68dd2530631c56ea01e56232b816db3c1efb0",
  },
  {
    name: "BMW",
    address: "0x7dd87519042c5385cf218509c2a3d07dd84e2619",
  },
  {
    name: "Wheel",
    address: "0xf10d1648bf9210ed8f29fff041ed644207f6a7d1",
  },
  {
    name: "Material",
    address: "0xb1164312ee7eeaf13044ff202f346999ca9e72af",
  },
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header('Content-Type', 'application/json');
  next();
});

app.get('/', function(req, res) {
  res.send('This is homepage...');
});

// 部署合约
app.post('/deploy', function(req, res) {
  // console.log(req.body);
  let data = {};
  for (let x in req.body) {
    data = x;
  }
  data = JSON.parse(data);

  let contractName = data.contractName + '.sol';

  let contractPath = path.join(ContractsDir, contractName);

  console.log('Path = ' + contractPath);

  if (!fs.existsSync(contractPath)) {
    throw new Error(`${contractName} doesn't exist`);
  }
  
  web3.deploy(contractPath, ContractsOutputDir).then(result => {
    let contractAddr = result.contractAddress;
    if (result.status === '0x0') {
      let addressPath = path.join(ContractsOutputDir, `.${path.basename(contractName, '.sol')}.address`);
      try {
          fs.appendFileSync(addressPath, contractAddress + '\n');
      } catch (error) {}
    }
    res.status(200).json({
      message: "success",
      data: {
        status: result.status,
        contractAddress: contractAddr,
      }
    });
  });
});

// owe := (to, amount)
app.post('/owe', function(req, res) {
  let data = {};
  for (let x in req.body) {
    data = x;
  }
  data = JSON.parse(data);
  console.log(data);
  
  let contractName = 'reFinance_v2';
  // let contractAddr = data.contractAddress;
  let contractAddr = '0x11c1e8248f54398b6f8fbc9d28468dba222b75dd';
  let func = 'receiptGeneration';
  let parameters = [];
  parameters.push(data.from);
  parameters.push(data.to);
  parameters.push(parseInt(data.amount));
  parameters.push(data.time);

  let abi = getAbi(contractName);
  
  if (!abi) {
    throw new Error(`no abi file for contract ${contractName}`);
  }

  for (let item of abi) {
    if (item.name === func && item.type === 'function') {
      if (item.inputs.length !== parameters.length) {
        throw new Error(`wrong number of parameters for function \`${item.name}\`, expected ${item.inputs.length} but got ${parameters.length}`);
      }
      
      func = utils.spliceFunctionSignature(item);

      if (item.constant) {
        return web3.call(contractAddr, fuc, parameters).then(result => {
          let status = result.result.status;
          let output = result.result.output;
          if (output !== '0x') {
            output = utils.decodeMethod(item, output);
          }
          res.status(200).json({status: status, output: output});
        });
      } else {
        return web3.sendRawTransaction(contractAddr, func, parameters).then(result => {
          let txHash = result.transactionHash;
          let status = result.status;
          let output = result.output;
          if (output !== '0x') {
            output = utils.decodeMethod(item, output);
          }
          res.status(200).json({transactionHash: txHash, status: status, output: output});
        });
      }
    }
  }
});

// payback := (to, amount)
app.post('/payback', function(req, res) {
  let data = {};
  for (let x in req.body) {
    data = x;
  }
  data = JSON.parse(data);
  console.log(data);
  
  let contractName = 'reFinance_v2';
  // let contractAddr = data.contractAddress;
  let contractAddr = '0x11c1e8248f54398b6f8fbc9d28468dba222b75dd';
  let func = 'payOff';
  let parameters = [];
  parameters.push(data.from);
  parameters.push(data.to);
  parameters.push(parseInt(data.amount));
  parameters.push(data.time);

  let abi = getAbi(contractName);
  
  if (!abi) {
    throw new Error(`no abi file for contract ${contractName}`);
  }

  for (let item of abi) {
    if (item.name === func && item.type === 'function') {
      if (item.inputs.length !== parameters.length) {
        throw new Error(`wrong number of parameters for function \`${item.name}\`, expected ${item.inputs.length} but got ${parameters.length}`);
      }
      
      func = utils.spliceFunctionSignature(item);

      if (item.constant) {
        return web3.call(contractAddr, fuc, parameters).then(result => {
          let status = result.result.status;
          let output = result.result.output;
          if (output !== '0x') {
            output = utils.decodeMethod(item, output);
          }
          res.status(200).json({status: status, output: output});
        });
      } else {
        return web3.sendRawTransaction(contractAddr, func, parameters).then(result => {
          let txHash = result.transactionHash;
          let status = result.status;
          let output = result.output;
          if (output !== '0x') {
            output = utils.decodeMethod(item, output);
          }
          res.status(200).json({transactionHash: txHash, status: status, output: output});
        });
      }
    }
  }
});

// register := (to, amount)
app.post('/register', function(req, res) {
  let data = {};
  for (let x in req.body) {
    data = x;
  }
  data = JSON.parse(data);
  console.log(data);
  
  let contractName = 'reFinance_v2';
  // let contractAddr = data.contractAddress;
  let contractAddr = '0x11c1e8248f54398b6f8fbc9d28468dba222b75dd';
  let func = 'register';
  let parameters = [];
  parameters.push(data.to);
  parameters.push(data.company_address);
  parameters.push(data.company_nature);
  console.log(parameters);

  let abi = getAbi(contractName);
  
  if (!abi) {
    throw new Error(`no abi file for contract ${contractName}`);
  }

  for (let item of abi) {
    if (item.name === func && item.type === 'function') {
      if (item.inputs.length !== parameters.length) {
        throw new Error(`wrong number of parameters for function \`${item.name}\`, expected ${item.inputs.length} but got ${parameters.length}`);
      }
      
      func = utils.spliceFunctionSignature(item);

      if (item.constant) {
        return web3.call(contractAddr, fuc, parameters).then(result => {
          let status = result.result.status;
          let output = result.result.output;
          if (output !== '0x') {
            output = utils.decodeMethod(item, output);
          }
          res.status(200).json({status: status, output: output});
        });
      } else {
        return web3.sendRawTransaction(contractAddr, func, parameters).then(result => {
          let txHash = result.transactionHash;
          let status = result.status;
          let output = result.output;
          if (output !== '0x') {
            output = utils.decodeMethod(item, output);
          }
          res.status(200).json({transactionHash: txHash, status: status, output: output});
        });
      }
    }
  }
});

// transfer := (from, to, amount)
app.post('/transfer', function(req, res) {
  let data = {};
  for (let x in req.body) {
    data = x;
  }
  data = JSON.parse(data);
  console.log(data);

  let contractName = 'reFinance_v2';
  // let contractAddr = data.contractAddress;
  let contractAddr = '0x11c1e8248f54398b6f8fbc9d28468dba222b75dd';
  let func = 'transferReceipts';
  let parameters = [];
  parameters.push(data.from);
  parameters.push(data.mid);
  parameters.push(data.to);
  parameters.push(parseInt(data.amount));
  parameters.push(data.time);

  let abi = getAbi(contractName);

  if (!abi) {
    throw new Error(`no abi file for contract ${contractName}`);
  }

  for (let item of abi) {
    if (item.name === func && item.type === 'function') {
      if (item.inputs.length !== parameters.length) {
        throw new Error(`wrong number of parameters for function \`${item.name}\`, expected ${item.inputs.length} but got ${parameters.length}`);
      }
      
      func = utils.spliceFunctionSignature(item);

      if (item.constant) {
        return web3.call(contractAddr, fuc, parameters).then(result => {
          let status = result.result.status;
          let output = result.result.output;
          if (output !== '0x') {
            output = utils.decodeMethod(item, output);
          }
          res.status(200).json({status: status, output: output});
        });
      } else {
        return web3.sendRawTransaction(contractAddr, func, parameters).then(result => {
          let txHash = result.transactionHash;
          let status = result.status;
          let output = result.output;
          if (output !== '0x') {
            output = utils.decodeMethod(item, output);
          }
          res.json({transactionHash: txHash, status: status, output: output});
        });
      }
    }
  }
});

// finance := (amount)
app.post('/finance', function(req, res) {
  let data = {};
  for (let x in req.body) {
    data = x;
  }
  data = JSON.parse(data);
  console.log(data);

  let contractName = 'reFinance_v2';
  // let contractAddr = data.contractAddress;
  let contractAddr = '0x11c1e8248f54398b6f8fbc9d28468dba222b75dd';
  let func = 'finaceGeneration';
  let parameters = [];
  parameters.push(data.userAddr);
  parameters.push(data.amount);
  parameters.push(data.time);

  let abi = getAbi(contractName);

  if (!abi) {
    throw new Error(`no abi file for contract ${contractName}`);
  }

  for (let item of abi) {
    if (item.name === func && item.type === 'function') {
      if (item.inputs.length !== parameters.length) {
        throw new Error(`wrong number of parameters for function \`${item.name}\`, expected ${item.inputs.length} but got ${parameters.length}`);
      }
      
      func = utils.spliceFunctionSignature(item);

      if (item.constant) {
        return web3.call(contractAddr, fuc, parameters).then(result => {
          let status = result.result.status;
          let output = result.result.output;
          if (output !== '0x') {
            output = utils.decodeMethod(item, output);
          }
          res.status(200).json({status: status, output: output});
        });
      } else {
        return web3.sendRawTransaction(contractAddr, func, parameters).then(result => {
          let txHash = result.transactionHash;
          let status = result.status;
          let output = result.output;
          if (output !== '0x') {
            output = utils.decodeMethod(item, output);
          }
          res.json({transactionHash: txHash, status: status, output: output});
        });
      }
    }
  }
});


app.listen(port, () => console.log('app listening on port: ' + port));
