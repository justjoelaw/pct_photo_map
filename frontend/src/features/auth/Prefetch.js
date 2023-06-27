import { store } from '../../app/store';
import { usersApiSlice } from '../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { journalEntrysApiSlice } from '../journalEntrys/journalEntrysApiSlice';
import { trailsApiSlice } from '../trails/trailsApiSlice';

const Prefetch = () => {
  useEffect(() => {
    console.log('subscribing');
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
    const journalEntrys = store.dispatch(journalEntrysApiSlice.endpoints.getJournalEntrys.initiate());
    const trails = store.dispatch(trailsApiSlice.endpoints.getTrails.initiate());
    return () => {
      console.log('unsubscribing');
      users.unsubscribe();
      journalEntrys.unsubscribe();
    };
  }, []);

  return <Outlet />;
};
export default Prefetch;
