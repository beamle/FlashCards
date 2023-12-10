import { useController, UseControllerProps } from 'react-hook-form'
import { RadioGroup } from '@/view/ui'
import { RadioGroupProps } from '@/view/ui/Radio/radioGroup'

type ControlledRadioGroupProps = UseControllerProps &
  Omit<RadioGroupProps, 'value' | 'onChange' | 'ref'>

export const ControlledRadioGroup = ({ control, name, options }: ControlledRadioGroupProps) => {
  const {
    field: { ref, onChange, value, ...field },
  } = useController({ control: control, name: name })
  return (
    <RadioGroup ref={ref} options={options} onValueChange={onChange} value={value} {...field} />
  )
}
