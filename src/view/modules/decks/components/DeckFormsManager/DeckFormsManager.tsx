import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useUpdateDeckMutation,
} from '@/api/services/decks/decks.service'
import { useState } from 'react'
import { EditDeckForm } from '@/view/modules/decks/components/DeckFormsManager/EditDeckForm/EditDeckForm'
import { Bin, EditPencil } from '@/view/assets'
import { GetDecksResponseItem as DeckType } from '@/api/services/decks/decks.types'
import { AddDeckForm } from '@/view/modules'
import { DeleteDeckForm } from '@/view/modules/decks/components/DeckFormsManager/DeleteDeckForm/DeleteDeckForm'

type DeckManagerProps = {
  type: 'ADD' | 'EDIT' | 'DELETE'
  deck?: DeckType
  triggerBtnText?: string
}

export const DeckFormsManager = ({ type, deck, triggerBtnText }: DeckManagerProps) => {
  const [createDeck] = useCreateDeckMutation() // first parameter is function we use to make a fetch. Second is the response from server if mutation was successful
  const [handleDeckEdit] = useUpdateDeckMutation()
  const [handleDeckDelete, { isSuccess: deleteSuccess }] = useDeleteDeckMutation()
  const [open, setOpen] = useState(false)
  //error={error1 || error2 || error3}
  let formComponent
  switch (type) {
    case 'ADD': {
      formComponent = (
        <AddDeckForm onSubmit={createDeck} open={open} onClose={() => setOpen(!open)} />
      )
      break
    }
    case 'EDIT': {
      if (!deck) throw new Error('No deck provided to form!')
      formComponent = (
        <EditDeckForm
          deckName={deck.name}
          open={open}
          onClose={() => setOpen(!open)}
          onSubmit={handleDeckEdit}
          id={deck.id}
          icon={<EditPencil />}
          checkboxLabel={'Private deck'}
          isPrivate={deck.isPrivate}
          inputLabel={'Edit name'}
          triggerBtnText={triggerBtnText}
        />
      )
      break
    }
    case 'DELETE': {
      if (!deck) throw new Error('No deck provided to form!')

      formComponent = (
        <DeleteDeckForm
          icon={<Bin />}
          id={deck.id}
          open={open}
          onClose={() => setOpen(!open)}
          deckName={deck.name}
          onSubmit={handleDeckDelete}
          triggerBtnText={triggerBtnText}
          deleteSuccess={deleteSuccess}
        />
      )
      break
    }
  }

  return formComponent
}
