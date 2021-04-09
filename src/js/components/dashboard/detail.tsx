import UserInfo from '~js/components/user/info';
import React from 'react';

const Dashboard = () =>
  <div className="slds-brand-band
    slds-brand-band_medium
    slds-brand-band_user
    dashboard-header"
  >
    {/* TODO slds-brand-band_user 404 bg image from Salesforce UX package */}
    {/* TODO - make this larger and not a button */}
    <UserInfo />
  </div>
;

export default Dashboard;
