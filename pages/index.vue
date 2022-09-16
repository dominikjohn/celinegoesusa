<template>
  <div class="container">
    <b-row>
      <b-col lg="12">
        <h1>Lieber Basti,</h1>
        <p>da du wahrscheinlich schon genügend Dinge hast, die du für so eine lange Reise packen musst, dachte ich mir,
          ich schenke dir etwas, was nicht ganz so schwer ist. Genau genommen wiegt diese Website 2⋅10<sup>-19</sup>
          kg – also egal mit welcher Airline du fliegst, du musst auf jeden Fall keine Extra-Gebühren zahlen. Der Flug allein
          ist
          ja schon teuer genug ;)</p>
        <p>Ich hoffe nur, dein neuer Wohnsitz befindet sich nicht in einer neuseeländischen Schafsherde und du hast weiter Zugriff
          auf das Internet, sonst war die Aktion hier natürlich etwas umsonst...</p>
        <p>Da du mir letztes Mal nicht genau sagen konntest, wann du eigentlich abreist, dachte ich mir, ich helfe dir etwas auf die Sprünge, damit auch alles glatt läuft:</p><br />
      </b-col>
      <b-col>
        <TimeItem :end-date="Date.parse('5 Oct 2022 12:50:00 GMT+1')"/>
      </b-col>
      <b-col lg="12">
        <br /><br />
        <p>Damit du mich nicht ganz vergisst, werde ich hier Überraschungen verstecken, also schau ab und zu vorbei ;)</p>
        <p>Dein Dominik</p>
      </b-col>
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
