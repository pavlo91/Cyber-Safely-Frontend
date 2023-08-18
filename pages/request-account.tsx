import { LoadingButton } from '@mui/lab'
import { FormGroup, FormLabel, Stack, Step, StepButton, StepContent, Stepper, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import { ChangeEvent, useCallback, useState } from 'react'
import { z } from 'zod'
import { CoverLayout } from '../components/common/CoverLayout'
import { NavigationView } from '../components/common/NavigationView'
import { Form } from '../components/common/form/Form'
import { FormCheckbox } from '../components/common/form/FormCheckbox'
import { FormSelect } from '../components/common/form/FormSelect'
import { FormText } from '../components/common/form/FormText'
import { useRequestAccountMutation } from '../schema'

const schemaStep1 = z.object({
  get_more_info: z.boolean(),
  create_account_for_school: z.boolean(),
  schedule_demo: z.boolean(),

  schoolRole: z.boolean(),
  parentRole: z.boolean(),
  otherRole: z.boolean(),
})

const CHECKBOX_LABELS = {
  get_more_info: 'Get more information',
  create_account_for_school: 'Create an account for your school',
  schedule_demo: 'Schedule a demo',

  schoolRole: 'A school administrator, teacher, athletic director or coach',
  parentRole: 'Parent',
  otherRole: 'Other (i.e. affiliated with a youth organization)',
}

const RequestStep1 = (props: { onNext: (data: z.infer<typeof schemaStep1>) => void }) => {
  return (
    <Form schema={schemaStep1} onSubmit={(data) => props.onNext(data)} submit="Next">
      <FormLabel sx={{ fontWeight: 'bold' }}>Would you like to:</FormLabel>

      <FormGroup>
        <FormLabel>Please check approxiate box:</FormLabel>

        <FormCheckbox name="get_more_info" label={CHECKBOX_LABELS['get_more_info']} />
        <FormCheckbox name="create_account_for_school" label={CHECKBOX_LABELS['create_account_for_school']} />
        <FormCheckbox name="schedule_demo" label={CHECKBOX_LABELS['schedule_demo']} />
      </FormGroup>

      <FormGroup>
        <FormLabel>Are you:</FormLabel>

        <FormCheckbox name="schoolRole" label={CHECKBOX_LABELS['schoolRole']} />
        <FormCheckbox name="parentRole" label={CHECKBOX_LABELS['parentRole']} />
        <FormCheckbox name="otherRole" label={CHECKBOX_LABELS['otherRole']} />
      </FormGroup>
    </Form>
  )
}

const schemaStep2 = z.object({
  firstName: z.string().min(4),
  lastName: z.string().min(4),
  jobTitle: z.string(),
  email: z.string().email(),
  phone: z
    .union([z.string().min(4), z.string().length(0)])
    .optional()
    .transform((e) => (e === '' ? null : e)),
  schoolName: z.string().min(4),
  state: z.string().min(4),
})

const RequestStep2 = (props: { onNext: (data: z.infer<typeof schemaStep2>) => void }) => {
  return (
    <Form schema={schemaStep2} onSubmit={(data) => props.onNext(data)} submit="Next">
      <FormText name="firstName" label="First Name" required />
      <FormText name="lastName" label="Last Name" required />
      <FormText name="jobTitle" label="Job Title" />
      <FormText name="email" label="E-mail" type="email" required />
      <FormText name="phone" label="Phone" type="phone" />
      <FormText name="schoolName" label="School Name" required />
      <FormText name="state" label="State/Region" required />
    </Form>
  )
}

const schemaStep3 = z.object({
  students: z.string().min(1),
  schoolType: z.enum(['Public District', 'Private School', 'Other', 'Not a School', 'PTO/PTA']),
})

const values: { value: Schema['step3']['schoolType']; title: string }[] = [
  { value: 'Public District', title: 'Public District' },
  { value: 'Private School', title: 'Private School' },
  { value: 'Other', title: 'Other' },
  { value: 'Not a School', title: 'Not a School' },
  { value: 'PTO/PTA', title: 'PTO/PTA' },
]

const RequestStep3 = (props: { onNext: (data: z.infer<typeof schemaStep3>) => void }) => {
  return (
    <Form schema={schemaStep3} onSubmit={(data) => props.onNext(data)} submit="Next">
      <FormText name="students" label="Number of Students" type="number" required />

      <FormSelect name="schoolType" label="What best describes your school?" options={values} required />
    </Form>
  )
}

const RequestStep4 = (props: { data: Schema }) => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [comments, setComments] = useState('')

  const [requestAccount] = useRequestAccountMutation()

  return (
    <Stack>
      <FormGroup>
        <TextField
          label="Comments, questions, concerns?"
          fullWidth
          variant={'filled'}
          focused
          multiline
          minRows={5}
          maxRows={5}
          value={comments}
          onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setComments(e.target.value)
          }}
        />
      </FormGroup>

      <LoadingButton
        size="large"
        loading={loading}
        onClick={async () => {
          try {
            setLoading(true)

            const reasonArray = [];
            const roleArray = [];

            if( props.data.step1.get_more_info )
              reasonArray.push(CHECKBOX_LABELS['get_more_info'])
            if( props.data.step1.create_account_for_school )
              reasonArray.push(CHECKBOX_LABELS['create_account_for_school'])
            if( props.data.step1.schedule_demo )
              reasonArray.push(CHECKBOX_LABELS['schedule_demo'])

            if( props.data.step1.schoolRole )
              roleArray.push(CHECKBOX_LABELS['schoolRole'])
            if( props.data.step1.parentRole )
              roleArray.push(CHECKBOX_LABELS['parentRole'])
            if( props.data.step1.otherRole )
              roleArray.push(CHECKBOX_LABELS['otherRole'])

            const result = await requestAccount({
              variables: {
                input: {
                  reason: reasonArray,
                  role: roleArray,
                  firstName: props.data.step2.firstName,
                  lastName: props.data.step2.lastName,
                  jobTitle: props.data.step2.jobTitle,
                  email: props.data.step2.email,
                  phone: props.data.step2.phone,
                  schoolName: props.data.step2.schoolName,
                  state: props.data.step2.state,
                  students: parseInt( props.data.step3.students ),
                  schoolType: props.data.step3.schoolType,
                  comments: comments,
                },
              },
            })

            console.error('result for request Account ----------', result);
            return;

            router.push('/dashboard')
          } finally {
            setLoading(false)
          }
        }}
      >
        Submit
      </LoadingButton>
    </Stack>
  )
}

