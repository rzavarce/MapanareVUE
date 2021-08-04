
<template>
  <q-card class="bg-transparent no-shadow no-border">
    <q-card-section class="row">
      <div class="col-lg-12 col-sm-12 col-xs-12 col-md-12">
        <div class="text-h6 float-left q-ml-md q-mt-sm">Filters</div>
        <q-space/>
        
        <div class="text-h6 float-right q-ml-md q-mt-sm">
            <q-select dense outlined style="min-width: 200px" v-model="type" :options="['All','Free','Paid']"
                  class="float-right" label="Category"/>
        </div>
        <div class="text-h6 float-right q-ml-md q-mt-sm">

                <q-btn label="add" size="sm" class="bg-indigo-8 text-capitalize text-white" :to="{name: 'form_create'}"></q-btn>

        </div>
        
        
      </div>
    </q-card-section>
    <q-card-section class="q-mx-sm">
      <div class="row q-col-gutter-lg">
        <div class="col-lg-3 col-sm-12 col-xs-12 col-md-3" v-for="subscription of subscriptions" v-bind:key="subscription.id">
          <q-card style="background-color: #292845" class="text-white">
            
            <svg class="bd-placeholder-img" width="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>{{ subscription.name }}</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">{{ subscription.name.charAt(0) }}</text></svg>

            <q-separator></q-separator>
            <q-card-section class="text-h5 text-center">
              {{ subscription.name }}
            </q-card-section>
            <q-card-section class="text-justify">
              <div>
                {{ subscription.description }}
              </div>
            </q-card-section>
            <q-card-actions align="around" class="text-subtitle1">
                <router-link :to="{name: 'form_edit', params: { id: subscription.id }}" class="btn btn-sm btn-primary">
                    <q-btn color="" icon="remove_red_eye" class="bg-transparent" />
                </router-link>
                <router-link :to="{name: 'form_edit', params: { id: subscription.id }}" class="btn btn-sm btn-primary">
                    <q-btn color="" icon="edit" class="bg-transparent" />
                </router-link>
                
                    <q-btn color="" icon="delete" class="bg-transparent" v-on:click="deleteSubscription(subscription)"/>
                           

            </q-card-actions>
          </q-card>
        </div>
      </div>
    </q-card-section>

  </q-card>
</template>



<script>

import axios from 'axios';

export default {
    data() {
        return {
            subscriptions: [],
                type: 'All',
                page: 1,
                currentPage: 1,
                nextPage: null,
                totalPages: 4,
        }
    },
    created() {
        this.all();
    },
    methods: {
        deleteSubscription: function(subscr) {
            if (confirm('Delete ' + subscr.name)) {
                axios.delete(`http://127.0.0.1:8000/api/subscriptions/${subscr.id}`)
                    .then( response => {
                        this.all();
                    });
            }
        },
        all: function () {
            axios.get('http://127.0.0.1:8000/api/subscriptions/')
                .then( response => {
                    this.subscriptions = response.data
                });
        }
    },
}
</script>