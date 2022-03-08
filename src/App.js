import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import './App.css';
import AppRoutes from './routes/AppRoutes';
import Navigation from './components/Navigation/Navigation'

function App() {
  return (
    <>
      <Navigation />
      <AppRoutes />
    </>

  );
}

export default App;