type Schema = {
  step1: z.infer<typeof schemaStep1>
  step2: z.infer<typeof schemaStep2>
  step3: z.infer<typeof schemaStep3>
}

export default function Request() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<Partial<Schema>>({})

  const onClickStep = useCallback(
    (index: number) => {
      if (index < step) {
        setStep(index)
      }
    },
    [step]
  )

  return (
    <CoverLayout>
      <NavigationView title="Request" back={'/'}>
        <Stepper activeStep={step} orientation="vertical" nonLinear>
          <Step>
            <StepButton onClick={() => onClickStep(0)}>Information</StepButton>
            <StepContent TransitionProps={{ unmountOnExit: false }}>
              <RequestStep1
                onNext={async (step1) => {
                  setData((data) => ({ ...data, step1 }))
                  setStep((step) => step + 1)
                }}
              />
            </StepContent>
          </Step>

          <Step>
            <StepButton onClick={() => onClickStep(1)}>Credentials</StepButton>
            <StepContent TransitionProps={{ unmountOnExit: false }}>
              <RequestStep2
                onNext={async (step2) => {
                  setData((data) => ({ ...data, step2 }))
                  setStep((step) => step + 1)
                }}
              />
            </StepContent>
          </Step>

          <Step>
            <StepButton onClick={() => onClickStep(2)}>School</StepButton>
            <StepContent TransitionProps={{ unmountOnExit: false }}>
              <RequestStep3
                onNext={async (step3) => {
                  setData((data) => ({ ...data, step3 }))
                  setStep((step) => step + 1)
                }}
              />
            </StepContent>
          </Step>

          <Step>
            <StepButton onClick={() => onClickStep(3)}>Submit</StepButton>
            <StepContent TransitionProps={{ unmountOnExit: false }}>
              <RequestStep4 data={data as Schema} />
            </StepContent>
          </Step>
        </Stepper>
      </NavigationView>
    </CoverLayout>
  )
}
