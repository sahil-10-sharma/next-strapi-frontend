import React, {useState, useEffect} from "react"
import Link from "next/link"
import NextImage from "./image"
import { createStyles, Card, Image, Avatar, Text, Group, Grid } from '@mantine/core';
import ReactMarkdown from "react-markdown";
import { useHover } from '@mantine/hooks';
import remarkBreaks from "remark-breaks";
import LinesEllipsis from "react-lines-ellipsis";
import food from "../public/images/food.jpg"; // Tell webpack this JS file uses this image
import heartOutline from "../public/images/heart-outline.png"; // Tell webpack this JS file uses this image
import heartFill from "../public/images/heart-fill.png"; // Tell webpack this JS file uses this image
const log = console.log.bind(console);

  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const useStyles = createStyles((theme) => ({
    card:{
      // boxShadow:" 0 0 0 1px rgba(23,23,23,0.05)",
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      margin: "0px 0px 0px 10px",
      minHeight: "200px",
      borderRadius: "0px",
      borderTop: "1px solid rgba(230, 230, 230, 1)",
      borderBottom: "1px solid rgba(230, 230, 230, 1)",
      borderRight: "0px solid #d3cece",
      borderLeft: "0px solid #d3cece",
      padding:"0px !important",
      cursor:"pointer"

    },
  
    title: {
      fontWeight: 700,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      lineHeight: 1.2,
      display:"flex",
      fontSize:'30px',
      alignItems:"center"
    },
    avatar: {
      display:"inline",
      marginRight:"10px"
    },
  
    card: {
      padding: theme.spacing.md,
      width:"96%!important",
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      transition: 'box-shadow 150ms ease, transform 100ms ease',
      margin: "20px 15px 10px 20px!important",
      borderRadius: `${theme.radius.md} !important`,
      cursor:"pointer",
      '&:hover' : {
        padding: 0,
        margin: "20px 15px 10px 20px!important",
        borderRadius: `${theme.radius.md} !important`,
        width:"100%",
        // backgroundColor:"rgb(245,245,245)",
        boxShadow: `0 1px 3px rgba(0, 0, 0, 0.05),rgba(0, 0, 0, 0.05) 0px 20px 25px -5px,rgba(0, 0, 0, 0.04) 0px 10px 10px -5px !important`,
        transform: 'scale(1)',
      }
    },
    
    vCardImage: {
      width: "auto",
      // maxWidth:auto,
      maxHeight: "150px",
      maxWidth:"150px",
      marginTop:"20px"
    },
    rightCol: {
      display: "flex",
      alignItems: "baseline",
      flexWrap: "wrap",
      paddingTop: "20px",
      flexDirection: "column",
      width: "100%",
      // maxWidth: "375px",
    },
    leftCol:{
      flexDirection: "column",
      display:"flex",
      alignItems: "center",
      justifyContent: 'center',
    },
    content:{
      fontSize:"15px",
      marginTop:"0px"
    }
  }))

  const vCard = ({ article, articles }) => {
    const { hovered, ref } = useHover();
    const [useEllipsis, setUseEllipsis] = useState(true);
    const { classes } = useStyles();

    // console.log(article.attributes.image.data.attributes)

   return (
    <> 
        <Link href={`/article/${article.attributes.slug}`}>
    <Card ref={ref} withBorder radius="md" p={0} className={classes.card}>
      <Group noWrap spacing={0} >
        <div className={classes.body} style={{width:"100%"}}>
        <Grid style={{width:"100%"}}>  
          <Grid.Col className={classes.rightCol} span={9}>
          {/* <Text>{article.attributes.description}</Text> */}
         
         
            <Group spacing="xs" noWrap>
            <Avatar className={classes.avatar} color="cyan" radius="xl">{article.attributes.title[0]}</Avatar>
              {/* <Avatar size={20} src={author.avatar} /> */}
              <Text size="xs">{article.attributes.author.data.attributes.name}</Text>
              <Text size="xs" color="dimmed">
                •
              </Text>
              <Text size="xs" color="dimmed">
              {article.attributes.category.data.attributes.name.toUpperCase()}
              </Text>
              <Text size="xs" color="dimmed">
                •
              </Text>
              <Text size="xs" color="dimmed" >{new Date(article.attributes.createdAt).getDate() + 'th ' + new Date(article.attributes.createdAt).toLocaleDateString('en-US', { weekday: 'long' })}</Text>
              </Group>
             
          <Text>
          
          <Text className={classes.title} mt="xs" mb="md">
            {article.attributes.title}
          </Text>
          <p className={classes.content}>
            <ReactMarkdown
              // eslint-disable-next-line react/no-children-prop
              children={
                article.attributes.content
                ? article.attributes.content.substring(
                    0,
                    200
                  ) + "..."
                : ""
              }
              remarkPlugins={[remarkBreaks]}
            />
            
            <a href={`/article/${article.attributes.slug}`}>Read More</a>
          </p>
          </Text>
           
        </Grid.Col>

        <Grid.Col span={3} className={classes.leftCol}>
          
          <Image  width={150}
                  height={150}
                  className={classes.vCardImage} 
                  src={article.attributes.image.data.attributes.url} />
        </Grid.Col>
      </Grid>
        </div>
      </Group>
    </Card>
   </Link>
   </>
  )
}

export default vCard
