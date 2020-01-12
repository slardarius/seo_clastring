<template>

  <div class="home__control-container">
      <div class="input-group mb-3 home__label">
        <input v-model="search_value" type="text" class="form-control" placeholder="Your request" aria-label="Recipient's username" aria-describedby="basic-addon2">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="onSearch">Search</button>
        </div>
      </div>

      <div class="alert alert-primary" role="alert" v-for="search of last_searches">
          The last search: "<b>{{ search.text }}</b>"
      </div>

      <div class="alert alert-danger" role="alert" v-for="error of error_list">
          Error: {{ error }}
      </div>
  </div>

</template>

<style>
  .home__control-container {
    height: calc(100vh - 55px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .home__label {
    width: 600px;
  }
  .alert {
      min-width: 600px;
  }
</style>

<script>
    import * as moment from 'moment';
    import apiBaseUrl from '../../environment/environment';

export default {
  name: "home",
  data() {
      return {
        search_value: '',
        last_searches: [],
        error_list: [],

    };
  },
    methods: {
      async onSearch() {
          const body = {
              text: this.search_value,
              date: moment().toISOString()
          };
          const {body: responce } = await this.$http.post(apiBaseUrl + '/api/v1/save_request', body);
          this.search_value = '';
          if (responce.success === 0) {
              this.last_searches.unshift(...responce.result);
          } else {
              this.error_list.unshift(...responce.result);
          }
      }
    }
};
</script>
