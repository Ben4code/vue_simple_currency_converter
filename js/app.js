
new Vue({
  el: "#app",
  mounted() {
    this.fetchCurrencies();
  },
  computed:{
    formatedCurrencies(){
      // console.log(getAPI())
      return Object.values(this.currencies);
    },
    disabled(){
      return (this.from !== '' && this.to !== '' && this.amount !== null && !this.loading) ? false : true;
    }
  },
  data: {
    loading: false,
    currencies: {},
    amount: null,
    from: '',
    to: '',
    result: 0
  },
  watch:{
    from(){
      this.result = 0;
    },
    to(){
      this.result = 0;
    }
  },
  methods: {
    fetchCurrencies() {
      const currencies = localStorage.getItem('currencies');

      if(currencies){
        this.currencies = JSON.parse(currencies);
        return;
      }

      axios.get(`https://free.currconv.com/api/v7/currencies?apiKey=${getAPI()}`)
        .then((response) => {
          this.currencies = response.data.results;
          localStorage.setItem('currencies', JSON.stringify(response.data.results))
        })
        .catch((err) => console.log(err));
    },
    convert(){
      this.loading = true
      axios.get(`https://free.currconv.com/api/v7/convert?q=${this.from}_${this.to}&compact=ultra&apiKey=${getAPI()}`)
        .then((response) => {
          this.result = (+this.amount * Object.values(response.data)[0]).toFixed(3)
          this.loading = false;
        })
        .catch((err) => console.log(err));
    }
  },
});
