import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { BossManagement } from '../components/BossManagement';
import { WorkerSupervision } from '../components/WorkerSupervision';
import { UserCheck, Users, ShieldCheck, Database } from 'lucide-react';

export const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('bosses');

  return (
    <div className="min-h-screen bg-[#040D12] text-gray-100 flex flex-col selection:bg-[#26B79A] selection:text-[#040D12]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Metric Cards Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#081621] border border-[#26B79A]/20 p-5 rounded-2xl flex items-center justify-between shadow-lg">
            <div>
              <span className="text-[10px] text-gray-400 font-mono-custom uppercase tracking-wider block">
                Módulo Activo
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">Gestión Administrativa</h3>
            </div>
            <div className="w-10 h-10 bg-[#26B79A]/10 border border-[#26B79A]/30 rounded-xl flex items-center justify-center text-[#26B79A]">
              <Database className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-[#081621] border border-[#26B79A]/20 p-5 rounded-2xl flex items-center justify-between shadow-lg">
            <div>
              <span className="text-[10px] text-gray-400 font-mono-custom uppercase tracking-wider block">
                Nivel de Permisos
              </span>
              <h3 className="text-lg font-bold text-[#26B79A] mt-0.5">Administrador Global</h3>
            </div>
            <div className="w-10 h-10 bg-[#26B79A]/10 border border-[#26B79A]/30 rounded-xl flex items-center justify-center text-[#26B79A]">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-[#081621] border border-[#26B79A]/20 p-5 rounded-2xl flex items-center justify-between shadow-lg">
            <div>
              <span className="text-[10px] text-gray-400 font-mono-custom uppercase tracking-wider block">
                Estado del Servidor
              </span>
              <h3 className="text-lg font-bold text-[#12D79F] mt-0.5 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#12D79F] animate-pulse" />
                CONECTADO
              </h3>
            </div>
            <div className="w-10 h-10 bg-[#12D79F]/10 border border-[#12D79F]/30 rounded-xl flex items-center justify-center text-[#12D79F]">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#26B79A]/20 font-mono-custom">
          <button
            onClick={() => setActiveTab('bosses')}
            className={`flex items-center gap-2 py-3 px-6 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
              activeTab === 'bosses'
                ? 'border-[#26B79A] text-[#26B79A] bg-[#26B79A]/10'
                : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-800/40'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Jefes (Boss)</span>
          </button>

          <button
            onClick={() => setActiveTab('workers')}
            className={`flex items-center gap-2 py-3 px-6 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
              activeTab === 'workers'
                ? 'border-[#26B79A] text-[#26B79A] bg-[#26B79A]/10'
                : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-800/40'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Trabajadores (Worker)</span>
          </button>
        </div>

        {/* Active Tab Content */}
        <div className="animate-fadeIn">
          {activeTab === 'bosses' ? <BossManagement /> : <WorkerSupervision />}
        </div>
      </main>

      <footer className="bg-[#081621] border-t border-[#26B79A]/10 py-4 px-6 text-center text-xs font-mono-custom text-gray-500">
        PISCICULTURA GLOBAL &copy; 2026 | PANEL DE ADMINISTRACIÓN AUTENTICADO POR JWT
      </footer>
    </div>
  );
};
