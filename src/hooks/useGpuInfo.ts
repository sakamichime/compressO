import { useEffect, useState } from 'react'

import { getGpuInfo } from '@/tauri/commands/gpu'
import type { GpuInfo } from '@/types/app'

export function useGpuInfo() {
  const [gpuInfo, setGpuInfo] = useState<GpuInfo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getGpuInfo()
      .then(setGpuInfo)
      .finally(() => setIsLoading(false))
  }, [])

  return { gpuInfo, isLoading }
}
