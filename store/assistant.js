export const state = () => ({
    courses: [],
    students: [],
    profs: [],
    courseSections: [],
})

export const getters = {
    courses: (state) => state.courses,
    students: (state) => state.students,
    profs: (state) => state.profs,
    courseSections: (state) => state.courseSections,
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
    setCourseSections(state, courseSections) {
        state.courseSections = courseSections
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
                    firstName: element.fname,
                    lastName: element.lname,
                    is_dep_head: element.is_dep_head,
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
        const grades = {
            master: '???????????????? ????????',
            bachelor: '????????????????',
        }
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
                    lastName: element.last_name,
                    firstName: element.first_name,
                    orientation: element.orientation,
                    superviserId: element.superviser_id,
                    adviserId: element.adviser_id,
                    grade: grades[element.cross_section],
                    // uniteNumber: element.unit_numbers,
                })
            })
            commit('setStudents', items)
        } catch (e) {
            console.log(e.response.data.status)
        }
    },

    async getCourseSections({ commit }) {
        commit('setCourseSections', [])
        try {
            const res = await this.$axios.$get('/time-of-course-section')
            commit('setCourseSections', res.data || [])
        } catch (e) {
            console.log(e.response.data.status)
        }
    },
}