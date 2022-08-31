import { createStyles, Card, Image, Avatar, Text, Group } from '@mantine/core';
import Articles from './articles';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';

const useStyles = createStyles((theme) => ({
   item:{
    borderRadius: theme.radius.md,
    position:"sticky!important",
    top:"80px!important",
    height: "auto",
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease, transform 100ms ease',
    margin:"20px 0px",
    padding:"0px 10px"
   }

  }));
const Layout = ({ article, articles }) => {
    const { classes } = useStyles();
    // console.log(articles)
return (    
  <>
  <div
   className={classes.item}>
   <TwitterTimelineEmbed
      sourceType="profile"
      screenName="mr_iisshh"
      options={{height: 400}}
/>
</div>
  </>
  )
}

export default Layout
