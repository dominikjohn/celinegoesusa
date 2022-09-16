<template>
  <div id="container">
    <b-form @submit.prevent="sendEmail">
      <b-row>
        <b-col xs="12" md="6">
          <b-form-group label="Anreise">
            <b-datepicker @input="changeDeparture()" v-model="arrival" :state="arrivalValid()" locale="de" placeholder="Datum auswählen"
                          value-as-date></b-datepicker>
            <b-form-invalid-feedback>
              Bitte geben Sie ein Anreisedatum an.
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Abreise">
            <b-datepicker v-model="departure" :state="departureValid()" locale="de" placeholder="Datum auswählen"
                          value-as-date></b-datepicker>
            <b-form-invalid-feedback>
              Das Abreisedatum muss nach dem Anreisedatum liegen.
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="12" md="6">
          <b-form-group label="Erwachsene">
            <b-select v-model="adults">
              <b-select-option value="1">1</b-select-option>
              <b-select-option value="2">2</b-select-option>
              <b-select-option value="3">3</b-select-option>
              <b-select-option value="4">4</b-select-option>
              <b-select-option value="5">5</b-select-option>
              <b-select-option value="6">6</b-select-option>
            </b-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Kinder (6-15 J.)">
            <b-select v-model="children">
              <b-select-option value="0">0</b-select-option>
              <b-select-option value="1">1</b-select-option>
              <b-select-option value="2">2</b-select-option>
              <b-select-option value="3">3</b-select-option>
              <b-select-option value="4">4</b-select-option>
              <b-select-option value="5">5</b-select-option>
            </b-select>
            <small>Angabe ohne Kinder von 0–5 Jahren, ihr Aufenthalt ist kostenlos.</small>
          </b-form-group>
        </b-col>
      </b-row>
      <b-form-group>
        <b-checkbox v-model="childBed">Kinderbett benötigt (kostenlos)</b-checkbox>
        <b-checkbox v-model="childChair">Kinderstuhl benötigt (kostenlos)</b-checkbox>
        <b-checkbox v-model="dog">Hund mitnehmen (+20 € pro Aufenthalt)</b-checkbox>
      </b-form-group>
      <b-row>
        <b-col xs="12" md="6">
          <b-form-group label="Vorname">
            <b-input v-model="firstName" :state="firstNameValid()"></b-input>
            <b-form-invalid-feedback>
              Bitte füllen Sie dieses Feld aus.
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Nachname">
            <b-input v-model="lastName" :state="lastNameValid()"></b-input>
            <b-form-invalid-feedback>
              Bitte füllen Sie dieses Feld aus.
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="12" md="6">
          <b-form-group label="E-Mail-Adresse">
            <b-input v-model="email" :state="emailValid()"></b-input>
            <b-form-invalid-feedback>
              Bitte geben Sie eine gültige E-Mail-Adresse an.
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Telefonnummer (optional)">
            <b-input v-model="phone"></b-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-form-group label="Anmerkungen (optional)">
        <b-textarea v-model="notes" height="10px"></b-textarea>
      </b-form-group>
      <table class="table table-responsive">
        <tr>
          <td>Wohnungspreis</td>
          <td style="text-align: right; min-width: 75px"><strong>{{ price }} €</strong></td>
          <td style="text-align: right">
            <div v-show="nebensaisonDays > 0">
              <small>{{ pricePerDayNebensaison }} € x {{ nebensaisonDays }} Nächte <span v-if="hauptsaisonDays > 0">(Nebensaison)</span></small><br />
            </div>
            <div v-show="hauptsaisonDays > 0">
              <small>{{ pricePerDayHauptsaison }} € x {{ hauptsaisonDays }} Nächte <span v-if="nebensaisonDays > 0">(Hauptsaison)</span></small>
            </div>
          </td>
        </tr>
        <tr>
          <td>zzgl. TegernseeCard</td>
          <td style="text-align: right"><strong>{{ tegernseeCardPrice }} €</strong></td>
          <td style="text-align: right;"><small>3 € / 1,5 € p. N. pro Erw. / Kind</small>
<!--            <a href="https://www.tegernsee.com/leistungspartner-card" target="_blank">Mehr zu den Vorteilen der Tegernsee-Card &raquo;</a>-->
          </td>
        </tr>
        <tr>
          <td>zzgl. Endreinigung</td>
          <td style="text-align: right; min-width: 75px"><strong>{{ endreinigungDisplay }} €</strong></td>
        </tr>
        <tr>
          <td><b>Gesamt</b></td>
          <td style="text-align: right"><strong>{{ total }} €</strong></td>
        </tr>
      </table>
      <p v-show="showSuccess" class="text-success">Buchungsanfrage erfolgreich übermittelt!</p>
      <b-form-group style="margin-top: 25px">
        <input type="submit" class="btn-lg btn btn-secondary" value="Buchungsanfrage absenden">
      </b-form-group>
    </b-form>
  </div>
