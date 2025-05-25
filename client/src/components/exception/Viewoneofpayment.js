import PropTypes from "prop-types";
import { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { deleteOneOffPayment } from "../../actions/exceptionActions";

class ViewOtherException extends Component {
  onDelete(id) {
    confirmAlert({
      title: "Hapus One Off ?",
      message: "Apakah Sudah Yakin",
      buttons: [
        {
          label: "Ya, Hapus!",
          onClick: () => {
            this.props
              .deleteOneOffPayment(id)
              .then(res => {
                if (res.type === "DELETE_ONE_OFF_PAYMENT") {
                  toast.success("One Off dihapus!");
                }
              })
              .catch(err => console.log(err));
          }
        },
        {
          label: "Tidak, Kembali!",
          onClick: () => {}
        }
      ]
    });
  }

  render() {
    const { oneoffpayment } = this.props;

    const formatMoney = money => {
      let formatedValue = money
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      return formatedValue;
    };

    let exceptionContainer;

    if (Object.keys(oneoffpayment).length === 0)
      return (exceptionContainer = <h4>One Off Tidak Ditemuakan di Sitem</h4>);

    exceptionContainer = oneoffpayment.map(oneoffpaymmentItem => (
      <div
        key={oneoffpaymmentItem._id}
        className="col-md-4 mx-auto card card-primary mt-2 bg-light"
      >
        <p className="mt-2">
          <strong>Nama</strong>: {oneoffpaymmentItem.name}
        </p>
        <p className="mt-2">
          <strong>Nama Pegawai</strong>: {oneoffpaymmentItem.employeeName}
        </p>
        <p className="mt-2">
          <strong>Jenis</strong>:{" "}
          {oneoffpaymmentItem.costType === "income" ? "Income" : "Deduction"}
        </p>
        <p className="mt-2">
          <strong>Jumlah</strong> : {" "}
          {formatMoney(oneoffpaymmentItem.amount)}
        </p>
        <p className="mt-2">
          <strong>Dilakukan Bulan</strong> : {oneoffpaymmentItem.month}
        </p>
        <div className="text-center mb-3">
          <button
            className="btn btn-sm btn-danger"
            onClick={this.onDelete.bind(this, oneoffpaymmentItem._id)}
          >
            Hapus
          </button>
        </div>
      </div>
    ));

    return <div className="row">{exceptionContainer}</div>;
  }
}

ViewOtherException.propTypes = {
  oneoffpayment: PropTypes.array.isRequired,
  deleteOneOffPayment: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteOneOffPayment }
)(ViewOtherException);
