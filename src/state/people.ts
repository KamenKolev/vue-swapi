import { Person } from "../person/person.type"
import { getAllPeople } from "../person/person.service"
import { ref } from "vue"

export const people = ref<undefined | Person[]>(undefined)

getAllPeople().then(res => (people.value = res))
