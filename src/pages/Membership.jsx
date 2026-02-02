'use client';

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import DataTable from '../components/common/DataTable';
import Loader from '../components/ui/Loader';
import { useAuth } from '../context/AuthContext';
import { plans } from '../api/plansApi';

function Membership() {
  const { token } = useAuth();
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      try {
        const data = await plans.getAllPlans(token);
        
        if (data.success) {
          const formattedPlans = data.data.map((plan, index) => ({
            id: plan._id,
            name: plan.name,
            price: `₹${plan.price}`,
            duration: plan.billingCycle,
            benefits: `${plan.customerLimit} customers`,
            status: plan.isActive ? 'Active' : 'Inactive',
            statusClass: plan.isActive ? 'bg-success' : 'bg-warning',
            originalData: plan,
          }));
          setMemberships(formattedPlans);
        } else {
          await Swal.fire({
            icon: 'error',
            title: 'Failed to Load Plans',
            text: data.message || 'Unable to fetch membership plans',
            confirmButtonColor: '#0072FF',
          });
        }
      } catch (error) {
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Network error. Please try again.',
          confirmButtonColor: '#0072FF',
        });
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchPlans();
    }
  }, [token]);

  const columns = [
    { 
      header: '#', 
      accessor: 'id',
      render: (row, index) => index + 1
    },
    { header: 'Plan Name', accessor: 'name' },
    { header: 'Price', accessor: 'price' },
    { header: 'Duration', accessor: 'duration' },
    { header: 'Benefits', accessor: 'benefits' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (row) => <span className={`badge ${row.statusClass}`}>{row.status}</span>
    },
    {
      header: 'Action',
      accessor: 'action',
      render: (row) => (
        <>
          <button className="btn btn-sm btn-warning me-1">
            <i className="fa fa-edit"></i>
          </button>
          <button className="btn btn-sm btn-danger">
            <i className="fa fa-trash"></i>
          </button>
        </>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <Loader message="Loading membership plans..." />
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="card shadow-lg border-0 rounded-lg">
            <div className="card-header bg-white border-bottom d-flex justify-content-between align-items-center py-3">
              <h4 className="mb-0 text-primary">
                <i className="fas fa-crown me-2"></i>
                Membership Plans
              </h4>
              <Link 
                to="/add-membership" 
                className="btn btn-primary btn-sm d-flex align-items-center"
              >
                <i className="fa fa-plus me-2"></i> Add New Plan
              </Link>
            </div>
            <div className="card-body p-0">
              {memberships.length > 0 ? (
                <DataTable 
                  columns={columns} 
                  data={memberships} 
                  searchable={true}
                  pagination={true}
                  itemsPerPage={10}
                />
              ) : (
                <div className="text-center py-5">
                  <div className="mb-3">
                    <i className="fas fa-crown fa-3x text-muted"></i>
                  </div>
                  <h5 className="text-muted">No Membership Plans Found</h5>
                  <p className="text-muted mb-4">Get started by creating your first membership plan</p>
                  <Link 
                    to="/add-membership" 
                    className="btn btn-primary"
                  >
                    <i className="fa fa-plus me-2"></i> Create First Plan
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Membership;