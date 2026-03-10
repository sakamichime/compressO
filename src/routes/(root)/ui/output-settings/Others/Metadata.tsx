import { AnimatePresence, motion } from 'framer-motion'
import cloneDeep from 'lodash/cloneDeep'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSnapshot } from 'valtio'

import Card from '@/components/Card'
import DatePicker from '@/components/DatePicker'
import Divider from '@/components/Divider'
import Switch from '@/components/Switch'
import TextArea from '@/components/TextArea'
import TextInput from '@/components/TextInput'
import type { VideoMetadataConfig } from '@/types/app'
import { slideDownTransition } from '@/utils/animation'
import {
  appProxy,
  normalizeBatchVideosConfig,
  videoMetadataConfigInitialState,
} from '../../../-state'

type MetadataProps = {
  videoIndex: number
}

function Metadata({ videoIndex }: MetadataProps) {
  const { t } = useTranslation()
  const {
    state: {
      videos,
      isCompressing,
      isProcessCompleted,
      commonConfigForBatchCompression,
      isLoadingFiles,
    },
  } = useSnapshot(appProxy)
  const video = videos.length > 0 && videoIndex >= 0 ? videos[videoIndex] : null
  const { config } = video ?? {}
  const { shouldPreserveMetadata, metadataConfig } =
    config ?? commonConfigForBatchCompression ?? {}

  const updateMetadataField = useCallback(
    (
      field: keyof VideoMetadataConfig,
      value: string | boolean | null | undefined,
    ) => {
      if (videoIndex >= 0 && appProxy.state.videos[videoIndex]?.config) {
        if (!appProxy.state.videos[videoIndex]?.config?.metadataConfig) {
          appProxy.state.videos[videoIndex].config.metadataConfig = cloneDeep(
            videoMetadataConfigInitialState,
          )
        }
        ;(appProxy.state.videos[videoIndex].config.metadataConfig![
          field
        ] as any) = value

        if (
          field === 'creationTimeRaw' &&
          appProxy.state.videos[videoIndex]?.config?.metadataConfig
        ) {
          appProxy.state.videos[videoIndex].config.metadataConfig![
            'creationTime'
          ] = (value as any)?.toDate?.('')?.toISOString()
        }

        appProxy.state.videos[videoIndex].isConfigDirty = true
      } else {
        if (appProxy.state.videos.length > 1) {
          if (
            !appProxy.state?.commonConfigForBatchCompression?.metadataConfig
          ) {
            appProxy.state.commonConfigForBatchCompression.metadataConfig =
              cloneDeep(videoMetadataConfigInitialState)
          }
          ;(appProxy.state.commonConfigForBatchCompression.metadataConfig![
            field
          ] as any) = value

          if (
            field === 'creationTimeRaw' &&
            appProxy.state.commonConfigForBatchCompression?.metadataConfig
          ) {
            appProxy.state.commonConfigForBatchCompression.metadataConfig![
              'creationTime'
            ] = (value as any)?.toDate?.('')?.toISOString()
          }

          normalizeBatchVideosConfig()
        }
      }
    },
    [videoIndex],
  )

  const handlePreserveMetadataToggle = useCallback(() => {
    if (videoIndex >= 0 && appProxy.state.videos[videoIndex]?.config) {
      appProxy.state.videos[videoIndex].config.shouldPreserveMetadata =
        !appProxy.state.videos[videoIndex].config.shouldPreserveMetadata
      appProxy.state.videos[videoIndex].isConfigDirty = true

      if (appProxy.state.videos[videoIndex].config.shouldPreserveMetadata) {
        appProxy.state.videos[videoIndex].config.metadataConfig = null
      } else {
        appProxy.state.videos[videoIndex].config.metadataConfig = cloneDeep(
          videoMetadataConfigInitialState,
        )
      }
    } else {
      if (appProxy.state.videos.length > 1) {
        appProxy.state.commonConfigForBatchCompression.shouldPreserveMetadata =
          !appProxy.state.commonConfigForBatchCompression.shouldPreserveMetadata

        if (
          appProxy.state.commonConfigForBatchCompression.shouldPreserveMetadata
        ) {
          appProxy.state.commonConfigForBatchCompression.metadataConfig = null
        } else {
          appProxy.state.commonConfigForBatchCompression.metadataConfig =
            cloneDeep(videoMetadataConfigInitialState)
        }

        normalizeBatchVideosConfig()
      }
    }
  }, [videoIndex])

  const shouldDisableInput =
    videos.length === 0 || isCompressing || isProcessCompleted || isLoadingFiles

  return (
    <>
      <Switch
        isSelected={shouldPreserveMetadata}
        onValueChange={handlePreserveMetadataToggle}
        isDisabled={shouldDisableInput}
      >
        <div className="flex justify-center items-center">
          <span className="text-gray-600 dark:text-gray-400 block mr-2 text-sm font-bold">
            {t('outputSettings.preserveMetadata')}
          </span>
        </div>
      </Switch>
      <AnimatePresence mode="wait">
        {!shouldPreserveMetadata ? (
          <Card className="px-2 my-2 pb-4 shadow-none border-1 dark:border-none">
            <motion.div {...slideDownTransition} className="space-y-4 mt-2">
              <div className="text-zinc-700 dark:text-zinc-400">
                <p className="text-xs  italic">
                  - {t('outputSettings.leaveEmptyToKeep')}
                </p>{' '}
                <p className="text-xs  italic">
                  - {t('outputSettings.addWhitespaceToRemove')}
                </p>
              </div>
              <div>
                <TextInput
                  type="text"
                  label={t('outputSettings.metadataTitle')}
                  placeholder={t('outputSettings.enterVideoTitle')}
                  value={metadataConfig?.title ?? ''}
                  isDisabled={shouldDisableInput}
                  onValueChange={(value) => updateMetadataField('title', value)}
                  classNames={{ mainWrapper: 'my-3' }}
                />
                <Divider className="mb-6" />
              </div>
              <div>
                <TextInput
                  type="text"
                  label={t('outputSettings.metadataArtist')}
                  placeholder={t('outputSettings.enterArtistName')}
                  value={metadataConfig?.artist ?? ''}
                  isDisabled={shouldDisableInput}
                  onValueChange={(value) =>
                    updateMetadataField('artist', value)
                  }
                  classNames={{ mainWrapper: 'my-3' }}
                />
                <Divider className="mb-6" />
              </div>
              <div>
                <TextInput
                  type="text"
                  label={t('outputSettings.metadataAlbum')}
                  placeholder={t('outputSettings.enterAlbumName')}
                  value={metadataConfig?.album ?? ''}
                  isDisabled={shouldDisableInput}
                  onValueChange={(value) => updateMetadataField('album', value)}
                  classNames={{ mainWrapper: 'my-3' }}
                />
                <Divider className="mb-6" />
              </div>
              <div>
                <TextInput
                  type="text"
                  label={t('outputSettings.metadataGenre')}
                  placeholder={t('outputSettings.enterGenre')}
                  value={metadataConfig?.genre ?? ''}
                  isDisabled={shouldDisableInput}
                  classNames={{ mainWrapper: 'my-3' }}
                  onValueChange={(value) => updateMetadataField('genre', value)}
                />
                <Divider className="mb-6" />
              </div>
              <div>
                <TextInput
                  type="text"
                  label={t('outputSettings.metadataYear')}
                  placeholder={t('outputSettings.enterYearOrDate')}
                  value={metadataConfig?.year ?? ''}
                  isDisabled={shouldDisableInput}
                  classNames={{ mainWrapper: 'my-3' }}
                  onValueChange={(value) => updateMetadataField('year', value)}
                />
                <Divider className="mb-6" />
              </div>
              <div className="!mt-[-10px]">
                <TextArea
                  type="text"
                  label={t('outputSettings.metadataDescription')}
                  placeholder={t('outputSettings.enterDescription')}
                  value={metadataConfig?.description ?? ''}
                  isDisabled={shouldDisableInput}
                  onValueChange={(value) =>
                    updateMetadataField('description', value)
                  }
                  className="mb-3"
                />
                <Divider className="mb-6" />
              </div>
              <div className="!mt-[-10px]">
                <TextArea
                  type="text"
                  label={t('outputSettings.metadataSynopsis')}
                  placeholder={t('outputSettings.enterSynopsis')}
                  value={metadataConfig?.synopsis ?? ''}
                  isDisabled={shouldDisableInput}
                  onValueChange={(value) =>
                    updateMetadataField('synopsis', value)
                  }
                  className="mb-3"
                />
                <Divider className="mb-6" />
              </div>
              <div className="!mt-[-10px]">
                <TextArea
                  type="text"
                  label={t('outputSettings.metadataComment')}
                  placeholder={t('outputSettings.enterComment')}
                  value={metadataConfig?.comment ?? ''}
                  isDisabled={shouldDisableInput}
                  onValueChange={(value) =>
                    updateMetadataField('comment', value)
                  }
                  className="mb-3"
                />
                <Divider className="mb-6" />
              </div>
              <div className="!mt-[-10px]">
                <TextArea
                  type="text"
                  label={t('outputSettings.metadataCopyright')}
                  placeholder={t('outputSettings.enterCopyright')}
                  value={metadataConfig?.copyright ?? ''}
                  isDisabled={shouldDisableInput}
                  onValueChange={(value) =>
                    updateMetadataField('copyright', value)
                  }
                  className="mb-3"
                />
                <Divider className="mb-6" />
              </div>

              <div>
                <div className="flex items-center mt-[-10px]">
                  <Switch
                    isSelected={Boolean(
                      metadataConfig?.shouldEnableCreationTime,
                    )}
                    onValueChange={(isSelected) => {
                      updateMetadataField(
                        'shouldEnableCreationTime',
                        isSelected,
                      )
                    }}
                    className="flex justify-center items-center"
                    isDisabled={shouldDisableInput}
                    size="sm"
                  >
                    <div className="flex justify-center items-center">
                      <span className="text-black1 dark:text-white1 block mr-2 text-xs opacity-90">
                        {t('outputSettings.creationTime')}
                      </span>
                    </div>
                  </Switch>
                </div>
                {metadataConfig?.shouldEnableCreationTime &&
                metadataConfig?.creationTimeRaw ? (
                  <DatePicker
                    hideTimeZone
                    showMonthAndYearPickers
                    label=""
                    placeholder={t('outputSettings.enterCreationTime')}
                    isDisabled={
                      shouldDisableInput ||
                      !metadataConfig?.shouldEnableCreationTime
                    }
                    onChange={(value) => {
                      updateMetadataField('creationTimeRaw', value as any)
                    }}
                    value={metadataConfig?.creationTimeRaw as any}
                    className="mt-2"
                  />
                ) : null}
              </div>
            </motion.div>
          </Card>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default Metadata
