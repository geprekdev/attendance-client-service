const month = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
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
    ${date.getDate()} 
    ${month[date.getMonth()]} 
    ${date.getFullYear()}
  `;
