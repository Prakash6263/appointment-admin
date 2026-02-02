'use client';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AddPartner() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    serviceType: 'AC Repair',
    membership: 'Basic',
    providers: '',
    phone: '',
    email: '',
    status: 'Active',
    revenue: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    navigate('/partners');
  };

  return (
    <div className="card mb-3">
      <div className="card-header d-flex justify-content-between align-items-center">
        <strong>Add New Partner</strong>
        <div>
          <Link to="/partners" className="btn btn-primary">
            <i className="fa fa-eye"></i> View All
          </Link>
        </div>
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Partner Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter partner name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Service Type</label>
              <select
                name="serviceType"
                className="form-select"
                value={formData.serviceType}
                onChange={handleChange}
              >
                <option>AC Repair</option>
                <option>Plumbing</option>
                <option>Electrical</option>
                <option>Cleaning</option>
                <option>Pest Control</option>
                <option>Appliance Repair</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Membership Plan</label>
              <select
                name="membership"
                className="form-select"
                value={formData.membership}
                onChange={handleChange}
              >
                <option>Basic</option>
                <option>Standard</option>
                <option>Premium</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Total Providers</label>
              <input
                type="number"
                name="providers"
                className="form-control"
                placeholder="Number of service providers"
                value={formData.providers}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                placeholder="Contact number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Status</label>
              <select
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleChange}
              >
                <option>Active</option>
                <option>Inactive</option>
                <option>Suspended</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Total Revenue (₹)</label>
              <input
                type="number"
                name="revenue"
                className="form-control"
                placeholder="Total earned amount"
                value={formData.revenue}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-12 mb-3">
              <label className="form-label">Address</label>
              <textarea
                name="address"
                className="form-control"
                rows="3"
                placeholder="Partner address"
                value={formData.address}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div className="mt-3">
            <button type="submit" className="btn btn-primary">
              <i className="fa fa-save"></i> Save Partner
            </button>
            <Link to="/partners" className="btn btn-secondary ms-2">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPartner;
