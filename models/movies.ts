import { createModel } from '@rematch/core'
import { APISearchResponse } from '@type/api-search-response'
import { RootModel } from '.'

type State = ReadonlyArray<APISearchResponse>

export const movies = createModel<RootModel>()({
  state: [] as State,
  reducers: {
    load: (state: State, payload: ReadonlyArray<APISearchResponse>) => payload,
    // reset: (state: State) => [],
  },
})
