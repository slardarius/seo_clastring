<template>
    <div class="kmeans__wrapper">
        <div class="kmeans__left-side">
            <label>
                Mock data
                <input type="checkbox" v-model="isMockData">
            </label>
            <div class="kmeans__filter">
                <div class="needs-validation">
                    <div class="form-row" v-if="isMockData">
                        <div class="kmeans__filter-control">
                            <label for="validationTooltip01">Input query </label>
                            <input v-model="query"
                                   type="text"
                                   class="form-control"
                                   id="validationTooltip01"
                                   placeholder="Query"
                                   required>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="kmeans__filter-control">
                            <label for="validationTooltip01">Input count of clusters </label>
                            <input  v-model="countClusters"
                                    type="text"
                                    class="form-control"
                                    id="validationTooltip01"
                                    placeholder="Count"
                                    required>
                        </div>
                    </div>
                    
                    
                    <div class="form-row" v-if="isMockData">
                        <div class="kmeans__filter-control">
                            <label for="validationTooltip01">Input date FROM: </label>
                            <input  v-model="dateFrom"
                                    type="date"
                                    class="form-control"
                                    id="validationTooltip01"
                                    placeholder="Count"
                                    required>
                        </div>
                    </div>
                    
                    
                    <div class="form-row" v-if="isMockData">
                        <div class="kmeans__filter-control">
                            <label for="validationTooltip01">Input date TO: </label>
                            <input  v-model="dateTo"
                                    type="date"
                                    class="form-control"
                                    id="validationTooltip01"
                                    placeholder="Count"
                                    required>
                        </div>
                    </div>

                    <button class="btn btn-primary" @click="onCheckForm">Submit form</button>

                    <div class="p-3 mb-2 bg-danger text-white" v-if="isShowError">
                        Form is not valid.
                    </div>
                </div>
            </div>

            <div class="accordion" id="accordionExample" v-if="initialData.length > 0">
                <div class="card">
                    <div class="card-header" id="headingOne">
                        <h5 class="mb-0">
                            <button @click="onLoadCriterions" class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Open chart with criterion
                            </button>
                        </h5>
                    </div>

                    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <div class="card-body">
                            <line-chart :chart-data="datacollection" :options="option"></line-chart>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="kmeans__right-side">

            <div class="accordion" id="accordionExample1" v-if="initialData.length > 0" style="margin-top: 0px; width: 100%">
                <div class="card">
                    <div class="card-header" id="headingOne">
                        <h5 class="mb-0">
                            <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne1" aria-expanded="true" aria-controls="collapseOne">
                                Open initial data
                            </button>
                        </h5>
                    </div>

                    <div id="collapseOne1" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample1">
                        <div class="card-body">
                            <button type="button" class="btn btn-dark" v-for="(phrase, index) in initialData" :key="index">
                                {{ phrase }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <div class="kmeans__wrapper-clusters">

                <div class="kmeans__wrapper-cluster-card card text-white bg-dark mb-3" style="max-width: 18rem;" v-for="(clusterNumber, index) in clustersKeys" :key="index">
                    <div class="card-header" style="text-align: center; font-size: 16px; font-weight: bold;"> {{ (+clusterNumber + 1)}}</div>
                    <div class="card-body">
                        <span v-for="value in clusters[clusterNumber]" class="kmeans__wrapper-cluster-value">
                            [ {{ value }} ] 
                        </span>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<style>

    .kmeans__wrapper {
        padding: 10px;
        display: flex;
    }

    .kmeans__left-side {
        margin-right: 50px;
    }

    form {
        width: 100%;
    }

    label {
        font-size: 14px;
        color: #89898F;
    }

    .kmeans__filter {
        width: 600px;
        padding: 10px 18px;
        background: #fff;
        box-shadow: 0 1px 2px 0 rgba(153, 153, 153, 0.5);
        font-size: 12px;
        border-radius: 4px;
    }

    .kmeans__filter-control {
        width: 100%;
        margin-bottom: 10px;
    }

    .btn-primary {
        width: 100%;
        height: 36px;
    }

    .bg-danger {
        margin-top: 10px;
    }

    .accordion {
        margin-top: 30px;
        width: 600px;
    }

    .btn-dark {
        margin-right: 5px;
        margin-bottom: 5px;
    }

    .kmeans__right-side {
        width: 100%;
    }

    .kmeans__wrapper-clusters {
        margin-top: 30px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .kmeans__wrapper-cluster-card {
        width: 450px;
    }

    .kmeans__wrapper-cluster-value {
        padding: 10px;
        word-wrap: break-word;
    }
</style>

<script>
    import LineChart from './LineChar';
    import apiBaseUrl from '../../environment/environment';
    export default {
        name: 'list_search',
        components: {
            LineChart,
        },
        data() {
            return {
                isMockData: true,
                query: 'Украина',
                countClusters: '2',
                dateFrom: '2019-12-01',
                dateTo: '2019-12-18',
                isShowError: false,
                clustersKeys: [],
                clusters: {},
                initialData: [],
                datacollection: null,
                option: {
                    fill: false,
                },
            };
        },
        mounted() {},
        methods: {
            onCheckForm() {
                this.isShowError = false;
                if (!this.query || !this.countClusters || !this.dateFrom || !this.dateTo) {
                    this.isShowError = true;
                }

                if (!this.isShowError) {
                    this.onTakeInfoAboutClusters();
                }
            },

            async onTakeInfoAboutClusters() {
                const { body: responce } = await this.$http.get(apiBaseUrl + `/api/v1/k_means_cluster?query_string=${this.query}&count_cluster=${this.countClusters}&date_from=${this.dateFrom}&date_to=${this.dateTo}&mock=${this.isMockData}`);
                if (responce.success === 0) {
                    this.initialData = responce.result['phrases'];
                    this.clustersKeys = Object.keys(responce.result['clustered_data']);
                    this.clusters = responce.result['clustered_data'];
                    this.onLoadCriterions();
                  }
            },

            async onLoadCriterions() {
                const { body: responce } = await this.$http.get(apiBaseUrl + `/api/v1/k_means_criterion?range=${this.countClusters}`);
                if (responce.success === 0) {
                    console.log(responce.result);
                    this.datacollection = {
                        labels: responce.result['criterion'].slice().map((criterion, index) => (index + 1)),
                        datasets: [
                            {
                                label: 'range from: 1 to ' + this.countClusters,
                                data: responce.result['criterion'].slice().map((criterion, index) => ({x: (index + 1), y: criterion})),
                            }
                        ]
                    }
                  }
            },
        },
        created() {
            
        }
    }
</script>
