export default {
  0: (state) => ({ ...state }),
  1: (state) => {
    const clima = state.climaReducer
    return {
      ...state,
      climaReducer: {
        ...clima,
        select: clima.selected,
      },
    }
  },
}
