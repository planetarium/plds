import {
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CloseIcon,
  CopyIcon,
  DocsIcon,
  DoneIcon,
  EditIcon,
  EtherscanIcon,
  HamburgerIcon,
  InfoIcon,
  LinkIcon,
  OutlinkIcon,
  SlideCloseIcon,
  TimeIcon,
  TransferIcon,
  WarningIcon,
} from '@plds/icons'

import { IconType } from './types'

export function renderIcon(type: IconType) {
  switch (type) {
    case 'check':
      return <CheckIcon />
    case 'chevronDown':
      return <ChevronDownIcon />
    case 'chevronLeft':
      return <ChevronLeftIcon />
    case 'chevronRight':
      return <ChevronRightIcon />
    case 'chevronUp':
      return <ChevronUpIcon />
    case 'close':
      return <CloseIcon />
    case 'copy':
      return <CopyIcon />
    case 'docs':
      return <DocsIcon />
    case 'done':
      return <DoneIcon />
    case 'edit':
      return <EditIcon />
    case 'etherscan':
      return <EtherscanIcon />
    case 'hamburger':
      return <HamburgerIcon />
    case 'info':
      return <InfoIcon />
    case 'link':
      return <LinkIcon />
    case 'outlink':
      return <OutlinkIcon />
    case 'slideClose':
      return <SlideCloseIcon />
    case 'time':
      return <TimeIcon />
    case 'transfer':
      return <TransferIcon />
    case 'warning':
      return <WarningIcon />
    default:
      return null
  }
}
