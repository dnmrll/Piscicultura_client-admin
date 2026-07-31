import React, { useState, useEffect } from 'react';
import { Users, RefreshCw, Mail, Phone, KeyRound, Edit } from 'lucide-react';
import axiosClient from '../api/axiosClient';
import { EditUserModal } from './EditUserModal';
import toast from 'react-hot-toast';

export const WorkerSupervision = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);

  const fetchWorkers = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get('/users?rol=worker');
      const data = response.data?.usuarios || response.data?.users || response.data || [];
      setWorkers(data);
    } catch (error) {
      toast.error('Error al cargar la lista de trabajadores (Worker).');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#081621] border border-[#26B79A]/20 p-5 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#26B79A]/20 border border-[#26B79A]/40 rounded-xl flex items-center justify-center text-[#26B79A]">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white leading-none">Supervisión de Trabajadores (Worker)</h2>
            <p className="text-xs text-gray-400 mt-1">
              Visualización de operarios y sus respectivos códigos de vinculación con jefes.
            </p>
          </div>
        </div>

        <button
          onClick={fetchWorkers}
          className="p-2.5 bg-[#040D12] border border-[#26B79A]/20 hover:border-[#26B79A]/50 text-gray-300 hover:text-white rounded-xl transition-all cursor-pointer self-start sm:self-auto"
          title="Recargar"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Tabla de Trabajadores */}
      <div className="bg-[#081621] border border-[#26B79A]/20 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono-custom">
            <thead className="bg-[#040D12] text-[#26B79A] uppercase tracking-wider border-b border-[#26B79A]/20">
              <tr>
                <th className="py-4 px-6">Trabajador / Operario</th>
                <th className="py-4 px-6">Correo</th>
                <th className="py-4 px-6">Teléfono</th>
                <th className="py-4 px-6">Código de Vinculación Jefe</th>
                <th className="py-4 px-6 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#26B79A]/10 text-gray-300">
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-500">
                    Cargando trabajadores...
                  </td>
                </tr>
              ) : workers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-500">
                    No se encontraron trabajadores registrados con el rol "worker".
                  </td>
                </tr>
              ) : (
                workers.map((worker) => {
                  const nombre = `${worker.nombre || worker.Nombre || ''} ${worker.apellido || worker.Apellido || ''}`.trim() || 'Sin Nombre';
                  const correo = worker.correo || worker.Correo || '-';
                  const telefono = worker.telefono || worker.Telefono || '-';
                  const code = worker.uniqueCode || worker.UniqueCode || 'Sin Vinculación';

                  return (
                    <tr key={worker._id || worker.id} className="hover:bg-[#26B79A]/5 transition-colors">
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
                        <span className="inline-flex items-center gap-1.5 bg-[#040D12] border border-[#26B79A]/30 text-[#26B79A] font-bold px-2.5 py-1 rounded-md text-xs font-mono uppercase tracking-wider">
                          <KeyRound className="w-3.5 h-3.5 text-[#26B79A]" />
                          {code}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => setEditingUser(worker)}
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

      <EditUserModal
        user={editingUser}
        isOpen={!!editingUser}
        onClose={() => setEditingUser(null)}
        onSuccess={fetchWorkers}
      />
    </div>
  );
};
