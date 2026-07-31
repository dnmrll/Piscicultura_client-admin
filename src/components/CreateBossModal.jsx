import React, { useState } from 'react';
import { X, UserPlus, Key, Mail, Phone, User, KeyRound } from 'lucide-react';
import axiosClient from '../api/axiosClient';
import toast from 'react-hot-toast';

export const CreateBossModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    contrasena: '',
    uniqueCode: ''
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        rol: 'boss'
      };

      const response = await axiosClient.post('/users', payload);
      toast.success('Jefe (Boss) creado exitosamente.');
      onSuccess(response.data?.usuario || response.data);
      onClose();
      setFormData({ nombre: '', apellido: '', correo: '', telefono: '', contrasena: '', uniqueCode: '' });
    } catch (error) {
      const msg = error.response?.data?.msg || error.response?.data?.message || 'Error al crear el jefe.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-[#081621] border border-[#26B79A]/30 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-[#26B79A]/20 bg-[#040D12]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#26B79A]/20 border border-[#26B79A]/40 rounded-xl flex items-center justify-center text-[#26B79A]">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-none">Dar de Alta Nuevo Jefe</h2>
              <span className="text-[10px] text-gray-400 font-mono-custom tracking-wider block mt-1 uppercase">
                Creación de perfil de administración de estanques
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
                  placeholder="Carlos"
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
                  placeholder="Gómez"
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
                placeholder="jefe@estanque.com"
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
                  placeholder="5551234567"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#040D12] text-white text-xs border border-[#26B79A]/20 rounded-xl focus:border-[#26B79A] focus:outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <Key className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
                <input
                  type="password"
                  name="contrasena"
                  value={formData.contrasena}
                  onChange={handleChange}
                  required
                  minLength={6}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#040D12] text-white text-xs border border-[#26B79A]/20 rounded-xl focus:border-[#26B79A] focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                Código Único (Opcional)
              </label>
              <span className="text-[10px] text-[#26B79A] font-mono-custom">
                Autogenerado si se omite
              </span>
            </div>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3 top-3 text-[#26B79A]" />
              <input
                type="text"
                name="uniqueCode"
                value={formData.uniqueCode}
                onChange={handleChange}
                placeholder="Ej. BOSS123 (Vacío = Auto)"
                className="w-full pl-9 pr-3 py-2.5 bg-[#040D12] text-white text-xs border border-[#26B79A]/30 rounded-xl focus:border-[#26B79A] focus:outline-none font-mono uppercase"
              />
            </div>
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
              {loading ? 'Guardando...' : 'Registrar Jefe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
