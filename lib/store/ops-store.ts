'use client';
import { create } from 'zustand';

type OpsState = { online: boolean; pttActive: boolean; emergencyOpen: boolean; setOnline: (v: boolean) => void; setPttActive: (v: boolean) => void; setEmergencyOpen: (v: boolean) => void };
export const useOpsStore = create<OpsState>((set) => ({ online: true, pttActive: false, emergencyOpen: false, setOnline: (online) => set({ online }), setPttActive: (pttActive) => set({ pttActive }), setEmergencyOpen: (emergencyOpen) => set({ emergencyOpen }) }));
