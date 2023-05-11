const months = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

export function getFullDate(date: Date): string {
  const theDate = new Date(date);

  return `${theDate.getDate()} ${months[theDate.getMonth()]} ${theDate.getFullYear()}`;
}

export function getClock(date: Date): string {
  const clock = new Date(date);
  return `${clock.getHours()}.${clock.getMinutes()}`;
}
