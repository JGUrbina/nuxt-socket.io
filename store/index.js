export const state = () => ({
  tags: []
})
export const mutations = {
  // new tag
  SOCKET_newTag (state, data) {
    state.tags.unshift({ name: data.name, color: data.color, id: data.id })
    console.log('new tag')
  },
  // delete tag
  SOCKET_deletTag (state, data) {
    state.tags = state.tags.filter(tag => tag.id !== data)
    console.log('delete tag')
  },
  // update tag
  SOCKET_updateTag (state, data) {
    state.tags.forEach((tag) => {
      if (tag.id === data.id) {
        tag.name = data.name
      }
      console.log('update tag')
    })
  }

}
