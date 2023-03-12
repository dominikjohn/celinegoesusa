<template>
  <div class="container">
    <b-row>
      <b-col lg="12">
        <h1>Liebe Céline,</h1>
        <p>anders als dein Geschenk letztes Mal ist meins dann doch eher klischeehaft für dich als Informatikerin. Aber
          ich dachte mir, für so eine weite Reise hast du eh schon genug zu packen – deshalb schenke ich dir lieber was
          leichtes. Und sehr viel leichter als diese Website soll erstmal jemand hinbekommen! Die wiegt nämlich unter 20 KB. Egal welche Airline also (außer vielleicht bei RyanAir): Du musst sicher keinen Aufpreis zahlen!</p>
        <p>Damit du München nicht ganz vergisst, erwartet dich auf dieser Seite ab deiner Abreise eine kleine Überraschung. Also schau bald wieder vorbei. Bis dahin: Guten Flug und eine mega schöne Zeit in den Staaten!</p>
        <p>Dein Domjohn</p>
      </b-col>
      <!--<b-col>
        <TimeItem :end-date="Date.parse('12 Oct 2022 12:50:00 GMT+1')"/>
        <br />
      </b-col>-->
      <!--<b-col lg="12">
        <br /><br />
        <p>Damit du mich nicht ganz vergisst, werde ich hier Überraschungen verstecken, also schau ab und zu vorbei ;)</p>
        <p>Dein Dominik</p>
      </b-col>-->
    </b-row>
  </div>
</template>

<script>
import TimeItem from "@/components/TimeItem";

export default {
  components: {TimeItem}
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
