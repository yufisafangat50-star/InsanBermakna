import { motion } from 'framer-motion';

interface VisualMetaphorProps {
  index: number;
  isInView: boolean;
  reduced: boolean;
}

const METAPHOR_STYLE = {
  width: '32px',
  height: '32px',
  stroke: 'var(--color-text-secondary)',
  strokeWidth: 1.5,
  fill: 'none',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  opacity: 0.75,
};

const EASE_GENTLE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function VisualMetaphor({ index, isInView, reduced }: VisualMetaphorProps) {
  const baseTransition = { duration: reduced ? 0.4 : 1.2, ease: EASE_GENTLE, delay: reduced ? 0 : 0.2 };

  switch (index) {
    // 1. Berbeda asal, satu tujuan: Garis konvergensi dari 4 penjuru menyatu di pusat
    case 0:
      return (
        <svg style={METAPHOR_STYLE} viewBox="0 0 24 24" aria-hidden="true">
          <motion.path
            d="M 4 4 L 10 10 M 20 4 L 14 10 M 4 20 L 10 14 M 20 20 L 14 14"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={baseTransition}
          />
          <motion.circle
            cx="12"
            cy="12"
            r="3"
            fill="var(--color-accent-warm)"
            stroke="none"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ ...baseTransition, delay: reduced ? 0 : 0.5 }}
          />
        </svg>
      );

    // 2. Dalam diam, hati belajar mendengar: Siluet hening menunduk dan riak kedamaian
    case 1:
      return (
        <svg style={METAPHOR_STYLE} viewBox="0 0 24 24" aria-hidden="true">
          {/* Kepala menunduk khusyuk */}
          <motion.circle
            cx="12"
            cy="7"
            r="3"
            strokeOpacity={0.5}
            initial={{ y: -4, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: -4, opacity: 0 }}
            transition={baseTransition}
          />
          {/* Garis bahu menunduk */}
          <motion.path
            d="M 6 18 C 6 14, 9 12, 12 12 C 15 12, 18 14, 18 18"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ ...baseTransition, delay: reduced ? 0 : 0.3 }}
          />
          {/* Titik hati hening di dalam dada */}
          <motion.circle
            cx="12"
            cy="15"
            r="1.5"
            fill="var(--color-accent-warm)"
            stroke="none"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ ...baseTransition, delay: reduced ? 0 : 0.6 }}
          />
        </svg>
      );

    // 3. Senyum yang tulus ini jadi bukti: Lengkung senyuman hangat & binar cahaya
    case 2:
      return (
        <svg style={METAPHOR_STYLE} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9" strokeOpacity={0.3} />
          {/* Dua mata hangat */}
          <motion.path
            d="M 8 9 Q 9.5 8, 11 9"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={baseTransition}
          />
          <motion.path
            d="M 13 9 Q 14.5 8, 16 9"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={baseTransition}
          />
          {/* Lengkung senyuman lebar */}
          <motion.path
            d="M 7 13 Q 12 18, 17 13"
            stroke="var(--color-accent-warm)"
            strokeWidth="1.75"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ ...baseTransition, delay: reduced ? 0 : 0.3 }}
          />
        </svg>
      );

    // 4. Perjalanan dimulai dari langkah kecil dan deru motor: Lintasan jalan dan arah maju
    case 3:
      return (
        <svg style={METAPHOR_STYLE} viewBox="0 0 24 24" aria-hidden="true">
          {/* Dua garis jalan perspektif */}
          <motion.path
            d="M 7 20 L 10 5 M 17 20 L 14 5"
            strokeOpacity={0.4}
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={baseTransition}
          />
          {/* Garis marka putus-putus tengah */}
          <motion.line
            x1="12"
            y1="18"
            x2="12"
            y2="14"
            stroke="var(--color-accent-warm)"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ ...baseTransition, delay: reduced ? 0 : 0.4 }}
          />
          <motion.line
            x1="12"
            y1="11"
            x2="12"
            y2="8"
            stroke="var(--color-accent-warm)"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ ...baseTransition, delay: reduced ? 0 : 0.6 }}
          />
        </svg>
      );

    // 6. Beralas tikar sederhana: Tikar alas dan tunas bertumbuh
    case 4:
      return (
        <svg style={METAPHOR_STYLE} viewBox="0 0 24 24" aria-hidden="true">
          {/* Garis alas / tikar */}
          <line x1="3" y1="19" x2="21" y2="19" strokeOpacity={0.3} />
          {/* Batang tunas */}
          <motion.path
            d="M 12 19 L 12 9"
            stroke="var(--color-accent-warm)"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={baseTransition}
          />
          {/* Daun kiri */}
          <motion.path
            d="M 12 13 Q 8 11, 7 8 Q 11 9, 12 13"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ ...baseTransition, delay: reduced ? 0 : 0.4 }}
            style={{ originX: '12px', originY: '13px' }}
          />
          {/* Daun kanan */}
          <motion.path
            d="M 12 10 Q 16 8, 17 5 Q 13 6, 12 10"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ ...baseTransition, delay: reduced ? 0 : 0.6 }}
            style={{ originX: '12px', originY: '10px' }}
          />
        </svg>
      );

    // 7. Saling menyapa, berbagi cerita: Tautan dialog & komunikasi
    case 5:
      return (
        <svg style={METAPHOR_STYLE} viewBox="0 0 24 24" aria-hidden="true">
          {/* Gelembung pesan 1 */}
          <motion.path
            d="M 5 6 H 15 C 16.1 6 17 6.9 17 8 V 11 C 17 12.1 16.1 13 15 13 H 8 L 5 15 V 8 C 5 6.9 5.9 6 7 6"
            strokeOpacity={0.4}
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={baseTransition}
          />
          {/* Gelembung pesan 2 saling merespons */}
          <motion.path
            d="M 10 11 H 17 C 18.1 11 19 11.9 19 13 V 15 C 19 16.1 18.1 17 17 17 H 15 L 12 19 V 15"
            stroke="var(--color-accent-warm)"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ ...baseTransition, delay: reduced ? 0 : 0.4 }}
          />
        </svg>
      );

    // 8. Tawa yang pecah tanpa direncanakan: Sparkle burst / kilau tawa
    case 6:
      return (
        <svg style={METAPHOR_STYLE} viewBox="0 0 24 24" aria-hidden="true">
          {/* Bintang pusat */}
          <motion.path
            d="M 12 4 Q 12 12, 4 12 Q 12 12, 12 20 Q 12 12, 20 12 Q 12 12, 12 4"
            stroke="var(--color-accent-warm)"
            strokeWidth="1.5"
            initial={{ scale: 0, rotate: -45 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -45 }}
            transition={baseTransition}
            style={{ originX: '12px', originY: '12px' }}
          />
          {/* Percikan kecil diagonal */}
          <motion.circle
            cx="6"
            cy="6"
            r="1"
            fill="currentColor"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.6 } : { opacity: 0 }}
            transition={{ ...baseTransition, delay: reduced ? 0 : 0.4 }}
          />
          <motion.circle
            cx="18"
            cy="18"
            r="1"
            fill="currentColor"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.6 } : { opacity: 0 }}
            transition={{ ...baseTransition, delay: reduced ? 0 : 0.5 }}
          />
        </svg>
      );

    // 9. Mengangkat tangan, mengangkat semangat: Dua tangan terangkat ke atas
    case 7:
      return (
        <svg style={METAPHOR_STYLE} viewBox="0 0 24 24" aria-hidden="true">
          {/* Gelombang energi naik */}
          <motion.path
            d="M 7 19 L 7 10 L 9 8 L 9 13 M 17 19 L 17 10 L 15 8 L 15 13"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={baseTransition}
          />
          {/* Panah / cahaya harapan membumbung */}
          <motion.path
            d="M 12 15 L 12 4 M 9 7 L 12 4 L 15 7"
            stroke="var(--color-accent-warm)"
            strokeWidth="1.75"
            initial={{ y: 6, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 6, opacity: 0 }}
            transition={{ ...baseTransition, delay: reduced ? 0 : 0.3 }}
          />
        </svg>
      );

    // 10. Tangan di dada, niat di hati: Adab dan ketulusan niat
    case 8:
      return (
        <svg style={METAPHOR_STYLE} viewBox="0 0 24 24" aria-hidden="true">
          {/* Siluet hati */}
          <motion.path
            d="M 12 18 C 12 18, 5 13.5, 5 9 C 5 6.5, 7 5, 9.5 5 C 11 5, 12 6, 12 6 C 12 6, 13 5, 14.5 5 C 17 5, 19 6.5, 19 9 C 19 13.5, 12 18, 12 18 Z"
            stroke="var(--color-accent-warm)"
            strokeWidth="1.5"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
            transition={baseTransition}
            style={{ originX: '12px', originY: '11px' }}
          />
          {/* Garis tangan yang menopang lembut */}
          <motion.path
            d="M 4 20 Q 12 21, 20 20"
            strokeOpacity={0.4}
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ ...baseTransition, delay: reduced ? 0 : 0.4 }}
          />
        </svg>
      );

    // 11. Senyum-senyum kecil: Bunga mungil yang mekar
    case 9:
      return (
        <svg style={METAPHOR_STYLE} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="2.5" fill="var(--color-accent-warm)" stroke="none" />
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <motion.ellipse
              key={angle}
              cx="12"
              cy="6"
              rx="2"
              ry="3"
              strokeOpacity={0.4}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ ...baseTransition, delay: reduced ? 0 : i * 0.1 }}
              style={{ originX: '12px', originY: '12px', rotate: angle }}
            />
          ))}
        </svg>
      );

    // 12. Dari panggung sederhana: Mikrofon dan getaran suara tulus
    case 10:
      return (
        <svg style={METAPHOR_STYLE} viewBox="0 0 24 24" aria-hidden="true">
          {/* Kapsul mikrofon */}
          <rect x="9" y="4" width="6" height="9" rx="3" stroke="var(--color-accent-warm)" />
          {/* Pegangan / stand */}
          <path d="M 6 10 C 6 13.3 8.7 16 12 16 C 15.3 16 18 13.3 18 10 M 12 16 L 12 20 M 8 20 L 16 20" strokeOpacity={0.4} />
          {/* Gelombang suara */}
          <motion.path
            d="M 3 10 C 3 6, 5 3, 5 3 M 21 10 C 21 6, 19 3, 19 3"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.6 } : { opacity: 0 }}
            transition={{ ...baseTransition, delay: reduced ? 0 : 0.4 }}
          />
        </svg>
      );

    // 13. Berdiskusi, saling memahami: Buku terbuka & persilangan ide
    case 11:
      return (
        <svg style={METAPHOR_STYLE} viewBox="0 0 24 24" aria-hidden="true">
          {/* Buku terbuka */}
          <motion.path
            d="M 12 18 C 9 16, 4 16, 3 17 V 6 C 4 5, 9 5, 12 7 C 15 5, 20 5, 21 6 V 17 C 20 16, 15 16, 12 18 Z M 12 7 V 18"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={baseTransition}
          />
          {/* Titik cahaya pemahaman */}
          <motion.circle
            cx="12"
            cy="4"
            r="1.5"
            fill="var(--color-accent-warm)"
            stroke="none"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ ...baseTransition, delay: reduced ? 0 : 0.4 }}
          />
        </svg>
      );

    // 14. Sarapan sederhana di pagi hari: Cangkir hangat & uap mengepul
    case 12:
      return (
        <svg style={METAPHOR_STYLE} viewBox="0 0 24 24" aria-hidden="true">
          {/* Cangkir */}
          <path d="M 5 11 H 17 V 16 C 17 18.2 15.2 20 13 20 H 9 C 6.8 20 5 18.2 5 16 Z M 17 12 H 18 C 19.1 12 20 12.9 20 14 C 20 15.1 19.1 16 18 16 H 17" strokeOpacity={0.4} />
          {/* Uap hangat mengepul */}
          <motion.path
            d="M 8 7 Q 9 4, 8 2 M 12 8 Q 13 5, 12 3 M 16 7 Q 17 4, 16 2"
            stroke="var(--color-accent-warm)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
            transition={baseTransition}
          />
        </svg>
      );

    // 15. Pagi yang bergerak, tubuh yang bugar: Matahari terbit & sinar dinamis
    case 13:
      return (
        <svg style={METAPHOR_STYLE} viewBox="0 0 24 24" aria-hidden="true">
          {/* Horizon */}
          <line x1="3" y1="18" x2="21" y2="18" strokeOpacity={0.3} />
          {/* Matahari terbit */}
          <motion.path
            d="M 7 18 A 5 5 0 0 1 17 18"
            stroke="var(--color-accent-warm)"
            fill="var(--color-accent-warm)"
            fillOpacity={0.2}
            initial={{ y: 4, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 4, opacity: 0 }}
            transition={baseTransition}
          />
          {/* Sinar mentari */}
          <motion.path
            d="M 12 7 L 12 4 M 6 12 L 4 11 M 18 12 L 20 11 M 8 9 L 6 7 M 16 9 L 18 7"
            stroke="var(--color-accent-warm)"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
            transition={{ ...baseTransition, delay: reduced ? 0 : 0.3 }}
          />
        </svg>
      );

    // 19. Selembar kertas, sebuah komitmen: Dokumen amanah & meterai
    case 14:
      return (
        <svg style={METAPHOR_STYLE} viewBox="0 0 24 24" aria-hidden="true">
          {/* Dokumen dengan sudut terlipat */}
          <path d="M 6 4 H 14 L 18 8 V 20 H 6 Z M 14 4 V 8 H 18" strokeOpacity={0.4} />
          {/* Garis tulisan janji/komitmen */}
          <line x1="9" y1="12" x2="15" y2="12" strokeOpacity={0.3} />
          <line x1="9" y1="15" x2="13" y2="15" strokeOpacity={0.3} />
          {/* Stempel komitmen amanah */}
          <motion.circle
            cx="14"
            cy="16"
            r="2"
            stroke="var(--color-accent-warm)"
            fill="var(--color-accent-warm)"
            fillOpacity={0.3}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ ...baseTransition, delay: reduced ? 0 : 0.4 }}
          />
        </svg>
      );

    // 20. Dibalut almamater, menyongsong esok hari: Bintang penunjuk fajar & almamater
    case 15:
      return (
        <svg style={METAPHOR_STYLE} viewBox="0 0 24 24" aria-hidden="true">
          {/* Kerah almamater */}
          <path d="M 6 19 L 9 10 L 12 14 L 15 10 L 18 19" strokeOpacity={0.4} />
          {/* Bintang fajar kejora / esok hari */}
          <motion.path
            d="M 12 3 L 13.5 7 L 17 8 L 14 10.5 L 15 14 L 12 12 L 9 14 L 10 10.5 L 7 8 L 10.5 7 Z"
            stroke="var(--color-accent-warm)"
            fill="var(--color-accent-warm)"
            fillOpacity={0.25}
            initial={{ scale: 0, rotate: -20 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -20 }}
            transition={baseTransition}
            style={{ originX: '12px', originY: '8px' }}
          />
        </svg>
      );

    // 21. Berdiri khidmat dalam hening: Lentera obor adab yang tegak
    case 16:
      return (
        <svg style={METAPHOR_STYLE} viewBox="0 0 24 24" aria-hidden="true">
          {/* Tiang tegak khidmat */}
          <line x1="12" y1="21" x2="12" y2="12" strokeOpacity={0.4} />
          {/* Wadah lentera */}
          <path d="M 9 12 H 15 L 14 16 H 10 Z" strokeOpacity={0.4} />
          {/* Api obor adab */}
          <motion.path
            d="M 12 5 C 10 8, 10 10, 12 11 C 14 10, 14 8, 12 5 Z"
            stroke="var(--color-accent-warm)"
            fill="var(--color-accent-warm)"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={baseTransition}
            style={{ originX: '12px', originY: '11px' }}
          />
        </svg>
      );

    // 22. Pose terbaik untuk kenangan terbaik: Kamera foto & memori
    case 17:
      return (
        <svg style={METAPHOR_STYLE} viewBox="0 0 24 24" aria-hidden="true">
          {/* Bodi kamera */}
          <path d="M 4 8 H 7 L 9 6 H 15 L 17 8 H 20 C 21.1 8 22 8.9 22 10 V 18 C 22 19.1 21.1 20 20 20 H 4 C 2.9 20 2 19.1 2 18 V 10 C 2 8.9 2.9 8 4 8 Z" strokeOpacity={0.4} />
          {/* Lensa kamera */}
          <motion.circle
            cx="12"
            cy="14"
            r="3.5"
            stroke="var(--color-accent-warm)"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={baseTransition}
          />
          {/* Titik blitz */}
          <circle cx="18" cy="11" r="1" fill="currentColor" opacity={0.5} />
        </svg>
      );

    // 23. Terima kasih telah menjadi bagian cerita ini: Pohon ukhuwah abadi
    case 18:
      return (
        <svg style={METAPHOR_STYLE} viewBox="0 0 24 24" aria-hidden="true">
          {/* Batang pohon */}
          <path d="M 12 21 V 13 M 12 16 L 9 13 M 12 15 L 15 12" strokeOpacity={0.4} />
          {/* Mahkota daun rindang */}
          <motion.path
            d="M 12 4 C 8 4, 6 7, 7 10 C 5 12, 6 15, 9 15 C 10 15, 11 14.5, 12 14 C 13 14.5, 14 15, 15 15 C 18 15, 19 12, 17 10 C 18 7, 16 4, 12 4 Z"
            stroke="var(--color-accent-warm)"
            fill="var(--color-accent-warm)"
            fillOpacity={0.2}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={baseTransition}
            style={{ originX: '12px', originY: '14px' }}
          />
        </svg>
      );

    default:
      return null;
  }
}
