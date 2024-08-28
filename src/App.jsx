import styled, { ThemeProvider } from "styled-components";
import { darkTheme } from "./utils/Themes";
import Navbar from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";
import Skills from "./components/sections/Skills";
import Education from "./components/sections/Education";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";
import "./App.css"
import StartCanvas from "./components/canvas/Stars";
import Scene from "./components/canvas/Scene";
import { Loader } from "@react-three/drei";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/sections/Loading";
const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
  position: relative;
`;

const Wrapper = styled.div`
  padding-bottom: 100px;
  background: linear-gradient(
      38.73deg,
      rgba(204, 0, 187, 0.15) 0%,
      rgba(201, 32, 184, 0) 50%
    ),
    linear-gradient(
      141.27deg,
      rgba(0, 70, 209, 0) 50%,
      rgba(0, 70, 209, 0.15) 100%
    );
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
`;

function App() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (e.g., fetching data or assets)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust the time as needed

    return () => clearTimeout(timer);
  }, []);

  // useEffect(() => {
  //   if (!isLoading) {
  //     document.body.style.transition = 'opacity 0.5s ease-in-out';
  //     document.body.style.opacity = 1;
  //   } else {
  //     document.body.style.opacity = 0;
  //   }
  // }, [isLoading]);
  
  return (
    <ThemeProvider theme={darkTheme}>
      {isLoading && <LoadingScreen />}
      {!isLoading && <BrowserRouter>
        <Navbar />
        <Body>
          <StartCanvas />
          <div>
            <Scene />
            <Wrapper>
              <Skills />
              {/* <Experience /> */}
            </Wrapper>
            <Projects />
            <Wrapper>
              <Education />
              <Contact />
            </Wrapper>
            <Footer />
          </div>
        </Body>
      </BrowserRouter>}
    </ThemeProvider>
  );
}

export default App;
