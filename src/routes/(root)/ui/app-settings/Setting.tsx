import { DropdownItem, SelectItem, useDisclosure } from '@heroui/react'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSnapshot } from 'valtio'

import Button from '@/components/Button'
import ColorPicker from '@/components/ColorPicker'
import Divider from '@/components/Divider'
import Dropdown, { DropdownMenu, DropdownTrigger } from '@/components/Dropdown'
import ErrorBoundary from '@/components/ErrorBoundary'
import Icon from '@/components/Icon'
import Modal, { ModalContent } from '@/components/Modal'
import Select from '@/components/Select'
import Switch from '@/components/Switch'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import Title from '@/components/Title'
import { toast } from '@/components/Toast'
import Tooltip from '@/components/Tooltip'
import { deleteCache as invokeDeleteCache } from '@/tauri/commands/fs'
import About from './About'
import {
  setHardwareAccelerationEnabled,
  setLanguage,
  settingsProxy,
} from '../../-state'

const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
]

type DropdownKey = 'settings' | 'about'

function Setting() {
  const { t } = useTranslation()
  const modalDisclosure = useDisclosure()

  const [selectedKey, setSelectedKey] = React.useState<DropdownKey>('settings')
  const handleDropdownAction = (item: string | number) => {
    modalDisclosure.onOpen()
    setSelectedKey(item as DropdownKey)
  }

  return (
    <>
      <div className="absolute bottom-4 left-4 p-0 z-[1]">
        <Dropdown placement="right">
          <DropdownTrigger>
            <Button isIconOnly size="sm">
              <Tooltip
                content={t('common.openSettings')}
                aria-label={t('common.openSettings')}
                placement="right"
              >
                <Icon name="setting" size={23} />
              </Tooltip>
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            variant="faded"
            aria-label="Dropdown menu with description"
            onAction={handleDropdownAction}
          >
            <DropdownItem key="settings" startContent={<Icon name="setting" />}>
              {t('settings.title')}
            </DropdownItem>
            <DropdownItem key="about" startContent={<Icon name="info" />}>
              {t('about.title')}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <Modal
        isOpen={modalDisclosure.isOpen}
        onClose={modalDisclosure.onClose}
        motionVariant="bottomToTop"
      >
        <ModalContent className="max-w-[30rem] pb-2 overflow-hidden rounded-2xl">
          <ErrorBoundary>
            {selectedKey === 'settings' ? <AppSetting /> : <About />}
          </ErrorBoundary>
        </ModalContent>
      </Modal>
    </>
  )
}

function AppSetting() {
  const { t } = useTranslation()
  const settings = useSnapshot(settingsProxy)
  const [confirmClearCache, setConfirmClearCache] = React.useState(false)
  const [isCacheDeleting, setIsCacheDeleting] = React.useState(false)

  const deleteCache = async () => {
    setIsCacheDeleting(true)
    try {
      await invokeDeleteCache()
      toast.success(t('toast.cacheCleared'))
      setConfirmClearCache(false)
    } catch (_) {
      toast.error(t('toast.cacheClearError'))
    }
    setIsCacheDeleting(false)
  }

  return (
    <div className="w-full py-12 pb-16 px-8">
      <section className="mb-6">
        <Title title={t('settings.title')} iconProps={{ name: 'setting' }} />
      </section>
      <div className="mx-auto bg-zinc-100 dark:bg-zinc-800 rounded-lg px-4 py-3 overflow-hidden">
        <div className="flex justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {t('settings.theme')}
          </p>
          <ThemeSwitcher />
        </div>
        <Divider className="my-2 dark:bg-zinc-700" />
        <div className="flex justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {t('settings.color')}
          </p>
          <ColorPicker />
        </div>
        <Divider className="my-2 dark:bg-zinc-700" />
        <div className="flex justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {t('settings.language')}
          </p>
          <Select
            size="sm"
            selectedKeys={[settings.language]}
            onChange={(evt) => {
              const value = evt?.target?.value
              if (value) setLanguage(value)
            }}
          >
            {LANGUAGES.map((lang) => (
              <SelectItem key={lang.code} textValue={lang.nativeName}>
                {lang.nativeName}
              </SelectItem>
            ))}
          </Select>
        </div>
        <Divider className="my-2 dark:bg-zinc-700" />
        <div className="flex justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {t('settings.hardwareAcceleration')}
          </p>
          <Switch
            isSelected={settings.hardwareAccelerationEnabled}
            onValueChange={setHardwareAccelerationEnabled}
          />
        </div>
        <Divider className="my-2 dark:bg-zinc-700" />
        <div className="flex justify-between items-center">
          <p className="dark:text-red-400 text-sm text-red-400">
            {t('settings.clearCache')}
          </p>
          <Tooltip
            content={t('settings.clearCache')}
            aria-label={t('settings.clearCache')}
            placement="right"
            isDisabled={confirmClearCache}
          >
            <div className="flex items-center">
              <Button
                isIconOnly={!confirmClearCache}
                size="sm"
                color="danger"
                variant={confirmClearCache ? 'solid' : 'flat'}
                onPress={() => {
                  if (!confirmClearCache) {
                    setConfirmClearCache(true)
                  } else {
                    deleteCache()
                  }
                }}
                isLoading={isCacheDeleting}
              >
                <div>
                  <Icon name="trash" />
                </div>
                <AnimatePresence initial={false}>
                  {confirmClearCache ? (
                    <motion.p
                      initial={{ width: 0, opacity: 0 }}
                      animate={{
                        width: 'auto',
                        opacity: 1,
                        transition: {
                          duration: 0.3,
                          bounce: 0.2,
                          type: 'spring',
                        },
                      }}
                      exit={{
                        width: 0,
                        opacity: 0,
                      }}
                    >
                      {t('settings.clearNow')}
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </Button>
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default Setting
