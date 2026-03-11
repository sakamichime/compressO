import { SelectItem } from '@heroui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSnapshot } from 'valtio'

import Select from '@/components/Select'
import Switch from '@/components/Switch'
import { useGpuInfo } from '@/hooks/useGpuInfo'
import { extensions } from '@/types/compression'
import { slideDownTransition } from '@/utils/animation'
import { appProxy, normalizeBatchVideosConfig } from '../../-state'

type VideoExtension = keyof typeof extensions.video

type VideoCodecOption = {
  value: string
  name: string
  description: string
  compatible_containers: VideoExtension[]
  vendor?: 'nvidia' | 'amd' | 'applesilicon'
}

const VIDEO_CODECS: readonly VideoCodecOption[] = [
  {
    value: 'libx264',
    name: 'H.264 (AVC)',
    description: 'Most compatible, good quality',
    compatible_containers: ['mp4', 'mov', 'mkv', 'avi'] as VideoExtension[],
  },
  {
    value: 'libx265',
    name: 'H.265 (HEVC)',
    description: 'Better compression, newer standard',
    compatible_containers: ['mp4', 'mov', 'mkv'] as VideoExtension[],
  },
  {
    value: 'libvpx-vp9',
    name: 'VP9',
    description: 'Open-source, great for web',
    compatible_containers: ['webm', 'mkv'] as VideoExtension[],
  },
  {
    value: 'libaom-av1',
    name: 'AV1',
    description: 'Best compression, very slow',
    compatible_containers: ['mp4', 'mkv', 'webm'] as VideoExtension[],
  },
  {
    value: 'mpeg4',
    name: 'MPEG-4',
    description: 'Legacy codec, wide support',
    compatible_containers: ['mp4', 'mov', 'mkv', 'avi'] as VideoExtension[],
  },
]

const HARDWARE_CODECS: readonly VideoCodecOption[] = [
  {
    value: 'h264_nvenc',
    name: 'H.264 (NVENC)',
    description: 'NVIDIA hardware accelerated',
    compatible_containers: ['mp4', 'mov', 'mkv'] as VideoExtension[],
    vendor: 'nvidia',
  },
  {
    value: 'hevc_nvenc',
    name: 'H.265 (NVENC)',
    description: 'NVIDIA hardware accelerated HEVC',
    compatible_containers: ['mp4', 'mov', 'mkv'] as VideoExtension[],
    vendor: 'nvidia',
  },
  {
    value: 'h264_amf',
    name: 'H.264 (AMF)',
    description: 'AMD hardware accelerated',
    compatible_containers: ['mp4', 'mov', 'mkv'] as VideoExtension[],
    vendor: 'amd',
  },
  {
    value: 'hevc_amf',
    name: 'H.265 (AMF)',
    description: 'AMD hardware accelerated HEVC',
    compatible_containers: ['mp4', 'mov', 'mkv'] as VideoExtension[],
    vendor: 'amd',
  },
]

type VideoCodecProps = {
  videoIndex: number
}

const CODEC_TRANSLATION_KEYS: Record<string, { name: string; description: string }> = {
  libx264: { name: 'h264', description: 'h264Desc' },
  libx265: { name: 'h265', description: 'h265Desc' },
  'libvpx-vp9': { name: 'vp9', description: 'vp9Desc' },
  'libaom-av1': { name: 'av1', description: 'av1Desc' },
  mpeg4: { name: 'mpeg4', description: 'mpeg4Desc' },
  h264_nvenc: { name: 'h264Nvenc', description: 'h264NvencDesc' },
  hevc_nvenc: { name: 'hevcNvenc', description: 'hevcNvencDesc' },
  h264_amf: { name: 'h264Amf', description: 'h264AmfDesc' },
  hevc_amf: { name: 'hevcAmf', description: 'hevcAmfDesc' },
}

