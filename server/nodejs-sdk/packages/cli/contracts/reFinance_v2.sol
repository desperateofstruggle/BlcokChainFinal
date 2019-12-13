pragma solidity ^0.4.23;

contract reFinance_v2 {
  event RegisterEvent(int256 ret, address company_name, string company_address, string company_nature);
  event PurchaseEvent(int256 ret, address from_company, address to_company, uint256 amount, string time);
  event TransferEvent(int256 ret, address from_company, address to_company, uint256 amount, string time);
  event FinanceEvent(int256 ret, address from_company, address to_company, uint256 amount, string time);
  event PayOffEvent(int256 ret, address from_company, address to_company, uint256 amount, string time);

  struct company {
    address company_name;
    string company_address;
    string company_nature;
  }

  struct receipt {
    address from;
    address to;
    uint256 amount;
    string status;
    string time;
  }

  receipt[] public receipts;
  company[] public companies;

  constructor() public {
    // to be waited to link database in the next edition
  }

  /*
  描述 : 公司(银行)注册
  参数 ： 
          company_address  : 公司地址
          company_nature   : 公司性质(暂自定义)
  返回值：
          int256  :   0  公司注册成功  -1 公司账户已存在
          address :   公司名称(公钥)
          string  :   公司地址
          string  :   公司性质(暂自定义)
          
  */
  function register(address addr, string company_address, string company_nature) returns(bool) {
    bool ret = false;
    if (isCompanyRegistered(addr)) {
      emit RegisterEvent(-1, addr, company_address, company_nature);
      ret = false;
    }
    company memory tmp;
    tmp.company_address = company_address;
    tmp.company_name = addr;
    tmp.company_nature = company_nature;

    companies.push(tmp);

    ret = true;
    emit RegisterEvent(0, addr, company_address, company_nature);
    return ret;
  }

  function isCompanyRegistered(address company_name) returns(bool) {
    for (uint i = 0; i < companies.length; i++) {
      if (companies[i].company_name == company_name) {
        return true;
      }
    }
    return false;
  }


  /*
    描述 : 公司(银行)生成账单
    参数 ： 
            to_company  : 入账公司
            amount      : 款额
            time        : 交易时间
    返回值：
            int256  :   0  账单生成成功  -1 目标公司未注册 -2 己方公司未注册
            address :   己方公司名称(公钥)
            address :   目标公司名称(公钥)
            uint256 :   款额
            string  :   交易时间
            
    */
  function receiptGeneration(address from_company, address to_company, uint256 amount, string time) returns(bool) {
    if (!isCompanyRegistered(to_company)) {
      emit PurchaseEvent(-1, from_company, to_company, amount, time);
      return false;
    }
    if (!isCompanyRegistered(from_company)) {
      emit PurchaseEvent(-2, from_company, to_company, amount, time);
      return false;
    }

    receipt memory tmp;
    tmp.from = from_company;
    tmp.to = to_company;
    tmp.amount = amount;
    tmp.time = time;
    tmp.status = "F";

    receipts.push(tmp);

    emit PurchaseEvent(0, from_company, to_company, amount, time);
    return true;
  }




  /*
  描述 : 公司(银行)账单转移
  参数 ： 
          from_company    : 上链公司
          to_company      : 下链公司
          amount          : 需要进行转移的款额
          time            : 交易时间
  返回值：
          int256  :   0  账单生成成功  -1 需要进行转移的款额大于上链公司欠款或需要进行转移的款额大于欠下链公司的款额  -2 无与对应上下链公司发生的账单
          address :   上链公司名称(公钥)
          address :   下链公司名称(公钥)
          uint256 :   已转移的款额
          string  :   交易时间
          
  */
  function transferReceipts(address from_company, address pass_company, address to_company, uint256 amount, string time) returns(bool) {
    for (uint i = 0; i < receipts.length; i++) {
      if (receipts[i].to == pass_company && receipts[i].from == from_company) {
        for (uint j = 0; j < receipts.length; j++) {
          if (receipts[j].from == pass_company && receipts[j].to == to_company) {
            if (receipts[i].amount < amount || receipts[j].amount < amount) {
              emit TransferEvent(-1, pass_company, pass_company, amount, time);
              return false;
            } else {
              receipts[i].amount -= amount;
              receipts[i].time = time;
              receipts[j].amount -= amount;
              receipts[j].time = time;

              receipt memory tmp;
              tmp.from = from_company;
              tmp.to = to_company;
              tmp.amount = amount;
              tmp.time = time;
              tmp.status = "F";

              receipts.push(tmp);

              emit TransferEvent(0, from_company, to_company, amount, time);
              return true;
            }
          }
        }
      }
    }

    emit TransferEvent(-2, from_company, to_company, amount, time);
    return false;
  }

  /*
  描述 : 公司银行融资
  参数 ： 
          bank_address  : 银行名称(公钥)
          time          : 交易时间
  返回值：
          int256  :   0  账单生成成功  -1 目标银行未注册 -2 己方公司未注册 -3 己方公司正欠债，不符合融资要求
          address :   己方公司名称(公钥)
          address :   银行名称(公钥)
          uint256 :   融资款额
          string  :   交易时间
          
  */
  function finaceGeneration(address company_address, address bank_address, string time) returns(bool) {
    // 判断我方公司是否已注册
    if (!isCompanyRegistered(company_address)) {
      emit FinanceEvent(-2, company_address, bank_address, 0, time);
      return false;
    }

    if (!isCompanyRegistered(bank_address)) {
      emit FinanceEvent(-1, company_address, bank_address, 0, time);
      return false;
    }


    // 判断是否欠债
    int256 receiptSum = 0;
    for (uint i = 0; i < receipts.length; i++) {
      if (receipts[i].from == company_address) {
        receiptSum = receiptSum - (int256)(receipts[i].amount);
      } else if (receipts[i].to == company_address) {
        receiptSum = receiptSum + (int256)(receipts[i].amount);
      }
    }

    if (receiptSum < 0) {
      emit FinanceEvent(-3, company_address, bank_address, (uint256)(receiptSum), time);
      return false;
    }


    receipt memory tmp;
    tmp.from = company_address;
    tmp.to = bank_address;
    tmp.amount = (uint256)(receiptSum);
    tmp.time = time;
    tmp.status = "T";

    receipts.push(tmp);

    emit FinanceEvent(0, company_address, bank_address, (uint256)(receiptSum), time);
    return true;
  }


  /*
  描述 : 公司账单结算
  参数 ： 
          bank_address  : 目标公司名称(公钥)
          amount        : 发起结算的款额
          time          : 交易时间
  返回值：
          int256  :   0  账单生成成功  -1 发起结算的款额大于实际欠款额 -2 未存在己方与对方公司之间的账单
          address :   己方公司名称(公钥)
          address :   目标公司名称(公钥)
          uint256 :   还款款额
          string  :   交易时间
          
  */
  function payOff(address from_company, address to_company, uint256 amount, string time) returns(bool) {
    for (uint i = 0; i < receipts.length; i++) {
      if (receipts[i].from == from_company && receipts[i].to == to_company) {
        if (receipts[i].amount >= amount) {
          receipts[i].amount = receipts[i].amount - amount;
          emit PayOffEvent(0, from_company, to_company, amount, time);
          return true;
        } else {
          emit PayOffEvent(-1, from_company, to_company, amount, time);
          return false;
        }
      }
    }
    emit PayOffEvent(-2, from_company, to_company, amount, time);
    return false;
  }

}
