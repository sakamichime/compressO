import { AnimatePresence, motion } from 'framer-motion'
import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { subscribe, useSnapshot } from 'valtio'
import { subscribeKey } from 'valtio/utils'

import Button from '@/components/Button'
import NumberInput from '@/components/NumberInput'
import Switch from '@/components/Switch'
import { slideDownTransition } from '@/utils/animation'
import { appProxy, normalizeBatchVideosConfig } from '../../-state'

type VideoDimensionsProps = {
  videoIndex: number
}

function VideoDimensions({ videoIndex }: VideoDimensionsProps) {
  const { t } = useTranslation()
  const {
    state: {
      videos,
      isCompressing,
      isProcessCompleted,
      isLoadingFiles,
      commonConfigForBatchCompression,
    },
  } = useSnapshot(appProxy)

  const isBatchMode = videoIndex < 0 && videos.length > 1
  const video = videos.length > 0 && videoIndex >= 0 ? videos[videoIndex] : null
  const { config, dimensions: videoOriginalDimensions } = video ?? {}

  const batchConfig = isBatchMode ? commonConfigForBatchCompression : null

  const {
    shouldEnableCustomDimensions,
    customDimensions: videoCustomDimensions,
  } = config ?? batchConfig ?? {}

  const isCropping = Boolean(
    config?.shouldTransformVideo &&
      config?.transformVideoConfig?.transforms?.crop,
  )

  const [dimensions, setDimensions] = React.useState(() => ({
    width:
      (videoCustomDimensions
        ? videoCustomDimensions[0]
        : videoOriginalDimensions?.width) ?? 0,
    height:
      (videoCustomDimensions
        ? videoCustomDimensions[1]
        : videoOriginalDimensions?.height) ?? 0,
  }))

  useEffect(() => {
    if (isBatchMode && videoCustomDimensions) {
      setDimensions({
        width: videoCustomDimensions[0],
        height: videoCustomDimensions[1],
      })
    }
  }, [isBatchMode, videoCustomDimensions])

  useEffect(() => {
    let unsubscribe: (() => void) | undefined

    if (config && !isBatchMode) {
      unsubscribe = subscribeKey(
        appProxy.state.videos[videoIndex].config,
        'shouldTransformVideo',
        (shouldTransformVideo) => {
          const targetVideo = appProxy.state.videos[videoIndex]
          if (shouldTransformVideo) {
            if (targetVideo.config.transformVideoConfig) {
              const transforms =
                targetVideo.config.transformVideoConfig?.transforms
              if (transforms?.crop) {
                setDimensions({
                  width: transforms.crop.width,
                  height: transforms.crop.height,
                })
              }
            }
          } else {
            if (targetVideo.dimensions) {
              setDimensions({
                width: targetVideo.dimensions.width!,
                height: targetVideo.dimensions.height!,
              })
            }
          }
        },
      )
    }
    return () => {
      unsubscribe?.()
    }
  }, [videoIndex, config, isBatchMode])

  useEffect(() => {
    let unsubscribe: (() => void) | undefined

    if (isBatchMode) return

    const transformVideoConfig =
      appProxy.state.videos[videoIndex]?.config?.transformVideoConfig
    if (isCropping && transformVideoConfig?.transforms?.crop) {
      unsubscribe = subscribe(transformVideoConfig, () => {
        const targetVideo = appProxy.state.videos[videoIndex]
        const shouldTransformVideo = targetVideo.config.shouldTransformVideo
        const transformCrop =
          targetVideo.config.transformVideoConfig?.transforms?.crop
        if (shouldTransformVideo && transformCrop) {
          const _dimensions: [number, number] = [
            transformCrop?.width ?? 0,
            transformCrop?.height ?? 0,
          ]
          setDimensions({
            width: _dimensions[0],
            height: _dimensions[1],
          })
          appProxy.state.videos[videoIndex].config.customDimensions =
            _dimensions
          appProxy.state.videos[videoIndex].isConfigDirty = true
        }
      })
    }
    return () => {
      unsubscribe?.()
    }
  }, [videoIndex, isCropping, isBatchMode])

  const handleChange = useCallback(
    (value: number, type: 'width' | 'height') => {
      if (!value || value <= 0) {
        return
      }

      if (isBatchMode) {
        const _dimensions: [number, number] =
          type === 'width'
            ? [value, dimensions.height]
            : [dimensions.width, value]
        setDimensions((s) => ({
          ...s,
          width: _dimensions[0],
          height: _dimensions[1],
        }))
        appProxy.state.commonConfigForBatchCompression.customDimensions =
          _dimensions
        normalizeBatchVideosConfig()
        return
      }

      if (videoIndex < 0) return

      const targetVideo = appProxy.state.videos[videoIndex]
      const targetVideoDimensions = targetVideo.config?.shouldTransformVideo
        ? {
            width:
              targetVideo?.config?.transformVideoConfig?.transforms?.crop
                ?.width ?? targetVideo?.dimensions?.width,
            height:
              targetVideo?.config?.transformVideoConfig?.transforms?.crop
                ?.height ?? targetVideo?.dimensions?.height,
          }
        : targetVideo?.dimensions
      if (
        targetVideoDimensions == null ||
        Number.isNaN(targetVideoDimensions?.width) ||
        Number.isNaN(targetVideoDimensions?.height)
      ) {
        return null
      }
      const aspectRatio =
        targetVideoDimensions.width! / targetVideoDimensions.height!
      const _dimensions: [number, number] =
        type === 'width'
          ? [value, Math.round(value / aspectRatio)]
          : [Math.round(value * aspectRatio), value]
      setDimensions((s) => ({
        ...s,
        width: _dimensions[0],
        height: _dimensions[1],
      }))
      appProxy.state.videos[videoIndex].config.customDimensions = _dimensions
      appProxy.state.videos[videoIndex].isConfigDirty = true
    },
    [videoIndex, isBatchMode, dimensions.height, dimensions.width],
  )

  const handleSwitchToggle = useCallback(() => {
    if (isBatchMode) {
      appProxy.state.commonConfigForBatchCompression.shouldEnableCustomDimensions =
        !shouldEnableCustomDimensions
      normalizeBatchVideosConfig()
    } else if (videoIndex >= 0 && appProxy.state.videos[videoIndex]?.config) {
      appProxy.state.videos[videoIndex].config.shouldEnableCustomDimensions =
        !shouldEnableCustomDimensions
      appProxy.state.videos[videoIndex].isConfigDirty = true
    }
  }, [videoIndex, isBatchMode, shouldEnableCustomDimensions])

  const shouldDisableInput =
    videos.length === 0 || isCompressing || isProcessCompleted || isLoadingFiles

  return (
    <>
      <Switch
        isSelected={shouldEnableCustomDimensions}
        onValueChange={handleSwitchToggle}
        isDisabled={shouldDisableInput}
      >
        <p className="text-gray-600 dark:text-gray-400 text-sm mr-2 w-full font-bold">
          {t('video.dimensions')}
        </p>
      </Switch>
      <AnimatePresence mode="wait">
        {shouldEnableCustomDimensions ? (
          <motion.div {...slideDownTransition}>
            <div className="mt-2 flex items-center space-x-2">
              <NumberInput
                label={t('video.width')}
                className="max-w-[120px] xl:max-w-[150px]"
                value={dimensions?.width}
                onValueChange={(val) => handleChange(val, 'width')}
                labelPlacement="outside"
                classNames={{ label: '!text-gray-600 dark:!text-gray-400' }}
                isDisabled={!shouldEnableCustomDimensions || shouldDisableInput}
              />
              <NumberInput
                label={t('video.height')}
                className="max-w-[120px] xl:max-w-[150px]"
                value={dimensions?.height}
                onValueChange={(val) => handleChange(val, 'height')}
                labelPlacement="outside"
                classNames={{ label: '!text-gray-600 dark:!text-gray-400' }}
                isDisabled={
                  videos.length === 0 ||
                  isCompressing ||
                  isProcessCompleted ||
                  isLoadingFiles
                }
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                { label: '480p', width: 640, height: 480 },
                { label: '720p', width: 1280, height: 720 },
                { label: '1080p', width: 1920, height: 1080 },
                { label: '2k', width: 2560, height: 1440 },
                { label: '4k', width: 3840, height: 2160 },
              ].map((preset) => (
                <Button
                  size="sm"
                  radius="md"
                  key={preset.label}
                  onPress={() => {
                    if (isBatchMode) {
                      setDimensions({
                        width: preset.width,
                        height: preset.height,
                      })
                      appProxy.state.commonConfigForBatchCompression.customDimensions =
                        [preset.width, preset.height] as [number, number]
                      normalizeBatchVideosConfig()
                    } else {
                      handleChange(preset.width, 'width')
                    }
                  }}
                  isDisabled={shouldDisableInput}
                  className="min-w-[unset]"
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default React.memo(VideoDimensions)
