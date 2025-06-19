class State {
  getSerializedKey() {
    return this.constructor.name;
  }

  hydrate(data) {
    for (const [key, value] of Object.entries(data)) {
      this[key] = value;
    }
  }
}

class AppState {
  states = new Map();

  registerState(state) {
    /** @ts-ignore */
    const name = state.constructor.name;

    this.states.set(name, state);
  }

  getState(state) {
    /** @ts-ignore */
    return this.states.get(state.prototype.constructor.name);
  }

  serialize() {
    let serialized = {};

    for (const [key, value] of this.states.entries()) {
      serialized[value.getSerializedKey()] = value.serialize();
    }

    return serialized;
  }

  hydrate(data) {
    for (const [key, value] of Object.entries(data)) {
      this.states.get(key).hydrate(value);
    }
  }
}

class TimezoneState extends State {
  timezone;

  selectedTimezone;

  setTimezone(timezone) {
    this.timezone = timezone;
  }

  setSelectedTimezone(timezone) {
    this.selectedTimezone = timezone;
  }

  getTimezone() {
    return this.timezone;
  }

  serialize() {
    return {
      timezone: this.timezone,
      selectedTimezone: this.selectedTimezone,
    };
  }
}

class ClocksState extends State {
  clocks = new Map();

  addClock(clock) {
    this.clocks.set(clock.id, clock);
  }

  serialize() {
    return {
      clocks: Array.from(this.clocks.values()),
    };
  }
}

let data = {
  TimezoneState: {
    timezone: "America/New_York",
    selectedTimezone: "America/Los_Angeles",
  },
  ClocksState: {
    clocks: [
      {
        id: "1",
        timezone: "America/Los_Angeles",
      },
    ],
  },
};

const appState = new AppState();

appState.registerState(new TimezoneState());
appState.registerState(new ClocksState());

appState.hydrate(data);

console.log(appState.serialize());
