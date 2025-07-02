import { defineStore } from "pinia";

export const useSessionStore = defineStore('session',{
    state: () =>    ({
        login:Boolean,
    }),
    getters:{
        async getLogin() {
            return this.login
        }
    },
    actions:{
        async changeLogin() {
            this.login = !false
        }
    }
})