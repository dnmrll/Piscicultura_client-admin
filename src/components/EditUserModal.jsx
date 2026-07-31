import React, { useState, useEffect } from 'react';
import { X, Edit, Mail, Phone, User, Shield } from 'lucide-react';
import axiosClient from '../api/axiosClient';
import toast from 'react-hot-toast';

export const EditUserModal = ({ user, isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    rol: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre || user.Nombre || '',
        apellido: user.apellido || user.Apellido || '',
        correo: user.correo || user.Correo || '',
        telefono: user.telefono || user.Telefono || '',
        rol: (user.rol || user.Rol || 'worker').toLowerCase()
      });
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userId = user._id || user.id;
      const payload = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        correo: formData.correo,
        telefono: formData.telefono,
        rol: formData.rol
      };

      const response = await axiosClient.put(`/users/${userId}`, payload);
      toast.success('Información de usuario actualizada exitosamente.');
      onSuccess(response.data?.usuario || response.data);
      onClose();
    } catch (error) {
      const msg = error.response?.data?.msg || error.response?.data?.message || 'Error al actualizar el usuario.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-[#081621] border border-[#26B79A]/30 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-[#26B79A]/20 bg-[#040D12]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#26B79A]/20 border border-[#26B79A]/40 rounded-xl flex items-center justify-center text-[#26B79A]">
              <Edit className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-none">Editar Información Básica</h2>
              <span className="text-[10px] text-gray-400 font-mono-custom tracking-wider block mt-1 uppercase">
                Edición segura de perfil sin contraseñas
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                Nombre
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-3 py-2.5 bg-[#040D12] text-white text-xs border border-[#26B79A]/20 rounded-xl focus:border-[#26B79A] focus:outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                Apellido
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-3 py-2.5 bg-[#040D12] text-white text-xs border border-[#26B79A]/20 rounded-xl focus:border-[#26B79A] focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                required
                className="w-full pl-9 pr-3 py-2.5 bg-[#040D12] text-white text-xs border border-[#26B79A]/20 rounded-xl focus:border-[#26B79A] focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                Teléfono
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
                <input
                  type="text"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-3 py-2.5 bg-[#040D12] text-white text-xs border border-[#26B79A]/20 rounded-xl focus:border-[#26B79A] focus:outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                Rol
              </label>
              <div className="relative">
                <Shield className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
                <select
                  name="rol"
                  value={formData.rol}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2.5 bg-[#040D12] text-white text-xs border border-[#26B79A]/20 rounded-xl focus:border-[#26B79A] focus:outline-none font-mono uppercase"
                >
                  <option value="boss">Boss (Jefe)</option>
                  <option value="worker">Worker (Trabajador)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#040D12] border border-amber-500/20 rounded-xl text-[10px] text-amber-400 font-mono-custom flex items-center gap-2">
            <Shield className="w-4 h-4 shrink-0" />
            <span>Por razones de seguridad, las contraseñas no se modifican desde este formulario.</span>
          </div>

          <div className="flex gap-3 pt-4 border-t border-[#26B79A]/10">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 px-4 bg-[#26B79A] hover:bg-[#12D79F] text-[#040D12] rounded-xl text-xs font-black uppercase transition-all shadow-lg shadow-[#26B79A]/20 disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Guardando...' : 'Actualizar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
