import React, { useState, useEffect } from 'react';
import { UserCheck, UserPlus, KeyRound, Edit, RefreshCw, Mail, Phone } from 'lucide-react';
import axiosClient from '../api/axiosClient';
import { CreateBossModal } from './CreateBossModal';
import { EditUserModal } from './EditUserModal';
import toast from 'react-hot-toast';

export const BossManagement = () => {
  const [bosses, setBosses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const fetchBosses = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get('/users?rol=boss');
      const data = response.data?.usuarios || response.data?.users || response.data || [];
      setBosses(data);
    } catch (error) {
      toast.error('Error al cargar la lista de jefes (Boss).');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBosses();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#081621] border border-[#26B79A]/20 p-5 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#26B79A]/20 border border-[#26B79A]/40 rounded-xl flex items-center justify-center text-[#26B79A]">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white leading-none">Gestión de Jefes (Boss)</h2>
            <p className="text-xs text-gray-400 mt-1">
              Administración de cuentas con red de estanques y códigos únicos vinculados.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchBosses}
            className="p-2.5 bg-[#040D12] border border-[#26B79A]/20 hover:border-[#26B79A]/50 text-gray-300 hover:text-white rounded-xl transition-all cursor-pointer"
            title="Recargar"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2 bg-[#26B79A] hover:bg-[#12D79F] text-[#040D12] font-black px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#26B79A]/15 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Dar de Alta Jefe</span>
          </button>
        </div>
      </div>

      {/* Tabla de Jefes */}
      <div className="bg-[#081621] border border-[#26B79A]/20 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono-custom">
            <thead className="bg-[#040D12] text-[#26B79A] uppercase tracking-wider border-b border-[#26B79A]/20">
              <tr>
                <th className="py-4 px-6">Jefe / Nombre</th>
                <th className="py-4 px-6">Correo</th>
                <th className="py-4 px-6">Teléfono</th>
                <th className="py-4 px-6">Código Único (Boss)</th>
                <th className="py-4 px-6 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#26B79A]/10 text-gray-300">
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-500">
                    Cargando lista de jefes...
                  </td>
                </tr>
              ) : bosses.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-500">
                    No se encontraron usuarios registrados con el rol "boss".
                  </td>
                </tr>
              ) : (
                bosses.map((boss) => {
                  const nombre = `${boss.nombre || boss.Nombre || ''} ${boss.apellido || boss.Apellido || ''}`.trim() || 'Sin Nombre';
                  const correo = boss.correo || boss.Correo || '-';
                  const telefono = boss.telefono || boss.Telefono || '-';
                  const code = boss.uniqueCode || boss.UniqueCode || 'N/A';

                  return (
                    <tr key={boss._id || boss.id} className="hover:bg-[#26B79A]/5 transition-colors">
                      <td className="py-4 px-6 font-bold text-white flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#26B79A]/10 border border-[#26B79A]/30 flex items-center justify-center text-[#26B79A] text-xs font-black">
                          {nombre.charAt(0)}
                        </div>
                        <span>{nombre}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5 text-gray-300">
                          <Mail className="w-3.5 h-3.5 text-gray-500" />
                          <span>{correo}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5 text-gray-300">
                          <Phone className="w-3.5 h-3.5 text-gray-500" />
                          <span>{telefono}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 bg-[#26B79A]/15 border border-[#26B79A]/40 text-[#26B79A] font-bold px-2.5 py-1 rounded-md text-xs font-mono uppercase tracking-wider">
                          <KeyRound className="w-3.5 h-3.5" />
                          {code}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => setEditingUser(boss)}
                          className="inline-flex items-center gap-1 bg-[#26B79A]/10 hover:bg-[#26B79A]/20 border border-[#26B79A]/30 text-[#26B79A] px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Editar</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CreateBossModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={fetchBosses}
      />

      <EditUserModal
        user={editingUser}
        isOpen={!!editingUser}
        onClose={() => setEditingUser(null)}
        onSuccess={fetchBosses}
      />
    </div>
  );
};
