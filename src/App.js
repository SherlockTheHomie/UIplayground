import React, { useRef, useEffect } from 'react';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';
import { useSpring, animated, to } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import styles from './App.css';

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import bg from './static/images/background.jpg';
import rain from './static/images/rain.jpg';
import space from './static/images/about-visual.png';
import planet from './static/images/planet.jpg';
import texture1 from './static/images/texture1.jpg';
import texture2 from './static/images/texture2.png';
import flower from './static/images/flower.png';

import me from './static/images/Header.png';


const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: 'rgba(66,163,255,0.89)',
      contrastText: '#48b0ff',
    },
    secondary: {
      main: '#49eeff',
      contrastText: '#000000',
      dark: '#000000',
    },
    background: {
      paper: 'rgba(0,78,195,0.42)',
      default: '#000000',
    },
    error: {
      main: '#d60e00',
      contrastText: '#e2e2e2',
    },
    text: {
      primary: '#000000',
      secondary: '#f7f5f5',
    },
  },
  typography: {
    fontFamily: 'monospace',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});


const calcX = (y: number, ly: number) => -(y - ly - window.innerHeight / 2) / 20;
const calcY = (x: number, lx: number) => (x - lx - window.innerWidth / 2) / 20;

const wheel = (y: number) => {
  const imgHeight = window.innerWidth * 0.3 - 20
  return `translateY(${-imgHeight * (y < 0 ? 6 : 1) - (y % (imgHeight * 5))}px`
}


// Little helpers ...
const url = (name: string, wrap = false) =>
  `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`



