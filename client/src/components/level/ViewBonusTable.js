import PropTypes from "prop-types";
import { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { deleteBonus } from "../../actions/levelActions";
import { formatMoney } from "../common/Utilities";

class ViewBonusTable extends Component {
  onDelete(levelId, bonusId) {
    confirmAlert({
      title: "Delete this bonus ?",
      message: "Are you sure to do this",
      buttons: [
        {
          label: "Yes delete bonus!",
          onClick: () => {
            this.props
              .deleteBonus(levelId, bonusId)
              .then(res => {
                if (res.type === "VIEW_LEVELS") {
                  toast.success("Bonus Deleted!");
                }
              })
              .catch(err => console.log(err));
          }
        },
        {
          label: "No cancel delete!",
          onClick: () => {}
        }
      ]
    });
  }

  render() {
    const { levels } = this.props;

    const bonusTableContainer = levels.map(level => (
      <div
        key={level._id}
        className="col-md-4 mx-auto card card-primary mt-2 bg-light"
      >
        <p className="mt-3">
          <strong>Level Name</strong> : {level.name}
        </p>
        <p className="mt-2">
          <strong>Level Salary</strong> : {" "}
          {formatMoney(level.basic)}
        </p>
        {level.bonuses.length > 0 ? (
          <div>
            <h5 className="text-center">Bonus</h5>
            {level.bonuses.map(bonus => (
              <div key={bonus._id} className="text-center mb-3">
                <p>Bonus name: {bonus.name}</p>
                <p>
                  Amount:  {formatMoney(bonus.amount)}
                </p>
                <div>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={this.onDelete.bind(this, level._id, bonus._id)}
                  >
                    Delete
                  </button>
                </div>
                <hr />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    ));

    return <div className="row">{bonusTableContainer}</div>;
  }
}

ViewBonusTable.propTypes = {
  levels: PropTypes.array.isRequired,
  deleteBonus: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteBonus }
)(ViewBonusTable);
