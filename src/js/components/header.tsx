import PageHeader from '@salesforce/design-system-react/components/page-header';
import PageHeaderControl from '@salesforce/design-system-react/components/page-header/control';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';

import Errors from '~js/components/apiErrors';
import OfflineAlert from '~js/components/offlineAlert';
import Toasts from '~js/components/toasts';
import UserInfo from '~js/components/user/info';
import { selectSocketState } from '~js/store/socket/selectors';
import { selectUserState } from '~js/store/user/selectors';
import routes from '~js/utils/routes';

const Header = () => {
  const location = useLocation();
  const user = useSelector(selectUserState);
  const socket = useSelector(selectSocketState);

  const controls = () => (
    <PageHeaderControl className="slds-grid slds-grid_vertical-align-center">
      <ul className="slds-list_horizontal header-nav">
        <li>
          <NavLink
            to={routes.dashboard()}
            activeClassName="slds-text-link"
            className="slds-m-right_x-large slds-text-link_reset"
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to={routes.repository_list()}
            activeClassName="slds-text-link"
            className="slds-m-right_x-large slds-text-link_reset"
          >
            Repositories
          </NavLink>
        </li>
      </ul>
      <UserInfo />
    </PageHeaderControl>
  );
  return user ? (
    <>
      {socket ? null : <OfflineAlert />}
      <Errors />
      <Toasts />
      <PageHeader
        className="global-header
          slds-p-horizontal_x-large
          slds-p-vertical_medium"
        title={
          <Link
            to={routes.home()}
            className="slds-text-heading_large slds-text-link_reset"
          >
            <span data-logo-bit="start">met</span>
            <span data-logo-bit="end">échō</span>
          </Link>
        }
        onRenderControls={controls}
      />
    </>
  ) : null;
};

export default Header;
