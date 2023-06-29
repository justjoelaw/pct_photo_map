import React from 'react';

// We use Route in order to define the different routes of our application
import { Route, Routes } from 'react-router-dom';

// We import all the components we need in our app
import Navbar from './components/navbar';
import Landing from './features/auth/Landing';

import Prefetch from './features/auth/Prefetch';

import NewUserForm from './features/users/NewUserForm';
import UsersPage from './features/users/UsersPage';
import EditUser from './features/users/EditUser';

import JournalEntrysPage from './features/journalEntrys/JournalEntrysPage';
import EditJournalEntry from './features/journalEntrys/EditJournalEntry';
import NewJournalEntry from './features/journalEntrys/NewJournalEntry';

import TrailsPage from './features/trails/TrailsPage';
import NewTrailForm from './features/trails/NewTrailForm';
import EditTrail from './features/trails/EditTrail';

import Login from './features/auth/Login';
import PersistLogin from './features/auth/persistLogin';
import HomePage from './features/home/HomePage';

const App = () => {
  return (
    <div className='columns-1'>
      <Navbar />
      <Routes>
        <Route path='login' element={<Login />} />
        <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>
            <Route exact path='/' element={<Landing />} />

            <Route path='/home' element={<HomePage />} />

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

            <Route path='trails'>
              <Route index element={<TrailsPage />} />
              <Route path='new' element={<NewTrailForm />} />
              <Route path=':id/edit' element={<EditTrail />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
