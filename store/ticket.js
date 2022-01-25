function determineTicketType(ticketType) {
    switch (ticketType) {
        case 'capacity_increase':
            return 'درخواست افزایش ظرفیت'
        case 'lessons_from_another_section':
            return 'درخواست درس خارج از بخش'
        case 'exam_time_change':
            return 'درخواست تغییر ساعت امتحان'
        case 'master_course_request':
            return 'درخواست درس از ارشد'
        case 'course_from_another_orientation':
            return ' درخواست درس دانشجویان ارشد از بخش دیگر'
        case 'class_change_time':
            return 'درخواست تغییر ساعت کلاس'
        case 'other':
            return 'متفرقه'
    }
}

function checkStatus(status) {
    switch (status) {
        case 1:
            return 'در جریان'
        case 2:
            return 'در جریان'
        case 4:
            return 'درخواست رد شده'
        case 6:
            return 'خاتمه یافته توسط دانشجو'
        case 7:
            return 'با درخواست شما موافقت شده'
    }
}
export const state = () => ({
    tickets: [],
})

export const getters = {
    tickets: (state) => state.tickets,
}

export const mutations = {
    setTickets(state, tickets) {
        state.tickets = tickets
    },
}

export const actions = {
    async getTickets({ commit }) {
        commit('setTickets', [])
        try {
            const ticketsList = await this.$axios.$get('/get-tickets')
            const tickets = []
                // console.log((ticketsList[0]).all_steps)
                // console.log(Object.keys((ticketsList[0]).all_steps).length)
            let rowIndex = 1
            ticketsList.forEach((ticket) => {
                // console.log(this.determineTicketType(ticket.type_ticket));
                tickets.push({
                    ticketObject: ticket,
                    rowNum: rowIndex,
                    ticketType: determineTicketType(ticket.type_ticket),
                    date: ticket.created_date,
                    senderName: ticket.sender_lname + ' ' + ticket.sender_fname,
                    senderNum: ticket.sender_id,
                    allSteps: ticket.all_steps,
                    ticket_course: ticket.course,
                    status: checkStatus(ticket.status_step),
                    canChange: ticket.can_change,
                    stepName: ticket.receiver_user
                        // caption: 'waitForBack',
                        // status: 'درحال انجام',
                })
                rowIndex += 1
            })
            commit('setTickets', tickets)
        } catch (error) {
            console.log(error)
        }
    },
}