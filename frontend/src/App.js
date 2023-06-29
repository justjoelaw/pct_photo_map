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
import AdminRequired from './features/auth/AdminRequired';
import Register from './features/auth/Register';

const App = () => {
  return (
    <div className='columns-1'>
      <Navbar />
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>
            <Route exact path='/' element={<Landing />} />

            <Route path='home'>
              <Route index element={<HomePage />} />
            </Route>

            <Route path='users'>
              <Route element={<AdminRequired />}>
                <Route index element={<UsersPage />} />
              </Route>
              <Route path='new' element={<NewUserForm />} />
              <Route path=':id/edit' element={<EditUser />} />
            </Route>

            <Route path='journalEntrys'>
              <Route element={<AdminRequired />}>
                <Route index element={<JournalEntrysPage />} />
              </Route>
              <Route path='new' element={<NewJournalEntry />} />
              <Route path=':id/edit' element={<EditJournalEntry />} />
            </Route>

            <Route path='trails'>
              <Route element={<AdminRequired />}>
                <Route index element={<TrailsPage />} />
                <Route path='new' element={<NewTrailForm />} />
                <Route path=':id/edit' element={<EditTrail />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
