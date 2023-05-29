import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage';
import Login from './pages/Login'
import Register from './pages/Register'
import { useSelector } from 'react-redux'
import Spinner from './components/Spinner'
import { ProtectedRoute } from './components/ProtectedRoute';
import { PublicRoute } from './components/PublicRoute';
import ApplyDoctor from './pages/ApplyDoctor';
import Notification from './pages/Notification';
import Doctors from './pages/admin/Doctors';
import Users from './pages/admin/Users';
import Profile from './pages/doctor/Profile';
import Bookingpage from './pages/Bookingpage';
import Appointment from './pages/Appointment';








function App() {
  const { loading } = useSelector(state => state.alerts)
  return (
    <>
      <BrowserRouter>
        {loading ? <Spinner /> : (
          <Routes>
            <Route path='/'
              element={
                <ProtectedRoute>
                  <Homepage />
                </ProtectedRoute>}
            />
            <Route path='/appointments'
              element={
                <ProtectedRoute>
                  <Appointment />
                </ProtectedRoute>}
            />
            <Route path='/apply-doctor'
              element={
                <ProtectedRoute>
                  <ApplyDoctor />
                </ProtectedRoute>}
            />
            <Route path='/notification'
              element={
                <ProtectedRoute>
                  <Notification />
                </ProtectedRoute>}
            />
            <Route path='/admin/doctors'
              element={
                <ProtectedRoute>
                  <Doctors />
                </ProtectedRoute>}
            />
            <Route path='/admin/users'
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>}
            />
            <Route path='/doctor/profile/:id'
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>}
            />
            <Route path='/doctor/book-appointment/:doctorId'
              element={
                <ProtectedRoute>
                  <Bookingpage />
                </ProtectedRoute>}
            />
            <Route path='/login' element={
              <PublicRoute>
                <Login />
              </PublicRoute>

            } />
            <Route path='/register' element={
              <PublicRoute>
                <Register />
              </PublicRoute>

            } />

          </Routes>
        )}

      </BrowserRouter>
    </>
  );
}

export default App;
