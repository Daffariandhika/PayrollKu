import PropTypes from "prop-types";
import { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { deleteException } from "../../actions/exceptionActions";

class ViewException extends Component {
  onDelete(id) {
    confirmAlert({
      title: "Hapus Pengecualian ?",
      message: "Apakah Sudah Yakin",
      buttons: [
        {
          label: "Ya, Hapus!",
          onClick: () => {
            this.props
              .deleteException(id)
              .then(res => {
                if (res.type === "DELETE_EXCEPTION") {
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
    const { exceptions } = this.props;

    const formatMoney = money => {
      let formatedValue = money
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      return formatedValue;
    };

    let exceptionContainer;

    if (Object.keys(exceptions).length === 0)
      return (exceptionContainer = <h4>There are no data in the system</h4>);

    exceptionContainer = exceptions.map(exceptionItem => (
      <div
        key={exceptionItem._id}
        className="col-md-4 mx-auto card card-primary mt-2 bg-light"
      >
        <p className="mt-2">
          <strong>Nama Pegawai</strong>: {exceptionItem.name}
        </p>
        <p className="mt-2">
          <strong>Jumlah</strong> : {" "}
          {formatMoney(exceptionItem.amount)}
        </p>
        <div className="text-center">
          <button
            className="btn btn-sm btn-danger"
            onClick={this.onDelete.bind(this, exceptionItem._id)}
          >
            Hapus
          </button>
        </div>
        <hr />
      </div>
    ));

    return <div className="row">{exceptionContainer}</div>;
  }
}

ViewException.propTypes = {
  exceptions: PropTypes.array.isRequired,
  deleteException: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteException }
)(ViewException);
