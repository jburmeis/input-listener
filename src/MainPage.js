import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import withRoot from './withRoot';

import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import Menu from '@material-ui/icons/Menu';
import ExposurePlus2 from '@material-ui/icons/ExposurePlus2';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 2,
    padding: "10px",
  },
  table: {
    width: "100%",
  },
  tableRow: {
    height: "20px",
  },
  icon: {
    marginRight: "6px",
    fontSize: 12,
  },
  iconBlue: {
    marginRight: "6px",
    fontSize: 12,
    color: "cornflowerblue",
  },
  iconRed: {
    marginRight: "6px",
    fontSize: 12,
    color: "crimson",
  },
  iconGreen: {
    marginRight: "6px",
    fontSize: 12,
    color: "lime ",
  },
  button: {
    marginRight: theme.spacing.unit,
  }
});

const mouseEventTypes = ['click', 'contextmenu', 'dblclick', 'mousedown', 'mouseup'];
const keyEventTypes = ['keydown', 'keypress', 'keyup'];
const touchEventTypes = ['touchcancel', 'touchend', 'touchmove', 'touchstart'];

class MainPage extends React.Component {

/*************************************************************************************
 *                       Constructor & Event Listener Setup
 ************************************************************************************/
  constructor(props) {
    super(props);

    document.title = "Input Listener";

    const mouseEventsEnabled = {};
    mouseEventTypes.forEach(eventType => mouseEventsEnabled[eventType] = true);

    const keyEventsEnabled = {};
    keyEventTypes.forEach(eventType => keyEventsEnabled[eventType] = true);

    const touchEventsEnabled = {};
    touchEventTypes.forEach(eventType => touchEventsEnabled[eventType] = true);

    this.state = {
      mouseEvents: [],
      wheelEvents: [],
      keyEvents: [],
      touchEvents: [],

      mouseEventsEnabled: mouseEventsEnabled,
      keyEventsEnabled: keyEventsEnabled,
      touchEventsEnabled: touchEventsEnabled,
    }
  }

  componentDidMount() {
    for (const eventType of mouseEventTypes) {
      window.addEventListener(eventType, (event) => this.addMouseEventToState(event));
    }

    for (const eventType of keyEventTypes) {
      window.addEventListener(eventType, (event) => this.addKeyEventToState(event));
    }

    for (const eventType of touchEventTypes) {
      window.addEventListener(eventType, (event) => this.addTouchEventToState(event));
    }

    window.addEventListener('wheel', (event) => this.addWheelEventToState(event));
  }


/*************************************************************************************
 *                              State Update Methods
 ************************************************************************************/
  addMouseEventToState(event) {
    if (this.state.mouseEventsEnabled[event.type]) {
      this.setState({ mouseEvents: [event, ...this.state.mouseEvents.slice(0, 10)] });
    }
  }

  addWheelEventToState(event) {
    this.setState({ wheelEvents: [event, ...this.state.wheelEvents.slice(0, 10)] });
  }

  addKeyEventToState(event) {
    if (this.state.keyEventsEnabled[event.type]) {
      this.setState({ keyEvents: [event, ...this.state.keyEvents.slice(0, 10)] });
    }
  }

  addTouchEventToState(event) {
    if (this.state.touchEventsEnabled[event.type]) {
      this.setState({ touchEvents: [event, ...this.state.touchEvents.slice(0, 10)] });
    }
  }

  clearMouseEvents() {
    this.setState({ mouseEvents: [] });
  }

  clearWheelEvents() {
    this.setState({ wheelEvents: [] });
  }

  clearKeyEvents() {
    this.setState({ keyEvents: [] });
  }

  clearTouchEvents() {
    this.setState({ touchEvents: [] });
  }

  enableMouseEvent(eventType, state) {
    this.setState({ mouseEventsEnabled: Object.assign(this.state.mouseEventsEnabled, { [eventType]: state }) });
  }

  enableKeyEvent(eventType, state) {
    this.setState({ keyEventsEnabled: Object.assign(this.state.keyEventsEnabled, { [eventType]: state }) });
  }

