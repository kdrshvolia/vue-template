<script>
import { FilterMatchMode } from '@primevue/core/api'
import { ref } from 'vue'
import { Api } from '../../../public/api/api.js'

const COLUMNS = [
  { field: 'date', header: 'Date' },
  { field: 'details', header: 'Details' },
]

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

const tableData = ref([])

tableData.value = await Api.getActivityLogData()

const prepareData = data => {
  return data.map(item => ({
    date: `${item.date} ${item.time}`,
    details: {
      details: item.details,
      url: item.url,
    },
  }))
}

const data = prepareData(tableData.value)

export default {
  name: 'ActivityLogTable',
  data() {
    return {
      info: data,
      filters,
      COLUMNS,
    }
  },
}
</script>

<template>
  <div class="table">
    <DataTable
      v-model:filters="filters"
      :value="info"
      :global-filter-fields="['details.details', 'details.url', 'date']"
      paginator
      :rows="10"
      :rows-per-page-options="['10', '20', '50']"
      table-style="width: 1000px"
    >
      <template #header>
        <div class="header">
          <h3>Events</h3>
          <IconField>
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText
              v-model="filters['global'].value"
              placeholder="Search device list"
              class="searchInput"
            />
          </IconField>
        </div>
      </template>
      <Column
        field="date"
        header="Date"
        sortable
        :pt="{ headerCell: 'headerCell' }"
      >
        <template>
          <div>
            <span>{{ date }}</span>
          </div>
        </template>
      </Column>
      <Column
        field="details"
        header="Details"
        sortable
        sort-field="details.details"
        :pt="{ headerCell: 'headerCell' }"
      >
        <template #body="{ data: { details } }">
          <div class="details">
            <span>{{ details.details }}</span>
            <Button as="a" :href="details.url" class="button">Details</Button>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style>
.table {
  width: 100%;
  padding: 30px;
}

.headerCell {
  background-color: #e9f0f4;
  border: none;
  &:first-child {
    border-radius: 14px 0 0 14px;
  }
  &:last-child {
    border-radius: 0 14px 14px 0;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.details {
  display: flex;
  justify-content: space-between;
}

.searchInput {
  background-color: #f9f9f9;
}

.button {
  color: #004b85;
  text-decoration: none;
  background-color: #fff;
  font-weight: 700;
  border: 1px solid #bdbfc1;
}
</style>