export default function App() {
  const parallax = useRef(<Parallax />);

  const styles = useSpring({
    loop: { reverse: true },
    from: { y: 0 },
    to: { y: 10 },
  })

  useEffect(() => {
    const preventDefault = (e: Event) => e.preventDefault()
    document.addEventListener('gesturestart', preventDefault)
    document.addEventListener('gesturechange', preventDefault)

    return () => {
      document.removeEventListener('gesturestart', preventDefault)
      document.removeEventListener('gesturechange', preventDefault)
    }
  }, [])

  const target = useRef(null)
  const [{ x, y, rotateX, rotateY, rotateZ, zoom, scale }, api] = useSpring(
    () => ({
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: 1,
      zoom: 0,
      x: 0,
      y: 0,
      config: { mass: 5, tension: 350, friction: 40 },
    })
  )

  const [{ wheelY }, wheelApi] = useSpring(() => ({ wheelY: 0 }))

  useGesture(
    {
      onDrag: ({ active, offset: [x, y] }) =>
        api({ x, y, rotateX: 0, rotateY: 0, scale: active ? 1 : 1.1 }),
      onPinch: ({ offset: [d, a] }) => api({ zoom: d / 200, rotateZ: a }),
      onMove: ({ xy: [px, py], dragging }) =>
        !dragging &&
        api({
          rotateX: calcX(py, y.get()),
          rotateY: calcY(px, x.get()),
          scale: 1.1,
        }),
      onHover: ({ hovering }) =>
        !hovering && api({ rotateX: 0, rotateY: 0, scale: 1 }),
      onWheel: ({ event, offset: [, y] }) => {
        event.preventDefault()
        wheelApi.set({ wheelY: y })
      },
    },
    { target, eventOptions: { passive: false } }
  )
  

  return (
    <ThemeProvider theme={theme}>
      <div style={{ width: '100%', height: '100%', background: '#000000' }}>
        <Parallax ref={parallax} pages={3}>
          <ParallaxLayer offset={1} speed={1} style={{ backgroundColor: '#000000' }} />
          <ParallaxLayer offset={2} speed={1} style={{ backgroundColor: '#000000' }} />
          {/* <ParallaxLayer offset={2} speed={1} style={{ backgroundImage: 'linear-gradient(black, blue, black)' }} /> */}

          <ParallaxLayer
            className="rain"
            offset={0}
            speed={0}
            factor={3}
            style={{ opacity: 0.5 }} />



          <ParallaxLayer offset={0.5} speed={-0.3} style={{ pointerEvents: 'none' }}>
            <img src={planet} style={{ width: '15%', marginLeft: '70%' }} />
          </ParallaxLayer>

          <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
            <img src={texture2} style={{ display: 'block', width: '20%', marginLeft: '65%' }} />
            <img src={texture2} style={{ display: 'block', width: '10%', marginLeft: '25%' }} />
          </ParallaxLayer>

          <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
            <img src={texture2} style={{ display: 'block', width: '20%', marginLeft: '10%' }} />
            <img src={texture2} style={{ display: 'block', width: '20%', marginLeft: '40%' }} />
          </ParallaxLayer>

          <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.3 }}>
            <img src={texture2} style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
            <img src={texture2} style={{ display: 'block', width: '20%', marginLeft: '45%' }} />
          </ParallaxLayer>

          <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.3 }}>
            <img src={texture2} style={{ display: 'block', width: '20%', marginLeft: '80%' }} />
            <img src={texture2} style={{ display: 'block', width: '40%', marginLeft: '25%' }} />
            <img src={texture2} style={{ display: 'block', width: '10%', marginLeft: '70%' }} />
          </ParallaxLayer>

          <ParallaxLayer offset={2.75} speed={0.4} style={{ opacity: 0.3 }}>
            <img src={texture2} style={{ display: 'block', width: '20%', marginLeft: '15%' }} />
            <img src={texture2} style={{ display: 'block', width: '15%', marginLeft: '75%' }} />
          </ParallaxLayer>

          <ParallaxLayer
            offset={2.5}
            speed={-0.4}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}>
            <img src={flower} style={{ width: '100%', opacity: 0.5 }} />
          </ParallaxLayer>

          <ParallaxLayer
            offset={2}
            speed={-0.3}
            style={{
              backgroundSize: '80%',
              backgroundPosition: 'center',
              backgroundImage: url('clients', true),
            }}
          >

          </ParallaxLayer>


          <ParallaxLayer
            offset={0}
            speed={0.1}
            onClick={() => parallax.current.scrollTo(1)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <img src={space} style={{ width: '20%' }} />
            <animated.div
              style={{
                ...styles,
              }}>
              <Typography sx={{ color: '#48b0ff', fontSize: "1.50rem", }}>
                Hello World
              </Typography>
            </animated.div>


          </ParallaxLayer>

          <ParallaxLayer
            offset={1.5}
            speed={0.1}
            // onClick={() => parallax.current.scrollTo(2)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div className={styles.container}>
      <animated.div
        ref={target}
        className={styles.card}
        style={{
          transform: 'perspective(400px)',
          x,
          y,
          scale: to([scale, zoom], (s, z) => s + z),
          rotateX,
          rotateY,
          rotateZ,
        }}>
        <animated.div style={{ transform: wheelY.to(wheel) }}>
        <CardMedia component="img" image={me}></CardMedia>
        </animated.div>
      </animated.div>
    </div>
            {/* <Card sx={{ border:2, borderColor: '#000000', borderRadius: '2' }}>
            <CardMedia
              component="img"
              height="360"
              width="auto"
              image={bg}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </Card> */}
          </ParallaxLayer>

          <ParallaxLayer
            offset={2}
            speed={-0}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Paper sx={{
              display: 'flex', width: '35%', height: '45%', border: 1, borderColor: '#65a4ff', borderRadius: 3, alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Typography align="center" sx={{ margin: 3, color: '#FFFFFF', textWrap: 'wrap', }}>
                This is my UI demo made with react-spring, use-gesture and MUI.
              </Typography>
            </Paper>
            {/* // onClick={() => parallax.current.scrollTo(0)}>
          // <img src={url('clients-main')} style={{ width: '40%' }} /> */}
          </ParallaxLayer>
        </Parallax>
      </div>
    </ThemeProvider>
  )
}