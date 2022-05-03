import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  makeStyles,
  Tab,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Card,
  Collapse,
  CardContent,
} from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useState } from 'react';
import roleData from '../Database/database';

const useStyle = makeStyles({
  list: {
    display: 'inline-flex',
  },
  listIcon: {
    marginLeft: '20px',
  },
  tabs: {
    fontSize: 15,
    color: '#000000',
    marginRight: 20,
  },
  tableHead: {
    backgroundColor: 'rgb(240,240,210)',
  },
  tableContainer: {
    height: '55vh',
  },
  addIcon: {
    marginTop: '5px',
  },
  card: {
    width: 500,
    backgroundColor: 'yellow',
  },
});
const AccessControl = () => {
  const classes = useStyle();
  const [tabValue, setTabValue] = useState('1');
  const [expanded, setExpanded] = useState(false);
  const [cardId, setCardId] = useState(0);
  const data = roleData;
  console.log(data);
  const handleChange = (event, newValue) => {
    console.log(newValue, event);
    setTabValue(newValue);
  };
  const handleCard = (e) => {
    if (e.target.parentNode) {
      let iconId = Number(e.target.parentNode.id);
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === iconId) {
          setCardId(iconId);
          setExpanded(!expanded);
        }
      }
    }
  };
  return (
    <Box sx={{ flexGrow: 1, p: 2, height: '100vh' }}>
      <Grid item xs={12} style={{ backgroundColor: 'blue' }}>
        <List>
          <ListItem className={classes.list}>
            Teachers
            <ListItemIcon className={classes.listIcon}>
              <EditIcon />
            </ListItemIcon>
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={12}>
        <TabContext value={tabValue}>
          <TabList onChange={handleChange}>
            <Tab label="Access Control" className={classes.tabs} value="1" />
            <Tab label="Assigned Members" className={classes.tabs} value="2" />
          </TabList>
          <Divider />
          <TabPanel value="1">
            <TableContainer
              component={Paper}
              className={classes.tableContainer}
            >
              <Table sx={{ minWidth: 800 }} aria-label="simple table">
                <TableHead>
                  <TableRow className={classes.tableHead}>
                    <TableCell>Department/Role Name</TableCell>
                    <TableCell>Access Level</TableCell>
                    <TableCell>Summary</TableCell>
                    <TableCell>Last Updated</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item) => (
                    <TableRow key={item.id} id={item.id}>
                      <TableCell id={item.id}>
                        <AddCircleOutlineIcon
                          className={classes.addIcon}
                          onClick={handleCard}
                          id={item.id}
                        />
                        {item.role}
                        <Card className={classes.card}>
                          <Collapse
                            in={cardId === item.id ? expanded : null}
                            timeout="auto"
                            unmountOnExit
                          >
                            <CardContent>Hello</CardContent>
                          </Collapse>
                        </Card>
                      </TableCell>
                      <TableCell>
                        <Button variant="contained">{item.accesslevel}</Button>
                      </TableCell>
                      <TableCell>{item.summary}</TableCell>
                      <TableCell>{item.lastupdated}</TableCell>
                      <TableCell>
                        <VisibilityIcon />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value="2">Assigned Members</TabPanel>
        </TabContext>
      </Grid>
    </Box>
  );
};

export default AccessControl;
