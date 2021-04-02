import { useState, useEffect } from 'react';

import {
  getTimezone,
  formatTimezone,
  getTimezonesByName,
  getAllTimezones,
} from '../services/timezones';

import usePollingStrategy from './usePollingStrategy';
import { Timezone } from '../models/timezone'

interface Params {
  initialSelected: Timezone[],
  updateListEvery: number
}

type ReturnType = [
  timezones: string[],
  selectedTimezones: Timezone[],
  selectTimezones: Function,
  deselectTimezones: Function
]

export default function useTimezones({ initialSelected, updateListEvery }: Params): ReturnType {
  const [timezones, setTimezones]: [string[], Function] = useState([]);
  const [selectedTimezones, setSelectedTimezones]: [Timezone[], Function] = useState(
    () => initialSelected || []
  );

  usePollingStrategy(updateListEvery, async () => {
    const timezonesNames = selectedTimezones.map((tz: Timezone) => tz.name);
    const updatedTimezones = await getTimezonesByName(timezonesNames);
    const formatedTimezones = updatedTimezones.map(formatTimezone);
    setSelectedTimezones(formatedTimezones);
  });

  useEffect(function setTimezonesList() {
    const getTimezonesNames = async () => {
      const timezonesNames = await getAllTimezones();
      setTimezones(timezonesNames);
    };

    getTimezonesNames();
  }, []);

  const selectTimezone = async (name: string) => {
    const timezone = await getTimezone(name);
    const formatedTimezone = formatTimezone(timezone);
    setSelectedTimezones([...selectedTimezones, formatedTimezone]);
  };

  const deselectTimezone = (name: string) => {
    setSelectedTimezones(selectedTimezones.filter((tz) => tz.name !== name));
  };

  return [timezones, selectedTimezones, selectTimezone, deselectTimezone];
}
