import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import Register from './components/Register';
import Start from './components/Start';
import HomePage from './components/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import Explore from './components/Explore';
import BookTrip from './components/BookTrip';
import AboutUs from './components/AboutUs';
import Faq from './components/Faq';
import TripsCrud from './components/TripsCrud';
import AddTrip from "./components/AddTrip";
import UpdateTrip from "./components/UpdateTrip"
import Videos from './components/Videos';
import AdminDashboard from './components/AdminDashboard';
function App() {
  const email = useSelector((state) => state.users.user?.email);
  const hideOn = ["/", "/login", "/register", "/admin", "/add-trip"];
  return (
    <Container
      fluid
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        padding: 0,
      }}
    >
      <Router>
        <Header />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/Start" element={<Start />} />
            <Route path="/HomePage" element={<HomePage />} />

            <Route path="/explore" element={<Explore />} />
            <Route path="/book-trip" element={<BookTrip />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/trips-crud" element={<TripsCrud />} />
            <Route path="/add-trip" element={<AddTrip />} />
            <Route path="/update-trip/:id" element={<UpdateTrip />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/admindashoboard" element={<AdminDashboard />} />

          </Routes>
        </div>
  
        <Footer />
      </Router>
    </Container>
  );
}

export default App;
