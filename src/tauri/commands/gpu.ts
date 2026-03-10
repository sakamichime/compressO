import { invoke } from '@tauri-apps/api/core'

import type { GpuInfo } from '@/types/app'

export async function getGpuInfo(): Promise<GpuInfo[]> {
  return invoke<GpuInfo[]>('get_gpu_info')
}
