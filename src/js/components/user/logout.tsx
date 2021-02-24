import Button from '@salesforce/design-system-react/components/button';
import i18n from 'i18next';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { logout } from '~js/store/user/actions';

const Logout = (props: any) => {
  const dispatch = useDispatch();
  const doLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
  return (
    <Button
      label={i18n.t('Log Out')}
      variant="link"
      onClick={doLogout}
      {...props}
    />
  );
};

export default Logout;
