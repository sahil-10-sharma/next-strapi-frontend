import { createStyles, Card, Text, SimpleGrid, UnstyledButton, Anchor, Group } from '@mantine/core';
import {
  IconCreditCard,
  IconBuildingBank,
  IconRepeat,
  IconReceiptRefund,
  IconReceipt,
  IconReceiptTax,
  IconReport,
  IconCashBanknote,
  IconCoin,
} from '@tabler/icons';

const mockdata = [
  { title: 'Credit cards', icon: IconCreditCard, color: 'violet' },
  { title: 'Banks nearby', icon: IconBuildingBank, color: 'indigo' },
  { title: 'Transfers', icon: IconRepeat, color: 'blue' },
  { title: 'Refunds', icon: IconReceiptRefund, color: 'green' },
  { title: 'Receipts', icon: IconReceipt, color: 'teal' },
 
];

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
  },

  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: theme.radius.md,
    height: 90,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease, transform 100ms ease',

    '&:hover': {
      boxShadow: `${theme.shadows.md} !important`,
      transform: 'scale(1.05)',
    },
  },
}));

const categoryCard = ({ articles, categories}) => {
    const { classes, theme } = useStyles();

    const cat = categories.map((item) => {
        return (item.attributes.name)
    })
    
    const items = mockdata.map((item, i) => ({
        ...item,
        title: cat[i], // just for example
    }));

  return (
    items.map((item) => {
        return <UnstyledButton key={item.title} className={classes.item}>
                <item.icon color={theme.colors[item.color][6]} size={32} />
                <Text size="xs" mt={7}>
                    {item.title}
                </Text>
        </UnstyledButton>
    })
   
    

    
  );
}
export default categoryCard