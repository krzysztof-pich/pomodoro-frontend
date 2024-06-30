
import Header from "./components/Shared/Header";
import Footer from "./components/Shared/Footer";
import Pomodoro from "./components/Pmodoro/Pomodoro";
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";

function App() {
    const darkTheme = createTheme({
        palette: {
            mode: "dark"
        }
    })
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Container>
                <Header/>
                <Pomodoro/>
                <Footer/>
            </Container>
        </ThemeProvider>
    );
}

export default App;
