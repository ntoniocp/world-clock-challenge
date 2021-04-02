import { Timezone } from '../models/timezone'
const dayjs = require('dayjs');

export function formatTimezone(timezone: any): Timezone {
  if (typeof timezone !== 'object') {
    return { name: timezone };
  }

  const [datetimeWithoutGMT] = timezone.datetime.split('+');
  const [date, time] = dayjs(datetimeWithoutGMT)
    .format('MM/DD/YYYY h:mm:ss A')
    .split(' ');

  return {
    name: timezone.timezone,
    time,
    date,
  };
}

export async function getAllTimezones(): Promise<String[]> {
  const result = await fetch('http://worldtimeapi.org/api/timezone');
  const json = await result.json();
  return json;
}

export async function getTimezone(name: string) {
  const result = await fetch(`http://worldtimeapi.org/api/timezone/${name}`);
  const json = await result.json();
  return json;
}

export async function getTimezonesByName(timezonesNamesList: string[]): Promise<Timezone[]> {
  if (!timezonesNamesList.length) return [];

  const promises: Array<Promise<Timezone>> = [];

  timezonesNamesList.forEach((name) => {
    const promise = getTimezone(name);
    promises.push(promise);
  });

  try {
    const newTimezones = await Promise.all(promises);
    return newTimezones;
  } catch (err) {
    console.log('Update error', err);
    return Promise.reject(timezonesNamesList);
  }
}