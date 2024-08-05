// components/ConfirmationModal.js
import React from 'react';
import PropTypes from 'prop-types';

const ConfirmationModal = ({ show, handleClose, handleDelete, title, description }) => {
  return (
    <div className={`modal like-modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content wrapper modal-small">
          <div className="modal-header text">
            <h5 className="modal-title text-dark" id="exampleModalLabel">Confirm Delete</h5>
            {/* <h5 className="title">Confirm Delete</h5> */}

            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <p className='text-danger'>Are you sure you want to delete the following {title}?</p>
            {/* <p><strong>Title:</strong> {title}</p>
            <p><strong>Description:</strong> {description}</p> */}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-lg btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Cancel</button>
            <button type="button" className="btn btn-lg btn-danger" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

ConfirmationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ConfirmationModal;
