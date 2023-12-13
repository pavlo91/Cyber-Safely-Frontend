import { FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup } from '@mui/material'
import { DropzoneArea } from 'mui-file-dropzone'
import { ChangeEvent, useCallback, useState } from 'react'
import { z } from 'zod'
import { useCategoriesQuery } from '../../schema'
import { useUpload } from '../../utils/upload'
import { Form } from '../common/form/Form'
import { FormSelect } from '../common/form/FormSelect'
import { FormText } from '../common/form/FormText'

const schema = z.object({
  title: z.string().min(4),
  subTitle: z.string().min(4),
  url: z.string().nullable(),
  category: z.string(),
})

type CreateResourceFormProps = {
  onSubmit: (value: z.infer<typeof schema>) => void
}

export function CreateResourceForm(props: CreateResourceFormProps) {
  const [uploadType, setUploadType] = useState('URL')
  const [files, setFiles] = useState<File[]>([])
  const { upload: justUpload } = useUpload()

  const query = useCategoriesQuery()

  const getCategoryValues = useCallback(() => {
    if (query.data) {
      return query.data.categories.map((category) => {
        return { value: category.id, title: category.name }
      })
    } else {
      return []
    }
  }, [query])

  const handleChange = async (newValue: File[]) => {
    setFiles(newValue)
  }

  const onSubmit = async (data: z.infer<typeof schema>) => {
    let submitData = {} as any

    if (uploadType === 'File' && files[0]) {
      const uploadId = await justUpload(files[0])

      submitData = {
        ...data,
        uploadType: uploadType,
        uploadId: uploadId,
      }
    } else {
      submitData = {
        ...data,
        uploadType: uploadType,
      }
    }

    props.onSubmit(submitData)
  }

  return (
    <Form schema={schema} onSubmit={(data) => onSubmit(data)}>
      <FormText name="title" label="Title" required />
      <FormText name="subTitle" label="Subtitle" required />

      <FormGroup>
        <FormLabel>Would you like to upload:</FormLabel>

        <RadioGroup
          name="uploadType"
          defaultValue={'URL'}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setUploadType(e.target.value)}
        >
          <FormControlLabel value={'URL'} control={<Radio />} label="URL" />
          <FormControlLabel value={'File'} control={<Radio />} label="File" />
        </RadioGroup>
      </FormGroup>

      {uploadType === 'URL' ? (
        <FormText name="url" label="Upload URL" required />
      ) : (
        <DropzoneArea filesLimit={1} fileObjects={files} onChange={handleChange} />
      )}

      <FormSelect name="category" label="Select Category" options={getCategoryValues()} required />
    </Form>
  )
}
