import PropTypes from "prop-types";
import { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { deleteDeductable } from "../../actions/levelActions";
import { formatMoney } from "../common/Utilities";

class ViewDeductableTable extends Component {
  onDelete(levelId, bonusId) {
    confirmAlert({
      title: "Hapus Potongan Ini ?",
      message: "Apakah Sudah Yakin Untuk Menghapus",
      buttons: [
        {
          label: "Ya, Hapus Potongan!",
          onClick: () => {
            this.props
              .deleteDeductable(levelId, bonusId)
              .then(res => toast.success("Potongan dihapus!"))
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
    const { levels } = this.props;

    const DeductableContainer = levels.map(level => (
      <div
        key={level._id}
        className="col-md-4 mx-auto card card-primary mt-2 bg-light"
      >
        <p className="mt-3">
          <strong>Jabatan</strong> : {level.name}
        </p>
        <p className="mt-2">
          <strong>Gaji Pokok</strong> : {" "}
          {formatMoney(level.basic)}
        </p>
        {level.deductables.length > 0 ? (
          <div>
            <h5 className="text-center">Potongan</h5>
            {level.deductables.map(deductable => (
              <div key={deductable._id} className="text-center mb-3">
                <p>Nama Potongan: {deductable.name}</p>
                <p>
                  Jumlah:  {formatMoney(deductable.amount)}
                </p>
                <div>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={this.onDelete.bind(
                      this,
                      level._id,
                      deductable._id
                    )}
                  >
                    Hapus
                  </button>
                </div>
                <hr />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    ));

    return <div className="row">{DeductableContainer}</div>;
  }
}

ViewDeductableTable.propTypes = {
  levels: PropTypes.array.isRequired,
  deleteDeductable: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteDeductable }
)(ViewDeductableTable);
