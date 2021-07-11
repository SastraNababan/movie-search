import { createModel } from '@rematch/core'
import { APISearchParams } from '@type/api-search-params'
import { RootModel } from '.'

type State = ReadonlyArray<APISearchParams>

export const search = createModel<RootModel>()({
  state: {} as State,
  reducers: {
    load: (state: State, payload: ReadonlyArray<APISearchParams>) => payload,
  },
})
