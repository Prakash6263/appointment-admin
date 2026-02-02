import React from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../components/common/DataTable';

function Partners() {
  const partners = [
    { id: 1, name: 'AC Service Pro', type: 'AC Repair', membership: 'Premium', membershipClass: 'bg-warning', providers: 8, phone: '9876543210', revenue: '₹1,25,000', status: 'Active', statusClass: 'bg-success' },
    { id: 2, name: 'Quick Plumbing', type: 'Plumbing', membership: 'Standard', membershipClass: 'bg-primary', providers: 6, phone: '9123456780', revenue: '₹92,000', status: 'Active', statusClass: 'bg-success' },
    { id: 3, name: 'Home Electric', type: 'Electrical', membership: 'Basic', membershipClass: 'bg-secondary', providers: 5, phone: '9988776655', revenue: '₹65,500', status: 'Inactive', statusClass: 'bg-warning' },
    { id: 4, name: 'Clean Master', type: 'Cleaning', membership: 'Standard', membershipClass: 'bg-primary', providers: 7, phone: '9090909090', revenue: '₹78,300', status: 'Active', statusClass: 'bg-success' },
    { id: 5, name: 'Pest Control Hub', type: 'Pest Control', membership: 'Premium', membershipClass: 'bg-warning', providers: 9, phone: '8888777766', revenue: '₹1,10,400', status: 'Active', statusClass: 'bg-success' },
    { id: 6, name: 'Appliance Fixer', type: 'Appliance Repair', membership: 'Basic', membershipClass: 'bg-secondary', providers: 4, phone: '7777666655', revenue: '₹48,900', status: 'Suspended', statusClass: 'bg-danger' },
    { id: 7, name: 'Urban Technician', type: 'Multi Service', membership: 'Premium', membershipClass: 'bg-warning', providers: 3, phone: '9999888877', revenue: '₹55,000', status: 'Active', statusClass: 'bg-success' },
  ];

  const columns = [
    { header: '#', accessor: 'id' },
    { header: 'Partner Name', accessor: 'name' },
    { header: 'Service Type', accessor: 'type' },
    { 
      header: 'Membership', 
      accessor: 'membership',
      render: (row) => <span className={`badge ${row.membershipClass}`}>{row.membership}</span>
    },
    { header: 'Total Providers', accessor: 'providers' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Total Revenue', accessor: 'revenue' },
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
        <strong>Service Partner List</strong>
        <div>
          <Link to="/add-partner" className="btn btn-primary">
            <i className="fa fa-plus"></i> Add New Partner
          </Link>
        </div>
      </div>
      <DataTable columns={columns} data={partners} />
    </div>
  );
}

export default Partners;
