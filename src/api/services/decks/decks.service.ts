import {
  DeleteDeckArgs,
  DeleteDeckResponseType,
  GetCardsByDeckIdArgs,
  GetDeckByIdArgs,
  GetDeckByIdResponse,
  GetDecksArgs,
  GetDecksResponse,
  RetrieveCardInDeckResponseType,
  UpdateDeckArgs,
  UpdateDeckResponseType,
} from '@/api/services/decks/decks.types'
import { baseApi } from '@/api/base-api'
import { AppRootStateType } from '@/app/store'

export const decksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<GetDecksResponse, GetDecksArgs | void>({
        // getDeck (key) is name of endpoint that we see in reduxTools
        // GetDecksResponse -> the endpoint response object that the server would return
        // GetDecksArgs -> data that we would pass to the hook
        query: args => {
          return {
            url: `v1/decks`,
            params: args ?? {},
            //method: 'GET' by default
          }
        },
        // The `query: () => 'v1/decks'` is defining the API endpoint URL
        // path that should be used for the `getDecks` query.
        //
        // This line means when you call the `useGetDecksQuery` hook in your component,
        // it's going to make an HTTP GET request to the endpoint
        // `'https://api.flashcards.andrii.es/v1/decks'`.
        providesTags: ['Decks', 'Cards'],
      }),
      getDeckById: builder.query<GetDeckByIdResponse, GetDeckByIdArgs>({
        query: ({ id }) => {
          return `v1/decks/${id}`
        }, // = {url: `v1/decks/${id}`}
      }),
      getCardsInDeck: builder.query<RetrieveCardInDeckResponseType, GetCardsByDeckIdArgs>({
        query: ({ id, ...args }) => {
          return {
            url: `v1/decks/${id}/cards`,
            params: args ?? {},
          }
        },
        providesTags: ['Cards'],
      }),
      createDeck: builder.mutation<void, FormData>({
        query: args => {
          return {
            url: 'v1/decks',
            method: 'POST',
            body: args,
            formData: true,
          }
        },
        invalidatesTags: ['Decks'],
      }),
      updateDeck: builder.mutation<UpdateDeckResponseType, UpdateDeckArgs>({
        query: ({ id, name, isPrivate }) => {
          return {
            url: `v1/decks/${id}`,
            method: 'PATCH',
            body: { name, isPrivate },
          }
        },
        invalidatesTags: ['Decks'],
        onQueryStarted: async ({ id, ...args }, { dispatch, getState, queryFulfilled }) => {
          const state = getState() as AppRootStateType
          const currentPage = state.decks.currentPage
          const itemsPerPage = state.decks.itemsPerPage
          const minCardsCount = state.decks.minCardsCount
          const maxCardsCount = state.decks.maxCardsCount
          const authorId = state.decks.authorId
          const orderBy = state.decks.orderBy
          const name = state.decks.name

          const patchResult = dispatch(
            decksService.util.updateQueryData(
              'getDecks',
              {
                currentPage,
                itemsPerPage,
                maxCardsCount,
                minCardsCount,
                authorId,
                orderBy,
                name,
              },
              draft => {
                debugger
                console.log(draft)
                const deck = draft.items.find(deck => deck.id === id)
                if (deck) {
                  Object.assign(deck, { ...deck, ...args })
                }
              }
            )
          )
          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },
      }),

      deleteDeck: builder.mutation<DeleteDeckResponseType, DeleteDeckArgs>({
        query: ({ id }) => {
          return {
            url: `v1/decks/${id}`,
            method: 'DELETE',
          }
        },
        invalidatesTags: ['Decks', 'Cards'],
      }),
    }
  },
})

export const {
  useGetDecksQuery,
  useGetDeckByIdQuery,
  useGetCardsInDeckQuery,
  useCreateDeckMutation,
  useUpdateDeckMutation,
  useDeleteDeckMutation,
} = decksService // hooks that createApi function returns
