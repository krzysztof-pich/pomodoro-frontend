import './App.css';
import Header from "./components/Shared/Header";
import Footer from "./components/Shared/Footer";
import Pomodoro from "./components/Pmodoro/Pomodoro";

function App() {
    return (
        <>
            <Header/>
            <Pomodoro/>
            <Footer/>
        </>
    );
}

export default App;
