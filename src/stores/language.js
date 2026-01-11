import { atom } from 'nanostores';

// Language state: 'en' or 'id'
export const $language = atom('en');

// App loading state for transitions
export const $appState = atom('idle'); // 'idle' | 'loading'

// Translations dictionary
export const translations = {
  en: {
    // Navbar
    nav: {
      work: 'Work',
      about: 'About',
      contact: 'Contact',
    },
    // Hero
    hero: {
      name: 'JORDAN',
      lastName: 'SUTARTO',
      role: 'Creative Developer & UI Specialist',
      location: 'Based in Indonesia',
    },
    // About
    about: {
      label: 'Who I Am',
      text: 'I am a creative developer based in Indonesia, specializing in building scalable web applications. I combine technical precision with visual aesthetics to create immersive digital experiences that captivate users and drive results.',
      stats: {
        years: 'Years Experience',
        projects: 'Projects Done',
        clients: 'Happy Clients',
        coffee: 'Coffee Consumed',
      },
    },
    // Projects
    projects: {
      label: 'Selected Works',
      title: 'Featured',
      subtitle: 'Projects',
      cta: 'Interested in working together? Let\'s create something amazing.',
      ctaButton: 'Get in Touch',
    },
    // Tech Stack
    techStack: {
      label: 'Technologies I Work With',
    },
    // Contact
    contact: {
      label: 'Get in Touch',
      title: 'LET\'S WORK',
      subtitle: 'TOGETHER',
      description: 'Have a project in mind? I\'d love to hear about it. Let\'s create something amazing together.',
      button: 'Get in Touch',
      copyright: '© 2024 Jordan Sutarto. All rights reserved.',
      localTime: 'Local time:',
    },
    // Transition
    transition: {
      loading: 'SWITCHING...',
    },
    // Zoom Section
    zoom: {
      text: 'My Projects',
      quote: '"Every pixel tells a story"',
      scroll: 'Keep Scrolling',
    },
  },
  id: {
    // Navbar
    nav: {
      work: 'Karya',
      about: 'Tentang',
      contact: 'Kontak',
    },
    // Hero
    hero: {
      name: 'JORDAN',
      lastName: 'SUTARTO',
      role: 'Developer Kreatif & Spesialis UI',
      location: 'Berbasis di Indonesia',
    },
    // About
    about: {
      label: 'Tentang Saya',
      text: 'Saya adalah developer kreatif berbasis di Indonesia, berspesialisasi dalam membangun aplikasi web yang scalable. Saya menggabungkan presisi teknis dengan estetika visual untuk menciptakan pengalaman digital imersif yang memikat pengguna dan memberikan hasil.',
      stats: {
        years: 'Tahun Pengalaman',
        projects: 'Proyek Selesai',
        clients: 'Klien Puas',
        coffee: 'Kopi Diminum',
      },
    },
    // Projects
    projects: {
      label: 'Karya Pilihan',
      title: 'Proyek',
      subtitle: 'Unggulan',
      cta: 'Tertarik bekerja sama? Mari ciptakan sesuatu yang luar biasa.',
      ctaButton: 'Hubungi Saya',
    },
    // Tech Stack
    techStack: {
      label: 'Teknologi yang Saya Gunakan',
    },
    // Contact
    contact: {
      label: 'Hubungi Saya',
      title: 'AYO BEKERJA',
      subtitle: 'SAMA',
      description: 'Punya proyek dalam pikiran? Saya ingin mendengarnya. Mari ciptakan sesuatu yang luar biasa bersama.',
      button: 'Hubungi Saya',
      copyright: '© 2024 Jordan Sutarto. Hak cipta dilindungi.',
      localTime: 'Waktu lokal:',
    },
    // Transition
    transition: {
      loading: 'BERALIH...',
    },
    // Zoom Section
    zoom: {
      text: 'Proyek Saya',
      quote: '"Setiap pixel bercerita"',
      scroll: 'Lanjutkan Scroll',
    },
  },
};

// Helper function to get translation
export function t(key, lang = null) {
  const currentLang = lang || $language.get();
  const keys = key.split('.');
  let result = translations[currentLang];
  
  for (const k of keys) {
    result = result?.[k];
  }
  
  return result || key;
}
