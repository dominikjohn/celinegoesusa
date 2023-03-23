<template>
  <div class="container">
    <b-row>
      <b-col lg="12">
        <h1>Liebe Céline,</h1>
        <p>anders als dein Geschenk letztes Mal ist meins dann doch eher klischeehaft für dich als Informatikerin ;)
          Aber
          ich dachte mir, für so eine weite Reise hast du eh schon genug zu packen – deshalb schenke ich dir lieber was
          leichtes. Und sehr viel leichter als diese Website soll erstmal jemand hinbekommen! Die wiegt nämlich unter 20
          KB. Egal welche Airline also (außer vielleicht bei RyanAir): Du musst sicher keinen Aufpreis zahlen!</p>
        <p>Damit du München nicht ganz vergisst, erwartet dich auf dieser Seite ab deiner Abreise eine kleine
          Überraschung. Also schau bald wieder vorbei. Bis dahin: Guten Flug und eine mega schöne Zeit in den
          Staaten!</p>
        <p>Dein Domjohn</p>
      </b-col>
      <b-col>
        <h2>Update (23.03.23)</h2>
        <p>Hey Céline, ich hoffe du hattest einen guten Flug!</p>
        <p>Damit du ein bisschen Heimat mit in die USA nehmen kannst, findest du hier ein paar nette Erinnerungsfotos
          und einen Timer, wie lange du schon nicht mehr in Deutschland bist (damit du uns hier nicht ganz vergisst
          ;))</p>
        <TimeItem :end-date="Date.parse('23 Mar 2023 15:35:00 GMT+1')"/>
        <br/>
        <p>Das Passwort ist das Datum des Seminars mit Dr. Exler in der ersten Präsenzphase ohne Punkte und mit vollem
          Jahr.</p>
        <input v-model="password" type="password" placeholder="Passwort"/>
        <br/>
        <div v-if="password === '25082020'">
          <center><br/>
            <img src="~/assets/b9d9e93a-0a51-45c2-981b-528e2c52fd6e.gif"/>
            <img src="~/static/sofa.JPG" width="650"/><br/>
            <img src="~/static/IMG_9898.JPG" width="650"/><br/>
            <img src="~/static/b09fa13f-549d-4e4f-89af-c1d67847cc7f.JPG" width="650"/><br/>
            <img src="~/static/a8923098-bf2d-42d8-a2f3-53b4eb497625.JPG" width="650"/><br/>
            <img src="~/static/2020-09-10 16-43-19.JPEG" width="650"/><br/>
            <img src="~/static/1003c23a-51cf-4371-b7e2-b88120ea9821.JPG" width="650"/><br/>
          </center>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import TimeItem from "@/components/TimeItem";

export default {
  components: {TimeItem},
  props: {
    password: {
      default: '',
      type: String
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  max-width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
}

.title {
  font-family: 'Quicksand',
  'Source Sans Pro',
  -apple-system,
  BlinkMacSystemFont,
  'Segoe UI',
  Roboto,
  'Helvetica Neue',
  Arial,
  sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
