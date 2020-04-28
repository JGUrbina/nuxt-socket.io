<template>
  <div class="container mt-5">
    <p class="pb-2 border-bottom border-light">
      Etiquetas
    </p>
    <b-form-input
      id="input-2"
      v-model="Tag"
      v-validate="{required: true}"
      required
      placeholder="Añadir etiqueta"
      name="addtag"
      @keyup.enter="addNewTag"
    />
    <span>
      {{ !errors.first('addtag') ? '' : 'Ingrese una nueva tag, no se permite el campo vacio' }}
    </span>
    <div class="mt-3">
      <ul id="tags" class="m-0 p-0">
        <li
          v-for="(tag, index) in tags"
          :key="index"
          class="row col-12 justify-content-between align-bottom"
        >
          <div class="d-flex align-items-center">
            <span
              class="color-tag"
              :style="{ 'background-color': tag.color }"
            />
            <p class="m-0">
              {{ tag.name }}
            </p>
          </div>

          <b-button-group>
            <b-button
              class="bg-transparent text-dark border-white"
              @click="$bvModal.show('tag_' + tag.id)"
            >
              editar
            </b-button>
            <b-button
              class="bg-transparent text-dark border-white"
              @click="deleted(tag.id)"
            >
              eliminar
            </b-button>
          </b-button-group>
          <b-modal :id="'tag_' + tag.id" title="Edite la tag" hide-footer modal-header-close>
            <b-form-input
              id="input-3"
              v-validate="{required: true}"
              :value="tag.name"
              required
              placeholder="Añadir etiqueta"
              name="updatetag"
              @keyup.enter="updated(tag.id, $event)"
            />
            <span>
              {{ !errors.first('updatetag') ? '' : 'Edite la tag, no se permite enviar el campo vacio' }}
            </span>
            <b-button-group class="justify-content-between d-flex flex-0">
              <b-button
                class="mt-3"
                @click="$bvModal.hide('tag_' + tag.id)"
              >
                cancelar
              </b-button>
            </b-button-group>
          </b-modal>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Vue from 'vue'
import VeeValidate from 'vee-validate/dist/vee-validate'
Vue.use(VeeValidate)
export default {
  data () {
    return {
      Tag: '',
      edit: false
    }
  },
  sockets: {
    connect () {
      console.log('socket connected')
    }
  },
  computed: mapState(['tags']),
  methods: {

    addNewTag () {
      if (this.Tag !== '') {
        this.$socket.emit('createTag', {
          name: this.Tag,
          color: '#' + ((Math.random() * 0xFFFFFF) << 0).toString(16)

        })
        this.Tag = ''
      } else {

      }
    },
    deleted (id) {
      console.log(id)
      console.log(this.$socket.io)
      this.$socket.emit('deleted', id)
    },
    updated (id, event) {
      if (event.target.value !== '') {
        console.log('client update')
        const name = event.target.value
        this.$socket.emit('updated', { id, name })
        this.$bvModal.hide('tag_' + id)
      }
    }

  }
}
</script>
<style>
.color-tag {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
