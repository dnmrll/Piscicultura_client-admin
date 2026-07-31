import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { ShieldCheck, Lock, Mail, ArrowRight, Fish } from 'lucide-react';
import toast from 'react-hot-toast';

export const LoginPage = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!correo || !contrasena) {
      toast.error('Por favor ingrese correo y contraseña.');
      return;
    }

    try {
      await login(correo, contrasena);
      toast.success('Acceso concedido al Panel de Administración.');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message || 'Error al autenticar administrador.');
    }
  };

  return (
    <div className="min-h-screen bg-[#040D12] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dynamic Background Gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#26B79A]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#183D3D]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#081621] border border-[#26B79A]/20 rounded-2xl p-8 shadow-2xl backdrop-blur-xl relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#26B79A]/10 border border-[#26B79A]/30 rounded-2xl flex items-center justify-center mb-4 text-[#26B79A] shadow-inner">
            <Fish className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-wider flex items-center gap-2">
            ADMINISTRACIÓN
          </h1>
          <p className="text-xs text-[#26B79A] font-bold tracking-widest font-mono-custom mt-1 uppercase">
            Sistema Piscícola Global
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3.5 top-3.5 text-gray-500" />
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="admin@piscicultura.com"
                required
                className="w-full pl-11 pr-4 py-3 bg-[#040D12] text-white text-sm border border-[#26B79A]/20 rounded-xl focus:border-[#26B79A] focus:outline-none focus:ring-1 focus:ring-[#26B79A]/30 transition-all font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3.5 top-3.5 text-gray-500" />
              <input
                type="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-11 pr-4 py-3 bg-[#040D12] text-white text-sm border border-[#26B79A]/20 rounded-xl focus:border-[#26B79A] focus:outline-none focus:ring-1 focus:ring-[#26B79A]/30 transition-all font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#26B79A] hover:bg-[#12D79F] text-[#040D12] font-black py-3.5 px-4 rounded-xl transition-all duration-200 text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-[#26B79A]/15 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <span>VERIFICANDO CREDENCIALES...</span>
            ) : (
              <>
                <span>INGRESAR AL PANEL</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-[#26B79A]/10 text-center">
          <span className="text-[10px] text-gray-500 font-mono-custom uppercase tracking-widest flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#26B79A]" />
            CONEXIÓN SEGURA AUTENTICADA POR JWT
          </span>
        </div>
      </div>
    </div>
  );
};
