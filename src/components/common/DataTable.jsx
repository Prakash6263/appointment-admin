'use client';

import React, { useState, useMemo } from 'react';

function DataTable({ columns, data }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter((row) =>
      columns.some((col) => {
        const value = row[col.accessor];
        if (value === undefined || value === null) return false;
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [data, columns, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + perPage);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div>
      <div className="dataTable-top p-3">
        <div className="dataTable-dropdown">
          <select className="form-select form-select-sm" value={perPage} onChange={handlePerPageChange}>
            <option value={5}>5 entries per page</option>
            <option value={10}>10 entries per page</option>
            <option value={25}>25 entries per page</option>
            <option value={50}>50 entries per page</option>
          </select>
        </div>
        <div className="dataTable-search">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="table-responsive" style={{ overflowX: 'auto', maxWidth: '100%' }}>
        <table className="table table-hover align-middle datatable" style={{ minWidth: '1200px' }}>
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index} style={{ whiteSpace: 'nowrap', minWidth: col.width || '120px' }}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} style={{ whiteSpace: 'nowrap' }}>
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="dataTable-bottom p-3 d-flex justify-content-between align-items-center">
        <div className="dataTable-info">
          Showing {filteredData.length > 0 ? startIndex + 1 : 0} to{' '}
          {Math.min(startIndex + perPage, filteredData.length)} of {filteredData.length} entries
        </div>
        <div className="dataTable-pagination">
          <button
            className="btn btn-sm btn-outline-secondary me-1"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`btn btn-sm ${page === currentPage ? 'btn-primary' : 'btn-outline-secondary'} me-1`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default DataTable;
