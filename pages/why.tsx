import { Box, Container, Stack, Typography } from '@mui/material'
import NextImage from 'next/image'
import LandingLayout from '../components/layout/LandingLayout'
import { useLogoUrl, useMobile } from '../helpers/hooks'

import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

function Section1() {
  const logoUrl = useLogoUrl()

  return (
    <Box position="relative">
      <NextImage
        fill
        alt="Hero"
        sizes="100vw"
        src="/images/landing/hero.jpg"
        style={{
          zIndex: -1,
          opacity: 0.3,
          objectFit: 'cover',
        }}
      />
      <Box minHeight="100vh" display="flex" alignItems="center">
        <Container disableGutters>
          <Stack alignItems="center" textAlign="center" spacing={4} px={2} py={16}>
            <Box width="100%" maxWidth={540}>
              <Box position="relative" paddingTop="46%">
                <NextImage fill sizes="540px" alt="Logo" src={logoUrl} style={{ objectFit: 'contain' }} />
              </Box>
            </Box>
            <Typography variant="h4" fontWeight="bold">
              WHY CYBERSAFELY.ai
            </Typography>
            <Typography variant="h6" maxWidth="780px" fontWeight="400">
              CyberSafely.ai is a unique web-based scanning system designed to protect students from social media
              dangers which are dramatically increasing at an alarming rate. We have developed it as a support tool for
              all members of the “Village” it takes to raise a child, by helping you protect and lead your children and
              school students down their best path. Our resources are unlike any others.
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}

function Section2() {
  const { isMobile } = useMobile()

  return (
    <Box position="relative" bgcolor="primary.main" overflow="hidden">
      <Container disableGutters>
        <Stack px={isMobile ? 2 : 16} py={16} alignItems="flex-start">
          <Typography variant="h4" fontWeight="bold" textAlign="left" mb={3}>
            What makes us different:
          </Typography>
          <Stack
            direction="row"
            rowGap={8}
            width="100%"
            maxWidth="800px"
            flexWrap="wrap"
            spacing={0}
            justifyContent="space-between"
          >
            <Stack spacing={0} maxWidth="300px" position="relative">
              <Typography variant="h6" fontWeight="bold" textAlign="left">
                1ST
              </Typography>
              <Typography textAlign="left">
                <strong>First and foremost, the intent is to help protect student safety and welfare</strong> by
                identifying and becoming more aware of harmful activity received. Secondly, by pivoting negative
                behavior before it is sent, students will benefit, and have an edge as they compete toward college and
                career.
              </Typography>
              <Typography
                color="#ffffff2e"
                fontSize="110px"
                variant="h1"
                fontWeight="bold"
                position="absolute"
                left="60%"
                top="-10%"
                z-index="1"
              >
                1ST
              </Typography>
            </Stack>
            <Stack spacing={0} maxWidth="300px" position="relative">
              <Typography variant="h6" fontWeight="bold" textAlign="left">
                24/7
              </Typography>
              <Typography textAlign="left">
                It is a digital assistant designed to scan for social media threats and any other harmful activity 7
                days a week 24 hours a day, <strong>no matter what device or network the student is on.</strong>
              </Typography>
              <Typography
                color="#ffffff2e"
                fontSize="110px"
                variant="h1"
                fontWeight="bold"
                position="absolute"
                left="60%"
                top="-15%"
                z-index="1"
              >
                24/7
              </Typography>
            </Stack>
            <Stack spacing={0} maxWidth="300px" position="relative">
              <Typography variant="h6" fontWeight="bold" textAlign="left">
                Student Privacy
              </Typography>
              <Typography textAlign="left">
                We use AI models to scan social media accounts for dangerous or harmful activity only. The AI is the
                primary tool utilized to intervene and alert the school and parents on any concerning post. Neither the
                software or our people can view texts, emails or any private conversations. We do not monitor devices.
              </Typography>
              <Typography
                color="#ffffff2e"
                fontSize="110px"
                variant="h1"
                fontWeight="bold"
                position="absolute"
                left="30%"
                top="-15%"
                z-index="1"
              >
                Privacy
              </Typography>
            </Stack>
            <Stack spacing={0} maxWidth="300px" position="relative">
              <Typography variant="h6" fontWeight="bold" textAlign="left">
                Parent/School
              </Typography>
              <Typography textAlign="left">
                CyberSafely.ai sends an alert to the pre-determined parent(s) and school staff. In an urgent situation
                from a threat such as bullying, sexual content, suicide, or illegal use of weapons,{' '}
                <strong>
                  having more than one person receive an alert may result in a faster response when time is of the
                  essence.
                </strong>
              </Typography>
              <Typography
                color="#ffffff2e"
                fontSize="110px"
                variant="h1"
                fontWeight="bold"
                position="absolute"
                left="60%"
                top="-15%"
                z-index="1"
              >
                REAL TIME
              </Typography>
            </Stack>
            <Stack spacing={0} maxWidth="300px" position="relative">
              <Typography variant="h6" fontWeight="bold" textAlign="left">
                AI
              </Typography>
              <Typography textAlign="left">
                Our software simulates human intelligence to search and detect threats and negative behavior on social
                media. AI is self-learning. As the language model adapts to threats in real-time,{' '}
                <strong>
                  it becomes better at identifying harmful content out of context, not relying only on key words.
                </strong>
              </Typography>
              <Typography
                color="#ffffff2e"
                fontSize="110px"
                variant="h1"
                fontWeight="bold"
                position="absolute"
                left="70%"
                top="-15%"
                z-index="1"
              >
                AI
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

function Section3() {
  const { isMobile } = useMobile()

  return (
    <Box position="relative">
      <Container disableGutters>
        <Stack px={isMobile ? 2 : 16} py={16} alignItems="flex-start">
          <Typography variant="h4" fontWeight="bold" textAlign="left">
            Real-Life Examples
          </Typography>
          <Typography variant="h6" textAlign="left">
            CyberSafely.ai™ addresses issues such as bullying, sexual content, suicide, and the illegal use of weapons.
          </Typography>
          <ReactPlayer url="/TestimonialVideo.mp4" controls={true} width="100%" height="100%" />
          <Typography variant="h6" textAlign="left" sx={{ fontStyle: 'italic' }}>
            “We, as coaches, are often surrogate parents, mentors and the difference-makers in the lives of our
            athletes.” Coach Don Montgomery from his article “Lessons from Leaders”
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}

export default function Why() {
  return (
    <LandingLayout>
      <Section1 />
      <Section2 />
      <Section3 />
    </LandingLayout>
  )
}
