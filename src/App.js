import './App.css';
import Header from "./components/Shared/Header";
import Footer from "./components/Shared/Footer";
import Pomodoro from "./components/Pmodoro/Pomodoro";
import {Container} from "@mui/material";

function App() {
    return (
        <Container>
            <Header/>
            <Pomodoro/>
            <Footer/>
        </Container>
    );
}

export default App;
