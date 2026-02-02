import React from 'react';
import DataTable from '../components/common/DataTable';

function Payments() {
  const payments = [
    { invoice: '#INV-101', customer: 'Rahul Sharma', amount: '₹1,200', method: 'UPI', status: 'Paid', statusClass: 'bg-success' },
    { invoice: '#INV-102', customer: 'Amit Kumar', amount: '₹850', method: 'Cash', status: 'Paid', statusClass: 'bg-success' },
    { invoice: '#INV-103', customer: 'Pooja Verma', amount: '₹1,500', method: 'Card', status: 'Pending', statusClass: 'bg-warning' },
    { invoice: '#INV-104', customer: 'Suresh Patel', amount: '₹650', method: 'UPI', status: 'Failed', statusClass: 'bg-danger' },
    { invoice: '#INV-105', customer: 'Neha Singh', amount: '₹2,000', method: 'Net Banking', status: 'Paid', statusClass: 'bg-success' },
    { invoice: '#INV-106', customer: 'Rohit Mehta', amount: '₹1,100', method: 'Card', status: 'Paid', statusClass: 'bg-success' },
    { invoice: '#INV-107', customer: 'Anjali Gupta', amount: '₹900', method: 'UPI', status: 'Pending', statusClass: 'bg-warning' },
  ];

  const columns = [
    { header: 'Invoice No', accessor: 'invoice' },
    { header: 'Customer', accessor: 'customer' },
    { header: 'Amount', accessor: 'amount' },
    { header: 'Method', accessor: 'method' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (row) => <span className={`badge ${row.statusClass}`}>{row.status}</span>
    },
  ];

  return (
    <div className="card mb-3">
      <div className="card-header d-flex justify-content-between align-items-center">
        <strong>Payments</strong>
      </div>
      <DataTable columns={columns} data={payments} />
    </div>
  );
}

export default Payments;
