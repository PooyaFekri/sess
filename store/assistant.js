export const state = () => ({
    courses: [],
    students: [],
    profs: [],
})

export const getters = {
    courses: (state) => state.courses,
    students: (state) => state.students,
    profs: (state) => state.profs,
}
export const mutations = {
    setCourses(state, courses) {
        state.courses = courses
    },
    setStudents(state, students) {
        state.students = students
    },
    setProfs(state, profs) {
        state.profs = profs
    },
}

export const actions = {
    async getCourses({ commit }) {
        const items = []
        commit('setCourses', [])
        try {
            const res = await this.$axios.$get('/get-courses')
                // this.loading = false
            let rowNum = 1
            res.forEach((element) => {
                items.push({
                    rowNum: rowNum++,
                    courseName: element.course,
                    orientationName: element.name_orientation,
                    // uniteNumber: element.unit_numbers,
                    id_course: element.id_course,
                })
            })
            commit('setCourses', items)
        } catch (e) {
            console.log(e.response.data.status)
        }
    },

    async getProfs({ commit }) {
        const items = []
        commit('setProfs', [])
        try {
            const res = await this.$axios.$get('/get-professors')
                // this.loading = false
            let rowNum = 1
            res.forEach((element) => {
                items.push({
                    rowNum: rowNum++,
                    profName: element.fname + ' ' + element.lname,
                    email: element.id,
                    // uniteNumber: element.unit_numbers,
                })
            })
            commit('setProfs', items)
        } catch (e) {
            console.log(e.response.data.status)
        }
    },
    async getStudents({ commit }) {
        const items = []
        commit('setStudents', [])
        try {
            const res = await this.$axios.$get('/get-students')
                // this.loading = false
            let rowNum = 1
            res.forEach((element) => {
                items.push({
                    rowNum: rowNum++,
                    stdName: element.first_name + ' ' + element.last_name,
                    stdNum: element.student_number,
                    entryYear: element.enter_year,
                    section: element.cross_section,

                    // uniteNumber: element.unit_numbers,
                })
            })
            commit('setStudents', items)
        } catch (e) {
            console.log(e.response.data.status)
        }
    },
}