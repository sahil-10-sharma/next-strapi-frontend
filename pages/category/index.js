import React, { useEffect, useState } from "react";
// import Layout from "../components/layout"
import Twitter from "../../components/twitter"
import CarouselCard from "../../components/CarouselCard"
import CategoryCard from "../../components/CategoryCard";
import { Badge } from '@mantine/core';
import Card1 from "./../../components/vertical-card";
import Seo from "../../components/seo"
import dynamic from "next/dynamic";
import { fetchAPI } from "../../lib/api"
import { IconSun, IconMoonStars, IconPlus } from '@tabler/icons';
import { createStyles, Card, ScrollArea, useMantineColorScheme, Grid, Container, Text, Skeleton, Paper, Drawer, useMantineTheme, Anchor,SimpleGrid, Group, ActionIcon  } from '@mantine/core';


const useStyles = createStyles((theme) => ({
    bg:{
      // boxShadow:" 0 0 0 1px rgba(23,23,23,0.05)",
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },
    bg_hovered: {
        padding: theme.spacing.md,
        width:"100%",
        backgroundColor:"rgb(245,245,245)",
        boxShadow:"inset 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
      },  
      title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 900,
        marginBottom: theme.spacing.md,
        textAlign: 'left',
        marginLeft:"25px",
        color:theme.colorScheme === 'dark' ? "white" : "black",
        [theme.fn.smallerThan('sm')]: {
          fontSize: 28,
          textAlign: 'left',
        }
      },
       titlesmall:{
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 900,
        marginBottom: theme.spacing.md,
        textAlign: 'left',
        
        // marginLeft:"25px",
    
        [theme.fn.smallerThan('sm')]: {
          fontSize: 28,
          textAlign: 'left',
      }
    },
      badge:{
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      transition: 'box-shadow 150ms ease, transform 100ms ease',
        cursor:"pointer",
      '&:hover': {
        boxShadow: `${theme.shadows.md} !important`,
        transform: 'scale(1.05)',

        
      },
    },
    badgeContainer:{
        width: "300px",
        height: "100px",
        border: "1px solid black",
        borderRadius: "25px",
    },
    containerBox:{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    mainSection:{
      width: "91%",
      // overflow: "auto",
      height: "98vh",
      display: "inline-block",
      marginLeft: "8%",
      marginRight: "1%",
      borderTopRightRadius: "15px",
      borderBottomRightRadius: "15px",
      marginBottom: "5px",
      marginTop: "5px",
      marginBottom: "5px",
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },
    card:{
      width:"100%"
    },
    main:{
      borderRadius:"25px",
      // backgroundColor:theme.colorScheme === 'dark' ? "white" : "black",
      // borderColor:"yellow",
      border:"0px solid yellow",
      // baorderTop:"0px"
    }
  }));

  const Header = dynamic(() => 
    import("../../components/header.js")
    );

export async function getStaticProps({ params }) {
    const allCategories = await fetchAPI("/categories")
  
    return {
      props: {
        categories: allCategories,
      },
      revalidate: 1,
    }
  }


export default function Index(props) {
    const { classes } = useStyles();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();


return (
    <div className={classes.main}>
    {/* <Header categories={categories} /> */}
    {/* <Seo seo={props.homepage.attributes.seo} /> */}
      <div className={classes.mainSection}>

      <ScrollArea  className="uk-container-cat uk-container-large-cat">
          <Container my="lg" style={{minWidth:"100%", padding:"0px!important", paddingTop:"30px"}}>
            <Grid>
              <Grid.Col xs={9} className={classes.containerBox}>
              {props.categories.data.map((item) => {
                {return <Grid.Col span={4} className={classes.badgeContainer}><Badge className={classes.badge}>{item.attributes.name}</Badge></Grid.Col>
                    }
                })}
              </Grid.Col>
              <Grid.Col xs={0.1} style={{display:"flex", justifyContent:"center"}}>
                <div className="vl"></div>
              </Grid.Col>
              <Grid.Col xs={2.8}>
               
                    {/* twitter */}
                  <Twitter style={{position:"sticky", top:"80px", width:"100%", padding:"0px  "}} />
                  
            </Grid.Col>          
            </Grid>
          </Container>
       </ScrollArea>
      </div>
    </div>
)
}