import { makeStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Dashboard from './components/Dashboard';
import Launches from './components/Launches';
import Rockets from './components/Rockets';
import { AppBar, Typography, Drawer, List, ListItem } from '@material-ui/core';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    padding: '10px 0',
    textAlign: 'center'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const links = [
    { route: "/", routeName: "Dashboard" },
    { route: "/rockets", routeName: "Rockets" },
    { route: "/launches", routeName: "Launches" }
  ]

  return (
    <Router>
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={classes.appBar}
        >
          <Typography variant="h6" noWrap>
            SpaceX Explorer
        </Typography>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.toolbar} />
          <List>
            {links.map((link, index) => (
              <ListItem button key={index}>
                <Link to={link.route}>{link.routeName}</Link>
              </ListItem>
            ))}
          </List>

        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
            <Switch>
            <Route path="/rockets">
                <Rockets />
            </Route>
            <Route path="/launches">
              <Launches />
            </Route>
            <Route path="/">
              <Dashboard />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>

  );
}

