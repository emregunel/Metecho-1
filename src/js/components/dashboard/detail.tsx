import React from 'react';

import UserInfo from '@/js/components/user/info';

const Dashboard = () => (
  <div className="dashboard-view">
    <div
      className="slds-brand-band
        slds-brand-band_medium
        slds-brand-band_user
        dashboard-header"
    ></div>
    {/* TODO slds-brand-band_user 404 bg image from Salesforce UX package */}
    <div className="slds-grid dashboard-profile slds-p-around_large slds-m-horizontal_xx-large">
      {/* TODO - make this larger and not a button */}
      <UserInfo />
      <div className="slds-grid dashboard-stats">
        {/* TODO fake data for now */}
        <div className="slds-grid dashboard-stat-item">
          svg
          <span className="dashboard-stat-highlight">5</span>
          <span className="dashboard-stat-label">Completed Epics</span>
        </div>
        <div className="slds-grid dashboard-stat-item">
          svg
          <span className="dashboard-stat-highlight">12</span>
          <span className="dashboard-stat-label">Completed Tasks</span>
        </div>
        <div className="slds-grid dashboard-stat-item">
          svg
          <span className="dashboard-stat-highlight">20</span>
          <span className="dashboard-stat-label">Epic Collaborations</span>
        </div>
      </div>
    </div>
  </div>
);
export default Dashboard;
