import Header from "./components/Shared/Header";
import Footer from "./components/Shared/Footer";
import Pomodoro from "./components/Pmodoro/Pomodoro";
import {Box, Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import './structure.css';

function App() {
    const darkTheme = createTheme({
        palette: {
            mode: "dark"
        }
    })

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <div className="pomodoro-container">
                <Header />
                <Pomodoro />
                <Footer />
            </div>
        </ThemeProvider>
    );
}

export default App;
