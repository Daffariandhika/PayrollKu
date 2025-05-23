const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PayslipSchema = new Schema({
  basic: {
    type: Number
  },
  grossEarning: {
    type: Number
  },
  bonuses: [
    {
      name: {
        type: String
      },
      amount: {
        type: Number
      }
    }
  ],
  deductables: [
    {
      name: {
        type: String
      },
      amount: {
        type: Number
      }
    }
  ],
  individualcost: [
    {
      name: {
        type: String
      },
      amount: {
        type: Number
      },
      costType: {
        type: String
      }
    }
  ],
  oneOffPaymentArray: [
    {
      name: {
        type: String
      },
      amount: {
        type: Number
      },
      costType: {
        type: String
      }
    }
  ],
  totalBpjs: {
    type: Number
  },
  BPJS: {
    JHT: Number,
    JP: Number,
    KS: Number,
  },
  BPJS_employer: {
    JHT: Number,
    JP: Number,
    KS: Number,
  },
  biayaJabatan: {
    type: Number
  },
  tax: {
    type: Number
  },
  totalDeductions: {
    type: Number
  },
  netPay: {
    type: Number
  },
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  tag: {
    type: String
  },
  name: {
    type: String
  },
  status: {
    type: String
  },
  email: {
    type: String
  },
  designation: {
    type: String
  },
  department: {
    type: String
  },
  bankName: {
    type: String,
    required: true
  },
  accountNumber: {
    type: String,
    required: true
  },
  npwp: {
    type: String,
    required: true
  },
  level: {
    type: String,
  },
  presentMonth: {
    type: String
  },
  presentYear: {
    type: Number
  },
  is_delete: {
    type: Number,
    default: 0
  }
}
);

module.exports = Payslip = mongoose.model("payslip", PayslipSchema);
