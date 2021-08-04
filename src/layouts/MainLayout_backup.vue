<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />
        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>
        <q-space/>
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="white" :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
                 @click="$q.fullscreen.toggle()"
                 v-if="$q.screen.gt.sm">
          </q-btn>
          <q-btn round dense flat color="white" icon="fab fa-github" type="a" href="https://github.com/pratik227/quasar-admin" target="_blank">
          </q-btn>
          <q-btn round dense flat icon="fas fa-heart" style="color:#9d4182 !important;" type="a" href="https://github.com/sponsors/pratik227" target="_blank">
          </q-btn>
          <q-btn round dense flat color="white" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              5
            </q-badge>
            <q-menu
            >
              <q-list style="min-width: 100px">
                <messages></messages>
                <q-card class="text-center no-shadow no-border">
                  <q-btn label="View All" style="max-width: 120px !important;" flat dense
                         class="text-indigo-8"></q-btn>
                </q-card>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-primary text-white"
    >
      <div class="q-pa-md q-gutter-sm">
        <q-item to="/" >
          <q-img
            src="~assets/mapanare_logo.png"          
          />
        </q-item>
      </div>

      <q-list>
        <q-item to="/" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="dashboard"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/ClusterMap" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="map"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Map view</q-item-label>
          </q-item-section>
        </q-item>
        <q-expansion-item
          icon="commute"
          label="Vehicles"
        >
          <q-item to="/Websockets" class="q-ml-xl" active-class="q-item-no-link-highlighting">
            <q-item-section>
              <q-item-label>Vehicles</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/MapSocket"class="q-ml-xl" active-class="q-item-no-link-highlighting">
            <q-item-section>
              <q-item-label>Groups</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/MapMoving"class="q-ml-xl" active-class="q-item-no-link-highlighting">
            <q-item-section>
              <q-item-label>Devices</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
        <q-expansion-item
          icon="description"
          label="Reports"
        >
          <q-item to="/PageTest" class="q-ml-xl" active-class="q-item-no-link-highlighting">
            <q-item-section>
              <q-item-label>Routes Report</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/PageTest"class="q-ml-xl" active-class="q-item-no-link-highlighting">
            <q-item-section>
              <q-item-label>Alarms Report</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/PageTest" class="q-ml-xl" active-class="q-item-no-link-highlighting">
            <q-item-section>
              <q-item-label>Traces Report</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/PageTest"class="q-ml-xl" active-class="q-item-no-link-highlighting">
            <q-item-section>
              <q-item-label>Velocity Report</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/PageTest" class="q-ml-xl" active-class="q-item-no-link-highlighting">
            <q-item-section>
              <q-item-label>KM per month</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/PageTest"class="q-ml-xl" active-class="q-item-no-link-highlighting">
            <q-item-section>
              <q-item-label>Activity</q-item-label>
            </q-item-section>
          </q-item>          
        </q-expansion-item>

        <q-expansion-item
          icon="notifications"
          label="Alarms"
        >
          <q-item to="/PageTest" class="q-ml-xl" active-class="q-item-no-link-highlighting">
            <q-item-section>
              <q-item-label>Check Alarms</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/PageTest"class="q-ml-xl" active-class="q-item-no-link-highlighting">
            <q-item-section>
              <q-item-label>Config Alarms</q-item-label>
            </q-item-section>
          </q-item>          
        </q-expansion-item>

        <q-expansion-item
          icon="mail"
          label="Notificactions"
        >
          <q-item to="/PageTest" class="q-ml-xl" active-class="q-item-no-link-highlighting">
            <q-item-section>
              <q-item-label>View notification</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/PageTest"class="q-ml-xl" active-class="q-item-no-link-highlighting">
            <q-item-section>
              <q-item-label>Send notification</q-item-label>
            </q-item-section>
          </q-item>          
        </q-expansion-item>

        <q-item to="/PageTest" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="people_alt"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Drivers</q-item-label>
          </q-item-section>
        </q-item>

        <q-expansion-item
          icon="settings"
          label="Settings"
        >
          <q-item to="/PageTest" class="q-ml-xl" active-class="q-item-no-link-highlighting">
            <q-item-section>
              <q-item-label>Profile</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/PageTest"class="q-ml-xl" active-class="q-item-no-link-highlighting">
            <q-item-section>
              <q-item-label>App Setting</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/Websockets"class="q-ml-xl" active-class="q-item-no-link-highlighting">
            <q-item-section>
              <q-item-label>About</q-item-label>
            </q-item-section>
          </q-item>          
        </q-expansion-item>

        <q-item to="/Login-1" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="exit_to_app"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Logout</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
    import EssentialLink from 'components/EssentialLink'
    import Messages from "./Messages";

    export default {
        name: 'MainLayout',

        components: {
            Messages,
            EssentialLink
        },

        data() {
            return {
                leftDrawerOpen: false,
            }
        }
    }
</script>
