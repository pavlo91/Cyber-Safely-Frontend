import { z } from 'zod'
import { Form } from '../common/form/Form'
import { FormText } from '../common/form/FormText'

const schema = z.object({
  name: z.string().min(4),
})

type CreateCategoryFormProps = {
  onSubmit: (value: z.infer<typeof schema>) => void
}

export function CreateCategoryForm(props: CreateCategoryFormProps) {
  return (
    <Form schema={schema} onSubmit={(data) => props.onSubmit(data)}>
      <FormText name="name" label="Name" required />
    </Form>
  )
}
