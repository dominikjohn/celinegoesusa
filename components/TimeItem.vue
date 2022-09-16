<template lang="html">
  <div style="background-color: orange; padding: 25px; border-radius: 10px;">
    <div v-if="isEnded">
      Ich hoffe du sitzt im Flieger!
    </div>

    <div v-else>
      <b-row style="text-align: center">
        <b-col lg="12" style="margin-bottom: 15px;"><h2>Abflug in</h2></b-col>
        <b-col lg="3"><h4><b>{{ days }}</b><br/>Tagen</h4></b-col>
        <b-col lg="3"><h4><b>{{ hours }}</b><br/>Stunden</h4></b-col>
        <b-col lg="3"><h4><b>{{ minutes }}</b><br/>Minuten</h4></b-col>
        <b-col lg="3"><h4><b>{{ seconds }}</b><br/>Sekunden</h4></b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    endDate: {
      type: Date // Date.parse(this.endDate)
    }
  },
  data() {
    return {
      days: null,
      hours: null,
      minutes: null,
      seconds: null,
      isEnded: null
    }
  },
  methods: {
    updateRemaining(distance) {
      this.days = Math.floor(distance / (1000 * 60 * 60 * 24))
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000)
    },

    tick() {
      const currentTime = new Date()
      const distance = Math.max(this.endDate - currentTime, 0)
      this.updateRemaining(distance)

      if (distance === 0) {
        clearInterval(this.timer)
        this.isEnded = true
      }
    }
  },

  mounted() {
    this.tick()
    this.timer = setInterval(this.tick.bind(this), 1000)
  },

  destroy() {
    clearInterval(this.timer)
  }
}
</script>