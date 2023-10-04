import { Box, Flex } from '@chakra-ui/react'
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
import { Button, Header } from '@plds/ui'

export default function Page() {
  return (
    <Box color="primary.500">
      <Header text="Docs" />
      <Button />
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
      <hr style={{ margin: '100px 0' }} />
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
    </Box>
  )
}
