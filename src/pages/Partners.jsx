import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import DataTable from '../components/common/DataTable';
import partnersAPI from '../api/partnerApi';

function Partners() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        const response = await partnersAPI.getAllPartners(token);

if (response && Array.isArray(response.partners)) {
const formattedPartners = response.partners.map((partner) => ({
  id: partner._id,
  shortId: partner._id.slice(-6).toUpperCase(),

  name: partner.ownerName || 'N/A',
  email: partner.email || 'N/A',
  phone: partner.phone || 'N/A',

  businessName: partner.companyName || 'N/A',
  businessType: partner.websiteName || 'N/A',

  city: partner.city || 'N/A',
  state: partner.state || 'N/A',

  gstNumber: partner.gstNumber || 'N/A',

  walletBalance: '₹0',
  totalProviders: partner.providers?.length || 0,
  totalRevenue: '₹0',

  status: partner.status || 'PENDING',
  statusClass: partner.status === 'ACTIVE' ? 'bg-success' : 'bg-warning',

  isVerified: partner.isEmailVerified ? 'Verified' : 'Unverified',
  verifiedClass: partner.isEmailVerified ? 'bg-success' : 'bg-danger',

  createdAt: new Date(partner.createdAt).toLocaleDateString(),
  updatedAt: partner.updatedAt
    ? new Date(partner.updatedAt).toLocaleDateString()
    : 'N/A',

  originalData: partner,
}))

          setPartners(formattedPartners);
          setError(null);
        } else {
          setError(response?.message || 'Failed to fetch partners');
        }
      } catch (err) {
        console.error('Error fetching partners:', err);
        setError(err.message || 'Error fetching partners');
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  const handleDeletePartner = async (partnerId, partnerName) => {
    const result = await Swal.fire({
      title: 'Delete Partner?',
      text: `Are you sure you want to delete ${partnerName}? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('token');
        await partnersAPI.deletePartner(partnerId, token);
        
        await Swal.fire({
          title: 'Deleted!',
          text: 'Partner has been deleted successfully.',
          icon: 'success',
          confirmButtonColor: '#0072FF',
        });

        // Remove the deleted partner from the list
        setPartners(partners.filter(partner => partner.id !== partnerId));
      } catch (error) {
        console.error('Error deleting partner:', error);
        await Swal.fire({
          title: 'Error!',
          text: 'Failed to delete partner. Please try again.',
          icon: 'error',
          confirmButtonColor: '#0072FF',
        });
      }
    }
  };

  const handleApprovePartner = async (partnerId, partnerName) => {
    const result = await Swal.fire({
      title: 'Approve Partner?',
      text: `Are you sure you want to approve ${partnerName}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, approve it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('token');
        await partnersAPI.approvePartner(partnerId, token);
        
        await Swal.fire({
          title: 'Approved!',
          text: 'Partner has been approved successfully.',
          icon: 'success',
          confirmButtonColor: '#0072FF',
        });

        // Update the partner status in the list
        const updatedPartners = partners.map(partner => {
          if (partner.id === partnerId) {
            return {
              ...partner,
              status: 'APPROVED',
              statusClass: 'bg-success',
            };
          }
          return partner;
        });
        setPartners(updatedPartners);
      } catch (error) {
        console.error('Error approving partner:', error);
        await Swal.fire({
          title: 'Error!',
          text: 'Failed to approve partner. Please try again.',
          icon: 'error',
          confirmButtonColor: '#0072FF',
        });
      }
    }
  };

  const handleTogglePartnerStatus = async (partnerId, partnerName, isActive) => {
    const action = isActive ? 'disable' : 'enable';
    const actionTitle = isActive ? 'Disable' : 'Enable';
    const actionText = isActive 
      ? `Are you sure you want to disable ${partnerName}?`
      : `Are you sure you want to enable ${partnerName}?`;
    const confirmButtonColor = isActive ? '#dc3545' : '#28a745';

    const result = await Swal.fire({
      title: `${actionTitle} Partner?`,
      text: actionText,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: confirmButtonColor,
      cancelButtonColor: '#6c757d',
      confirmButtonText: `Yes, ${action} it!`,
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('token');
        
        if (isActive) {
          await partnersAPI.disablePartner(partnerId, token);
        } else {
          await partnersAPI.enablePartner(partnerId, token);
        }
        
        await Swal.fire({
          title: `${actionTitle}ed!`,
          text: `Partner has been ${action}d successfully.`,
          icon: 'success',
          confirmButtonColor: '#0072FF',
        });

        // Update the partner status in the list
        const updatedPartners = partners.map(partner => {
          if (partner.id === partnerId) {
            return {
              ...partner,
              status: isActive ? 'INACTIVE' : 'ACTIVE',
              statusClass: isActive ? 'bg-danger' : 'bg-success',
            };
          }
          return partner;
        });
        setPartners(updatedPartners);
      } catch (error) {
        console.error(`Error ${action}ing partner:`, error);
        await Swal.fire({
          title: 'Error!',
          text: `Failed to ${action} partner. Please try again.`,
          icon: 'error',
          confirmButtonColor: '#0072FF',
        });
      }
    }
  };

  const columns = [
    { 
      header: '#', 
      accessor: 'shortId',
      render: (row) => row.shortId || 'N/A'
    },
    { header: 'Partner Name', accessor: 'name' },
    { header: 'Business Name', accessor: 'businessName' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Business Type', accessor: 'businessType' },
    { header: 'City', accessor: 'city' },
    { header: 'Wallet Balance', accessor: 'walletBalance' },
    { header: 'Providers', accessor: 'totalProviders' },
    { header: 'Revenue', accessor: 'totalRevenue' },
    { 
      header: 'Verification', 
      accessor: 'isVerified',
      render: (row) => <span className={`badge ${row.verifiedClass}`}>{row.isVerified}</span>
    },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (row) => <span className={`badge ${row.statusClass}`}>{row.status}</span>
    },
    {
      header: 'Action',
      accessor: 'action',
      render: (row) => {
        const isActive = row.status === 'ACTIVE' || row.status === 'APPROVED';
        return (
          <>
            {row.status === 'PENDING' && (
              <button 
                className="btn btn-sm btn-success me-1"
                onClick={() => handleApprovePartner(row.id, row.name)}
                title="Approve Partner"
              >
                <i className="fa fa-check"></i>
              </button>
            )}
            <button 
              className={`btn btn-sm me-1 ${isActive ? 'btn-danger' : 'btn-success'}`}
              onClick={() => handleTogglePartnerStatus(row.id, row.name, isActive)}
              title={isActive ? 'Disable Partner' : 'Enable Partner'}
            >
              <i className={`fa fa-${isActive ? 'power-off' : 'check-circle'}`}></i>
            </button>
            <button className="btn btn-sm btn-warning me-1">
              <i className="fa fa-edit"></i>
            </button>
            <button 
              className="btn btn-sm btn-danger"
              onClick={() => handleDeletePartner(row.id, row.name)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        );
      },
    },
  ];

  if (loading) {
    return (
      <div className="card mb-3">
        <div className="card-body text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card mb-3">
        <div className="card-body">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card mb-3">
      <div className="card-header d-flex justify-content-between align-items-center">
        <strong>Service Partner List</strong>
  
      </div>
      <DataTable columns={columns} data={partners} />
    </div>
  );
}

export default Partners;
