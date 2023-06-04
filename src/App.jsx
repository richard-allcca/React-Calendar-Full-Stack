import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRouter } from './router';

function App() {
  return (
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
  );
}
// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<CalendarScreen />} />
//           <Route path="/login" element={<LoginScreen />} />
//           <Route path="*" element={<Navigate replace to="/" />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

export default App;
