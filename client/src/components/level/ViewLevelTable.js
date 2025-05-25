import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatMoney } from '../common/Utilities';
// import PropTypes from "prop-types";
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { deleteLevel } from '../../actions/levelActions';
import Pagination from '../common/Pagination';
import SelectListGroup from '../common/SelectListGroup';

class ViewLevelTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      levelPerPage: '5',
    };

    this.onChange = this.onChange.bind(this);
  }

  paginate(pageNumber) {
    this.setState({
      currentPage: pageNumber,
    });
  }

  deleteDialog(id) {
    confirmAlert({
      title: 'Hapus Jabatan Ini ?',
      message: 'Apakah Sudah Yakin Untuk Menghapus',
      buttons: [
        {
          label: 'Ya, Hapus Jabatan!',
          onClick: () => {
            this.props
              .deleteLevel(id)
              .then((res) => {
                if (res.type === 'DELETE_LEVEL') {
                  toast.success('Jabatan Berhasil dihapus!');
                } else {
                  if (res.type === 'GET_ERRORS')
                    toast.error(`${res.payload.message}`);
                }
              })
              .catch((err) => console.log(err));
          },
        },
        {
          label: 'Tidak, Kembali!',
          onClick: () => {},
        },
      ],
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { levels } = this.props;
    const { currentPage, levelPerPage } = this.state;

    const indexOfLastLevel = currentPage * levelPerPage;
    const indexOfFirstLevel = indexOfLastLevel - levelPerPage;
    const currentLevel = levels.slice(
      indexOfFirstLevel,
      indexOfLastLevel
    );
    let paginateVisibility = parseInt(levelPerPage);

    let recordGroup = [
      { _id: '5', name: '5' },
      { name: '10', _id: '10' },
      { name: '20', _id: '20' },
      { name: '30', _id: '30' },
    ];

    const levelTableContainer = currentLevel.map((level) => (
      <tr key={level._id}>
        <td>{level.name}</td>
        <td>
           {formatMoney(level.basic)}
        </td>
        <td>{level.description}</td>
        <td>
          <Link
            to={`/utilities/level/editlevel/${level._id}`}
            className="btn btn-primary btn-sm"
          >
            Edit
          </Link>{' '}
          <button
            className="btn btn-danger btn-sm"
            onClick={this.deleteDialog.bind(this, level._id)}
          >
            Hapus
          </button>
        </td>
      </tr>
    ));

    return (
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card-header">
            <h4 className="justify-content-center">
              Preview Semua Jabatan
            </h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-3">
                <SelectListGroup
                  label="Record per page"
                  placeholder="Pilih record per page"
                  name="levelPerPage"
                  value={this.state.levelPerPage}
                  onChange={this.onChange}
                  options={recordGroup}
                />
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-stripped" id="table-1">
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Gaji Pokok</th>
                    <th>Deskripsi</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>{levelTableContainer}</tbody>
              </table>
            </div>
            {levels.length < paginateVisibility ? (
              ''
            ) : (
              <Pagination
                employeePerPage={levelPerPage}
                totalEmployees={levels.length}
                paginate={this.paginate.bind(this)}
                currentPage={currentPage}
                currentLevel={currentLevel}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

// ViewLevelTable.proptypes = {
//   levels: PropTypes.array.isRequired,
//   deleteLevel: PropTypes.func.isRequired
// };

export default connect(null, { deleteLevel })(ViewLevelTable);
