import App from "next/app"
import Head from "next/head"
import "../assets/css/style.css"
import { createContext, useState } from "react"
import { fetchAPI } from "../lib/api"
import dynamic from "next/dynamic";
import { getStrapiMedia } from "../lib/media"
import "../public/style.css";
import {IconSun, IconMoonStars} from '@tabler/icons'
import { MantineProvider, ColorSchemeProvider, Global, ColorScheme, ActionIcon, Switch } from '@mantine/core';
// Store Strapi Global object in context
export const GlobalContext = createContext({})
const Header = dynamic(() => 
import("../components/header")
);




const MyApp = ({ Component, pageProps }) => {
  const { global } = pageProps
  const [colorScheme, setColorScheme] = useState('light');
  
  const toggleColorScheme = function (value) {
    return setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
    };

    function MyGlobalStyles() {
      return (
        <Global
          styles={(theme) => ({
            body: {
              backgroundColor : colorScheme === 'dark' ? "#1A1B1E": "black",
                  },
          })}
        />
      );
      }
  return (
    <>
   
      {/* <Head>
        <link
          rel="shortcut icon" 
          href={getStrapiMedia(global.attributes.favicon)}
        />
      </Head> */}
      {/* <GlobalContext.Provider value={global.attributes}> */}
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      
      <MantineProvider theme={{ colorScheme,  
        shadows: {
            md: '1px 1px 3px rgba(0, 0, 0, .25)',
            xl: '5px 5px 3px rgba(0, 0, 0, .25)',
          },
       
        headings: {
          fontFamily: 'Roboto, sans-serif',
          sizes: {
            h1: { fontSize: 30 },
          },
        },
       
        
        }} withNormalizeCSS>
        <Header /> 
        <MyGlobalStyles />
        <Component {...pageProps} />
        </MantineProvider>
        </ColorSchemeProvider>
      {/* </GlobalContext.Provider> */}
    </>
  )
}

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx)
  // Fetch global site settings from Strapi
  const globalRes = await fetchAPI("/global", {
    populate: {
      favicon: "*",
      defaultSeo: {
        populate: "*",
      },
    },
  })
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global: globalRes.data } }
}

export default MyApp
