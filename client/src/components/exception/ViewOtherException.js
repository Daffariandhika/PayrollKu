import PropTypes from "prop-types";
import { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { deleteOtherException } from "../../actions/exceptionActions";

class ViewOtherException extends Component {
  onDelete(id) {
    confirmAlert({
      title: "Hapus Pengecualian ?",
      message: "Apakah Sudah Yakin",
      buttons: [
        {
          label: "Ya, Hapus!",
          onClick: () => {
            this.props
              .deleteOtherException(id)
              .then(res => {
                if (res.type === "DELETE_OTHER_EXCEPTION") {
                  toast.success("Pengecualian dihapus!");
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
    const { otherexception } = this.props;

    const formatMoney = money => {
      let formatedValue = money
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      return formatedValue;
    };

    let exceptionContainer;

    if (Object.keys(otherexception).length === 0)
      return (exceptionContainer = <h4>Tidak Ada Pengecualian Pada Sistem</h4>);

    exceptionContainer = otherexception.map(exceptionItem => (
      <div
        key={exceptionItem._id}
        className="col-md-4 mx-auto card card-primary mt-2 bg-light"
      >
        <p className="mt-2">
          <strong>Nama</strong>: {exceptionItem.name}
        </p>
        <p className="mt-2">
          <strong>Nama Pegawai</strong>: {exceptionItem.employeeName}
        </p>
        <p className="mt-2">
          <strong>Jenis</strong>:{" "}
          {exceptionItem.costType === "income" ? "Income" : "Deduction"}
        </p>
        <p className="mt-2">
          <strong>Jumlah</strong> : {" "}
          {formatMoney(exceptionItem.amount)}
        </p>
        <div className="text-center mb-3">
          <button
            className="btn btn-sm btn-danger"
            onClick={this.onDelete.bind(this, exceptionItem._id)}
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
  otherexception: PropTypes.array.isRequired,
  deleteOtherException: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteOtherException }
)(ViewOtherException);
