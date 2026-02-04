'use client';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';
import { plans } from '../api/plansApi';

function AddMembership() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    billingCycle: 'MONTHLY',
    customerLimit: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        billingCycle: formData.billingCycle,
        customerLimit: Number(formData.customerLimit),
      };

      const data = await plans.createPlan(payload, token);

      if (data.success) {
        await Swal.fire({
          icon: 'success',
          title: 'Plan Created',
          text: data.message || 'Membership plan created successfully',
          confirmButtonColor: '#0072FF',
          timer: 1500,
          timerProgressBar: true,
        });
        navigate('/membership');
      } else {
        const errorMessage = data.message || 'Failed to create plan';
        setError(errorMessage);
        await Swal.fire({
          icon: 'error',
          title: 'Failed to Create Plan',
          text: errorMessage,
          confirmButtonColor: '#0072FF',
        });
      }
    } catch (err) {
      const errorMessage = 'Network error. Please try again.';
      setError(errorMessage);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
        confirmButtonColor: '#0072FF',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-header d-flex justify-content-between align-items-center">
        <strong>Add New Membership Plan</strong>
        <div>
          <Link to="/membership" className="btn btn-primary">
            <i className="fa fa-eye"></i> View All
          </Link>
        </div>
      </div>

      <div className="card-body">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Plan Name</label>
              <select
                name="name"
                className="form-select"
                value={formData.name}
                onChange={handleChange}
                required
              >
                <option value="">Select a plan</option>
                <option value="Free">Free</option>
                <option value="Starter">Starter</option>
                <option value="Pro">Pro</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                name="price"
                className="form-control"
                placeholder="Enter price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Billing Cycle</label>
              <select
                name="billingCycle"
                className="form-select"
                value={formData.billingCycle}
                onChange={handleChange}
              >
                <option value="MONTHLY">Monthly</option>
                <option value="QUARTERLY">Quarterly</option>
                <option value="YEARLY">Yearly</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Customer Limit</label>
              <input
                type="number"
                name="customerLimit"
                className="form-control"
                placeholder="Enter customer limit"
                value={formData.customerLimit}
                onChange={handleChange}
                min="1"
                required
              />
            </div>

            <div className="col-md-12 mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-control"
                rows="3"
                placeholder="Enter plan description"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>

          <div className="mt-3">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Saving...
                </>
              ) : (
                <>
                  <i className="fa fa-save"></i> Save Membership
                </>
              )}
            </button>
            <Link to="/membership" className="btn btn-secondary ms-2">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMembership;
