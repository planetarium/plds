import {Box, Button, Flex, Stack} from '@chakra-ui/react'
import {
  DiscordIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  GoogleIcon,
  NineCorporationIcon,
  RedditIcon,
  SnapchatIcon,
  SolariumLabsIcon,
} from '@plds/assets'
import { InfoIcon } from '@plds/icons'
import { Divider } from '@plds/ui'

export default function Page() {
  return (
    <Box color="primary.500">
      <InfoIcon size={12} />
      <InfoIcon size={16} />
      <InfoIcon size={24} />
      <InfoIcon size={32} />
      <InfoIcon size={40} />

      <GoogleIcon />
      <RedditIcon solid circle />
      <FacebookMessengerIcon />
      <FacebookIcon circle />
      <SnapchatIcon circle />
      <DiscordIcon circle />

      <h2>Solarium labs</h2>
      <Flex>
        <SolariumLabsIcon solid style={{ width: 100, height: 'auto' }} />
        <SolariumLabsIcon
          solid
          style={{ width: 100, height: 'auto' }}
          type="symbol"
        />
        <SolariumLabsIcon
          style={{ width: 100, height: 'auto' }}
          type="vertical"
        />
      </Flex>

      <Divider />
      <Divider level={2} />
      <Divider level={3} my={8} />

      <h2>Nine chronicles</h2>
      <Flex>
        <NineCorporationIcon style={{ width: 100, height: 'auto' }} />
        <NineCorporationIcon
          style={{ width: 100, height: 'auto' }}
          type="symbol"
        />
        <NineCorporationIcon
          style={{ width: 100, height: 'auto' }}
          type="vertical"
        />
      </Flex>
      <Stack padding={'20px'} direction={'column'} spacing={2} backgroundColor={'#121212'} alignItems={'start'}>
        <Button size={'lg'} variant={'primary'}>primary - lg</Button>
        <Button size={'lg'} variant={'primary'} isDisabled leftIcon={<InfoIcon size={24} />}>primary - lg - icon - disabled</Button>
        <Button size={'md'} variant={'primary'}>primary - md</Button>
        <Button size={'sm'} variant={'primary'}>primary - sm</Button>
        <Button size={'lg'} variant={'secondary'}>secondary - lg</Button>
        <Button size={'lg'} variant={'secondary'} isDisabled>secondary - lg - disabled</Button>
        <Button size={'lg'} variant={'opacity'}>opacity - lg</Button>
        <Button size={'lg'} variant={'opacity'} isDisabled>opacity - lg - disabled</Button>
        <Button size={'lg'} variant={'outline'}>outline - lg</Button>
        <Button size={'lg'} variant={'outline'} isDisabled>outline - lg - disabled</Button>
      </Stack>
    </Box>
  )
}
