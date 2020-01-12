<template>
    <div>
        <table class="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col"> Date </th>
                <th scope="col">Search text</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(request, index) in list_of_request">
                <th scope="row">{{ (index + 1) }}</th>
                <td>{{ request.date }} </td>
                <td>{{ request.text }}</td>
            </tr>
            </tbody>
        </table>

        <nav aria-label="Page navigation example" class="pagination-container">
            <ul class="pagination">
                <li class="page-item" @click="onSetCurrentPage('dec')">
                    <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </a>
                </li>
                <li class="page-item" @click="onSetCurrentPage('inc')">
                    <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>

</template>

<style>
    .pagination-container {
        display: flex;
        justify-content: center;
    }
</style>

<script>
    import * as moment from 'moment';
    import apiBaseUrl from '../../environment/environment';
    export default {
        name: 'list_search',
        data() {
            return {
                list_of_request: [],
                current_page: 1,
                responce_count: 0,
                max_page: 1,
            };
        },
        methods: {
              async onSendRequest(current_page = 1) {
                  const { body: responce } = await this.$http.get(apiBaseUrl + `/api/v1/get_all_request?page=${current_page}&count=20`);
                  if (responce.success === 0) {
                      this.list_of_request = responce.result.core.map(request => {
                          request.date = moment(request.date).format('DD-MM-YYYY HH:mm');
                          return request;
                      });
                      this.onSetMaxPage(responce.result.count, 20);
                  }
              },
             onSetMaxPage(count_responce, count_request) {
                  if (count_responce <= 20) {
                      this.max_page = 1;
                  } else {
                      this.max_page = Math.trunc(count_responce / count_request) + 1;
                  }
             },
             onSetCurrentPage(type) {
               if (type === 'inc') {
                  this.current_page = this.current_page !== this.max_page ? this.current_page + 1 : this.current_page ;
               } else {
                   this.current_page = this.current_page - 1 === 0 ? 1 : this.current_page - 1;
               }
               this.onSendRequest(this.current_page);
             }
        },
        created() {
            this.onSendRequest();
        }
    }
</script>