  enableTouchEvent(eventType, state) {
    this.setState({ touchEventsEnabled: Object.assign(this.state.touchEventsEnabled, { [eventType]: state }) });
  }


/*************************************************************************************
 *                              Render Methods
 ************************************************************************************/
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="display1" gutterBottom>
          Input Listener
        </Typography>

        <Grid container spacing={8}>
          <Grid item xs={8}>
            {this.renderMouseEventCard()}
          </Grid>
          <Grid item xs={4}>
            {this.renderKeyEventCard()}
          </Grid>
          <Grid item xs={8}>
            {this.renderWheelEventCard()}
          </Grid>
          <Grid item xs={4}>
            {this.renderTouchEventCard()}
          </Grid>
        </Grid>

      </div>
    );
  }

/*************************************************************************************
 *                             Render: Mouse Events
 ************************************************************************************/
  renderMouseEventCard() {
    const { classes } = this.props;

    return (
      <Card>
        <CardHeader title="Mouse Events" />
        <CardContent>

          <Table padding="dense" className={classes.table}>
            <TableHead>
              <TableRow className={classes.tableRow}>
                <TableCell>Timestamp</TableCell>
                <TableCell>Type</TableCell>
                <TableCell numeric>button</TableCell>
                <TableCell numeric>buttons</TableCell>
                <TableCell numeric>x</TableCell>
                <TableCell numeric>y</TableCell>
                <TableCell>mod keys</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.mouseEvents.map((event, idx) =>
                <TableRow key={idx} hover className={classes.tableRow}>
                  <TableCell component="th" scope="row">
                    {Math.floor(event.timeStamp)}
                  </TableCell>
                  <TableCell> {this.renderMouseEventTypeIcon(event.type)} {event.type} </TableCell>
                  <TableCell numeric>{event.button}</TableCell>
                  <TableCell numeric>{event.buttons}</TableCell>
                  <TableCell numeric>{event.x}</TableCell>
                  <TableCell numeric>{event.y}</TableCell>
                  <TableCell>{this.getKeysDownStringFromEvent(event)}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardActions>
          <Button className={classes.button} size="small" variant="raised" onClick={() => this.clearMouseEvents()}>Clear</Button>
          {mouseEventTypes.map(type =>
            <FormControlLabel
              key={type}
              control={
                <Checkbox
                  checked={this.state.mouseEventsEnabled[type]}
                  onChange={(event) => this.enableMouseEvent(type, event.target.checked)}
                />
              }
              label={type}
            />
          )}
        </CardActions>
      </Card>
    )
  }

  renderMouseEventTypeIcon(eventType) {
    const { classes } = this.props;

    switch (eventType) {
      case "mouseup":
        return <ArrowUpward className={classes.iconBlue} />;
      case "mousedown":
        return <ArrowDownward className={classes.iconRed} />;
      case "click":
        return <Check className={classes.iconGreen} />;
      case "contextmenu":
        return <Menu className={classes.icon} />;
      case "dblclick":
        return <ExposurePlus2 className={classes.icon} />;
      default:
        return null;
    }
  }


/*************************************************************************************
 *                             Render: Wheel Events
 ************************************************************************************/
  renderWheelEventCard() {
    const { classes } = this.props;

    return (
      <Card>
        <CardHeader title="Wheel Events" />
        <CardContent>

          <Table padding="dense" className={classes.table}>
            <TableHead>
              <TableRow className={classes.tableRow}>
                <TableCell>Timestamp</TableCell>
                <TableCell>Type</TableCell>
                <TableCell numeric>wheelDeltaX</TableCell>
                <TableCell numeric>wheelDeltaY</TableCell>
                <TableCell numeric>button</TableCell>
                <TableCell numeric>buttons</TableCell>
                <TableCell numeric>x</TableCell>
                <TableCell numeric>y</TableCell>
                <TableCell>mod keys</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.wheelEvents.map((event, idx) =>
                <TableRow key={idx} hover className={classes.tableRow}>
                  <TableCell component="th" scope="row">
                    {Math.floor(event.timeStamp)}
                  </TableCell>
                  <TableCell>{event.type}</TableCell>
                  <TableCell numeric>{event.wheelDeltaX}</TableCell>
                  <TableCell numeric>{event.wheelDeltaY}</TableCell>
                  <TableCell numeric>{event.button}</TableCell>
                  <TableCell numeric>{event.buttons}</TableCell>
                  <TableCell numeric>{event.x}</TableCell>
                  <TableCell numeric>{event.y}</TableCell>
                  <TableCell>{this.getKeysDownStringFromEvent(event)}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

        </CardContent>
        <CardActions>
          <Button className={classes.button} size="small" variant="raised" onClick={() => this.clearWheelEvents()}>Clear</Button>
        </CardActions>
      </Card>
    )
  }

/*************************************************************************************
 *                             Render: Touch Events
 ************************************************************************************/
  renderTouchEventCard() {
    const { classes } = this.props;

    return (
      <Card>
        <CardHeader title="Touch Events" />
        <CardContent>

          <Table padding="dense" className={classes.table}>
            <TableHead>
              <TableRow className={classes.tableRow}>
                <TableCell>Timestamp</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>mod keys</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.touchEvents.map((event, idx) =>
                <TableRow key={idx} hover className={classes.tableRow}>
                  <TableCell component="th" scope="row">
                    {Math.floor(event.timeStamp)}
                  </TableCell>
                  <TableCell>{event.type}</TableCell>
                  <TableCell>{this.getKeysDownStringFromEvent(event)}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

        </CardContent>
        <CardActions>
          <Button className={classes.button} size="small" variant="raised" onClick={() => this.clearTouchEvents()}>Clear</Button>
          {touchEventTypes.map(type =>
            <FormControlLabel
              key={type}
              control={
                <Checkbox
                  checked={this.state.touchEventsEnabled[type]}
                  onChange={(event) => this.enableTouchEvent(type, event.target.checked)}
                />
              }
              label={type}
            />
          )}
        </CardActions>

      </Card>
    )
  }

/*************************************************************************************
 *                             Render: Key Events
 ************************************************************************************/
  renderKeyEventCard() {
    const { classes } = this.props;

    return (
      <Card>
        <CardHeader title="Key Events" />
        <CardContent>

          <Table padding="dense" className={classes.table}>
            <TableHead>
              <TableRow className={classes.tableRow}>
                <TableCell>Timestamp</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>key (code)</TableCell>
                <TableCell>mod keys</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.keyEvents.map((event, idx) =>
                <TableRow key={idx} hover className={classes.tableRow}>
                  <TableCell component="th" scope="row">
                    {Math.floor(event.timeStamp)}
                  </TableCell>
                  <TableCell>{this.renderKeyEventTypeIcon(event.type)} {event.type}</TableCell>
                  <TableCell>{`${event.key} (${event.keyCode})`}</TableCell>
                  <TableCell>{this.getKeysDownStringFromEvent(event)}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

        </CardContent>
        <CardActions>
          <Button className={classes.button} size="small" variant="raised" onClick={() => this.clearKeyEvents()}>Clear</Button>
          {keyEventTypes.map(type =>
            <FormControlLabel
              key={type}
              control={
                <Checkbox
                  checked={this.state.keyEventsEnabled[type]}
                  onChange={(event) => this.enableKeyEvent(type, event.target.checked)}
                />
              }
              label={type}
            />
          )}
        </CardActions>

      </Card>
    )
  }

  renderKeyEventTypeIcon(eventType) {
    const { classes } = this.props;

    switch (eventType) {
      case "keyup":
        return <ArrowUpward className={classes.iconBlue} />;
      case "keydown":
        return <ArrowDownward className={classes.iconRed} />;
      case "keypress":
        return <Check className={classes.iconGreen} />;
      default:
        return null;
    }
  }

  getKeysDownStringFromEvent(event) {
    let keysDown = "";
    if (event.ctrlKey) keysDown += "[ctrl] ";
    if (event.altKey) keysDown += "[alt] ";
    if (event.metaKey) keysDown += "[meta] ";
    if (event.shiftKey) keysDown += "[shift] ";
    return keysDown;
  }

}

export default withRoot(withStyles(styles)(MainPage));
