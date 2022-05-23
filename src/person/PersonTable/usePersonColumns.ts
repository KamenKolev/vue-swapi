import { computed } from "vue"
import { dateFormatter, numberFormatter } from "../../utils/formatting"
import { sortByNumber, sortByString, sortWithSelector } from "../../utils/sort"
import { ColumnDefinition } from "../../components/genericTableTypes"
import type { Person } from "../person.type"
import { planets } from "../../state/planets"

const personTableColumns: ColumnDefinition<Person>[] = [
  {
    label: "Name",
    slot: "name",
    sortingFn: sortWithSelector<Person>(({ name }) => name)(sortByString),
    styles: {
      minWidth: "185px",
      maxWidth: "185px",
    },
  },
  {
    label: "Height (cm)",
    getValue: ({ height }) =>
      height ? String(numberFormatter.format(height)) : "",
    sortingFn: sortWithSelector<Person>(({ height }) => height ?? -Infinity)(
      sortByNumber,
    ),
    styles: {
      minWidth: "140px",
      maxWidth: "140px",
      textAlign: "center",
    },
  },
  {
    label: "Mass (kg)",
    getValue: ({ mass }) => (mass ? String(numberFormatter.format(mass)) : ""),
    sortingFn: sortWithSelector<Person>(({ mass }) => mass ?? -Infinity)(
      sortByNumber,
    ),
    styles: {
      minWidth: "120px",
      maxWidth: "120px",
      textAlign: "center",
    },
  },
  {
    label: "Created",
    getValue: ({ created }) => dateFormatter.format(new Date(created)),
    sortingFn: sortWithSelector<Person>(person => {
      if (!person.created.getTime) {
      }
      return person.created?.getTime()
    })(sortByNumber),
    styles: {
      minWidth: "160px",
      maxWidth: "160px",
      textAlign: "center",
    },
  },
  {
    label: "Edited",
    getValue: ({ edited }) => dateFormatter.format(new Date(edited)),
    sortingFn: sortWithSelector<Person>(({ edited }) => edited?.getTime())(
      sortByNumber,
    ),
    styles: {
      minWidth: "160px",
      maxWidth: "160px",
      textAlign: "center",
    },
  },
]

export const usePersonColumns = () => {
  return computed(() =>
    personTableColumns.concat({
      slot: "homeworld",
      label: "Planet",
      styles: {
        minWidth: "175px",
        maxWidth: "175px",
        textAlign: "center",
      },
      sortingFn: (a, b) => {
        const planetAName =
          (planets.value ?? []).find(planet => planet.id === a.homeworld)
            ?.name ?? ""
        const planetBName =
          (planets.value ?? []).find(planet => planet.id === b.homeworld)
            ?.name ?? ""

        return sortByString(planetAName, planetBName)
      },
    }),
  )
}