</template>
<script>
import emailjs from 'emailjs-com';

export default {
  name: "PriceCalculator",
  props: {
    name: {
      type: String,
      required: true
    },
    nebensaisonPrice: {
      type: Number,
      default: 110
    },
    hauptsaisonPrice: {
      type: Number,
      default: 125
    },
    endreinigungPerDay: {
      type: Number,
      default: 14
    },
    endreinigungTotal: {
      type: Number,
      default: 100
    },
    maxFreePersons: {
      tyoe: Number,
      default: 3
    },
  },
  data() {
    return {
      departure: null,
      arrival: null,
      adults: 1,
      children: 0,
      dog: false,
      childBed: false,
      childChair: false,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      notes: '',
      attemptedSend: false,
      showSuccess: false,
      pricePerDayNebensaison: 0,
      pricePerDayHauptsaison: 0,
      nebensaisonDays: 0,
      hauptsaisonDays: 0,
    }
  },
  methods: {
    changeDeparture() {
      if(this.departure === null || this.departure < this.arrival) {
        var guessedDeparture = this.arrival;
        guessedDeparture.setUTCDate(guessedDeparture.getUTCDate() + 7);
        this.departure = guessedDeparture
      }
    },
    departureValid() {
      if (this.departure && this.arrival) {
        return this.departure > this.arrival ? null : false
      } else if (this.attemptedSend) {
        return this.departure ? null : false
      }
      return null;
    },
    firstNameValid() {
      if (this.attemptedSend) {
        return this.firstName !== '' ? null : false
      }
      return null
    },
    emailValid() {
      if (this.attemptedSend) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(this.email).toLowerCase()) ? null : false;
      }
      return null
    },
    lastNameValid() {
      if (this.attemptedSend) {
        return this.lastName !== '' ? null : false
      }
      return null
    },
    arrivalValid() {
      if (this.attemptedSend) {
        return this.arrival ? null : false
      }
      return null
    },
    sendEmail(e) {
      this.attemptedSend = true

      if (this.firstNameValid() === null && this.lastNameValid() === null && this.arrivalValid() === null && this.departureValid() === null && this.emailValid() === null) {
        try {
          emailjs.send('strato-smtp', 'template_2nms1tc', {
              name: this.name,
              email: this.email,
              dog: this.dog ? 'ja' : 'nein',
              childBed: this.childBed? 'ja' : 'nein',
              childChair: this.childChair? 'ja' : 'nein',
              children: this.children,
              adults: this.adults,
              arrival: this.arrival.toLocaleDateString('de-DE'),
              departure: this.departure.toLocaleDateString('de-DE'),
              notes: this.notes,
              price: this.price,
              tegernseeCardPrice: this.tegernseeCardPrice,
              total: this.total,
              lastName: this.lastName,
              firstName: this.firstName,
              phone: this.phone,
              endreinigungTotal: this.endreinigungTotal
            },
            'user_gupTDda9WM0tEIXX5GxxA')

          emailjs.send('strato-smtp', 'template_9znz43o', {
              name: this.name,
              email: this.email,
              dog: this.dog ? 'ja' : 'nein',
              children: this.children,
              childBed: this.childBed? 'ja' : 'nein',
              childChair: this.childChair? 'ja' : 'nein',
              adults: this.adults,
              arrival: this.arrival.toLocaleDateString('de-DE'),
              departure: this.departure.toLocaleDateString('de-DE'),
              notes: this.notes,
              price: this.price,
              tegernseeCardPrice: this.tegernseeCardPrice,
              total: this.total,
              lastName: this.lastName,
              firstName: this.firstName,
              phone: this.phone,
              endreinigungTotal: this.endreinigungTotal
            },
            'user_gupTDda9WM0tEIXX5GxxA')

        } catch (error) {
          console.log({error})
        }
        // Reset form field
        this.showSuccess = true
        this.attemptedSend = false
        this.departure = null
        this.arrival = null
        this.adults = 1
        this.children = 0
        this.dog = false
        this.firstName = ''
        this.lastName = ''
        this.email = ''
        this.phone = ''
        this.notes = ''
        this.childBed = false
        this.childChair = false
      }
    }
  },
  computed: {
    endreinigungDisplay() {
      if(this.price !== 0) {
        return this.endreinigungTotal
      } else {
        return 0
      }
    },
    tegernseeCardPrice() {
      const adultCount = parseInt(this.adults)
      const childCount = parseInt(this.children)

      var dateDiff = (this.departure - this.arrival) / (1000 * 3600 * 24)
      if (dateDiff < 0 || dateDiff > 1000) {
        dateDiff = 0
      }

      return dateDiff * (adultCount * 3 + childCount * 1.5)

    },
    total() {
      if(this.price > 0) {
        return this.tegernseeCardPrice + this.price + this.endreinigungTotal
      } else {
        return 0;
      }
    },
    price() {
      const adultCount = parseInt(this.adults)
      const childCount = parseInt(this.children)

      var hauptsaisonDays = 0
      var nebensaisonDays = 0

      const pricePerAdditionalAdult = 20

      const currentYear = new Date().getFullYear();

      const currentHauptsaison1Begin = new Date(currentYear + '-06-01')
      const currentHauptsaison1End = new Date(currentYear + '-10-15')
      const currentHauptsaison2Begin = new Date(currentYear + '-12-20')
      const currentHauptsaison2End = new Date((currentYear + 1) + '-01-08')

      const nextHauptsaison1Begin = new Date((currentYear + 1) + '-06-01')
      const nextHauptsaison1End = new Date((currentYear + 1) + '-10-15')
      const nextHauptsaison2Begin = new Date((currentYear + 1) + '-12-20')
      const nextHauptsaison2End = new Date((currentYear + 2) + '-01-08')

      const nextNextHauptsaison1Begin = new Date((currentYear + 2) + '-06-01')
      const nextNextHauptsaison1End = new Date((currentYear + 2) + '-10-15')
      const nextNextHauptsaison2Begin = new Date((currentYear + 2) + '-12-20')
      const nextNextHauptsaison2End = new Date((currentYear + 3) + '-01-08')

      var dateDiff = (this.departure - this.arrival) / (1000 * 3600 * 24)
      if (dateDiff < 0 || dateDiff > 1000) {
        dateDiff = 0
      }

      if (dateDiff !== 0) {
        var comparisonDate = new Date(this.arrival.getTime())
        for (var i = 0; i < dateDiff; i++) {
          if ((currentHauptsaison1Begin < comparisonDate && comparisonDate < currentHauptsaison1End)
            || (currentHauptsaison2Begin < comparisonDate && comparisonDate < currentHauptsaison2End)
            || (nextHauptsaison1Begin < comparisonDate && comparisonDate < nextHauptsaison1End)
            || (nextHauptsaison2Begin < comparisonDate && comparisonDate < nextHauptsaison2End)
            || (nextNextHauptsaison1Begin < comparisonDate && comparisonDate < nextNextHauptsaison1End)
            || (nextNextHauptsaison2Begin < comparisonDate && comparisonDate < nextNextHauptsaison2End)) {
            hauptsaisonDays++;
          } else {
            nebensaisonDays++;
          }
          comparisonDate.setDate(comparisonDate.getDate() + 1)
        }

        var zusatz = adultCount + childCount - this.maxFreePersons
        if (zusatz < 0) {
          zusatz = 0
        }

        this.nebensaisonDays = nebensaisonDays
        this.hauptsaisonDays = hauptsaisonDays

        this.pricePerDayNebensaison =  zusatz * pricePerAdditionalAdult + this.nebensaisonPrice
        this.pricePerDayHauptsaison = zusatz * pricePerAdditionalAdult + this.hauptsaisonPrice

        const totalDays = nebensaisonDays + hauptsaisonDays

        if(totalDays < 7) {
          var priceCalculation = (totalDays * zusatz * pricePerAdditionalAdult) +
            hauptsaisonDays * this.hauptsaisonPrice +
            nebensaisonDays * this.nebensaisonPrice
        } else {
          var priceCalculation = (totalDays * zusatz * pricePerAdditionalAdult) + hauptsaisonDays * this.hauptsaisonPrice + nebensaisonDays * this.nebensaisonPrice
        }

        if (this.dog) {
          priceCalculation += 20
        }

        if (priceCalculation === 3) {
          priceCalculation = 0
        }

        return priceCalculation

      } else {
        return 0
      }
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@100;300;400&display=swap');

body {
  font-family: 'Alegreya Sans', sans-serif;
  background-color: #EBE9E6;
}
input, select, option, button {
  border-radius: 0 !important;
}

.btn-secondary {
  background-color: #A3917F;
  border: none;
}

.btn-secondary:hover {
  background-color: #A3917F;
}

#container {
  margin: 25px;
}


</style>
