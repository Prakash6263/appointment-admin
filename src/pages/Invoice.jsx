import React from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../components/common/DataTable';

function Invoice() {
  const memberships = [
    { id: 1, name: 'Basic Plan', price: '₹499', duration: '1 Month', benefits: '5 Appointments', status: 'Active', statusClass: 'bg-success' },
    { id: 2, name: 'Standard Plan', price: '₹1,299', duration: '3 Months', benefits: '20 Appointments', status: 'Active', statusClass: 'bg-success' },
    { id: 3, name: 'Premium Plan', price: '₹2,499', duration: '6 Months', benefits: 'Unlimited Appointments', status: 'Active', statusClass: 'bg-success' },
    { id: 4, name: 'Gold Partner', price: '₹3,999', duration: '1 Year', benefits: 'Priority Leads', status: 'Inactive', statusClass: 'bg-warning' },
    { id: 5, name: 'Silver Partner', price: '₹2,499', duration: '1 Year', benefits: 'Standard Leads', status: 'Active', statusClass: 'bg-success' },
    { id: 6, name: 'Trial Plan', price: '₹199', duration: '15 Days', benefits: '2 Appointments', status: 'Expired', statusClass: 'bg-danger' },
  ];

  const columns = [
    { header: '#', accessor: 'id' },
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
      render: () => (
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

  return (
    <div className="card mb-3">
      <div className="card-header d-flex justify-content-between align-items-center">
        <strong>Membership List</strong>
        <div>
          <Link to="/add-membership" className="btn btn-primary">
            <i className="fa fa-plus"></i> Add New
          </Link>
        </div>
      </div>
      <DataTable columns={columns} data={memberships} />
    </div>
  );
}

export default Invoice;
