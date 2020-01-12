<template>
    <div class="statistics__table-wrapper">
        <table class="table">
            <thead>
            <tr>
                <th></th>
                <th v-for="header in list_of_header"> {{ header }} </th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="(columns, index) in list_of_columns">
                    <td>
                        {{ columns }}
                    </td>
                    <td v-for="value of values[index]">
                        {{ value}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style>
    .statistics__table-wrapper {
        width: 100%;
        overflow-x: scroll;
    }
</style>

<script>
    import apiBaseUrl from '../../environment/environment';
    export default {
        name: 'statistics',
        data() {
            return {
                list_of_header: [],
                list_of_columns: [],
                values: [],
            };
        },
        methods: {
            async onSendRequest() {
                const { body: responce } = await this.$http.get( apiBaseUrl + '/api/v1/statistics');
                if (responce.success === 0) {
                    this.list_of_header = responce.result.column;
                    this.list_of_columns = responce.result.rows;
                    this.values = responce.result.values;
                }
            }
        },
        created() {
            this.onSendRequest();
        }
    }
</script>
