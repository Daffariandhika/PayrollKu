import React from "react";

const ExceptionTab = () => {
  return (
    <div className="col-12 col-sm-12 col-md-2">
      <ul className="nav nav-pills flex-column" id="myTab4" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            id="addexception-tab4"
            data-toggle="tab"
            href="#addexception"
            role="tab"
            aria-controls="addexception"
            aria-selected="true"
          >
            Pengecualian Gaji Pokok
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="viewexception-tab4"
            data-toggle="tab"
            href="#viewexception"
            role="tab"
            aria-controls="viewexception"
            aria-selected="false"
          >
            Lihat Pengecualian
          </a>
        </li>
        <div className="dropdown-divider" />
        <li className="nav-item">
          <a
            className="nav-link"
            id="addindividual-tab4"
            data-toggle="tab"
            href="#addindividual"
            role="tab"
            aria-controls="addindividual"
            aria-selected="false"
          >
            Pengecualian Lain
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="viewindividual-tab4"
            data-toggle="tab"
            href="#viewindividual"
            role="tab"
            aria-controls="viewindividual"
            aria-selected="false"
          >
            Lihat Pengecualian
          </a>
        </li>
        <div className="dropdown-divider" />
        <li className="nav-item">
          <a
            className="nav-link"
            id="addoneoff-tab4"
            data-toggle="tab"
            href="#addoneoff"
            role="tab"
            aria-controls="addoneoff"
            aria-selected="false"
          >
            Tambahkan One Off
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="viewoneoff-tab4"
            data-toggle="tab"
            href="#viewoneoff"
            role="tab"
            aria-controls="viewoneoff"
            aria-selected="false"
          >
            Lihat One Off
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ExceptionTab;
