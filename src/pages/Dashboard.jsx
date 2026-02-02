'use client';

import React, { useEffect, useRef } from 'react';
import StatCard from '../components/ui/StatCard';

function Dashboard() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    let isMounted = true;
    
    const initChart = async () => {
      if (!chartRef.current || !isMounted) return;
      
      // Wait for Chart.js to be available
      const checkChart = () => {
        if (typeof window.Chart !== 'undefined') {
          if (chartInstance.current) {
            chartInstance.current.destroy();
          }
          
          const ctx = chartRef.current;

          chartInstance.current = new window.Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              datasets: [
                {
                  label: 'Confirmed',
                  data: [120, 135, 150, 140, 160, 170, 180, 175, 165, 190, 200, 210],
                },
                {
                  label: 'Completed',
                  data: [100, 120, 130, 125, 145, 150, 160, 155, 148, 170, 180, 195],
                },
                {
                  label: 'Cancelled',
                  data: [20, 15, 18, 22, 15, 20, 18, 20, 17, 20, 22, 15],
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
              scales: {
                x: {
                  stacked: false,
                },
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 50,
                  },
                },
              },
            },
          });
        } else {
          setTimeout(checkChart, 100);
        }
      };
      
      checkChart();
    };

    initChart();

    return () => {
      isMounted = false;
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  const stats = [
    { title: 'Total Partners', value: '120', bgClass: 'bg-primary', icon: 'bi-people' },
    { title: 'Appointments', value: '345', bgClass: 'bg-success', icon: 'bi-calendar-check' },
    { title: 'Revenue', value: '$23000', bgClass: 'bg-warning', icon: 'bi-currency-dollar' },
    { title: 'Active Membership', value: '78', bgClass: 'bg-danger', icon: 'bi-award' },
  ];

  const recentAppointments = [
    { id: 1, customer: 'Rahul Sharma', partner: 'AC Service Pro', date: '22 Jan 2026', status: 'Completed' },
  ];

  return (
    <>
      <section id="dashboard" className="mb-4">
        <div className="row g-4">
          {stats.map((stat, index) => (
            <div className="col-md-3" key={index}>
              <StatCard
                title={stat.title}
                value={stat.value}
                bgClass={stat.bgClass}
                icon={stat.icon}
              />
            </div>
          ))}
        </div>
      </section>

      <section id="analytics" className="mb-4">
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card shadow-sm">
              <div className="card-body">
                <h6>Monthly Appointments</h6>
                <div className="chart-container">
                  <canvas ref={chartRef} id="monthlyAppointmentChart"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow-sm mt-4">
          <div className="card-body">
            <h6>Recent Appointments</h6>
            <table className="table table-bordered mt-3">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Customer</th>
                  <th>Partner</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.id}</td>
                    <td>{appointment.customer}</td>
                    <td>{appointment.partner}</td>
                    <td>{appointment.date}</td>
                    <td>
                      <span className="badge bg-success">{appointment.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