function VideoCodec({ videoIndex }: VideoCodecProps) {
  const { t } = useTranslation()
  const {
    state: {
      videos,
      isCompressing,
      isProcessCompleted,
      commonConfigForBatchCompression,
      isLoadingFiles,
      settings,
    },
  } = useSnapshot(appProxy)
  const { gpuInfo, isLoading: isGpuLoading } = useGpuInfo()
  const video = videos.length > 0 && videoIndex >= 0 ? videos[videoIndex] : null
  const { config } = video ?? {}
  const { shouldEnableCustomVideoCodec, customVideoCodec, convertToExtension } =
    config ?? commonConfigForBatchCompression ?? {}

  const currentExtension = convertToExtension ?? 'mp4'

  const supportedVendors = useMemo(() => {
    return gpuInfo.map((gpu) => gpu.vendor)
  }, [gpuInfo])

  const availableHardwareCodecs = useMemo(() => {
    if (!settings.hardwareAccelerationEnabled) return []
    return HARDWARE_CODECS.filter((codec) => {
      if (!codec.vendor) return false
      return supportedVendors.includes(codec.vendor)
    })
  }, [settings.hardwareAccelerationEnabled, supportedVendors])

  const allCodecs = useMemo(() => {
    return [...availableHardwareCodecs, ...VIDEO_CODECS]
  }, [availableHardwareCodecs])

  useEffect(() => {
    if (shouldEnableCustomVideoCodec && customVideoCodec) {
      const currentCodec = allCodecs.find((c) => c.value === customVideoCodec)
      if (
        currentCodec &&
        !currentCodec.compatible_containers.includes(currentExtension)
      ) {
        if (videoIndex >= 0 && appProxy.state.videos[videoIndex]?.config) {
          appProxy.state.videos[videoIndex].config.customVideoCodec = undefined
        } else {
          if (appProxy.state.videos.length > 1) {
            appProxy.state.commonConfigForBatchCompression.customVideoCodec =
              undefined
          }
        }
      }
    }
  }, [
    currentExtension,
    shouldEnableCustomVideoCodec,
    customVideoCodec,
    videoIndex,
    allCodecs,
  ])

  const handleSwitchToggle = useCallback(() => {
    if (videoIndex >= 0 && appProxy.state.videos[videoIndex]?.config) {
      appProxy.state.videos[videoIndex].config.shouldEnableCustomVideoCodec =
        !shouldEnableCustomVideoCodec
      appProxy.state.videos[videoIndex].isConfigDirty = true
    } else {
      if (appProxy.state.videos.length > 1) {
        appProxy.state.commonConfigForBatchCompression.shouldEnableCustomVideoCodec =
          !shouldEnableCustomVideoCodec
        normalizeBatchVideosConfig()
      }
    }
  }, [videoIndex, shouldEnableCustomVideoCodec])

  const handleValueChange = useCallback(
    (value: string) => {
      if (videoIndex >= 0 && appProxy.state.videos[videoIndex]?.config) {
        appProxy.state.videos[videoIndex].config.customVideoCodec = value
        appProxy.state.videos[videoIndex].isConfigDirty = true
      } else {
        if (appProxy.state.videos.length > 1) {
          appProxy.state.commonConfigForBatchCompression.customVideoCodec =
            value
          normalizeBatchVideosConfig()
        }
      }
    },
    [videoIndex],
  )

  const shouldDisableInput =
    videos.length === 0 ||
    isCompressing ||
    isProcessCompleted ||
    isLoadingFiles ||
    isGpuLoading

  const initialCodecValue = customVideoCodec ?? 'libx264'

  const compatibleCodecs = allCodecs.filter((codec) =>
    codec.compatible_containers.includes(currentExtension),
  )

  return (
    <>
      <Switch
        isSelected={shouldEnableCustomVideoCodec}
        onValueChange={handleSwitchToggle}
        isDisabled={shouldDisableInput}
      >
        <p className="text-gray-600 dark:text-gray-400 text-sm mr-2 w-full font-bold">
          {t('codec.title')}
        </p>
      </Switch>
      <AnimatePresence mode="wait">
        {shouldEnableCustomVideoCodec ? (
          <motion.div {...slideDownTransition}>
            <Select
              fullWidth
              label={t('codec.selectCodec')}
              className="block flex-shrink-0 rounded-2xl !mt-8"
              selectedKeys={[initialCodecValue]}
              size="sm"
              value={initialCodecValue}
              onChange={(evt) => {
                const value = evt?.target?.value
                if (value) {
                  handleValueChange(value)
                }
              }}
              selectionMode="single"
              isDisabled={!shouldEnableCustomVideoCodec || shouldDisableInput}
              classNames={{
                label: '!text-gray-600 dark:!text-gray-400 text-xs',
              }}
            >
              {compatibleCodecs?.map((codec) => {
                const translationKey = CODEC_TRANSLATION_KEYS[codec.value]
                const codecName = translationKey
                  ? t(`codec.${translationKey.name}`)
                  : codec.name
                const codecDesc = translationKey
                  ? t(`codec.${translationKey.description}`)
                  : codec.description
                return (
                  <SelectItem
                    key={codec.value}
                    textValue={codecName}
                    className="flex justify-center items-center"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm">{codecName}</span>
                      <span className="text-xs text-gray-500">
                        {codecDesc}
                      </span>
                    </div>
                  </SelectItem>
                )
              })}
            </Select>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default VideoCodec
