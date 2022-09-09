import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantine/ds';
import { fetchAPI } from "../lib/api"
import { 
  Navbar,
  TextInput,
  Code,
  UnstyledButton,
  Badge,
  Text,
  createStyles, 
  Header, 
  Autocomplete, 
  Group, 
  Burger,
  ActionIcon,
  NavbarLink,
  Center,
  Tooltip, 
  Drawer, 
  Stack,
  useMantineTheme ,
  Container,
  Switch,
  useMantineColorScheme,
} from '@mantine/core';
import React, { useState, useEffect } from "react";
import {
  IconBulb,
  IconUser,
  IconCheckbox,
  IconSearch,IconSun, IconMoonStars,
  IconPlus,
  IconSelector,
  TablerIcon,
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  sunLow,
  moonStars,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
  IconBrandTwitter, 
  IconBrandYoutube, 
  IconBrandInstagram,
} from '@tabler/icons';




const useStyles = createStyles((theme) => ({
  navbar: {
    paddingTop: 0,
  },

  section: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    marginBottom: theme.spacing.md,

    '&:not(:last-of-type)': {
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
    },
  },

  searchCode: {
    fontWeight: 700,
    fontSize: 10,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
  },
 
  header: {
    // paddingLeft: theme.spacing.md,
    // paddingRight: theme.spacing.md,
    position: 'fixed',
    borderBottom:"0px!important"
  },

  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  search: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
  links: {
    width: 260,

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  social: {
    width: 260,

    [theme.fn.smallerThan('sm')]: {
      width: 'auto',
      marginLeft: 'auto',
    },
  },

  burger: {
    marginRight: theme.spacing.md,

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: theme.radius.md,
    height: 80,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white + "!important",
    transition: 'box-shadow 150ms ease, transform 100ms ease',

    '&:hover': {
      boxShadow: `${theme.shadows.md} !important`,
      transform: 'scale(1.05)',
    },
  },

  itemSmall: {
    display: 'flex',
    flexDirection: 'row',
    width:"100%",
    alignItems: 'center',
    margin: "15px 0px",
    // height:"30px",
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: theme.radius.md,
    height: "auto",
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white + "!important",
    transition: 'box-shadow 150ms ease, transform 100ms ease',

    '&:hover': {
      boxShadow: `${theme.shadows.md} !important`,
      transform: 'scale(1.05)',
    },
  },
  sideNav:{
    width: "8%",
    top: "0px",
	position: "fixed",
	display: "inline-block",
  padding:"10px",
  left:"5px",
  margin:"5px",
  borderTopLeftRadius:"15px",
  borderBottomLeftRadius:"15px",
	backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  notch:{
    width: "30%",
    padding: "6px 15px",
    display: "block",
    margin: "-5px auto",
    position: "relative",
    backgroundColor: theme.colorScheme === 'dark' ? "white" : "black",
    borderRadius: "0 0 20px 20px",
    color: "white",


    '&:after': {
      content: '""',
      position: "absolute",
      top: "5px",
      height: "50px",
      right: "-11px",
      width: "11px",
      borderTopLeftRadius: "10px",

      boxShadow: theme.colorScheme === 'dark' ? 
      "-1px -25px 0 0 white":
    "-1px -25px 0 0 black",
    },

    '&:before': {
      content: '""',
      position: "absolute",
      top: "5px",
      height: "50px",
      left: "-11px",
      width: "11px",
      borderTopRightRadius: "10px",
      boxShadow: theme.colorScheme === 'dark' ? 
      "1px -25px 0 0 white": 
      "1px -25px 0 0 black",
    },

    'li' : {
        color: theme.colorScheme === 'dark' ? "black" : "white",
    }


  },
  nav:{
    height: "0px",
    // position: "fixed",
    minHeight: "5px",
    backgroundColor: theme.colorScheme === 'dark' ? "white" : "black",
    width: theme.colorScheme === 'dark' ? "100%" : "98%",
    zIndex: "999",
    borderBottom:"0px",
    marginLeft:"0px 15px 0px 15px",
    position:"sticky", 
    top:"-1px",
    left:"15px",
    borderBottom: "0px"
  },
  navBar:{
    height: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    /* display: block, */
    margin: "0 auto",
    padding: "10px",
    maxWidth: "100%",
    color: theme.colorScheme === 'dark' ? "white" : "black",
    listStyle: "none"
  },
  

}));

const links = [
  { icon: IconBulb, label: 'Activity', notifications: 3 },
  { icon: IconCheckbox, label: 'Tasks', notifications: 4 },
  { icon: IconUser, label: 'Contacts' },
];

const mockdata = [
  { icon: IconHome2, label: 'Home' ,color: 'violet' },
  { icon: IconGauge, label: 'Dashboard', color: 'indigo'  },
  { icon: IconDeviceDesktopAnalytics, label: 'Analytics', color: 'blue' },
  { icon: IconCalendarStats, label: 'Releases', color: 'green' },
  { icon: IconUser, label: 'Account', color: 'teal'},
  
];
const smallMockData = [
  { icon: IconSwitchHorizontal, label: 'Home' ,color: 'violet' },
  { icon: IconLogout, label: 'Logout', color: 'indigo'  },
 
  
];


const Heading = (props ) => {
  var selectRef = React.useRef(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("")
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(2);
  const {classes, theme } = useStyles();
  const [items, setItems] = useState()
  const [smallIcon, setSmallIcon] = useState()
  const [cat, setCat] = useState()
  
  const {colorScheme, toggleColorScheme = function (value) {
    return setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
    }} = useMantineColorScheme();


  useEffect(() => {
    const fetchCategoris = async () => {
      let res = await fetchAPI("/categories", {
        // filters: { slug: params.slug },
        populate: {
          articles: {
            populate: "*",
          },
        },
      })
      setCategory(res.data)
      
      const cat = res.data.map((item) => {
        return (item.attributes.name)
      }) 
      const items = mockdata.map((item, i) => ({
        ...item,
        label: cat[i],
      }));
      const smallIcon = smallMockData.map((item, i) => ({
      ...item,
      }));
      
      setLoading(false);
      setCat(cat)
      setItems(items)
      setSmallIcon(smallIcon)

    }
    fetchCategoris()

    
}, [])   
  // console.log(category)
  
  
  return (
    <>

    <Navbar
      height={"98%"}
      width={{ base: 80 }}
      p="md"
      className={classes.sideNav}
      color={theme.colors}
      >
      <Navbar.Section grow style={{height:"auto",marginLeft:"4px",height:"80%!important"}}  >
        <Stack justify="center" spacing={0}>
        {items && items?.map((item) => {
          return <UnstyledButton key={item.title} className={classes.item}>
          <item.icon color={theme.colors[item.color][6]} size={30} />
          </UnstyledButton>
            })}
        </Stack>
      </Navbar.Section>

      <Navbar.Section style={{height:"20%", display:"flex"}} >
        <Stack justify="center" style={{width:"100%"}} spacing={0}>
         {smallIcon && smallIcon.map((item) => {
            return <UnstyledButton key={item.title} className={classes.itemSmall}>
               <item.icon color={theme.colors[item.color][6]} size={20} />
             </UnstyledButton>
         })}
        </Stack>
      </Navbar.Section>
    </Navbar>

      <div className={classes.nav} >
        <div className={classes.notch}>
          <ul className={classes.navBar}>
          <Switch  onClick={() => toggleColorScheme()} offLabel={"Light"} onLabel={"Dark"} />
            <a href="#hero"><li className="cursor-scale small">Home</li></a>
            <a href="#projects"><li className="cursor-scale small" >Projects</li></a>
            <a href="#skills"><li className="cursor-scale small" >Skills</li></a>
            <a href="#exp"><li className="cursor-scale small" >Work</li></a>
            <a href="#contact"><li className="cursor-scale small">Contact</li></a>
          </ul>
        </div>
      </div>
      
    </>
  );

}


export default Heading;