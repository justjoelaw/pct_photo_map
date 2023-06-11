import React from 'react';

// We use Route in order to define the different routes of our application
import { Route, Routes } from 'react-router-dom';

// We import all the components we need in our app
import Navbar from './components/navbar';
import Landing from './features/auth/Landing';
import UsersList from './features/users/UsersList';
import NewUserForm from './features/users/NewUserForm';
import UsersPage from './features/users/UsersPage';
import EditUser from './features/users/EditUser';
import Prefetch from './features/auth/Prefetch';
import JournalEntrysPage from './features/journalEntrys/JournalEntrysPage';
import EditJournalEntry from './features/journalEntrys/EditJournalEntry';
import NewJournalEntryForm from './features/journalEntrys/NewJournalEntryForm';
import NewJournalEntry from './features/journalEntrys/NewJournalEntry';

const App = () => {
  return (
    <div className='columns-1'>
      <Navbar />
      <Routes>
        <Route element={<Prefetch />}>
          <Route exact path='/' element={<Landing />} />

          <Route path='users'>
            <Route index element={<UsersPage />} />
            <Route path='new' element={<NewUserForm />} />
            <Route path=':id/edit' element={<EditUser />} />
          </Route>

          <Route path='journalEntrys'>
            <Route index element={<JournalEntrysPage />} />
            <Route path='new' element={<NewJournalEntry />} />
            <Route path=':id/edit' element={<EditJournalEntry />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
