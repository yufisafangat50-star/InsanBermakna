export interface Message {
  id: number;
  lines: string[];
}
export const messages: Message[] = [
  {
    id: 1,
    lines: [
      'Untuk semua hal yang kamu kerjakan diam-diam:',
      'mungkin tidak semuanya terlihat,',
      'tapi bukan berarti tidak berarti.',
    ],
  },
  {
    id: 2,
    lines: [
      'Mungkin kamu merasa bagianmu kecil.',
      'Tapi sebuah perjalanan memang dibangun',
      'dari banyak bagian kecil.',
    ],
  },
  {
    id: 3,
    lines: [
      'Terima kasih karena tetap hadir,',
      'bahkan pada hari-hari ketika semuanya terasa tidak mudah.',
    ],
  },
  {
    id: 4,
    lines: [
      'Kalau suatu hari kamu merasa tidak cukup baik,',
      'ingat bahwa pernah ada sebuah perjalanan',
      'yang menjadi berbeda karena kamu ada di dalamnya.',
    ],
  },
  {
    id: 5,
    lines: [
      'Ada banyak hal baik yang terjadi,',
      'sekadar karena kamu memutuskan',
      'untuk mencoba satu kali lagi.',
    ],
  },
  {
    id: 6,
    lines: [
      'Lelah yang kamu rasakan hari ini adalah bukti',
      'bahwa kamu sedang mengusahakan',
      'sesuatu yang berarti.',
    ],
  },
  {
    id: 7,
    lines: [
      'Mungkin tidak ada tepuk tangan',
      'untuk setiap hal kecil yang kamu selesaikan,',
      'tapi percayalah, itu membuat perbedaan.',
    ],
  },
  {
    id: 8,
    lines: [
      'Perjalanan terpanjang selalu dibangun',
      'dari keputusan-keputusan kecil',
      'untuk tidak berhenti hari ini.',
    ],
  },
  {
    id: 9,
    lines: [
      'Terima kasih telah memberikan',
      'waktu, tenaga, dan ruang di kepalamu',
      'untuk kita lewati bersama.',
    ],
  },
  {
    id: 10,
    lines: [
      'Hari-hari yang berat telah berlalu,',
      'dan kamu berhasil melewatinya.',
      'Kamu berhak untuk bernapas sejenak.',
    ],
  },
  {
    id: 11,
    lines: [
      'Mungkin tidak semua yang kamu lakukan terlihat,',
      'tapi saat semuanya selesai,',
      'kita sadar ada bagian dari perjalanan ini yang tidak akan sama tanpamu.',
    ],
  },
  {
    id: 12,
    lines: [
      'Terima kasih sudah tetap datang pada hari-hari',
      'ketika menyerah terasa jauh lebih mudah,',
      'semoga kelak kamu ingat bahwa kita pernah melewatinya bersama.',
    ],
  },
  {
    id: 13,
    lines: [
      'Ada hal-hal yang baru terasa berharga',
      'setelah kita tidak lagi menjalaninya,',
      'dan mungkin perjalanan kita ini adalah salah satunya.',
    ],
  },
  {
    id: 14,
    lines: [
      'Kalau suatu hari nanti kamu mengingat masa ini,',
      'semoga yang datang lebih dulu bukan lelahnya,',
      'melainkan orang-orang yang membuatnya terasa ringan.',
    ],
  },
  {
    id: 15,
    lines: [
      'Tidak semua hal berjalan sempurna,',
      'ada kecewa dan salah,',
      'tapi di antara semuanya ada banyak sekali hal baik yang layak untuk kamu ingat.',
    ],
  },
  {
    id: 16,
    lines: [
      'Ada begitu banyak hal kecil yang mungkin segera terlupa,',
      'seperti tawa di sela pekerjaan,',
      'yang anehnya kelak paling kita rindukan.',
    ],
  },
  {
    id: 17,
    lines: [
      'Kamu mungkin tidak merasa melakukan sesuatu yang besar,',
      'tapi sebuah perjalanan memang dibangun dari banyak hal kecil,',
      'dan kamu adalah salah satu yang terpenting.',
    ],
  },
  {
    id: 18,
    lines: [
      'Tidak apa-apa kalau setelah ini kamu ingin berjalan ke tempat lain,',
      'karena yang terpenting kita pernah sampai di titik ini bersama.',
    ],
  },
  {
    id: 19,
    lines: [
      'Barangkali setelah ini kita akan kembali menjadi orang-orang',
      'yang hanya sesekali berpapasan,',
      'tapi kenyataan bahwa kita pernah berjalan bersama tidak akan bisa dihapus.',
    ],
  },
  {
    id: 20,
    lines: [
      'Untuk semua bantuan yang luput kami balas',
      'dan waktu yang kamu korbankan,',
      'terima kasih banyak karena sekarang kamu akhirnya boleh beristirahat.',
    ],
  },
  {
    id: 21,
    lines: [
      'Suatu hari nanti mungkin nama acara ini tidak lagi sering kita sebut,',
      'tapi semoga ada bagian kecil dari dirimu',
      'yang tetap tersenyum mengingat kamu pernah di sini.',
    ],
  },
  {
    id: 22,
    lines: [
      'Kalau suatu hari kamu bertanya apakah semua lelah itu sepadan,',
      'mungkin jawabannya bukan pada hasil akhir,',
      'tapi pada kenyataan bahwa kita pernah menjalaninya bersama.',
    ],
  },
];
export function getRandomMessage(excludeIds: number[] = []): Message {
  const available = messages.filter((m) => !excludeIds.includes(m.id));
  const pool = available.length > 0 ? available : messages;
  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}
