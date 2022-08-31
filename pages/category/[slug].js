import Articles from "../../components/articles"
import { fetchAPI } from "../../lib/api"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import dynamic from "next/dynamic";
import { createStyles, Card, ScrollArea,useMantineColorScheme, Grid, Container, Text, Skeleton, Paper, Drawer, useMantineTheme, Anchor,SimpleGrid, Group, ActionIcon  } from '@mantine/core';
const Header = dynamic(() => 
import("../../components/header.js")
);
const useStyles = createStyles((theme) => ({
  bg:{
    // boxShadow:" 0 0 0 1px rgba(23,23,23,0.05)",
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },
  category:{
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  }
  
}));

const Category = ({ category, categories }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { classes } = useStyles();
  const seo = {
    metaTitle: category.attributes.name,
    metaDescription: `All ${category.attributes.name} articles`,
  }
console.log(categories)
  return (
    <>
    <Header categories={categories} />
    <Container className={classes.category} categories={categories.data}>
      <Seo seo={seo} />
      <div className="uk-section">
        <h1>hello</h1>
        <div className="uk-container uk-container-large">
          <h1>{category.attributes.name}</h1>
          <Articles articles={category.attributes.articles.data} />
        </div>
      </div>
    </Container>
    </>
  )
}

export async function getStaticPaths() {
  const categoriesRes = await fetchAPI("/categories", { fields: ["slug"] })

  return {
    paths: categoriesRes.data.map((category) => ({
      params: {
        slug: category.attributes.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const matchingCategories = await fetchAPI("/categories", {
    filters: { slug: params.slug },
    populate: {
      articles: {
        populate: "*",
      },
    },
  })
  const allCategories = await fetchAPI("/categories")

  return {
    props: {
      category: matchingCategories.data[0],
      categories: allCategories,
    },
    revalidate: 1,
  }
}

export default Category
