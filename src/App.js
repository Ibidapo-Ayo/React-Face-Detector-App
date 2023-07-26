import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Detector from "./components/Detector";
import Socials from "./components/Socials";
import "./components/stylesheet/styles.css";
// import WordToxicity from "./components/WordToxicity";
function App() {
  const particlesInit = useCallback(async engine => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
    await console.log(container);
  }, []);
  return (
    <div>
      <Particles
        className="particles"
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#fff",
              blur: 5
            }
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push"
              },
              onHover: {
                enable: true,
                mode: "repulse"
              },
              resize: true
            },
            modes: {
              push: {
                quantity: 4
              },
              repulse: {
                distance: 500,
                duration: 0.4
              }
            }
          },
          particles: {
            color: {
              value: "#2F06B999"
            },
            links: {
              color: "#2F06B999",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1
            },
            collisions: {
              enable: true
            },
            move: {
              directions: "none",
              enable: true,
              outModes: {
                default: "bounce"
              },
              random: false,
              speed: 1,
              straight: false
            },
            number: {
              density: {
                enable: true,
                area: 300
              },
              value: 30
            },
            opacity: {
              value: 0.2
            },
            shape: {
              type: "circle"
            },
            size: {
              value: { min: 1, max: 3 }
            }
          },
          detectRetina: true
        }}
      />
      <Navbar />
      <div>
        <Banner />
        <Detector />
        {/* <WordToxicity /> */}
      </div>

      <Socials />
    </div>
  );
}

export default App;
