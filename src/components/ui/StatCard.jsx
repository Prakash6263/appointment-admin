import React from 'react';

function StatCard({ title, value, bgClass, icon }) {
  return (
    <div className={`stat-box ${bgClass}`}>
      <div>
        <h6 className="text-white">{title}</h6>
        <h3 className="text-white">{value}</h3>
      </div>
      <div className="icon-box">
        <i className={`bi ${icon} card-icon`}></i>
      </div>
    </div>
  );
}

export default StatCard;
