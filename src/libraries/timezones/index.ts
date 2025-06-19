export interface Timezone {
    code: string;
    name: string;
    offset: string;
}

export function getAllTimezones(): Timezone[] {
    const timezones: Timezone[] = [
       {
          code: 'UTC',
          name: 'UTC / Zulu Time',
          offset: Intl.DateTimeFormat(undefined, {
             timeZone: 'UTC',
             timeZoneName: 'short',
          }).format(new Date()),
       },
    ];
 
    (Intl as any).supportedValuesOf('timeZone').forEach((tz: string) => {
       timezones.push({
          name: tz,
          code: tz,
          offset: Intl.DateTimeFormat(undefined, {
             timeZone: tz,
             timeZoneName: 'short',
          }).format(new Date()),
       });
    });
 
    return timezones;
}