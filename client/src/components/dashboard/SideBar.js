import PropTypes from 'prop-types';
import { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions/authActions';

class SideBar extends Component {

    onHandleClick(e){
        e.preventDefault();

        this.props.logoutUser();
    }

render() {

    const { auth } = this.props;
   return (
    <div className="main-sidebar">
     <aside id="sidebar-wrapper">
        <div className="sidebar-brand">
            <Link to="/dashboard">PayrollKu</Link>
        </div>
        <div className="sidebar-brand sidebar-brand-sm">
            <Link to="/dashboard">Ku</Link>
        </div>
        <ul className="sidebar-menu">

            <li><Link to="/dashboard" className="nav-link" ><i className="fas fa-globe"></i> <span>Dashboard</span></Link></li>

            <li className="menu-header">Menu Pegawai</li>
            <li><Link to="/employee" className="nav-link"><i className="fas fa-briefcase"></i> <span>Entri Pegawai</span></Link></li>
            <li><Link to="/employee/all" className="nav-link"><i className="fas fa-archive"></i> <span>Data Pegawai</span></Link></li>

            <li className="menu-header">Menu Laporan</li>
            <li><Link to="/payroll/monthly" className="nav-link"><i className="fas fa-calendar-alt"></i> <span>Laporan Bulanan</span></Link></li>
            <li><Link to="/payroll/all" className="nav-link"><i className="fas fa-paperclip"></i> <span>Semua Laporan</span></Link></li>

            <li className="menu-header">Menu Utilitas</li>
            <li><Link to="/utilities/level" className="nav-link"><i className="fas fa-location-arrow"></i> <span>Jabatan Pegawai</span></Link></li>
            {auth.user.is_admin === 0 ? null : (<li><Link to="/utilities/exception" className="nav-link"><i className="fas fa-sign"></i> <span>Pengecualian</span></Link></li>) }

            <li className="menu-header">Menu Tambahan</li> 
            <li><Link to="" className="nav-link" onClick={this.onHandleClick.bind(this)}><i className="fas fa-sign-out-alt"></i> <span>Keluar</span></Link></li>

        </ul>
     </aside>
     <div className="p-3 mt-4 mb-4 hide-sidebar-mini">
        <Link to="/documentation" className="btn btn-primary btn-lg btn-icon-split btn-block">
              <i className="fas fa-info-circle"></i> <div>Dokumentasi</div>
        </Link>
    </div>
    </div>
  )
}
}

SideBar.propTypes = {
    logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logoutUser})(SideBar);
