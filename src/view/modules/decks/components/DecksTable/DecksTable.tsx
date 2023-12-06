import { Table, TableHeader, TBody, TCell, TRow } from '@/view/ui/Table/table'
import { Button } from '@/view/ui/Button'
import s from './DecksTable.module.scss'
import { Link } from 'react-router-dom'
import { PlayInCircle } from '@/view/assets/icons'
import { GetDecksResponseItem as DeckType } from '@/api/services/decks/decks.types'
import { DeckFormsManager } from '@/view/modules/decks/components/DeckFormsManager/DeckFormsManager'

type DecksTable = {
  currentTableData: DeckType[]
  sort: any
  setSort: any
}

export type Column = {
  key: string
  sortable?: boolean
  title: string
}

const columns: Array<Column> = [
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'cardsCount',
    title: 'Cards',
  },
  {
    key: 'updated',
    title: 'Last Updated',
  },
  {
    key: 'createdBy',
    title: 'Created by',
  },
]

export const DecksTable = ({ currentTableData, sort, setSort }: DecksTable) => {
  return (
    <Table>
      <TableHeader columns={columns} sort={sort} onSort={setSort} />
      <TBody>
        {currentTableData.map((deck: DeckType) => {
          return (
            <TRow key={deck.id}>
              <TCell>
                {deck.cover && <img alt="Image view" src={deck.cover} width={50} />}
                {deck?.name}
              </TCell>
              <TCell>{deck?.cardsCount}</TCell>
              <TCell>{new Date(deck?.updated).toLocaleDateString()}</TCell>
              <TCell>{deck?.author?.name}</TCell>
              <TCell>
                <div className={s.iconsContainer}>
                  <Button
                    fullWidth={false}
                    as={Link}
                    to={`/decks/${deck.id}/learn`}
                    variant={'icon'}
                    icon={<PlayInCircle />}
                  />
                  <DeckFormsManager type={'EDIT'} deck={deck} />
                  <DeckFormsManager type={'DELETE'} deck={deck} />
                </div>
              </TCell>
            </TRow>
          )
        })}
      </TBody>
    </Table>
  )
}
