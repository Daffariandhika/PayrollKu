import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class PayslipTable extends PureComponent {
  render() {
    const { payroll } = this.props;

    let extraIndividualEarning = [];
    let extraIndividualDeduction = [];
    let extraEarning = [];
    let extraDeduction = [];

    payroll.individualcost.forEach((individualcostItem) => {
      if (individualcostItem.costType === 'income') {
        extraIndividualEarning.push(individualcostItem);
      } else {
        extraIndividualDeduction.push(individualcostItem);
      }
    });

    payroll.oneOffPaymentArray.forEach((oneOff) => {
      if (oneOff.costType === 'income') {
        extraEarning.push(oneOff);
      } else {
        extraDeduction.push(oneOff);
      }
    });

    const formatMoney = (money) => {
      let formatedValue = money
        .toFixed(2)
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
      return formatedValue;
    };

    const formatField = (field) => field || '-';

    return (
      <div className="row">
        <div className="col-12">
          <div className="card">

            {/* HEADER */}
            <div className="slip-main-container">
              <div className="slip-header-main">
                <h1>PayrollKu.app</h1>
                <h3>SLIP GAJI</h3>
              </div>

              {/* EMPLOYEE INFO */}
              <table className="slip-employee-table">
                <tbody>
                  {[
                    ['Nama', payroll.employeeDetails.name, 'Departemen', payroll.employeeDetails.department],
                    ['ID', payroll.employeeDetails.tag, 'Posisi', payroll.employeeDetails.designation],
                    ['NPWP', formatField(payroll.employeeDetails.npwp), 'Jabatan', formatField(payroll.employeeDetails.levelName)],
                    ['Status', formatField(payroll.employeeDetails.status), 'Periode', `${payroll.presentMonth} ${payroll.presentYear}`]
                  ].map((row, idx) => (
                    <tr key={idx}>
                      <td>{row[0]}</td>
                      <td>:</td>
                      <td>{row[1]}</td>
                      <td>{row[2]}</td>
                      <td>:</td>
                      <td>{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className='slip-container'>
                <div className='slip-left-section'>
                  {/*Income*/}
                  <section className='slip-section'>
                    <h4 className='income-title'>PENDAPATAN</h4>
                    <table className='slip-table'>
                      <tbody>
                        {/*basic*/}
                        <tr className='income-table'>
                          <td>Gaji Pokok</td>
                          <td className='text-right'>{formatMoney(payroll.basic)}</td>
                        </tr>
                        {/*level*/}
                        {payroll.level.bonuses?.length > 0 && (
                          <>
                            <tr className='income-sub'>
                              <td colSpan={2} className='p-1'>Tunjangan Divisi</td>
                            </tr>
                            {payroll.level.bonuses.map((bonus) => (
                              <tr key={bonus._id} className='income-table'>
                                <td>{bonus.name}</td>
                                <td className='text-right'>{formatMoney(bonus.amount)}</td>
                              </tr>
                            ))}
                          </>
                        )}
                        {/*individual*/}
                        {extraIndividualEarning?.length > 0 && (
                          <>
                            <tr className='income-sub'>
                              <td colSpan={2} className='p-1'>Tunjangan Personal</td>
                            </tr>
                            {extraIndividualEarning.map((extraIndividualItem) => (
                              <tr key={extraIndividualItem._id} className='income-table'>
                                <td>{extraIndividualItem.name}</td>
                                <td className='text-right'>{formatMoney(extraIndividualItem.amount)}</td>
                              </tr>
                            ))}
                          </>
                        )}
                        {/*One off*/}
                        {extraEarning?.length > 0 && (
                          <>
                            <tr className='income-sub'>
                              <td colSpan={2} className='p-1'>Tunjangan Sekali</td>
                            </tr>
                            {extraEarning.map((item) => (
                              <tr key={item._id} className='income-table'>
                                <td>{item.name}</td>
                                <td className='text-right'>{formatMoney(item.amount)}</td>
                              </tr>
                            ))}
                          </>
                        )}
                      </tbody>
                    </table>
                  </section>

                  {/* Contributions */}
                  <section className='slip-section'>
                    <h4 className='contribution-title'>
                      KONTRIBUSI
                    </h4>
                    <table className='slip-table'>
                      <tbody>
                        <tr className='contribution-table'>
                          <td>BPJS JHT (3.7%)</td>
                          <td className='text-right'>{formatMoney(payroll.BPJS_employer.JHT)}</td>
                        </tr>
                        <tr className='contribution-table'>
                          <td>BPJS JP (2%)</td>
                          <td className='text-right'>{formatMoney(payroll.BPJS_employer.JP)}</td>
                        </tr>
                        <tr className='contribution-table'>
                          <td>BPJS Kesehatan (4%)</td>
                          <td className='text-right'>{formatMoney(payroll.BPJS_employer.KS)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </section>
                </div>

                {/*Deductions*/}
                <section className='slip-section'>

                  <h4 className='deduct-title'>
                    POTONGAN
                  </h4>

                  <table className='slip-table'>
                    <tbody>

                      {/*BPJS*/}
                      <tr className='deduct-sub'>
                        <td colSpan={2} className='p-1'>Potongan Asuransi</td>
                      </tr>

                      <tr className='deduct-table'>
                        <td>BPJS JHT (2%)</td>
                        <td className='text-right'>{formatMoney(payroll.BPJS.JHT)}</td>
                      </tr>

                      <tr className='deduct-table'>
                        <td>BPJS JP (1%)</td>
                        <td className='text-right'>{formatMoney(payroll.BPJS.JP)}</td>
                      </tr>

                      <tr className='deduct-table'>
                        <td>BPJS Kesehatan (1%)</td>
                        <td className='text-right'>{formatMoney(payroll.BPJS.KS)}</td>
                      </tr>

                      {payroll.level.deductables?.length > 0 && (
                        <>
                          <tr className='deduct-sub'>
                            <td colSpan={2} className='p-1'>Potongan Divisi</td>
                          </tr>
                          {payroll.level.deductables.map(
                            (deductable) => (
                              <tr key={deductable._id} className='deduct-table'>
                                <td>{deductable.name}</td>
                                <td style={{ textAlign: 'right' }}>{formatMoney(deductable.amount)}</td>
                              </tr>
                            ))}
                        </>
                      )}

                      {extraIndividualDeduction?.length > 0 && (
                        <>
                          <tr className='deduct-sub'>
                            <td colSpan={2} className='p-1'>Potongan Personal</td>
                          </tr>
                          {extraIndividualDeduction.map(
                            (individualDeduction) => (
                              <tr key={individualDeduction._id} className='deduct-table'>
                                <td>{individualDeduction.name}</td>
                                <td className='text-right'>{formatMoney(individualDeduction.amount)}</td>
                              </tr>
                            ))}
                        </>
                      )}

                      {extraDeduction?.length > 0 && (
                        <>
                          <tr className='deduct-sub'>
                            <td colSpan={2} className='p-1'>Potongan Sekali</td>
                          </tr>
                          {extraDeduction.map((item) => (
                            <tr key={item._id} className='deduct-table'>
                              <td>{item.name}</td>
                              <td className='text-right'>{formatMoney(item.amount)}</td>
                            </tr>
                          ))}
                        </>
                      )}

                      <tr className='deduct-sub'>
                        <td colSpan={2} className='p-1'>Pajak</td>
                      </tr>

                      <tr className='deduct-table'>
                        <td>PPh</td>
                        <td className='text-right'>{formatMoney(payroll.tax)}</td>
                      </tr>

                      <tr className='deduct-table'>
                        <td>Biaya Jabatan</td>
                        <td className='text-right'>{formatMoney(payroll.biayaJabatan)}</td>
                      </tr>

                    </tbody>
                  </table>
                </section>
              </div>

              {/* TOTALS */}
              <div className='totals-salary'>
                <div className='total-income'>
                  Total Pendapatan: {formatMoney(payroll.grossEarning)}
                </div>
                <div className='total-deductions'>
                  Total Potongan: {formatMoney(payroll.totalDeductable)}
                </div>
              </div>

              {/* NET PAY */}
              <div className='net-pay'>
                Take Home Pay: {formatMoney(payroll.netPay)}
              </div>

              {/* BANK INFO */}
              <div className='bank-info'>
                Pembayaran telah dilakukan ke rekening {formatField(payroll.employeeDetails.bankName)} {formatField(payroll.employeeDetails.accountNumber)}
              </div>

              {/* SIGNATURE */}
              <div className='signature-section'>
                <div className='signature-block'>
                  <div className='signature-label'>Diterima Oleh</div>
                  <div className='signature-line'>(________________________)</div>
                  <div>{payroll.employeeDetails.name}</div>
                </div>
                <div className='signature-block'>
                  <div className='signature-label'>Disetujui Oleh</div>
                  <div className='signature-line'>(________________________)</div>
                  <div>HRD</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PayslipTable.propTypes = {
  payroll: PropTypes.object.isRequired,
};

export default PayslipTable;
