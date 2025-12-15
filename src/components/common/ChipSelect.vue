<script lang="ts">
import fuzzysort from 'fuzzysort'

export interface ChipSelectExposed {
  focus: () => void
  blur: () => void
  clearInput: () => void
  clearSelected: () => void
}
</script>

<script setup lang="ts" generic="T extends string | number | object">
interface SelectItem<T> {
  item: T
  label: string
  selected: boolean
}

const props = defineProps<{
  /** currently selected items */
  modelValue: T[]
  /** available options to select from */
  options: T[]
  /** placeholder text when nothing is selected */
  placeholder: string
  /** function to convert an item to its display string */
  serializer: (v: T) => string
}>()

const emit = defineEmits<{
  /** emitted when selection changes */
  (event: 'update:modelValue', selected: T[]): void
}>()

const root = ref<HTMLDivElement>()
const input = ref<HTMLInputElement>()

const searchQuery = ref('')
const showListbox = ref(false)
const isInternalUpdate = ref(false)
const activeListboxIndex = ref(0)

const modelValue = computed(() => props.modelValue)
const options = computed(() => props.options)
const serializer = computed(() => props.serializer)
const placeholder = computed(() => props.placeholder)

const items = ref<SelectItem<T>[]>([])

const selected = computed(() => items.value.filter(i => i.selected))

const noneSelected = computed(() => selected.value.length === 0)

const itemsByLabel = computed(() => {
  const map = new Map<string, SelectItem<T>>()
  items.value.forEach((item) => {
    map.set(item.label, item as SelectItem<T>)
  })
  return map
})

const unselectedItems = computed(() =>
  items.value.filter(i => !i.selected).map(i => i.label),
)

const selectedItems = computed(() =>
  selected.value.map(i => i.item),
)

const searchResults = computed(() => {
  const query = searchQuery.value
  return query
    ? fuzzysort.go(query, unselectedItems.value).map(i => i.target)
    : unselectedItems.value
})

function createInitialItems(): SelectItem<T>[] {
  const regularItems: SelectItem<T>[] = options.value.map(i => ({
    item: i as T,
    label: serializer.value(i as T),
    selected: (modelValue.value as readonly T[]).includes(i as T),
  }))

  return regularItems
}

function resizeInput(): void {
  if (!input.value) return

  const el = input.value
  const width = searchQuery.value.length === 0
    ? (noneSelected.value ? placeholder.value.length + 2 : 0)
    : searchQuery.value.length + 2

  el.style.width = `${width}ch`
  activeListboxIndex.value = 0
}

function clearInput(): void {
  searchQuery.value = ''
}

function emitSelection(): void {
  isInternalUpdate.value = true
  emit('update:modelValue', selectedItems.value as T[])
}

function findItemByLabel(label: string): SelectItem<T> | undefined {
  return itemsByLabel.value.get(label)
}

function selectItem(item: SelectItem<T>): void {
  item.selected = true
  emitSelection()
}

function deselectItem(item: SelectItem<T>): void {
  item.selected = false
  emitSelection()
}

function handleItemSelection(label: string): void {
  const item = findItemByLabel(label)
  if (!item) return

  selectItem(item)
  clearInput()
}

function handleItemRemoval(label: string): void {
  const item = findItemByLabel(label)
  if (!item) return

  deselectItem(item)
  resizeInput()
  input.value?.focus()
}

function removeLastChip(): void {
  if (noneSelected.value) return

  const lastSelected = selected.value.at(-1)
  if (!lastSelected) return

  deselectItem(lastSelected as SelectItem<T>)
  resizeInput()
  input.value?.focus()
}

function handleKeydown(e: KeyboardEvent): void {
  const target = e.target as HTMLInputElement

  switch (e.key) {
    case 'Backspace':
      if (target.value.length > 0) return
      removeLastChip()
      break

    case 'Enter':
      e.preventDefault()
      if (searchResults.value.length === 0) return
      handleItemSelection(searchResults.value[activeListboxIndex.value])
      break

    case 'Escape':
      e.preventDefault()
      showListbox.value = false
      clearInput()
      target.blur()
      break

    case 'ArrowDown':
      e.preventDefault()
      if (!showListbox.value) {
        showListbox.value = true
      }
      else if (activeListboxIndex.value < searchResults.value.length - 1) {
        activeListboxIndex.value++
      }
      break

    case 'ArrowUp':
      e.preventDefault()
      if (activeListboxIndex.value > 0) {
        activeListboxIndex.value--
      }
      break

    case 'Tab':
      if (showListbox.value && searchResults.value.length > 0) {
        e.preventDefault()
        handleItemSelection(searchResults.value[activeListboxIndex.value])
      }
      break
  }
}

function handleOptionsChange(): void {
  items.value = createInitialItems()
  clearInput()
}

function handleExternalModelValueChange(): void {
  if (isInternalUpdate.value) {
    isInternalUpdate.value = false
    return
  }
  items.value = createInitialItems()
  clearInput()
}

function handleListboxUpdate(value: string): void {
  handleItemSelection(value)
}

function clearSelected(): void {
  items.value.forEach(i => i.selected = false)
  emitSelection()
  resizeInput()
}

defineExpose({
  focus: () => input.value?.focus(),
  blur: () => input.value?.blur(),
  clearInput,
  clearSelected,
})

onMounted(() => {
  onClickOutside(root, () => {
    showListbox.value = false
  })

  watch(
    () => options.value,
    handleOptionsChange,
    { immediate: true },
  )

  watch(() => modelValue.value, handleExternalModelValueChange)
  watch(() => searchQuery, resizeInput)
})
</script>

<template>
  <div
    ref="root"
    class="relative flex flex-col"
  >
    <div
      class="min-h-9 flex flex-wrap cursor-text custom-outline pl-1 pt-1"
      @click="input?.focus()"
    >
      <Chip
        v-for="i in selected"
        :key="i.label"
        :label="i.label"
        class="mb-1 mr-1"
        @remove="handleItemRemoval(i.label)"
      />
      <input
        ref="input"
        v-model="searchQuery"
        role="combobox"
        aria-haspopup="listbox"
        aria-controls="listbox"
        :aria-expanded="showListbox"
        :aria-activedescendant="showListbox ? `option-${activeListboxIndex}` : undefined"
        :aria-label="placeholder"
        :aria-describedby="selected.length > 0 ? 'selected-items' : undefined"
        :placeholder="noneSelected ? placeholder : ''"
        class="my-auto mb-1 mr-1 h-6.5 min-w-2 bg-transparent pl-1 outline-none"
        @focus="(showListbox = true)"
        @keydown="handleKeydown"
      >
      <div
        v-if="selected.length > 0"
        id="selected-items"
        aria-live="polite"
        style="position: absolute; left: -10000px; top: auto; width: 1px; height: 1px; overflow: hidden;"
      >
        Selected: {{ selected.map(s => s.label).join(', ') }}
      </div>
      <div
        v-if="!noneSelected"
        role="button"
        tabindex="0"
        aria-label="Clear all selections"
        class="mb-1 ml-auto mr-1.5 h-6.5 flex cursor-pointer items-center"
        @click="clearSelected()"
        @keydown.enter.prevent="clearSelected()"
        @keydown.space.prevent="clearSelected()"
      >
        <div class="i-carbon:close" aria-hidden="true" />
      </div>
    </div>
    <Listbox
      :show="showListbox"
      :items="searchResults"
      :active-index="activeListboxIndex"
      @update="handleListboxUpdate"
    />
  </div>
</template>
