const month = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const day = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabut"];

export const getDay = date => day[date];

export const getFullDate = date =>
  `
    ${date.getUTCDate()} 
    ${month[date.getUTCMonth()]} 
    ${date.getUTCFullYear()}
  `;
