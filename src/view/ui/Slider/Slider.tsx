import * as RSlider from '@radix-ui/react-slider'
import s from './Slider.module.scss'
import { useEffect, useState } from 'react'

type SliderPropsType = {
  onSubmit: (handleOnSubmit: number[]) => void
  cardsCount?: number[]
  minCardsCount: number
  maxCardsCount: number
}

export const Slider = ({ onSubmit, minCardsCount, maxCardsCount }: SliderPropsType) => {
  const [minMaxCardsInDecks, setMinMaxCardsInDecks] = useState<number[]>([
    minCardsCount,
    maxCardsCount,
  ])

  useEffect(() => {
    setMinMaxCardsInDecks([minCardsCount, maxCardsCount])
  }, [minCardsCount, maxCardsCount])

  const handleUpdate = (newValues: number[]) => {
    setMinMaxCardsInDecks(newValues)
  }

  const handleOnSubmit = () => {
    onSubmit(minMaxCardsInDecks)
    // setMinMaxCardsInDecks(cardsCount)
  }

  return (
    // <form>
    <div className={s.sliderContainer}>
      <span className={s.minMax}>{minMaxCardsInDecks?.[0]}</span>
      <RSlider.Root
        className={s.SliderRoot}
        defaultValue={[0, 100]}
        max={100}
        step={1}
        value={minMaxCardsInDecks}
        minStepsBetweenThumbs={10}
        onValueChange={handleUpdate}
        onValueCommit={handleOnSubmit}
      >
        <RSlider.Track className={s.SliderTrack}>
          <RSlider.Range className={s.SliderRange} />
        </RSlider.Track>
        <RSlider.Thumb className={s.SliderThumb} />
        <RSlider.Thumb className={s.SliderThumb} />
      </RSlider.Root>
      <span className={s.minMax}>{minMaxCardsInDecks?.[1]}</span>
    </div>
    // </form>
  )
}
