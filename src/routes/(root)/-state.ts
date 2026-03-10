import { getLocalTimeZone, now } from '@internationalized/date'
import cloneDeep from 'lodash/cloneDeep'
import { proxy } from 'valtio'

import i18n from '@/i18n'
import {
  App,
  AppSettings,
  VideoConfig,
  VideoMetadataConfig,
} from '../../types/app'

export const videoMetadataConfigInitialState: VideoMetadataConfig = {
  title: '',
  album: '',
  artist: '',
  comment: '',
  description: '',
  synopsis: '',
  year: '',
  genre: '',
  copyright: '',
  creationTime: '',
  creationTimeRaw: now(getLocalTimeZone()),
}

export const settingsInitialState: AppSettings = {
  hardwareAccelerationEnabled: true,
  language: 'en',
}

export const videoConfigInitialState: VideoConfig = {
  convertToExtension: 'mp4',
  presetName: 'ironclad',
  shouldDisableCompression: false,
  shouldEnableCustomVideoCodec: false,
  shouldEnableCustomDimensions: false,
  shouldEnableCustomFPS: false,
  shouldTransformVideo: false,
  shouldEnableCustomAudioCodec: false,
  audioConfig: {
    volume: 100,
    audioChannelConfig: null,
    bitrate: null,
  },
  shouldEnableAudioTrackSelection: false,
  quality: 50,
  shouldEnableQuality: false,
  shouldPreserveMetadata: true,
  metadataConfig: null,
  customThumbnailPath: null,
  shouldEnableCustomThumbnail: false,
  shouldTrimVideo: false,
  isVideoTrimEditMode: false,
  shouldEnableCustomChannel: false,
  shouldEnableCustomBitrate: false,
  subtitlesConfig: {
    subtitles: [],
    shouldEnableSubtitles: false,
  },
}

const appInitialState: App = {
  videos: [],
  isLoadingFiles: false,
  totalSelectedFilesCount: 0,
  currentVideoIndex: 0,
  totalDurationMs: 0,
  isCompressing: false,
  totalProgress: 0,
  isProcessCompleted: false,
  isBatchCompressionCancelled: false,
  isSaving: false,
  isSaved: false,
  selectedVideoIndexForCustomization: -1,
  commonConfigForBatchCompression: videoConfigInitialState,
  settings: settingsInitialState,
}

const snapshotMoment = {
  beforeCompressionStarted: 'beforeCompressionStarted',
  batchCompressionStep: 'batchCompressionStep',
} as const

type SnapshotMoment = keyof typeof snapshotMoment

type AppProxy = {
  state: App
  snapshots: Record<SnapshotMoment, App>
  takeSnapshot: (moment: SnapshotMoment) => void
  timeTravel: (to: SnapshotMoment) => void
  removeSnapshot: (moment: SnapshotMoment) => void
  clearSnapshots: () => void
  resetProxy: () => void
}

const snapshotsInitialState = {
  [snapshotMoment.beforeCompressionStarted]: cloneDeep(appInitialState),
  [snapshotMoment.batchCompressionStep]: cloneDeep(appInitialState),
}

export const appProxy: AppProxy = proxy({
  state: appInitialState,
  snapshots: snapshotsInitialState,
  takeSnapshot(moment: SnapshotMoment) {
    if (moment in snapshotMoment) {
      appProxy.snapshots[moment] = cloneDeep(appProxy.state)
    }
  },
  timeTravel(to: SnapshotMoment) {
    if (to in snapshotMoment) {
      appProxy.state = cloneDeep(appProxy.snapshots[to])
    }
  },
  removeSnapshot(moment: SnapshotMoment) {
    if (moment in snapshotMoment) {
      delete appProxy.snapshots[moment]
    }
  },
  clearSnapshots() {
    cloneDeep(snapshotsInitialState)
  },
  resetProxy() {
    appProxy.state = cloneDeep(appInitialState)
    appProxy.snapshots = cloneDeep(snapshotsInitialState)
  },
})

/**
 * Normalizes the individual non-dirty video config to match with batch config.
 */
export function normalizeBatchVideosConfig() {
  if (appProxy.state.videos.length > 1) {
    for (const index in appProxy.state.videos) {
      if (!appProxy.state.videos[index]?.isConfigDirty) {
        appProxy.state.videos[index].config = cloneDeep(
          appProxy.state.commonConfigForBatchCompression,
        )
      }
    }
  }
}

const VALID_LANGUAGES = ['en', 'zh', 'ja', 'ko', 'es', 'fr', 'de', 'ru', 'pt', 'vi', 'id'] as const

const getInitialLanguage = (): string => {
  try {
    const stored = localStorage.getItem('i18nextLng')
    if (stored && VALID_LANGUAGES.includes(stored as (typeof VALID_LANGUAGES)[number])) {
      return stored
    }
  } catch (e) {
    console.warn('Failed to read language from localStorage:', e)
  }
  return 'en'
}

export const settingsProxy = proxy({
  language: getInitialLanguage(),
  hardwareAccelerationEnabled: true,
})

export function setLanguage(lang: string) {
  settingsProxy.language = lang
  i18n.changeLanguage(lang)
  localStorage.setItem('i18nextLng', lang)
}

export function setHardwareAccelerationEnabled(enabled: boolean) {
  settingsProxy.hardwareAccelerationEnabled = enabled
}
