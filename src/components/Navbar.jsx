import React from 'react';
import { useAuthStore } from '../store/authStore';
import { LogOut, ShieldAlert, Fish } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-[#081621] border-b border-[#26B79A]/20 py-4 px-6 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#26B79A]/15 border border-[#26B79A]/40 rounded-xl flex items-center justify-center text-[#26B79A]">
            <Fish className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-wider leading-none">
              PISCICULTURA <span className="text-[#26B79A]">ADMIN</span>
            </h1>
            <span className="text-[10px] text-gray-400 font-mono-custom tracking-widest block mt-0.5">
              PANEL DE GESTIÓN Y SUPERVISIÓN GLOBAL
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-[#040D12] border border-[#26B79A]/20 px-3 py-1.5 rounded-lg text-xs font-mono-custom">
            <ShieldAlert className="w-4 h-4 text-[#26B79A]" />
            <span className="text-gray-300">{user?.nombre || user?.Nombre || 'Administrador'}</span>
            <span className="bg-[#26B79A]/20 text-[#26B79A] text-[10px] font-bold px-2 py-0.5 rounded uppercase">
              ADMIN
            </span>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/40 text-red-400 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
            title="Cerrar sesión"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">SALIR</span>
          </button>
        </div>
      </div>
    </header>
  );
};
