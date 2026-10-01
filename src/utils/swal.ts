import Swal from 'sweetalert2';

export const getThemeSwal = () => {
  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');

  return Swal.mixin({
    background: isDark ? '#0f172a' : '#ffffff',
    color: isDark ? '#f8fafc' : '#0f172a',
    customClass: {
      popup: 'rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl font-sans',
      title: 'text-lg font-black text-slate-900 dark:text-white',
      htmlContainer: 'text-xs sm:text-sm text-slate-600 dark:text-slate-400',
      confirmButton: 'px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md mx-1 cursor-pointer transition',
      cancelButton: 'px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 mx-1 cursor-pointer transition',
    },
    buttonsStyling: false,
  });
};