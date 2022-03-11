import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import './App.css';
import AppRoutes from './routes/AppRoutes';
import Navigation from './components/Navigation/Navigation'
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <Navigation />
      <AppRoutes />
      <Footer />
    </>

  );
}

export default App;
