import ReactMarkdown from "react-markdown"
import Moment from "react-moment"
import { fetchAPI } from "../../lib/api"
import React, { useEffect } from "react"
import Layout from "../../components/layout"
import NextImage from "../../components/image"
import Seo from "../../components/seo"
import { getStrapiMedia } from "../../lib/media"
import remarkBreaks from "remark-breaks";
import dynamic from "next/dynamic";
import { Text, Paper, ScrollArea, createStyles,useMantineColorScheme, Image } from '@mantine/core';

const Header = dynamic(() => 
import("../../components/header.js"));
const useStyles = createStyles((theme) => ({
  mainPaper:{
    marginLeft:  "50px",
    margin: "0 auto",
    position: "relative",
    left: "0px",
    
  },

  articleTitle: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
    display:"flex",
    fontSize:'30px',
    marginBottom:"50px",
    justifyContent:"center"
  },
  articleContent: {
    padding: "0px 100px!important",
    textAlign: "justify",
    margin:"0 auto",

    width: "750px",
  },
  articleImage: {
    height:"300px!important",
    maxHeight:"300px",
    width:"100%"
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
  main:{
    borderRadius:"25px",
    backgroundColor:theme.colorScheme === 'dark' ? "white" : "black",
    // borderColor:"yellow",
    border:"0px solid yellow",
    // baorderTop:"0px"
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
  

}))

const Article = ({ article, categories }) => {
  const imageUrl = getStrapiMedia(article.attributes.image)
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const cat = categories.data.map((item) => {
    return (item.attributes.name)
  })
  const seo = {
    metaTitle: article.attributes.title,
    metaDescription: article.attributes.description,
    shareImage: article.attributes.image,
    article: true,
  }
  useEffect(() => {
    if(colorScheme === 'dark'){
      document.getElementById('__next').style.backgroundColor = "white"
    }else {
      document.getElementById('__next').style.backgroundColor = "black"
    }
    console.log(article.attributes)
  })

  return (
    <>
    <div className={classes.main}>
    <div className={classes.mainSection}>
    
   
    <ScrollArea  className="uk-container uk-container-large">
    <Paper shadow="xs" className={classes.mainPaper}  p="md" >
      <Text className={classes.articleTitle}>{article.attributes.title}</Text>
      <Image className={classes.articleImage} 
                  height={300} src={article.attributes.image.data.attributes.url} />
      <Text className={classes.articleContent}>
        
      <ReactMarkdown
        // eslint-disable-next-line react/no-children-prop
        children={
          article.attributes.content
          ? article.attributes.content
          : ""
        }
        remarkPlugins={[remarkBreaks]}
              />
      </Text>
    </Paper>

    </ScrollArea>
    </div>
    </div>
    {/* <Layout categories={categories.data}>
      <Seo seo={seo} />
      <div
        id="banner"
        className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
        data-src={imageUrl}
        data-srcset={imageUrl}
        data-uk-img
      >
        <h1>{article.attributes.title}</h1>
      </div>
      <div className="uk-section">
        <div className="uk-container uk-container-small">
          <ReactMarkdown
            source={article.attributes.content}
            escapeHtml={false}
          />
          <hr className="uk-divider-small" />
          <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
            <div>
              {article.attributes.author.picture && (
                <NextImage image={article.attributes.author.picture} />
              )}
            </div>
            <div className="uk-width-expand">
              <p className="uk-margin-remove-bottom">
                By {article.attributes.author.name}
              </p>
              <p className="uk-text-meta uk-margin-remove-top">
                <Moment format="MMM Do YYYY">
                  {article.attributes.published_at}
                </Moment>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout> */}
    </>
  )
}

// export async function getStaticPaths() {
//   const articlesRes = await fetchAPI("/articles", { fields: ["slug"] })

//   return {
//     paths: articlesRes.data.map((article) => ({
//       params: {
//         slug: article.attributes.slug,
//       },
//     })),
//     fallback: false,
//   }
// }

export async function getServerSideProps({ params }) {
  const articlesRes = await fetchAPI("/articles", {
    filters: {
      slug: params.slug,
    },
    populate: "*",
  })
  const categoriesRes = await fetchAPI("/categories")

  return {
    props: { 
      article: articlesRes.data[0], 
      categories: categoriesRes 
    },
    // revalidate: 1,
  }
}

export default Article
