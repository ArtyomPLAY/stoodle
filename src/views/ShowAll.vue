<template>
  <v-container>
    <v-layout v-if="!loading && data" row justify-center>
      <v-flex xs12 md8 xl6>
        <v-layout column>
          <v-flex class="text-xs-center mb-3" xs6>
            <h4 class="display-1 text-main--text mb-3">{{ currentType.title }}</h4>
            <v-divider/>
          </v-flex>
          <v-flex xs6>
            <search-card
              v-for="item in data"
              :key="item.id"
              :data="item"
              :card-type="currentType.type"
              class="mb-2 search-card"
            />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout v-else justify-center>
      <v-progress-circular class="mt-5" :size="150" :width="7" color="primary" indeterminate/>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: null,
      required: false
    }
  },
  data() {
    return {
      types: [
        { type: 'software', title: 'Всё программное обеспечение' },
        { type: 'subject', title: 'Все учебные программы' },
        { type: 'faculty', title: 'Все факультеты' },
        { type: 'discipline', title: 'Все дисциплины' },
        { type: 'speciality', title: 'Все специальности' }
      ]
    }
  },
  computed: {
    currentType() {
      return this.types.find(item => item.type === this.type)
    },
    data() {
      const type = this.type
      const types = {
        software: () => {
          return this.$store.getters.softwareAll
        },
        subject: () => {
          return this.$store.getters.subjectAll
        },
        faculty: () => {
          return this.$store.getters.facultyAll
        },
        discipline: () => {
          return this.$store.getters.disciplineAll
        },
        speciality: () => {
          return this.$store.getters.specialityAll
        }
      }
      return types[type]()
    },
    loading() {
      return this.$store.getters.loading
    }
  },
  mounted() {
    this.loadData()
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      const toFetch = {
        software: 'softwareFetch',
        subject: 'subjectFetch',
        faculty: 'facultyFetch',
        discipline: 'disciplineFetch',
        speciality: 'specialityFetch'
      }
      this.$store.dispatch(toFetch[this.type])
    }
  }
}
</script>
