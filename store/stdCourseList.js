export const state = () => ({
    courses: [],
    takenCourses: [],
})

export const getters = {
    courses: (state) => state.courses,
    takenCourses: (state) => state.takenCourses,

}
export const mutations = {
    setCourses(state, courses) {
        state.courses = courses;
    },
    setTakentCourses(state, takenCourses) {
        state.takenCourses = takenCourses;
    }
}

export const actions = {
    async getTakenCourses({ commit }) {
        commit('setTakentCourses', []);
        try {
            const items = [];
            const res = await this.$axios.$get('/get-initial-course-selection')
                // this.loading = false
            let rowNum = 1
            res.data.forEach((element) => {
                items.push({
                    rowNum: rowNum++,
                    courseName: element.course_name,
                    orientationName: element.orientation,
                    uniteNumber: element.unit_numbers,
                    professorName: element.name_professor,
                    id_initial_course_selection: element.id_initial_course_selection,
                })
            })
            commit('setTakentCourses', items)
        } catch (e) {
            console.log(e.response.data.status)
        }
    },
    async getCourses({ commit }) {
        const items = [];
        commit('setCourses', []);
        try {
            const res = await this.$axios.$get('/get-permitted-course')
                // this.loading = false
            let rowNum = 1
            res.data.forEach((element) => {
                items.push({
                    rowNum: rowNum++,
                    courseName: element.course_name,
                    orientationName: element.orientation,
                    uniteNumber: element.unit_numbers,
                    professorName: element.name_professor,
                    id_permitted_course: element.id_permitted_course,
                })
            })
            commit('setCourses', items)

        } catch (e) {
            console.log(e.response.data.status)
        }
    }

}