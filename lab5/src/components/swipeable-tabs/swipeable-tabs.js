import React, {useEffect, useState} from 'react';
import { AppBar, Tabs, Tab, CircularProgress } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import axios from "axios";
import TabPanel from '../tab-panel/tab-panel';
import ClientTable from "../client-table/client-table";
import RequestTable from "../request-table/request-table";
import ServiceTable from "../service-table/service-table";

const a11yProps = (index) => ({
  id: `full-width-tab-${index}`,
  'aria-controls': `full-width-tabpanel-${index}`,
});

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const SwipeableTabs = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [isBusy, setBusy] = useState(true);
  const [clients, setClients] = useState();
  const [requests, setRequests] = useState();
  const [services, setServices] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const fetchAllClients = async () => {
    await axios.get('http://localhost:4000/api/clients')
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchAllRequests = async () => {
    console.log('check');
    await axios.get('http://localhost:4000/api/requests')
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchAllServices = async () => {
    await axios.get('http://localhost:4000/api/services')
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    Promise.all([fetchAllRequests(), fetchAllClients(), fetchAllServices()]).then(() => setBusy(false));
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Clients" {...a11yProps(0)} />
          <Tab label="Services" {...a11yProps(1)} />
          <Tab label="Requests" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      {
        isBusy ? <CircularProgress /> : (
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <ClientTable clients={clients} />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <ServiceTable services={services} />
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <RequestTable requests={requests} fetchRequests={fetchAllRequests} />
            </TabPanel>
          </SwipeableViews>
        )
      }
    </div>
  );
};

export default SwipeableTabs;
