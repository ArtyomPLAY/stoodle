import * as fb from 'firebase'
class Subject {
  constructor (name, discipline, faculty){
    this.name = name
    this.discipline = discipline
    this.faculty = faculty
  }
}

export default {
  state: {
    subject: [
      {
        name: 'Информационные технологии в практической деятельности',
        discipline: 'Информационные технологии',
        faculty: 'Факультет вычислительной техники'
      },
      {
        name: 'Правовое обеспечение в практической деятельности',
        discipline: 'Информационные технологии',
        faculty: 'Факультет экономики и управления'
      },
      {
        name: 'Программирование С++',
        discipline: 'Программирование',
        faculty: 'Факультет вычислительной техники'
      },
      {
        name: 'Объектно-ориентированное программирование',
        discipline: 'Программирование',
        faculty: 'Факультет вычислительной техники'
      }
    ]
  },
  mutations: {},
  actions: {
    async subjectCreate({commit}, payload) {
      commit('setLoading', true)
      try {
        const newSubject = new Subject(
          payload.name,
          payload.discipline,
          payload.faculty
        )
        const subject = await fb.database().ref('subject').push(newSubject)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error)
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {
    subjectAll: state => {
      return state.subject
    },
    subjectByName: state => name => {
      return state.subject.find(item => item.name === name)
    },
    subjectSimilar: state => ({ faculty, exceptName }) => {
      return state.subject.filter(
        item => item.faculty === faculty && item.name !== exceptName
      )
    },
    subjectSearch: state => query => {
      return state.subject.filter(item => item.name.match(query))
    },
    subjectAutocomplete: state => query => {
      if (query && !!query.trim()) {
        const strings = state.subject.map(item => item.name)
        return strings.filter(item => item.match(new RegExp(query, 'gi')))
      } else return []
    }
  }
}